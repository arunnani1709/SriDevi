import express from "express";
import DoctorNote from "../models/DoctorNote.js";
import PrescribedMedicine from "../models/PrescribedMedicine.js";

const router = express.Router();

// POST: Create a new doctor note with medicines
router.post("/", async (req, res) => {
  const {
    clinicId,
    visitDate,
    complaint,
    diagnosis,
    tests,
    prescription,
    medicines,
  } = req.body;

  if (!clinicId || !visitDate || !Array.isArray(medicines)) {
    return res.status(400).json({ error: "Required data missing." });
  }

  try {
    const note = await DoctorNote.create({
      clinicId,
      visitDate,
      complaint,
      diagnosis,
      tests,
      prescription,
    });

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
    res.status(500).json({ error: "Failed to save doctor note." });
  }
});

// GET: Fetch all notes by clinicId via query
router.get("/", async (req, res) => {
  const { clinicId } = req.query;

  if (!clinicId) {
    return res.status(400).json({ error: "clinicId is required" });
  }

  try {
    const notes = await DoctorNote.findAll({
      where: { clinicId },
      include: [
        {
          model: PrescribedMedicine,
          as: "medicines",
        },
      ],
      order: [["visitDate", "DESC"]],
    });

    res.json(notes);
  } catch (err) {
    console.error("Error fetching doctor notes:", err);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// GET: Fetch all notes by clinicId via route param
router.get("/clinic/:clinicId", async (req, res) => {
  const { clinicId } = req.params;

  try {
    const notes = await DoctorNote.findAll({
      where: { clinicId },
      include: [
        {
          model: PrescribedMedicine,
          as: "medicines", // ✅ must match alias used in association
        },
      ], // include medicines
      order: [["visitDate", "DESC"]],
    });

    res.json(notes);
  } catch (err) {
    console.error("Error fetching notes by clinicId:", err);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// ✅ NEW: POST /api/notes/prescriptions → Insert medicines using clinicId & visitDate
router.post("/prescriptions", async (req, res) => {
  const { clinicId, visitDate, medicines } = req.body;

  try {
    const note = await DoctorNote.findOne({
      where: { clinicId, visitDate },
    });

    if (!note) {
      return res.status(404).json({ error: "Doctor note not found." });
    }

    // ✅ Delete existing medicines for this note
    await PrescribedMedicine.destroy({
      where: { noteId: note.id },
    });

    // ✅ Insert new ones
    const medicineData = medicines.map((med) => ({
      ...med,
      noteId: note.id,
    }));

    await PrescribedMedicine.bulkCreate(medicineData);

    res
      .status(201)
      .json({ message: "Prescribed medicines replaced successfully." });
  } catch (error) {
    console.error("Error saving medicines:", error);
    res.status(500).json({ error: "Failed to save prescribed medicines." });
  }
});

router.put("/:id", async (req, res) => {
  const noteId = req.params.id;
  const updateData = req.body;

  const note = await DoctorNote.findByPk(noteId);
  if (!note) return res.status(404).json({ error: "Note not found" });

  await note.update(updateData);

  res.json(note);
});

export default router;
