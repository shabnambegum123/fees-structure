const { DataTypes } = require('sequelize')
const sequelize = require('../database')


const user = sequelize.define(
    "studentFeestruture",{
        studentFeestrutureId :{
        autoIncrement : true,
        type :DataTypes.INTEGER,
        primaryKey : true,
        allowNull : true
       },
       studentId   :{
        type:DataTypes.BIGINT,
        allowNull :false
    },
    Designation :{
        type:DataTypes.STRING,
        allowNull :false
    },
    pursuingYear :{
        type:DataTypes.BIGINT,
        allowNull :false
    },
    feestrutureId : {
        type:DataTypes.BIGINT,
        allowNull :false
    },
    currentYear :{
        type:DataTypes.BIGINT,
        allowNull :false
    },
    paidStatus :{
        type:DataTypes.B,
        allowNull :false
    },
    TotalAmount :{
        type:DataTypes.BIGINT,
        allowNull :false
    },
    fineAmount :{
        type:DataTypes.JSON,
        allowNull :false
    }
    },{
        
        timestamps : true
    }
)

module.exports = user