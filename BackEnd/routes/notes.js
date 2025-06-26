// routes/notes.js
import express from "express";
import DoctorNote from "../models/DoctorNote.js";
import PrescribedMedicine from "../models/PrescribedMedicine.js";

const router = express.Router();

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

    const medicineRecords = medicines.map((med) => ({
      ...med,
      noteId: note.id,
    }));

    await PrescribedMedicine.bulkCreate(medicineRecords);

    res.json({ message: "Doctor's note saved successfully.", noteId: note.id });
  } catch (err) {
    console.error("Error saving note:", err);
    res.status(500).json({ error: "Failed to save doctor note." });
  }
});

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

router.get("/clinic/:clinicId", async (req, res) => {
  const { clinicId } = req.params;

  try {
    const notes = await DoctorNote.findAll({
      where: { clinicId },
      include: [PrescribedMedicine], // ensure medicines come along
      order: [["visitDate", "DESC"]],
    });

    res.json(notes);
  } catch (err) {
    console.error("Error fetching notes by clinicId:", err);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});
export default router;
