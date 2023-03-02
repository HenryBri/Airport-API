module.exports = (sequelize, Sequelize) => {
    const Flight = sequelize.define("flight",{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        flight_nr: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        departure_airport: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        arrival_airport: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        info: {
            type: Sequelize.STRING(4096),
            allowNull: false
        }
    })

    return Flight
}