

const { param } = require("../Router/router");
const {
  createstaffprofile,
  updatestaffprofile,
  liststaffprofile,
  getByIdstaffprofile,
  deletestaffprofile,
  loginstaffProfile,staffToken,
  paymentmail
} = require("../service/staffProfileservice");

const createstaff = async (req, res) => {
  const datas = req.body;
  let result = await createstaffprofile(datas);
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
      data: {},
    })
  }
}

const updatestaff = async (req,res) => {
  let  params = req.body
  params.staffId = req.query.staffId;
 const result = await updatestaffprofile(params);
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

const liststaff = async (req,res) => {
  let datas = {}
  datas.pageSize = req.query.pageSize
  datas.page = req.query.page
  const result = await liststaffprofile(datas);
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

const getByIdstaff = async (req,res) => {
  const datas = req.body;
  const result = await getByIdstaffprofile(datas);
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
    })
  }
}

const deletestaff = async (req,res) => {
  let data = req.query.staffId
  const result = await deletestaffprofile(data);
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
    })
  }
};
const loginstaff = async (req,res) =>{
  let datas = req.body
  const result = await loginstaffProfile(datas);
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
    })
  }
}
const verifystaffToken = async  (req,res)=>{
  let datas = {}
  datas.token = req.headers.authorization
  datas.studentId = req.body.studentId
  datas.fineAmount = req.body.fineAmount
  datas.studentId = req.query.studentId
const result = await staffToken(datas);

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
}

const mailsend = async (req,res) =>{

  const result = await paymentmail();
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
}


module.exports = {  createstaff,
  updatestaff,
  liststaff,
  getByIdstaff,
  deletestaff ,
  loginstaff,
  verifystaffToken,
  mailsend};
