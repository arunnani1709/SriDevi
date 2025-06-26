import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import patientRoutes from "./routes/patients.js";
import medicineRoutes from "./routes/medicines.js";
import notesRoutes from "./routes/notes.js";
import DoctorNote from "./models/DoctorNote.js";
import PrescribedMedicine from "./models/PrescribedMedicine.js";
import "./models/associations.js"; // ⬅️ important

DoctorNote.hasMany(PrescribedMedicine, {
  foreignKey: "noteId",
  onDelete: "CASCADE",
});
PrescribedMedicine.belongsTo(DoctorNote, { foreignKey: "noteId" });

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/patients", patientRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/notes", notesRoutes);

const PORT = process.env.PORT || 3001;

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
  });
