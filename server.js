const express = require("express");
let app = express();
const cron = require("node-cron");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./Util/swagger");

const bodyparser = require("body-parser");

app.use(bodyparser.json());

const dotenv = require("dotenv");

dotenv.config();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

let data = process.argv.slice(2)[0];

console.log("qwjefq j2e", data);

let db = require("./Database/config").function(data);

process.env.database = db.database;
process.env.dialect = db.dialect;
process.env.host = db.host;
process.env.password = db.password;
process.env.user = db.user;

const router = require("./Router/router");

const { sendMailManagement } = require("./service/feeStructureservice");

app.use(router);

require("./Database/modal/index");

let PORT = process.env.PORT;

cron.schedule("59 17 * * *", () => {
  console.log("Email Sent");
  sendMailManagement()
    .then(() => console.log("Email sent successfully"))
    .catch((error) => console.error("Error sending email:", error));
});

app.listen(PORT, () => {
  console.log(`server is looking for ${PORT}`);
});
