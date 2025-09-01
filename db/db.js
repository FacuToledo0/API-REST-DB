const { Sequelize } = require('sequelize')


const sequelize = new Sequelize('crud_db', 'facu', '123456', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize