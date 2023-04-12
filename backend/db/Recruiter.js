const Sequelize = require("sequelize");
const {DataTypes} = require("sequelize");

const sequelize = require("./Connection");
const Job = require("./Job");
const Recruiter = sequelize.define(
  "recruiter",
  {
    rid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        validator: function (v) {
          if (v !== "") {
            const regex = /\+\d{1,3}\d{10}/.test(v);
            if (!regex) {
              throw new Error("Phone number is invalid");
            } else return true;
          }
        },
      },
    },

    bio: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);


// Recruiter.sync().then(() => console.log("Table Recruiter Created"));

module.exports = Recruiter;