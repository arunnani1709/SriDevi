// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import patientRoutes from "./routes/patients.js";
import medicineRoutes from "./routes/medicines.js";
import { Medicine } from "./models/Medicine.js"; // Make sure this exists


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/patients", patientRoutes);
app.use("/api/medicines", medicineRoutes);

// Start server after DB connection
const PORT = process.env.PORT || 3001;

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
  });
 
  export default Medicine;