const axios = require("axios");

const AxiosCreate = async (data) => {
  try {
    console.log(data)
    const createD = await axios({
      method: data.method,
      url: data.url,
      data: {
        data : data
      }
    })
   
    if (createD) return createD ;
    else {
      console.log("something Went wrong");
    }
  } catch (error) {
    console.log("dvqwef", error.message);
  }
}







module.exports = { AxiosCreate };
