const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");

// Cart is stored in localStorage on frontend, but we provide API endpoints for backend integration
// For simplicity, we're managing cart on the client-side using localStorage

// ========================
// Get Cart (Frontend manages this)
// ========================
router.get("/", authMiddleware, (req, res) => {
  res.json({
    message: "📋 Cart is managed on the frontend using localStorage",
    note: "Call /api/order/place to create an order from cart items"
  });
});

// ========================
// Validate Cart Items
// ========================
router.post("/validate", authMiddleware, async (req, res) => {
  const { items } = req.body;
  
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "❌ Invalid cart items" });
  }

  try {
    // Validate each item exists and get current prices
    const Menu = require("../models/Menu");
    const validatedItems = [];
    let totalAmount = 0;

    for (let item of items) {
      const menuItem = await Menu.findById(item.menuId);
      if (!menuItem) {
        return res.status(404).json({ message: `❌ Menu item ${item.menuId} not found` });
      }

      validatedItems.push({
        menuId: item.menuId,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity
      });

      totalAmount += menuItem.price * item.quantity;
    }

    res.json({
      message: "✅ Cart validated successfully",
      items: validatedItems,
      totalAmount
    });
  } catch (err) {
    res.status(500).json({ message: "❌ Server error", error: err.message });
  }
});

module.exports = router;
