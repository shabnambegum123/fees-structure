const express = require("express");
let app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./Util/swagger");
const downloadSheetService = require('./service/feeStructureservice')
const bodyparser = require("body-parser");

app.use(bodyparser.json());

const dotenv = require("dotenv");

dotenv.config();


const router = require("./Router/router");

app.use(router);
app.get('/download-sheet', downloadSheetService)

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));



// let data = process.argv.slice(2)[0];

// console.log("qwjefq j2e" , data)

// let db = require("./Database/config"). function (data);

// process.env.database = db.database
// process.env.dialect = db.dialect
// process.env.host = db.host
// process.env.password = db.password
// process.env.user = db.user



require("./Database/modal/index");




let PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is looking for ${PORT}`);
});
