//const studentProfile = require("../Database/modal/studentprofile");
const {
  createstudent,
  updatestudent,
  liststudent,
  getByIdstudent,
  deletestudent,
  tokenGenerate,
  verifyToken,
  joinstudentIdService,
} = require("../service/studentProfileservice");

const createUser = async (req, res) => {
  let result = await createstudent(req.body);
  if (result.status) {
    res.status(result.statusCode).json({
      status: result.statusCode,
      message: result.message,
      data: {},
    });
  } else {
    res.status(result.statusCode).json({
      status: result.statusCode,
      message: result.message,
      data: result.data,
    });
  }
};

const updateUser = async (req, res) => {
  let params = req.body;
  params.profileId = req.user.profileId;

  const result = await updatestudent(params);
  if (result.status) {
    res.status(result.statusCode).json({
      status: result.statusCode,
      message: result.message,
      data: result.data,
    });
  } else {
    res.status(result.statusCode).json({
      status: result.statusCode,
      message: result.message,
      data: result.data,
    });
  }
};

const listUser = async (req, res) => {
  let datas = req.query;
  const result = await liststudent(datas);
  if (result.status) {
    res.status(result.statusCode).json({
      status: result.statusCode,
      message: result.message,
      data: result.data,
    });
  } else {
    res.status(result.statusCode).json({
      status: result.statusCode,
      message: result.message,
      data: result.data,
    });
  }
};

const getById = async (req, res) => {
  let params = req.body;
  params.profileId = req.user.profileId;
  console.log(params.profileId)
  const result = await getByIdstudent(params);
  if (result.status) {
    res.status(result.statusCode).json({
      status: result.statusCode,
      message: result.message,
      data: result.data,
    });
  } else {
    res.status(result.statusCode).json({
      status: result.statusCode,
      message: result.message,
      data: result.data,
    });
  }
};

const deleteUser = async (req, res) => {
  let params = req.body;
  params.profileId = req.user.profileId;
  
  const result = await deletestudent(params);
  if (result.status) {
    res.status(result.statusCode).json({
      status: result.statusCode,
      message: result.message,
      data: result.data,
    });
  } else {
    res.status(result.statusCode).json({
      status: result.statusCode,
      message: result.message,
      data: result.data,
    });
  }
};

const loginUser = async (req, res) => {
  let params = req.body;
  params.password = req.body.password;
  params.EmailId = req.body.EmailId;

  let result = await tokenGenerate(params);
  if (result.status) {
    res.status(result.statusCode).json({
      status: result.statusCode,
      message: result.message,
      data: result.data,
    });
  } else {
    res.status(result.statusCode).json({
      status: result.statusCode,
      message: result.message,
      data: result.data,
    });
  }
};
const verifyUser = async (req, res) => {
 // let params = req.headers;
  let params = req.body;
 params.studentFeestrutureId  = req.user.studentFeestrutureId ;
 params.EmailId = req.user.EmailId
   let result = await verifyToken(params);
 if (result.status) {
    res.status(result.statusCode).json({
      status: result.statusCode,
      message: result.message,
      data: result.data,
    });
  } else {
    res.status(result.statusCode).json({
      status: result.statusCode,
      message: result.message,
      data: result.data,
    });
  }
};

const joinstudentId = async (req, res) => {
  let params = req.query;

  let result = await joinstudentIdService(params);

  if (result.status) {
    res.status(result.statusCode).json({
      status: result.statusCode,
      message: result.message,
      data: result.data,
    });
  } else {
    res.status(result.statusCode).json({
      status: result.statusCode,
      message: result.message,
      data: result.data,
    });
  }
};
module.exports = {
  createUser,
  updateUser,
  listUser,
  getById,
  deleteUser,
  loginUser,
  verifyUser,
  joinstudentId,
};
