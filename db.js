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
db.sequelize = Sequelize
db.sequelize = sequelize
db.airports = require("./models/Airport.model")(sequelize,Sequelize)

async function sync() {
    await sequelize.sync({alter:true}) // alter existing table 
                                        //{force:true} erease and recreate
}

module.exports = {db, sync}