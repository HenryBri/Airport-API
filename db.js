const Sequelize = require("sequelize")
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect : "mariadb",
        define: {
            timestamps: false
        }
    }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.airports = require("./models/Airport.model")(sequelize, Sequelize)
db.flights = require("./models/Flight.model")(sequelize, Sequelize)
db.airportflights = require("./models/airportFlight.model")(sequelize, Sequelize, db.airports, db.flights)

async function sync() {
    await sequelize.sync({alter:true}) 
}

module.exports = {db, sync}