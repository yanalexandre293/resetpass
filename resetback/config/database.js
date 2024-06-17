//config/database.js

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("resetpass", 'root', 'admin', {
    host: "localhost",
    dialect: "mysql",
});

module.exports = sequelize;