const {
  createfeestructureService,
  updatefeestructureService,
  getByIdfeestructureService,
  listfeestructureService,
  deletefeestructureService,
} = require("../service/feestructureservice");

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

const updateFeestructure = async (req,res) => {
  let datas = {};
  datas.ID = req.query.id
  datas.Name = req.body.Name

  const result = await updatefeestructureService(datas);
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

const listFeestructure = async (req,res) => {
 
  const result = await listfeestructureService();
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

const getByIdFeestructure = async (req,res) => {
  const datas = req.body;
  const result = await getByIdfeestructureService(datas);
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

const deleteFeestructure = async (req,res) => {
  const datas = req.body;
  const result = await deletefeestructureService(datas);
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
};
