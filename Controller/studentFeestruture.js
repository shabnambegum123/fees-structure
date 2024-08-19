//const studentFeestruture = require("../Database/modal/studentFeestruture");

const {
  createstudentFeeStructure,updatestudentFeeStructure,getByIdstudentFeeStructure,deletestudentFeeStructure,
  liststudentFeestructure
} = require("../service/studentFeestrutureservice");

const createstudentFee = async (req, res) => {
  const datas = req.body;
  let result = await createstudentFeeStructure(datas);
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

const updatestudentFee = async (req,res) => {
  let datas = {};
  datas.studentId = req.query.studentId;
  datas.Designation = req.body.Designation;

  const result = await updatestudentFeeStructure(datas);
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

const liststudentfee = async (req,res) => {
  const datas = req.query;
  const result = await liststudentFeestructure(datas);
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

const getByIdstudentFee = async (req,res) => {
  const datas = req.body;
  const result = await getByIdstudentFeeStructure(datas);
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

const deletestudentFee = async (req,res) => {
  const datas = req.body;
  const result = await deletestudentFeeStructure(datas);
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

module.exports = { createstudentFee, updatestudentFee,   liststudentfee,  getByIdstudentFee, deletestudentFee };
