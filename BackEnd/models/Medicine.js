// models/Medicine.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const Medicine = sequelize.define("Medicine", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  bottles: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [[
        "Tablet",
        "Kashaya",
        "Grutha",
        "Thila",
        "Leha",
        "Linements",
        "Capsule",
        "Powder",
        "NaselDrop",
        "Soap",
        "Paste",
        "Shampu"
      ]],
    },
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['code', 'type'],
    },
  ],
});
