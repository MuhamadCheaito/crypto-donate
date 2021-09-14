const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database');

class User extends Model {}

User.init({
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
},{
        sequelize,
        modelName: 'user',
        timestamps: false,
});

module.exports = User;