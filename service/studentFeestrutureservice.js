const studentFeestruture = require("../Database/modal/studentFeestruture");
const { pagaMetaService } = require("../helpers/pagination");
const {FetchData} = require("../helpers/axios")
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
    console.log("hii");
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
        statusCode: 400,
        status: false,
        message: "not found",
        data: {},
      };
    }
  } catch (error) {
    return {
      statusCode: 400,
      status: false,
      message: error.message,
      data: {},
    };
  }
};
// get by Id
const getByIdstudentFeeStructure = async (params) => {
 
  try {
    
    let studentFeestrutureId = Number(params);
       console.log( studentFeestrutureId,90)
    let result = await studentFeestruture.findOne({
      attributes: [
        "studentFeestrutureId",
        "studentId",
        "year",
        "Designation",
        "feestructureId",
        "paidStatus",
        "fineAmount",
        "TotalAmount",
      ],
      where: {
        studentFeestrutureId: studentFeestrutureId,
      },
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
        message: "data not found",
        data: {},
      };
    }
  } catch (error) {
    return {
      statusCode: 400,
      status: false,
      message: error.message,
      data: {},
    };
  }
};
// soft Delete
const deletestudentFeeStructure = async (params) => {
  try {
    let studentFeestrutureId = params.studentFeestrutureId;
    let result = await studentFeestruture.update(
      { is_deleted: "true" },
      { where: { studentFeestrutureId: studentFeestrutureId } }
    );
    if (result) {
      return {
        statusCode: 200,
        status: true,
        message: "deleted",
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
    var whereQuery = {};
    let studentFeestrutureId = params.studentFeestrutureId;

    if (params.studentFeestrutureId) {
      whereQuery.studentFeestrutureId = studentFeestrutureId;
    }
    let result = await studentFeestruture.findAll({
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
};

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
// }

const fetchDataService = async (params) => {
  try {
     const axios = await FetchData(params);
     if (axios) {
            return {
              statusCode: 200,
              status: true,
              message: "sended",
              data:axios.data,
            };
          } else {
            return {
              statusCode: 404,
              status: false,
              message: "data not found",
              data: {},
            };
          }
  } catch (error) {
    return {
      status: 400,
      message: error.message,
      data: {},
    };
  }
}




module.exports = {
  liststudentFeestructure,
  createstudentFeeStructure,
  updatestudentFeeStructure,
  getByIdstudentFeeStructure,
  deletestudentFeeStructure,
  fetchDataService,
};
