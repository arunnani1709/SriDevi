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
    let medicine = await Medicine.findOne({
      where: { name, code, type },
    });

    if (medicine) {
      medicine.quantity += parseInt(quantity);
      await medicine.save();
      return res.json({ message: 'Medicine quantity updated.', medicine });
    }

    const sameNameCode = await Medicine.findOne({
      where: { name, code },
    });

    if (sameNameCode && sameNameCode.type !== type) {
      const newMed = await Medicine.create({
        name,
        code,
        quantity: parseInt(quantity),
        type,
      });
      return res.status(201).json({ message: 'New type of medicine added.', medicine: newMed });
    }

    const newMed = await Medicine.create({
      name,
      code,
      quantity: parseInt(quantity),
      type,
    });

    return res.status(201).json({ message: 'New medicine added.', medicine: newMed });
  } catch (error) {
    console.error('Error saving medicine:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ✅ Deduct medicine quantity by code + type
// ✅ Deduct medicine quantity by code + type
router.put('/:code/:type/deduct', async (req, res) => {
  const { code, type } = req.params;
  let { quantity, bottleCount } = req.body;

  try {
    const medicine = await Medicine.findOne({ where: { code, type } });

    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found.' });
    }

    let deductionAmount = 0;

    // ⚙️ Deduction logic per type
    switch (type) {
      case 'Tablet':
      case 'Capsule':
        if (!quantity) {
          return res.status(400).json({ error: 'Quantity (tablets/capsules) is required.' });
        }
        deductionAmount = parseInt(quantity);
        break;

      case 'Kashaya':
        if (!bottleCount) {
          return res.status(400).json({ error: 'Bottle count required for Kashaya.' });
        }
        deductionAmount = parseInt(bottleCount) * 210; // 210ml per bottle
        break;

      case 'Grutha':
        if (!bottleCount) {
          return res.status(400).json({ error: 'Bottle count required for Grutha.' });
        }
        deductionAmount = parseInt(bottleCount) * 150; // 150ml per bottle
        break;

      case 'Powder':
        if (!quantity) {
          return res.status(400).json({ error: 'Quantity in grams is required.' });
        }
        deductionAmount = parseInt(quantity);
        break;

      case 'Thila':
      case 'NaselDrop':
      case 'Soap':
      case 'Shampu':
      case 'Linements':
      case 'Leha':
        if (!quantity) {
          return res.status(400).json({ error: 'Manual quantity is required.' });
        }
        deductionAmount = parseInt(quantity);
        break;

      default:
        return res.status(400).json({ error: `Invalid medicine type: ${type}` });
    }

    if (isNaN(deductionAmount) || deductionAmount <= 0) {
      return res.status(400).json({ error: 'Invalid deduction amount.' });
    }

    if (medicine.quantity < deductionAmount) {
      return res.status(400).json({
        error: `Insufficient stock. Available: ${medicine.quantity}, Required: ${deductionAmount}`,
      });
    }

    medicine.quantity -= deductionAmount;
    await medicine.save();

    res.json({
      message: 'Quantity deducted successfully',
      remaining: medicine.quantity,
    });
  } catch (err) {
    console.error('Error deducting medicine:', err);
    res.status(500).json({ error: 'Internal server error.' });
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
