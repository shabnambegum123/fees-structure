//const studentProfile = require("../Database/modal/studentprofile");
const {
  createstudent,
  updatestudent,
  liststudent,
  getByIdstudent,
  deletestudent,
  tokenGenerate,
  verifyToken,
  restPasswordService,
  forgetPasswordService,
  changePasswordService,
  bulkCreateService,
  PDFformatService,
  getUsingJoinService,
 
} = require("../service/studentProfileservice");

const createUser = async (req, res) => {
  let params = req.body;
  params.DOB = req.query;
  let result = await createstudent(params);
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
  params.ID = req.query.ID;
  params.token = req.headers.authorization;
  const result = await updatestudent(params);
  console.log("asdvqdwv", result);
  if (result.status) {
    res.status(result.statusCode).json({
      status: result.statusCode,
      message: result.message,
      data: result.data.data,
    });
  } else {
    res.status(result.statusCode).json({
      status: result.statusCode,
      message: result.message,
      data: {},
    });
  }
};

const listUser = async (req, res) => {
  console.log("hello")
  let datas = req.query
  const result = await liststudent(datas)
  if (result.status) {
    res.status(result.statusCode).json({
      status: result.statusCode,
      message: result.message,
      data: result.data,
    })
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
  console.log(params.profileId);
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
   params.ID = req.query.ID
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
  params.studentFeestrutureId = req.user.studentFeestrutureId;
  params.EmailId = req.user.EmailId;
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

const restPassword = async (req, res) => {
  let params = req.body;
  params.profileId = req.user.profileId;
  let result = await restPasswordService(params);

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

const forgetPassword = async (req, res) => {
  try {
    let params = req.body;

    let result = await forgetPasswordService(params);
    console.log("result", result);
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
  } catch (error) {
    return {
      statusCode: 400,
      status: false,
      message: "error",
      data: {},
    };
  }
};
const changePassword = async (req, res) => {
  try {
    let params = {};
    params.password = req.body;
    params.token = req.headers.authorization;
    let result = await changePasswordService(params);

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
  } catch (error) {
    return {
      statusCode: 400,
      status: false,
      message: "error",
      data: {},
    };
  }
};

const bulkCreate = async (req,res) =>{
  try {
    console.log("hello",234567890)
    let params = req.file
    console.log("params" , params)
    let result = await bulkCreateService(params);

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
  } catch (error) {
    return {
      statusCode: 400,
      status: false,
      message: error.message,
      data: {},
    };
  }
}

const PDFformat = async (req,res) =>{
  try {
    console.log("adsvqadw")
  let params = req.user
    let result = await PDFformatService(params);

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
  } catch (error) {
    return {
      statusCode: 400,
      status: false,
      message: error.message,
      data: error,
    };
  }
}
 
const getUsingJoin = async (req,res) =>{
  try {
    let params = req.query
      let result = await getUsingJoinService(params);
  
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
    } catch (error) {
      return {
        statusCode: 400,
        status: false,
        message: error.message,
        data: {},
      };
    }
}



module.exports = {
  createUser,
  updateUser,
  listUser,
  getById,
  deleteUser,
  loginUser,
  verifyUser,
  forgetPassword,
  restPassword,
  changePassword,
  bulkCreate,
  PDFformat,
  getUsingJoin,
 
};
