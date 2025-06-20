// models/Patient.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Patient = sequelize.define("Patient", {
  clinicId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: DataTypes.STRING,
  phone: DataTypes.STRING,
  age: DataTypes.INTEGER,
  sex: DataTypes.STRING,
  address: DataTypes.TEXT,
  visitDate: DataTypes.DATEONLY,
});

export default Patient;
