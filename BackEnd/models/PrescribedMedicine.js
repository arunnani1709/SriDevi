import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const PrescribedMedicine = sequelize.define("PrescribedMedicine", {
  code: DataTypes.STRING,
  name: DataTypes.STRING,
  dose1: DataTypes.STRING,
  dose2: DataTypes.STRING,
  dose3: DataTypes.STRING,
  time: DataTypes.STRING,
  days: DataTypes.STRING,
  totalAmount: DataTypes.STRING,
  unit: DataTypes.STRING,
  bottleCount: DataTypes.STRING,
});

export default PrescribedMedicine;
