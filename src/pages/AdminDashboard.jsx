import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
export default function AdminDashboard({ onNavigate }) {
const [orders, setOrders] = useState([]);
const [customOrders, setCustomOrders] = useState([]);
const [products, setProducts] = useState([]);
const [reviews, setReviews] = useState([]);
const [editingProductId, setEditingProductId] = useState(null);
const [newStock, setNewStock] = useState("");
useEffect(() => {
loadAllData();
}, []);
async function loadAllData() {
await Promise.all([loadOrders(), loadCustomOrders(), loadProducts(), loadReviews()]);
}
async function loadOrders() {
try {
const snapshot = await getDocs(collection(db, "orders"));
const orderData = snapshot.docs.map((doc) => ({
id: doc.id,
...doc.data(),
}));
setOrders(orderData);
} catch (error) {
console.error("Error loading orders:", error);
alert("Unable to load orders: " + error.message);
}
}
async function loadCustomOrders() {
try {
const snapshot = await getDocs(collection(db, "customOrders"));
const orderData = snapshot.docs.map((doc) => ({
id: doc.id,
...doc.data(),
}));
setCustomOrders(orderData);
} catch (error) {
console.error("Error loading custom orders:", error);
alert("Unable to load custom orders: " + error.message);
}
}
async function loadProducts() {
try {
const snapshot = await getDocs(collection(db, "products"));
const productData = snapshot.docs.map((doc) => ({
id: doc.id,
...doc.data(),
}));
setProducts(productData);
} catch (error) {
console.error("Error loading products:", error);
alert("Unable to load products: " + error.message);
}
}
async function loadReviews() {
try {
const snapshot = await getDocs(collection(db, "reviews"));
const reviewData = snapshot.docs.map((doc) => ({
id: doc.id,
...doc.data(),
}));
setReviews(reviewData);
} catch (error) {
console.error("Error loading reviews:", error);
alert("Unable to load reviews: " + error.message);
}
}
async function updateProductStock(productId, newQuantity) {
try {
if (newQuantity === "" || Number(newQuantity) < 0) {
alert("Stock cannot be negative!");
return;
}
await updateDoc(doc(db, "products", productId), {
quantity: parseInt(newQuantity, 10),
});
setEditingProductId(null);
setNewStock("");
await loadProducts();
alert("Stock updated successfully!");
} catch (error) {
console.error(error);
alert("Unable to update stock: " + error.message);
}
}
async function deleteOrder(id) {
const ok = window.confirm("Delete this order?");
if (!ok) return;
try {
await deleteDoc(doc(db, "orders", id));
await loadOrders();
} catch (error) {
alert("Failed to delete order: " + error.message);
}
}
async function deleteCustomOrder(id) {
const ok = window.confirm("Delete this custom order?");
if (!ok) return;
try {
await deleteDoc(doc(db, "customOrders", id));
await loadCustomOrders();
} catch (error) {
alert("Failed to delete custom order: " + error.message);
}
}
async function deleteReview(id) {
const ok = window.confirm("Delete this review?");
if (!ok) return;
try {
await deleteDoc(doc(db, "reviews", id));
await loadReviews();
} catch (error) {
alert("Failed to delete review: " + error.message);
}
}
async function updateOrderStatus(orderId, status) {
try {
await updateDoc(doc(db, "orders", orderId), {
orderStatus: status,
});
await loadOrders();
} catch (error) {
alert("Failed to update status: " + error.message);
}
}
async function updateCustomOrderStatus(orderId, status) {
try {
await updateDoc(doc(db, "customOrders", orderId), {
status: status,
});
await loadCustomOrders();
} catch (error) {
alert("Failed to update custom order status: " + error.message);
}
}
// Calculate Sales Metrics
const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
const totalOrders = orders.length;
const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;
const pendingOrders = orders.filter((o) => (o.orderStatus || "Pending") === "Pending").length;
const processingOrders = orders.filter((o) => o.orderStatus === "Processing").length;
const completedOrders = orders.filter((o) => o.orderStatus === "Completed").length;
return (
<div
style={{
height: "100vh",
maxHeight: "100vh",
background: "#FFF2F4",
padding: "15px 20px",
fontFamily: "'Playfair Display', serif",
position: "relative",
boxSizing: "border-box",
display: "flex",
flexDirection: "column",
overflow: "hidden",
}}
>
<img
src="/YarnOver21.png"
alt="Background Pattern"
style={{
position: "absolute",
top: 0,
left: 0,
width: "100%",
height: "100%",
objectFit: "cover",
opacity: 0.35,
zIndex: 0,
}}
/>
{/* TOP HEADER */}
<div style={{ position: "relative", zIndex: 2, marginBottom: "12px", flexShrink: 0 }}>
<button
onClick={() => onNavigate("home")}
style={{
background: "none",
border: "none",
color: "#CB6565",
fontSize: "18px",
fontWeight: "bold",
cursor: "pointer",
marginBottom: "5px",
}}
>
← Home
</button>
<h1
style={{
textAlign: "center",
color: "#d35252",
margin: "-25px 0 0 0",
fontSize: "26px",
fontWeight: "bold",
}}
>
Admin Dashboard 🌸
</h1>
</div>
{/* TOP SECTION: Analytics Cards */}
<div
style={{
position: "relative",
zIndex: 2,
display: "grid",
gridTemplateColumns: "1fr 1fr",
gap: "15px",
marginBottom: "15px",
flexShrink: 0,
}}
>
{/* Inventory Card */}
<div
style={{
background: "rgba(255,255,255,0.98)",
borderRadius: "16px",
padding: "14px 18px",
boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
border: "2px solid #CB6565",
maxHeight: "220px",
overflowY: "auto",
}}
>
<h2
style={{
marginTop: 0,
marginBottom: "10px",
color: "#CB6565",
display: "flex",
alignItems: "center",
gap: "8px",
fontSize: "17px",
}}
>
📦 INVENTORY MANAGEMENT
</h2>
{products.length === 0 ? (
<div style={{ color: "#666", fontSize: "14px" }}>No products found</div>
) : (
<div style={{ overflowX: "auto" }}>
<table
style={{
width: "100%",
borderCollapse: "collapse",
minWidth: "400px",
fontSize: "14px",
}}
>
<thead>
<tr style={{ borderBottom: "2px solid #CB6565" }}>
<th style={{ padding: "8px 6px", textAlign: "left", color: "#be556a", fontSize: "14px" }}>
Product
</th>
<th style={{ padding: "8px 6px", textAlign: "center", color: "#be556a", fontSize: "14px" }}>
Stock
</th>
<th style={{ padding: "8px 6px", textAlign: "center", color: "#be556a", fontSize: "14px" }}>
Status
</th>
<th style={{ padding: "8px 6px", textAlign: "center", color: "#be556a", fontSize: "14px" }}>
Action
</th>
</tr>
</thead>
<tbody>
{products.map((product) => (
<tr
key={product.id}
style={{
borderBottom: "1px solid #E0E0E0",
backgroundColor: product.quantity === 0 ? "#FFF5F5" : "#FFF",
}}
>
<td style={{ padding: "8px 6px", fontSize: "14px" }}>{product.name}</td>
<td style={{ padding: "8px 6px", textAlign: "center", fontSize: "14px" }}>
{editingProductId === product.id ? (
<input
type="number"
value={newStock}
onChange={(e) => setNewStock(e.target.value)}
style={{
width: "55px",
padding: "4px",
borderRadius: "6px",
border: "1px solid #CB6565",
textAlign: "center",
fontSize: "14px",
}}
/>
) : (
<strong>{product.quantity}</strong>
)}
</td>
<td style={{ padding: "8px 6px", textAlign: "center", fontSize: "14px" }}>
{product.quantity === 0 ? (
<span>🔴</span>
) : product.quantity < 5 ? (
<span>🟡</span>
) : (
<span>🟢</span>
)}
</td>
<td style={{ padding: "8px 6px", textAlign: "center" }}>
{editingProductId === product.id ? (
<div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
<button
onClick={() => updateProductStock(product.id, newStock)}
style={{
background: "#4CAF50",
color: "white",
border: "none",
borderRadius: "6px",
padding: "4px 8px",
cursor: "pointer",
fontSize: "13px",
}}
>
✅
</button>
<button
onClick={() => {
setEditingProductId(null);
setNewStock("");
}}
style={{
background: "#BDBDBD",
color: "white",
border: "none",
borderRadius: "6px",
padding: "4px 8px",
cursor: "pointer",
fontSize: "13px",
}}
>
❌
</button>
</div>
) : (
<button
onClick={() => {
setEditingProductId(product.id);
setNewStock(product.quantity.toString());
}}
style={{
background: "#CB6565",
color: "white",
border: "none",
borderRadius: "6px",
padding: "4px 8px",
cursor: "pointer",
fontSize: "13px",
}}
>
✏️
</button>
)}
</td>
</tr>
))}
</tbody>
</table>
</div>
)}
</div>
{/* Sales Analytics Card */}
<div
style={{
background: "rgba(255,255,255,0.98)",
borderRadius: "16px",
padding: "14px 18px",
boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
border: "2px solid #6A8ACF",
maxHeight: "220px",
overflowY: "auto",
}}
>
<h2
style={{
marginTop: 0,
marginBottom: "10px",
color: "#6A8ACF",
display: "flex",
alignItems: "center",
gap: "8px",
fontSize: "17px",
}}
>
📊 SALES ANALYTICS
</h2>
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "14px" }}>
<p style={{ margin: "2px 0" }}>
<strong>Total Rev:</strong>{" "}
<span style={{ color: "#4CAF50", fontWeight: 700 }}>₹{totalRevenue.toLocaleString()}</span>
</p>
<p style={{ margin: "2px 0" }}>
<strong>Total Orders:</strong>{" "}
<span style={{ color: "#6A8ACF", fontWeight: 700 }}>{totalOrders}</span>
</p>
<p style={{ margin: "2px 0" }}>
<strong>Avg Value:</strong>{" "}
<span style={{ color: "#FF9800", fontWeight: 700 }}>₹{avgOrderValue}</span>
</p>
</div>
<div style={{ marginTop: "10px", paddingTop: "8px", borderTop: "1px solid #E0E0E0" }}>
<p style={{ fontWeight: 700, color: "#6A8ACF", margin: "0 0 6px 0", fontSize: "14px" }}>
Order Breakdown
</p>
<div style={{ display: "flex", gap: "15px", fontSize: "14px", flexWrap: "wrap" }}>
<span>🟡 <strong>Pending:</strong> {pendingOrders}</span>
<span>🔄 <strong>Processing:</strong> {processingOrders}</span>
<span>✅ <strong>Completed:</strong> {completedOrders}</span>
</div>
</div>
</div>
</div>
{/* BOTTOM SECTION: Scaled & Scrollable Data Sections */}
<div
style={{
position: "relative",
zIndex: 1,
background: "rgba(255,255,255,0.98)",
borderRadius: "16px",
padding: "16px",
boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
flex: 1,
minHeight: 0,
overflowY: "auto",
display: "flex",
flexDirection: "column",
gap: "22px",
}}
>
{/* ALL REGULAR ORDERS */}
<section>
<h2 style={{ marginTop: 0, marginBottom: "12px", color: "#be556a", fontSize: "18px" }}>
All Regular Orders ({orders.length})
</h2>
{orders.length === 0 ? (
<div style={{ background: "#fff", padding: "12px", borderRadius: "10px", border: "1px dashed #ccc" }}>
<span style={{ fontSize: "14px" }}>No standard orders found 🧶</span>
</div>
) : (
<div
style={{
display: "grid",
gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
gap: "12px",
}}
>
{orders.map((order) => (
<div
key={order.id}
style={{
background: "white",
padding: "14px",
borderRadius: "12px",
boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
borderLeft: "6px solid #CB6565",
fontSize: "14px",
lineHeight: "1.4",
}}
>
<h3 style={{ fontSize: "15px", margin: "0 0 8px 0", color: "#333", fontWeight: "bold" }}>
Order: #{order.id.slice(0, 8)}
</h3>
<p style={{ margin: "4px 0", color: "#333" }}>
<strong>Customer:</strong> {order.customer?.name || order.name || "N/A"}
</p>
<p style={{ margin: "4px 0", color: "#333" }}>
<strong>Phone:</strong> {order.customer?.phone || order.phone || "N/A"}
</p>
<p style={{ margin: "4px 0", color: "#333" }}>
<strong>Total:</strong> ₹{order.total || 0}
</p>
<p style={{ margin: "4px 0", color: "#333" }}>
<strong>Status:</strong> {order.orderStatus || "Pending"}
</p>
<select
value={order.orderStatus || "Pending"}
onChange={(e) => updateOrderStatus(order.id, e.target.value)}
style={{
padding: "6px 8px",
borderRadius: "6px",
border: "1px solid #CB6565",
width: "100%",
marginTop: "8px",
fontSize: "13px",
background: "#fff",
}}
>
<option>Pending</option>
<option>Processing</option>
<option>Shipped</option>
<option>Completed</option>
<option>Cancelled</option>
</select>
<button
onClick={() => deleteOrder(order.id)}
style={{
marginTop: "8px",
background: "#C05A5A",
color: "white",
border: "none",
padding: "6px 10px",
borderRadius: "6px",
cursor: "pointer",
fontSize: "13px",
fontWeight: "bold",
width: "100%",
}}
>
🗑 Delete
</button>
</div>
))}
</div>
)}
</section>
{/* CUSTOM ORDERS SECTION */}
<section>
<h2 style={{ marginTop: 0, marginBottom: "12px", color: "#be556a", fontSize: "18px" }}>
Custom Orders ({customOrders.length})
</h2>
{customOrders.length === 0 ? (
<div style={{ background: "#fff", padding: "12px", borderRadius: "10px", border: "1px dashed #ccc" }}>
<span style={{ fontSize: "14px" }}>No custom orders found 🧶</span>
</div>
) : (
<div
style={{
display: "grid",
gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
gap: "12px",
}}
>
{customOrders.map((order) => (
<div
key={order.id}
style={{
background: "white",
padding: "14px",
borderRadius: "12px",
boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
borderLeft: "6px solid #6A8ACF",
fontSize: "14px",
lineHeight: "1.4",
}}
>
<h3 style={{ fontSize: "15px", margin: "0 0 8px 0", color: "#333", fontWeight: "bold" }}>
Custom Order #{order.id.slice(0, 6)}
</h3>
<p style={{ margin: "4px 0", color: "#333" }}>
<strong>Name:</strong> {order.name || order.customerName || "N/A"}
</p>
<p style={{ margin: "4px 0", color: "#333" }}>
<strong>Contact:</strong> {order.contact || order.phone || order.email || "N/A"}
</p>
<p style={{ margin: "4px 0", color: "#333" }}>
<strong>Details:</strong> {order.details || order.requirements || order.description || "N/A"}
</p>
<p style={{ margin: "4px 0", color: "#333" }}>
<strong>Status:</strong>{" "}
<span style={{ fontWeight: "bold", color: "#1976D2" }}>
{order.status || "Pending"}
</span>
</p>
<div
style={{
display: "flex",
gap: "6px",
marginTop: "10px",
flexWrap: "wrap",
}}
>
<button
onClick={() => updateCustomOrderStatus(order.id, "Approved")}
style={{
background: "#4CAF50",
color: "white",
border: "none",
borderRadius: "6px",
padding: "6px 8px",
cursor: "pointer",
fontSize: "12px",
fontWeight: "bold",
flex: 1,
minWidth: "65px",
}}
>
✅ Approve
</button>
<button
onClick={() => updateCustomOrderStatus(order.id, "Rejected")}
style={{
background: "#E53935",
color: "white",
border: "none",
borderRadius: "6px",
padding: "6px 8px",
cursor: "pointer",
fontSize: "12px",
fontWeight: "bold",
flex: 1,
minWidth: "65px",
}}
>
❌ Reject
</button>
<button
onClick={() => updateCustomOrderStatus(order.id, "Completed")}
style={{
background: "#1976D2",
color: "white",
border: "none",
borderRadius: "6px",
padding: "6px 8px",
cursor: "pointer",
fontSize: "12px",
fontWeight: "bold",
flex: 1,
minWidth: "65px",
}}
>
✔ Complete
</button>
<button
onClick={() => deleteCustomOrder(order.id)}
style={{
background: "#727070",
color: "white",
border: "none",
borderRadius: "6px",
padding: "6px 8px",
cursor: "pointer",
fontSize: "12px",
fontWeight: "bold",
flex: 1,
minWidth: "65px",
}}
>
🗑 Delete
</button>
</div>
</div>
))}
</div>
)}
</section>
{/* REVIEWS MANAGEMENT SECTION */}
<section>
<h2 style={{ marginTop: 0, marginBottom: "12px", color: "#be556a", fontSize: "18px" }}>
Customer Reviews ({reviews.length})
</h2>
{reviews.length === 0 ? (
<div style={{ background: "#fff", padding: "12px", borderRadius: "10px", border: "1px dashed #ccc" }}>
<span style={{ fontSize: "14px" }}>No reviews found 🌸</span>
</div>
) : (
<div
style={{
display: "grid",
gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
gap: "12px",
}}
>
{reviews.map((rev) => (
<div
key={rev.id}
style={{
background: "#FFF9FA",
padding: "14px",
borderRadius: "12px",
boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
borderLeft: "6px solid #E57373",
border: "1px solid #FAD2E1",
borderLeftWidth: "6px",
fontSize: "14px",
lineHeight: "1.4",
}}
>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
<span style={{ fontWeight: "bold", color: "#333" }}>👤 {rev.name || rev.author || "Anonymous"}</span>
<span style={{ color: "#FFB703" }}>{"⭐".repeat(rev.rating || 5)}</span>
</div>
<p style={{ margin: "6px 0 12px 0", color: "#555", fontStyle: "italic" }}>
"{rev.review || rev.comment || rev.text}"
</p>
<button
onClick={() => deleteReview(rev.id)}
style={{
background: "#C05A5A",
color: "white",
border: "none",
padding: "6px 10px",
borderRadius: "6px",
cursor: "pointer",
fontSize: "13px",
fontWeight: "bold",
width: "100%",
}}
>
🗑 Delete Review
</button>
</div>
))}
</div>
)}
</section>
</div>
</div>
);
} 
