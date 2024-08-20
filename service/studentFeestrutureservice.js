const studentFeestruture = require("../Database/modal/studentFeestruture");

//not createsd studentFeestruture created in students profile service
const createstudentFeeStructure = async (params) => {
  let info = {
    studentId: params.studentId,
    Designation: params.Designation,
    pursuingYear: params.pursuingYear,
    feestrutureId: params.feestrutureId,
    currentYear: params.currentYear,
    paidStatus: params.paidStatus,
    TotalAmount: params.TotalAmount,
    fineAmount: params.fineAmount,
  };
  let result = studentFeestruture.create(info);
  if (result) {
    return {
      statusCode: 200,
      status: true,
      message: "created",
      data: result,
    };
  } else {
    return {
      status: 400,
      message: "not created",
      data: {},
    };
  }
};

//To update student feestructure
const updatestudentFeeStructure = async (params) => {
  let studentId = params.studentId;
  let result = studentFeestruture.update(
    { Designation: params.Designation },
    { where: { studentId: studentId } }
  );
  if (result) {
    return {
      statusCode: 200,
      status: true,
      message: "updated",
      data: result,
    };
  } else {
    return {
      status: 400,
      message: "not found",
      data: {},
    };
  }
};
const getByIdstudentFeeStructure = async (params) => {
  let studentId = params.studentId;
  let result = studentFeestruture.findOne({ where: { studentId: studentId } });
  if (result) {
    return {
      statusCode: 200,
      status: true,
      message: "success",
      data: result,
    };
  } else {
    return {
      status: 400,
      message: "not found",
      data: {},
    };
  }
};
const deletestudentFeeStructure = async (params) => {
  let studentId = params.studentId;
  let result = studentFeestruture.destroy({ where: { studentId: studentId } });
  if (result) {
    return {
      statusCode: 200,
      status: true,
      message: "success",
      data: result,
    };
  } else {
    return {
      status: 400,
      message: "not found",
      data: {},
    };
  }
};
// list fees structure
const liststudentFeestructure = async (params) => {
  let studentId = params.studentId;

  let result = await studentFeestruture.findAll({
    where: { studentId: studentId },
    raw: true,
  });
  if (!result.length > 0) {
    return {
      statusCode: 404,
      status: false,
      message: "not found",
      data: {},
    };
  } else {
    return {
      statusCode: 200,
      status: true,
      message: "sended",
      data: result,
    };
  }
};
module.exports = {
  liststudentFeestructure,
  createstudentFeeStructure,
  updatestudentFeeStructure,
  getByIdstudentFeeStructure,
  deletestudentFeeStructure,
};
