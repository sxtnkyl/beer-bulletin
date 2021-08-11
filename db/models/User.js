const { Model, DataTypes } = require("sequelize");
var bcrypt = require("bcryptjs");
const sequelize = require("../config/connection");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pref_dark: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    profile_pic: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeCreate: (newUserData) => {
        newUserData.password = bcrypt.hashSync(newUserData.password, 8);
        return newUserData;
      },
      beforeUpdate: (updatedUserData) => {
        updatedUserData.password = bcrypt.hashSync(updatedUserData.password, 8);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
