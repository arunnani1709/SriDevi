import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import patientRoutes from "./routes/patients.js";
import Patient from "./models/Patient.js"; // 👈 Import added
import medicineRoutes from "./routes/medicines.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/patients", patientRoutes);
app.use("/api/medicines", medicineRoutes);

const PORT = process.env.PORT || 3001;

// Test DB and start server
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
  });
