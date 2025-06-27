import express from 'express';
import { Medicine } from '../models/Medicine.js';

const router = express.Router();

// ✅ Add or update medicine
router.post('/', async (req, res) => {
  const { name, code, quantity, type } = req.body;

  if (!name || !code || !quantity || !type) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Step 1: Check for exact match (name + code + type)
    let medicine = await Medicine.findOne({
      where: { name, code, type },
    });

    if (medicine) {
      // ✅ Exact match found, update quantity
      medicine.quantity += parseInt(quantity);
      await medicine.save();
      return res.json({ message: 'Medicine quantity updated.', medicine });
    }

    // Step 2: Check if name + code exists with different type
    const sameNameCode = await Medicine.findOne({
      where: { name, code },
    });

    if (sameNameCode && sameNameCode.type !== type) {
      // ✅ Different type, create new record
      const newMed = await Medicine.create({
        name,
        code,
        quantity: parseInt(quantity),
        type,
      });
      return res
        .status(201)
        .json({ message: 'New type of medicine added.', medicine: newMed });
    }

    // Step 3: Fully new medicine
    const newMed = await Medicine.create({
      name,
      code,
      quantity: parseInt(quantity),
      type,
    });

    return res
      .status(201)
      .json({ message: 'New medicine added.', medicine: newMed });
  } catch (error) {
    console.error('Error saving medicine:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ✅ Deduct medicine quantity by code + type
router.put('/:code/:type/deduct', async (req, res) => {
  const { code, type } = req.params;
  let { quantity, bottleCount } = req.body;

  try {
    const medicine = await Medicine.findOne({
      where: { code, type },
    });

    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found.' });
    }

    // Convert bottleCount to ml if applicable
    let deductionQuantity;

    if (type === 'Kashya') {
      const bottles = parseInt(bottleCount);
      if (isNaN(bottles) || bottles <= 0) {
        return res.status(400).json({ error: 'Valid bottle count is required for Kashya.' });
      }
      deductionQuantity = bottles * 210;
    } else if (type === 'Grutha') {
      const bottles = parseInt(bottleCount);
      if (isNaN(bottles) || bottles <= 0) {
        return res.status(400).json({ error: 'Valid bottle count is required for Grutha.' });
      }
      deductionQuantity = bottles * 150;
    } else {
      deductionQuantity = parseInt(quantity);
      if (isNaN(deductionQuantity) || deductionQuantity <= 0) {
        return res.status(400).json({ error: 'Valid quantity is required.' });
      }
    }

    if (medicine.quantity < deductionQuantity) {
      return res.status(400).json({
        error: `Not enough stock. Available: ${medicine.quantity}, Required: ${deductionQuantity}`,
      });
    }

    medicine.quantity -= deductionQuantity;
    await medicine.save();

    return res.json({
      message: 'Medicine stock deducted successfully.',
      remainingQuantity: medicine.quantity,
      medicine,
    });
  } catch (err) {
    console.error('Error updating medicine:', err);
    res.status(500).json({ error: 'Failed to deduct medicine stock.' });
  }
});


// ✅ Get all medicines
router.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.findAll();
    res.json(medicines);
  } catch (error) {
    console.error('Error fetching medicines:', error);
    res.status(500).json({ error: 'Failed to fetch medicines.' });
  }
});

export default router;
