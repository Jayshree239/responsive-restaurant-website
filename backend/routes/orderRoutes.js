const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Menu = require("../models/Menu");
const { authMiddleware } = require("../middleware/authMiddleware");

// ========================
// Place Order
// ========================
router.post("/place", authMiddleware, async (req, res) => {
  const { items, deliveryAddress, phoneNumber } = req.body;

  try {
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "❌ No items in order" });
    }

    if (!deliveryAddress || !phoneNumber) {
      return res.status(400).json({ message: "❌ Delivery address and phone number required" });
    }

    // Validate and get current prices
    let totalAmount = 0;
    const validatedItems = [];

    for (let item of items) {
      const menuItem = await Menu.findById(item.menuId);
      if (!menuItem) {
        return res.status(404).json({ message: `❌ Menu item not found` });
      }

      validatedItems.push({
        menuId: item.menuId,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity
      });

      totalAmount += menuItem.price * item.quantity;
    }

    // Create order
    const order = new Order({
      userId: req.user.id,
      items: validatedItems,
      totalAmount,
      deliveryAddress,
      phoneNumber,
      status: "Placed"
    });

    await order.save();

    res.status(201).json({
      message: "✅ Order placed successfully",
      order: {
        id: order._id,
        totalAmount: order.totalAmount,
        status: order.status,
        items: order.items
      }
    });
  } catch (err) {
    res.status(500).json({ message: "❌ Server error", error: err.message });
  }
});

// ========================
// Get User Orders
// ========================
router.get("/my-orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.json({
      message: "✅ Orders retrieved successfully",
      orders
    });
  } catch (err) {
    res.status(500).json({ message: "❌ Server error", error: err.message });
  }
});

// ========================
// Get Order by ID
// ========================
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "❌ Order not found" });
    }

    // Check if user owns this order
    if (order.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "❌ Unauthorized access" });
    }

    res.json({
      message: "✅ Order retrieved successfully",
      order
    });
  } catch (err) {
    res.status(500).json({ message: "❌ Server error", error: err.message });
  }
});

// ========================
// Update Order Status (Payment)
// ========================
router.put("/:id/pay", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "❌ Order not found" });
    }

    // Check if user owns this order
    if (order.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "❌ Unauthorized access" });
    }

    // Update status to Paid
    order.status = "Paid";
    await order.save();

    res.json({
      message: "✅ Payment successful",
      order: {
        id: order._id,
        status: order.status,
        totalAmount: order.totalAmount
      }
    });
  } catch (err) {
    res.status(500).json({ message: "❌ Server error", error: err.message });
  }
});

module.exports = router;
