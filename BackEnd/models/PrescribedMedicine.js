import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import DoctorNote from "./DoctorNote.js";

const PrescribedMedicine = sequelize.define(
  "PrescribedMedicine",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    noteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: DoctorNote,
        key: "id",
      },
    },
    clinicId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visitDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dose1: DataTypes.STRING,
    dose2: DataTypes.STRING,
    dose3: DataTypes.STRING,
    time: DataTypes.STRING,
    days: DataTypes.STRING,
    totalAmount: DataTypes.STRING,
    unit: DataTypes.STRING,
    bottleCount: DataTypes.STRING,
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

// Associations
DoctorNote.hasMany(PrescribedMedicine, {
  foreignKey: "noteId",
  onDelete: "CASCADE",
});

PrescribedMedicine.belongsTo(DoctorNote, {
  foreignKey: "noteId",
});

// ✅ THIS MUST BE PRESENT:
export default PrescribedMedicine;
