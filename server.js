const express = require("express");
let app = express();
const swaggerJSDOC = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
 const bodyparser = require("body-parser");

app.use(bodyparser.json());

const dotenv = require("dotenv");

dotenv.config();

const router = require("./Router/router")

app.use(router);

require("./Database/modal/index");



const options = {
  definition:{
     openapi:'3.0.0',
     info:{
      title:'Node JS API project for feeStructure',
      version:'1.0.0'
     },
     servers:[
      {
       url: 'htttp://localhost:3457/'
      }
     ]
  },
  apis:['../service/studentProfileservice.js']
}
const swageerSpec = swaggerJSDOC(options)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swageerSpec))

/**
 * @swagger
 * /join/get:
 *  get:
 *      summary : This api is used to get 
 *      description : This api is used to get
 *      responses:
 *          200:
 *              description : To test get method
 */

let PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is looking for ${PORT}`)
})

