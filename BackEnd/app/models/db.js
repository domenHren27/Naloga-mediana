const Sequelize = require("sequelize");

//Povezava na DB
const sequelize = new Sequelize('seznamstevil' || process.env.DB_NAME, process.env.DB_USER ||'root', process.env.DB_PASS ||'', {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql'
});


const checkConnection = async () => {
    await sequelize.authenticate();
}

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.Mediana = require("./Mediana.model.js")(sequelize, Sequelize)


db.checkConnection = checkConnection


module.exports = db;
