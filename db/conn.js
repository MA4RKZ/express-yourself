const chalk = require("chalk");
const express = require("express");

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("thoughtsdb", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log(chalk.blueBright("foi possivel se conectar ao banco de dados"));
} catch (err) {
  console.log(err);
}

module.exports = sequelize;
