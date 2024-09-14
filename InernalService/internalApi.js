


const  notificationCreate = async () =>{
  method= 'POST',
  url= process.env.notificationService + "/create/notification",
  headers= {
    contentType: 'application/json',
    authorization: ' Bearer token'
  },
  data =  {}
  return {method,url,headers}
}


const  notificationUpdate = async () =>{
  method= 'PUT',
  url= process.env.notificationService + "/update/notification",
  headers= {
    contentType: 'application/json',
    authorization: ' Bearer token'
  },
  data =  {}
  return {method,url,headers}
}



const  notificationGet = async () =>{
  method= 'GET',
  url= process.env.notificationService + "/get/notification",
  headers= {
    contentType: 'application/json',
    authorization: ' Bearer token'
  },
  data =  {}
  return {method,url,headers}
}

const  notificationDelete = async () =>{
  method= 'DELETE',
  url= process.env.notificationService + "/delete/notification",
  headers= {
    contentType: 'application/json',
    authorization: ' Bearer token'
  },
  data =  {}
  return {method,url,headers}
}

const  FetchDataApi = async () =>{
  method= 'GET',
  url= process.env.notificationService + "/fetch/data",
  headers= {
    contentType: 'application/json',
    authorization: ' Bearer token'
  },
  data =  {}
  return {method,url,headers}
}

module.exports = {notificationCreate,notificationUpdate,notificationGet,notificationDelete,FetchDataApi}