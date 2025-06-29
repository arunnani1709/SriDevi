export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Medicines", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    bottles: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
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

  // Add a unique index on (code, type)
  await queryInterface.addIndex("Medicines", ["code", "type"], {
    unique: true,
    name: "medicines_code_type_unique",
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("Medicines");
}
