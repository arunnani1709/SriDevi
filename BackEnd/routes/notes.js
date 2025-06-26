// routes/notes.js
import express from 'express';
import DoctorNote from '../models/DoctorNote.js';
import PrescribedMedicine from '../models/PrescribedMedicine.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const {
    clinicId,
    visitDate,
    complaint,
    diagnosis,
    tests,
    prescription,
    medicines = [],
  } = req.body;

  if (!clinicId || !visitDate) {
    return res.status(400).json({ error: 'clinicId and visitDate are required.' });
  }

  try {
    // Step 1: Save doctor's note
    const note = await DoctorNote.create({
      clinicId,
      visitDate,
      complaint,
      diagnosis,
      tests,
      prescription,
    });

    // Step 2: Add medicines with noteId, clinicId and visitDate
    if (medicines.length > 0) {
      const medicineRecords = medicines.map((med) => ({
        ...med,
        noteId: note.id,
        clinicId,
        visitDate,
      }));

      await PrescribedMedicine.bulkCreate(medicineRecords);
    }

    res.status(201).json({
      message: "Doctor's note and medicines saved successfully.",
      noteId: note.id,
    });
  } catch (err) {
    console.error("Error saving note:", err);
    res.status(500).json({ error: 'Failed to save doctor note.' });
  }
});

export default router;
