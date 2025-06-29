export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("DoctorNotes", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clinicId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    visitDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    complaint: {
      type: Sequelize.STRING,
    },
    diagnosis: {
      type: Sequelize.STRING,
    },
    tests: {
      type: Sequelize.STRING,
    },
    prescription: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("DoctorNotes");
}
