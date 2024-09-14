const path = require("path");
const {
  createfeestructureService,
  updatefeestructureService,
  getByIdfeestructureService,
  listfeestructureService,
  deletefeestructureService,
  sendMailManagement,
  downloadSheetService
} = require("../service/feeStructureservice");

const createFeestructure = async (req, res) => {
  const datas = req.body;
  let result = await createfeestructureService(datas);
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

const updateFeestructure = async (req, res) => {
  let params = req.body;
  
  params.feestrutureId = req.query.feestrutureId;
const result = await updatefeestructureService(params);
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

const listFeestructure = async (req, res) => {
  let params = req.query;

  
  const result = await listfeestructureService(params);
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

const getByIdFeestructure = async (req, res) => {
  let params = req.body;
    params.feestrutureId = req.query.feestrutureId;
  const result = await getByIdfeestructureService(params);
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

const deleteFeestructure = async (req, res) => {
  let data = req.query;
  const result = await deletefeestructureService(data);
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

const managementMail = async (req, res) => {

  const datas = req.body;

  const result = await sendMailManagement(datas);
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


const downloadSheet = async (req,res) =>{
  const datas = req.body;
  
  const result = await downloadSheetService(datas);

  let paths = path.join("C:/Users/Shabnam/Intern codes/files/fees-structure/data.xlsx")

  console.log("path" , paths)

  res.setHeader(
    "Content-Type",
    "application/data.xlsx"
  );

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

module.exports = {
  createFeestructure,
  updateFeestructure,
  deleteFeestructure,
  getByIdFeestructure,
  listFeestructure,
  managementMail,
  downloadSheet
};

// console.log("hii")