const Sequelize = require("sequelize")


const sql = new Sequelize("mysql://monty:some_pass@localhost:3306/encuentro50")


module.exports = sql