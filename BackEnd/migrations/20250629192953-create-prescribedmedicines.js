export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("PrescribedMedicines", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    noteId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    clinicId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    visitDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    code: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    dose1: {
      type: Sequelize.STRING,
    },
    dose2: {
      type: Sequelize.STRING,
    },
    dose3: {
      type: Sequelize.STRING,
    },
    time: {
      type: Sequelize.STRING,
    },
    days: {
      type: Sequelize.STRING,
    },
    totalAmount: {
      type: Sequelize.STRING,
    },
    unit: {
      type: Sequelize.STRING,
    },
    bottleCount: {
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
  await queryInterface.dropTable("PrescribedMedicines");
}
