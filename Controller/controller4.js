const user = require("../Database/modal/user4");

const {
  createstudent4,
  updatestudent4,
  liststudent4,
  getByIdstudent4,
  deletestudent4,
} = require("../service/service4");

const createUser = async (req, res) => {
  const datas = req.body;
  let result = await createstudent4(datas);
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

const updateUser = async () => {
  let datas = {};
  datas.ID = req.query.id;
  datas.Name = req.body.Name;

  const result = await updatestudent4(datas);
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

const listUser = async () => {
  const datas = req.body;
  const result = await liststudent4(datas);
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

const getById = async () => {
  const datas = req.body;
  const result = await getByIdstudent4(datas);
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

const deleteUser = async () => {
  const datas = req.body;
  const result = await deletestudent4(datas);
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

module.exports = { createUser, updateUser, listUser, getById, deleteUser };
