import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";

// Import routes
import patientRoutes from "./routes/patients.js";
import medicineRoutes from "./routes/medicines.js";
import notesRoutes from "./routes/notes.js";

// Initialize environment and middlewares
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Load models and associations
import "./models/DoctorNote.js";
import "./models/PrescribedMedicine.js";
import "./models/associations.js"; // ⬅️ contains all relationships

// Register API routes
app.use("/api/patients", patientRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/notes", notesRoutes);

// Start server
const PORT = process.env.PORT || 3001;
sequelize
  .sync() // you can also use { alter: true } for dev mode
  .then(() => {
    console.log("✅ Database synced");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err);
  });
