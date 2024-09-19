const path = require("path");
const {
  createfeestructureService,
  updatefeestructureService,
  getByIdfeestructureService,
  listfeestructureService,
  deletefeestructureService,
  sendMailManagement,
  downloadSheetService,
  axiosUrlService
} = require("../service/feeStructureservice");

const createFeestructure = async (req, res) => {
  const datas = req.body
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
  // if (result.status) {
  //   res.status(result.statusCode).json({
  //     status: result.statusCode,
  //     message: result.message,
  //     data: result.data,
  //   });
  // } else {
  //   res.status(result.statusCode).json({
  //     status: result.statusCode,
  //     message: result.message,
  //     data: result.data,
  //   });
  // }
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
    const token = req.headers.authorization
  const result = await sendMailManagement(datas,token);
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

const downloadSheet = async (req, res) => {
  try {
    const result = await downloadSheetService()

    if (result.status) {
     res.setHeader("Content-Disposition", "attachment; filename=data.xlsx");
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.send(result.data);
    } else {
     
      res.status(result.statusCode).json({
        status: result.status,
        message: result.message,
        data: result.data,
      });
    }
  } catch (error) {
  
   console.log(error)
  }
};

const axiosUrl = async (req, res) => {
  
  let data = req.body.data.data
  
  const result = await axiosUrlService(data);
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
  createFeestructure,
  updateFeestructure,
  deleteFeestructure,
  getByIdFeestructure,
  listFeestructure,
  managementMail,
  downloadSheet,
  axiosUrl
};
