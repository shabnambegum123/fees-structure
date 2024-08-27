const studentFeestruture = require("../Database/modal/studentFeestruture");

//not createsd studentFeestruture created in students profile service
const createstudentFeeStructure = async (params) => {
  try {
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
  } catch (error) {
    return {
      status: 400,
      message: "error",
      data: {},
    };
  }
};

//To update student feestructure
const updatestudentFeeStructure = async (params) => {
  try {
    if (params.password) {
      params.password = await generatePassword(params.password);
    }

    var result = await studentFeestruture.update(params, {
      where: { studentFeestrutureId: params.studentFeestrutureId },
      returning: true,
    });
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
  } catch (error) {
    return {
      status: 400,
      message: "error",
      data: {},
    };
  }
};
// get by Id
const getByIdstudentFeeStructure = async (params) => {
  try {
    let studentId = params.studentId;
    let result = studentFeestruture.findOne({
      where: { studentId: studentId },
      raw: true,
    });
    if (!result.length > 0) {
      return {
        statusCode: 400,
        status: true,
        message: "not found",
        data: {},
      };
    } else {
      return {
        status: 200,
        message: "sent successfully",
        data: result,
      };
    }
  } catch (error) {
    return {
      status: 400,
      message: "error",
      data: {},
    };
  }
};
// soft Delete
const deletestudentFeeStructure = async (params) => {
  try {
    let studentFeestrutureId = params.studentFeestrutureId;
    let result = studentFeestruture.destroy(
      { studentFeestrutureId: params.studentFeestrutureId },
      { where: { is_deleted: true } }
    );
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
  } catch (error) {
    return {
      status: 400,
      message: "error",
      data: {},
    };
  }
};
// list fees structure and pagetion
const liststudentFeestructure = async (params) => {
  try {
    let page = +params.page;
    let pageSize = +params.pageSize;
    let offSet = (page - 1) * pageSize;

    let result = await studentFeestruture.findAll({
      limit: pageSize,
      offSet: offSet,
    });
    if (result) {
      return {
        statusCode: 200,
        status: true,
        message: "sended",
        data: result,
      };
    } else {
      return {
        statusCode: 404,
        status: false,
        message: "not found",
        data: {},
      };
    }
  } catch (error) {
    return {
      status: 400,
      message: "error",
      data: {},
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
