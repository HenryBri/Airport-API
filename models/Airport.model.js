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
        }
    })

    return Airport
}