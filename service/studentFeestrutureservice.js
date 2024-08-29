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
    let whereQuery = {};

    if (params.profileId) {
      whereQuery.profileId = params.profileId;
    }
    

    let result = await studentProfile.findAll({
       where: whereQuery,
      limit: +params.limit,
      offset: (params?.page - 1) * params?.limit,
    });

    if (result.length > 0) {
      return {
        statusCode: 200,
        status: true,
        message: "sended",
        data: await pagaMetaService(
          +params.page,
          +params.limit,
          result,
          result.length
        ),
      };
    } else {
      return {
        statusCode: 400,
        status: false,
        message: "data not found",
        data: {},
      };
    }
  } catch (error) {
    console.log("qewgqewf", error);
    return {
      statusCode: 400,
      status: false,
      message: "error",
      data: error,
    };
  }
}

// get student by Id // cmmand
// const getByIdstudent = async (params) => {
//   console.log(params);
//   try {
//     let profileId = params.profileId;
//     let result = await studentProfile.findOne({
//       where: { profileId: profileId },
//     });
//     if (result) {
//       return {
//         statusCode: 200,
//         status: true,
//         message: "sended",
//         data: result,
//       };
//     } else {
//       return {
//         statusCode: 404,
//         status: false,
//         message: "data not found",
//         data: {},
//       };
//     }
//   } catch (error) {
//     return {
//       status: 400,
//       message: "error",
//       data: {},
//     };
//   }
// };
module.exports = {
  liststudentFeestructure,
  createstudentFeeStructure,
  updatestudentFeeStructure,
  getByIdstudentFeeStructure,
  deletestudentFeeStructure,
};
