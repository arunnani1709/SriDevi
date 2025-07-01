import express from "express";
import Patient from "../models/Patient.js";

const router = express.Router();

// GET: All patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET: One patient by clinicId
router.get("/:clinicId", async (req, res) => {
  try {
    const patient = await Patient.findOne({ where: { clinicId: req.params.clinicId } });
    if (!patient) return res.status(404).json({ error: "Patient not found" });
    res.json(patient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST: Create patient
router.post("/", async (req, res) => {
  try {
    const newPatient = await Patient.create(req.body);
    res.status(201).json(newPatient);
  } catch (error) {
    console.error("Error adding patient:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
