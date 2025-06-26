import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";

import patientRoutes from "./routes/patients.js";
import medicineRoutes from "./routes/medicines.js";
import notesRoutes from "./routes/notes.js";

// Load models
import DoctorNote from "./models/DoctorNote.js";
import PrescribedMedicine from "./models/PrescribedMedicine.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Define model associations BEFORE sync
DoctorNote.hasMany(PrescribedMedicine, { foreignKey: "noteId", onDelete: "CASCADE" });
PrescribedMedicine.belongsTo(DoctorNote, { foreignKey: "noteId" });

// Use routes
app.use("/api/patients", patientRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/notes", notesRoutes);

// Sync DB and start server
const PORT = process.env.PORT || 3001;

sequelize
  .sync({ alter: true })  // <- Safely updates DB schema
  .then(() => {
    console.log("✅ Database synced");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err);
  });
