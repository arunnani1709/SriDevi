// models/Medicine.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Medicine = sequelize.define("Medicine", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false, // Required field now
    validate: {
      isIn: [["Tablet", "Kashya"]], // Optional: restrict values to known types
    },
  },
});

export default Medicine;
