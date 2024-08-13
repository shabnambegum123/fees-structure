const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
    process.env.database,
    process.env.user,
    process.env.password,
    {
        host:process.env.host,
        dialect:process.env.dialect
    }
)

sequelize.authenticate().then(()=>{console.log('Database connected')}).catch((error)=>{console.log(error)})

module.exports = sequelize