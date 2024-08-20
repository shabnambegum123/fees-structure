const nodemailer = require("nodemailer");

const sendMail = async (mail, result) => {
  var transtorter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shabnambegum1511@gmail.com",
      pass: "mzos kxfh gxkd nqln",
    },
  });

  result = JSON.stringify(result);

  var mailOptions = {
    from: "shabnambegum1511@gmail.com",
    to: mail,
    subject: "sending mail using node js",
    text: result,
  };

  let passMail = await transtorter.sendMail(mailOptions,);;
  if (passMail) return true;
  else return false;
};

module.exports = { sendMail };
