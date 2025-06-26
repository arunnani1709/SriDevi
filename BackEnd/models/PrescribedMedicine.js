import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import DoctorNote from "./DoctorNote.js";

const PrescribedMedicine = sequelize.define("PrescribedMedicine", {
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
  code: DataTypes.STRING,
  name: DataTypes.STRING,
  dose1: DataTypes.STRING,
  dose2: DataTypes.STRING,
  dose3: DataTypes.STRING,
  time: DataTypes.STRING,
  days: DataTypes.INTEGER,
  totalAmount: DataTypes.STRING,
  unit: DataTypes.STRING,
  bottleCount: DataTypes.STRING,
});

DoctorNote.hasMany(PrescribedMedicine, { foreignKey: "noteId", onDelete: "CASCADE" });
PrescribedMedicine.belongsTo(DoctorNote, { foreignKey: "noteId" });

export default PrescribedMedicine;