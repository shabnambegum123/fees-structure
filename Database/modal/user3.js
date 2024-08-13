const { DataTypes } = require('sequelize')
const sequelize = require('../database')


const user = sequelize.define(
    "feestructure",{
        feestrutureId:{
        autoIncrement : true,
        type :DataTypes.INTEGER,
        primaryKey : true,
        allowNull : true
       },
       Name :{
        type:DataTypes.STRING,
        allowNull :true
    },
     Designation :{
        type:DataTypes.STRING,
        allowNull :false
    },
    year :{
        type:DataTypes.BIGINT,
        allowNull :false
    },
    TuitionFee :{
        type:DataTypes.BIGINT,
        allowNull :false
    },
    BusFee :{
        type:DataTypes.BIGINT,
        allowNull :false
    },
    BookFee :{
        type:DataTypes.BIGINT,
        allowNull :false
    },
    FirstGraduate_discount :{
        type:DataTypes.BIGINT,
        allowNull :false
    },
    Reserved_students_Discount :{
        type:DataTypes.BIGINT,
        allowNull :false
    },
    TotalAmount : {
        
    }
    },{
        
        timestamps : true
    }
)

module.exports = user