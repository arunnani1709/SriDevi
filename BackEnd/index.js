// index.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import sequelize from "./config/db.js";

// Import routes
import patientRoutes from "./routes/patients.js";
import medicineRoutes from "./routes/medicines.js";
import notesRoutes from "./routes/notes.js";

// Load environment variables
dotenv.config();

const app = express();

// ✅ Security middlewares
app.use(helmet()); // Sets secure HTTP headers
app.use(cors()); // Allows cross-origin requests
app.use(express.json()); // Parses JSON request bodies

// ✅ Load models (so Sequelize knows them)
import "./models/DoctorNote.js";
import "./models/PrescribedMedicine.js";
import "./models/associations.js"; // Contains your relationships

// ✅ API routes
app.use("/api/patients", patientRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/notes", notesRoutes);

// ✅ Health check endpoint (optional but useful)
app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// ✅ Start server
const PORT = process.env.PORT || 3001;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to the database:", err);
    process.exit(1); // Exit the process if DB connection fails
  }
})();
