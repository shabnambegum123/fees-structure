const axios = require("axios");

const AxiosCreate = async (data) => {
  try {
    let token = data.headers.authorization;
    console.log(data, 122344);
    const createD = await axios({
      method: data.method,
      url: data.url,

      data: {
        data: data,
      },
      headers: {
        Authorization: ` ${token}`,
      },
    });

    if (createD) return createD;
    else {
      return createD;
      console.log("something Went wrong");
    }
  } catch (error) {
    return error;
    console.log("dvqwef", error.message);
  }
};

module.exports = { AxiosCreate };
