import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";

// 1. Initialize dotenv BEFORE using process.env
dotenv.config();

import db from "./firebase/firebase.js";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const app = express();

app.use(cors());
app.use(express.json());

// Base Route
app.get("/", (req, res) => {
  res.send("🌸 Yarn Over Backend Running");
});

// Firebase Connection Test
app.get("/test", async (req, res) => {
  try {
    const collections = await db.listCollections();
    res.json({
      message: "Firebase Connected Successfully!",
      collections: collections.map((c) => c.id),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch All Products
app.get("/products", async (req, res) => {
  try {
    const snapshot = await db.collection("products").get();
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Custom Orders Endpoint
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
    res.json({ message: "Custom order submitted successfully!" });
  } catch (error) {
    console.error("FIRESTORE ERROR:", error);
    
    res.status(500).json({ error: error.message });
  }
});

// ----------------------------------------------------
// NEW SIMPLIFIED FLOW ROUTES
// ----------------------------------------------------

// 1. Create Razorpay Order (Called BEFORE payment popup opens)
app.post("/create-razorpay-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: Math.round(amount * 100), // convert ₹ to paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("RAZORPAY ERROR:", error);
    res.status(500).json({ error: "Could not initialize Razorpay order" });
  }
});

// 2. Main Order Processing (Called AFTER successful payment, or for COD)
app.post("/orders", async (req, res) => {
  try {
    const { userId, userEmail, customer, cartItems, total, paymentMethod } = req.body;

    // 1. Validate Stock & Update Inventory
    for (const item of cartItems) {
      const productRef = db.collection("products").doc(item.id);
      const productDoc = await productRef.get();

      if (!productDoc.exists) {
        return res.status(404).json({ error: `${item.name} not found` });
      }

      const product = productDoc.data();
      const currentQuantity = product.quantity || 0;

      if (currentQuantity < item.quantity) {
        return res.status(400).json({ error: `${item.name} is out of stock.` });
      }

      const newQuantity = currentQuantity - item.quantity;
      await productRef.update({
        quantity: newQuantity,
        status: newQuantity === 0 ? "Sold Out" : "Available",
      });
    }

    // 2. Save Order to Firestore
    const orderDoc = await db.collection("orders").add({
      userId,
      userEmail,
      customer,
      cartItems,
      total,
      paymentMethod,
      // If paymentMethod is ONLINE, we know it's paid because this endpoint 
      // is only hit after the Razorpay success handler triggers on the frontend.
      paymentStatus: paymentMethod === "ONLINE" ? "Paid" : "Pending",
      orderStatus: "Pending",
      createdAt: new Date(),
    });

    res.json({
      message: "Order placed successfully!",
      orderId: orderDoc.id,
    });
  } catch (error) {
    console.error("ORDER CREATION ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});