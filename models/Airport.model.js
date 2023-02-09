module.exports = (sequelize, Sequelize) => {
    const Airport = sequelize.define("airport",{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false
        },
        IATA_code: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ICAO_code: {
            type: Sequelize.STRING,
            allowNull: false
        },
        info: {
            type: Sequelize.STRING(4096),
            allowNull: false
        }
    })

    return Airport
}