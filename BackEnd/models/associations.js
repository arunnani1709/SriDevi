import DoctorNote from "./DoctorNote.js";
import PrescribedMedicine from "./PrescribedMedicine.js";

// Setup relationships
DoctorNote.hasMany(PrescribedMedicine, {
  foreignKey: "noteId",
  as: "medicines",
});
PrescribedMedicine.belongsTo(DoctorNote, {
  foreignKey: "noteId",
});

export { DoctorNote, PrescribedMedicine };
