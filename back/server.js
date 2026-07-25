import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./firebase/firebase.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🌸 Yarn Over Backend Running");
});

app.get("/test", async (req, res) => {
  try {
    const collections = await db.listCollections();

    res.json({
      message: "Firebase Connected Successfully!",
      collections: collections.map((c) => c.id),
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/products", async (req, res) => {
  try {
    const snapshot = await db.collection("products").get();

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(products);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/custom-orders", async (req, res) => {
  console.log("======== CUSTOM ORDER RECEIVED ========");
  console.log(req.body);

  try {
    const { name, contact, details } = req.body;

    const docRef = await db.collection("customOrders").add({
      name,
      contact,
      details,
      status: "Pending",
      createdAt: new Date(),
    });

    console.log("Saved with ID:", docRef.id);

    res.json({
      message: "Custom order submitted successfully!",
    });
  } catch (error) {
    console.error("FIRESTORE ERROR:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/orders", async (req, res) => {
  try {
    const {
  userId,
  userEmail,
  customer,
  cartItems,
  total,
  paymentMethod,
} = req.body;

for (const item of cartItems) {

  const productRef = db.collection("products").doc(item.id);

  const productDoc = await productRef.get();

  if (!productDoc.exists) {
    return res.status(404).json({
      error: `${item.name} not found`,
    });
  }

  const product = productDoc.data();

  const currentQuantity = product.quantity;

  if (currentQuantity < item.quantity) {
    return res.status(400).json({
      error: `${item.name} is out of stock.`,
    });
  }

  const newQuantity = currentQuantity - item.quantity;

  await productRef.update({
    quantity: newQuantity,
    status: newQuantity === 0 ? "Sold Out" : "Available",
  });

}

   const docRef = await db.collection("orders").add({
  userId,
  userEmail,

  customer,
  cartItems,
  total,
  paymentMethod,

  paymentStatus: "Pending",
  orderStatus: "Pending",
  createdAt: new Date(),
});

    res.json({
      message: "Order placed successfully!",
      orderId: docRef.id,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});