import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const DoctorNote = sequelize.define("DoctorNote", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clinicId: {
    type: DataTypes.STRING, // ⬅️ fix to STRING to match Patient.clinicId
    allowNull: false,
  },
  visitDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  complaint: DataTypes.TEXT,
  diagnosis: DataTypes.TEXT,
  tests: DataTypes.TEXT,
  prescription: DataTypes.TEXT,
});

export default DoctorNote;