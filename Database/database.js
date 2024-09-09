const {Sequelize} = require('sequelize')


const sequelize = new Sequelize("Feestructure","postgres","1511",{
    host :"localhost",
    dialect:"postgres"
})

sequelize.authenticate().then(()=>{console.log('Database connected')}).catch((error)=>{console.log(error)})
module.exports = sequelize


