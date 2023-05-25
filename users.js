const { Sequelize, DataTypes } = require('sequelize');
const {sq} = require('./db');
const UserSchema = sq.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        uinique: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

UserSchema.sync().then((result) => {
    console.log('Users table created successfully')
}).catch(err => console.error(err))

module.exports = UserSchema;