// routes/medicine.js
import express from "express";
import Medicine from "../models/Medicine.js";

const router = express.Router();

// Add or update medicine
router.post("/", async (req, res) => {
  const { name, code, quantity, type } = req.body;

  if (!name || !code || !quantity || !type) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    let medicine = await Medicine.findOne({ where: { code } });

    if (medicine) {
      // Update existing medicine's quantity and optionally type
      medicine.quantity += parseInt(quantity);
      medicine.type = type; // update type if needed
      await medicine.save();
      res.json({ message: "Medicine updated successfully.", medicine });
    } else {
      // Create new medicine
      medicine = await Medicine.create({ name, code, quantity, type });
      res
        .status(201)
        .json({ message: "Medicine added successfully.", medicine });
    }
  } catch (error) {
    console.error("Error saving medicine:", error);
    res.status(500).json({ error: "Failed to save medicine." });
  }
});

// Get all medicines
router.get("/", async (req, res) => {
  try {
    const medicines = await Medicine.findAll();
    res.json(medicines);
  } catch (error) {
    console.error("Error fetching medicines:", error);
    res.status(500).json({ error: "Failed to fetch medicines." });
  }
});

export default router;
