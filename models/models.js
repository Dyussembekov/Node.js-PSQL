const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    iin: {type: DataTypes.INTEGER, unique: true},
    fullname: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING, unique: true},
    phone: {type: DataTypes.INTEGER, unique: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING}
})

const Company = sequelize.define('company', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    bin: {type: DataTypes.INTEGER, unique: true},
    country: {type: DataTypes.STRING},
    city: {type: DataTypes.STRING},
    address: {type: DataTypes.STRING, unique: true},
    fullname: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING, unique: true},
    phone: {type: DataTypes.INTEGER, unique: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING}
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    from: {type: DataTypes.STRING},
    to: {type: DataTypes.STRING},
    date: {type: DataTypes.DATE},
    weight: {type: DataTypes.STRING},
    product: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING}
})



module.exports = {
    User,
    Company,
    Order
}





