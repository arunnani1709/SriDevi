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
    code: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
     type: {
      type: DataTypes.STRING,
      allowNull: false, // ✅ new field to match deduction logic
    },
    dose1: {
      type: DataTypes.STRING,
    },
    dose2: {
      type: DataTypes.STRING,
    },
    dose3: {
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.STRING,
    },
    days: {
      type: DataTypes.STRING,
    },
    totalAmount: {
      type: DataTypes.STRING,
    },
    unit: {
      type: DataTypes.STRING,
    },
    bottleCount: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true, // ✅ Ensures the table name stays "PrescribedMedicine"
    timestamps: true,      // ✅ Adds createdAt and updatedAt
  }
);

// ✅ Associations
DoctorNote.hasMany(PrescribedMedicine, {
  foreignKey: "noteId",
  onDelete: "CASCADE",
});

PrescribedMedicine.belongsTo(DoctorNote, {
  foreignKey: "noteId",
});
// migrations/20250628XXXXXX-add-type-to-prescribedmedicines.js

// migrations/20250628_add-type-to-prescribedmedicines.js

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn("PrescribedMedicines", "type", {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "Tablet",
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn("PrescribedMedicines", "type");
}



export default PrescribedMedicine;
