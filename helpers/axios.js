const { default: axios, all } = require("axios");
const {
  notificationCreate,
  notificationUpdate,
  notificationGet,
  notificationDelete,
  FetchDataApi,
  managementApi
} = require("../InernalService/internalApi");
const { AxiosCreate } = require("./AxiosFile");

const axiosFunction = async function (data,token) {

  // let sendData = await axios.post(url, {
  //   find: data,
  //   EmailId: Email,
  // });
  // if (sendData) return sendData;
  // else {
  //   return "something Went wrong";
  // }

  const Api = await managementApi(token);
  Api.data = data;
  const axios = await AxiosCreate(Api);
  if (Api) return "sended";
  else {
    return "something Went wrong";
  }
};

const createStudentNotification = async function (data) {
  data = JSON.stringify(data);
  const Api = await notificationCreate();
  Api.data = data;
  const axios = await AxiosCreate(Api);
  if (Api) return "sended";
  else {
    return "something Went wrong";
  }
};

const updateStudentNotification = async function (data) {
  // data = JSON.stringify(data);
  
  const Api = await notificationUpdate(data.token);
  Api.data = data;

  const updatwNotification = await AxiosCreate(Api);

  console.log("qwjebgjq", updatwNotification);

  if (updatwNotification) return updatwNotification;
  else {
    return updatwNotification;
  }
};

const getStudentNotification = async function (data) {
  const Api = await notificationGet();
  // Api.data = data;
  const axios = await AxiosCreate(Api);
  console.log(axios);
  if (Api) return axios;
  else {
    return "something Went wrong";
  }
};

const DeleteStudentNotification = async function (data) {
  const Api = await notificationDelete();

  Api.data = data;
  const axios = await AxiosCreate(Api);
  if (Api) return "DEleted";
  else {
    return "something Went wrong";
  }
};

const FetchData = async function (data) {
  const Api = await FetchDataApi();
  Api.data = data;
  const axios = await AxiosCreate(Api);
  console.log("axios", axios);
  if (Api) return axios;
  else {
    return "something Went wrong";
  }
};
module.exports = {
  axiosFunction,
  createStudentNotification,
  updateStudentNotification,
  getStudentNotification,
  DeleteStudentNotification,
  FetchData,
};
