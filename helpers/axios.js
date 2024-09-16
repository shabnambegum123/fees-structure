const { default: axios, all } = require("axios");
const {
  notificationCreate,
  notificationUpdate,
  notificationGet,
  notificationDelete,
  FetchDataApi,
} = require("../InernalService/internalApi");
const { AxiosCreate } = require("./AxiosFile");

const axiosFunction = async function (data, url, Email) {
  let sendData = await axios.post(url, {
    find: data,
    EmailId: Email,
  });
  if (sendData) console.log("Email sent sucessfully");
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
}

const updateStudentNotification = async function (data) {
  // data = JSON.stringify(data);
  console.log(data);
  const Api = await notificationUpdate();
  Api.data = data;
  const axios = await AxiosCreate(Api);

  if (Api) return "sended";
  else {
    return "something Went wrong";
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
