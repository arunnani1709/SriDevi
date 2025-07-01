import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const DoctorNote = sequelize.define("DoctorNote", {
   id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }, 
  
  clinicId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  visitDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  complaint: DataTypes.STRING,
  diagnosis: DataTypes.STRING,
  tests: DataTypes.STRING,
  prescription: DataTypes.STRING,
});

export default DoctorNote;
