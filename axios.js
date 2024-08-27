const { default: axios, all } = require("axios");

const axiosFunction = async function (data, url, Email) {
  let sendData = await axios.post(url, {
    find: data,
    EmailId: Email,
  });
  if (sendData) return "Email sent sucessfully";
  else {
    return "something Went wrong";
  }
};

module.exports = { axiosFunction };
