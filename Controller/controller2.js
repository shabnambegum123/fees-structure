const user = require("../Database/modal/user2");

const {
  createstudent2,
  updatestudent2,
  liststudent2,
  getByIdstudent2,
  deletestudent2,
} = require("../service/service2");

const createUser = async (req, res) => {
  const datas = req.body;
  let result = await createstudent2(datas);
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
  const result = await updatestudent2(datas);
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
  const result = await liststudent2(datas);
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
  const result = await getByIdstudent2(datas);
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
  const result = await deletestudent2(datas);
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
