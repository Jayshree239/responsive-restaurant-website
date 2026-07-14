const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

// ========================
// Get All Menu Items
// ========================
router.get("/", async (req, res) => {
  try {
    const items = await Menu.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ========================
// Get Menu Item by ID
// ========================
router.get("/:id", async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "❌ Menu item not found" });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ========================
// Add Menu Item (Admin Only)
// ========================
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  const { name, description, category, price, image } = req.body;

  try {
    if (!name || !description || !category || !price || !image) {
      return res.status(400).json({ message: "❌ All fields are required" });
    }

    const newItem = new Menu({
      name,
      description,
      category,
      price,
      image
    });

    await newItem.save();

    res.status(201).json({
      message: "✅ Menu item added successfully",
      item: newItem
    });
  } catch (err) {
    res.status(500).json({ message: "❌ Server error", error: err.message });
  }
});

// ========================
// Update Menu Item (Admin Only)
// ========================
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, description, category, price, image } = req.body;

    const item = await Menu.findByIdAndUpdate(
      req.params.id,
      { name, description, category, price, image },
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ message: "❌ Menu item not found" });
    }

    res.json({
      message: "✅ Menu item updated successfully",
      item
    });
  } catch (err) {
    res.status(500).json({ message: "❌ Server error", error: err.message });
  }
});

// ========================
// Delete Menu Item (Admin Only)
// ========================
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const item = await Menu.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "❌ Menu item not found" });
    }

    res.json({
      message: "✅ Menu item deleted successfully",
      item
    });
  } catch (err) {
    res.status(500).json({ message: "❌ Server error", error: err.message });
  }
});

module.exports = router;
