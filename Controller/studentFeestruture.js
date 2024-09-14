//const studentFeestruture = require("../Database/modal/studentFeestruture");

const {
  createstudentFeeStructure,updatestudentFeeStructure,getByIdstudentFeeStructure,deletestudentFeeStructure,
  liststudentFeestructure,fetchDataService
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
  let  params = req.body
  params.studentFeestrutureId = req.query.studentFeestrutureId;
   console.log("hrttyyy")
  const result = await updatestudentFeeStructure(params);
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
  let params = req.query;

  const result = await liststudentFeestructure(params);
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
  let params = req.body;
  params.studentFeestrutureId = req.query.studentFeestrutureId;
  const result = await getByIdstudentFeeStructure(params);
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
 let data = req.query
  const result = await deletestudentFeeStructure(data);
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


const fetchData = async (req,res) => {
  let data = req.query
   const result = await fetchDataService(data);
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

module.exports = { createstudentFee, updatestudentFee,   liststudentfee,  getByIdstudentFee, deletestudentFee,fetchData };
