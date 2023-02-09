module.exports = (sequelize, Sequelize) => {
    const Flight = sequelize.define("flight",{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        flight_nr: {
            type: Sequelize.STRING,
            allowNull: false
        },
        departure_airport: {
            type: Sequelize.STRING,
            allowNull: false
        },
        arrival_airport: {
            type: Sequelize.STRING,
            allowNull: false
        },
        info: {
            type: Sequelize.STRING(4096),
            allowNull: false
        }
    })

    return Flight
}