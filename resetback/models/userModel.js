//models/userModel.js

const { DataTypes } = require('sequelize');
const database = require("../config/database");
const crypto  = require("crypto");



const User = database.define("User", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    login:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
});

User.sync();

module.exports = User;