const { date } = require("joi");
const feestructure = require("../Database/modal/feestructure");
const studentProfile = require("../Database/modal/studentprofile");

const { axiosFunction } = require("../axios");
const { Op } = require("sequelize");
const { pagaMetaService } = require("../helpers/pagination");
const XLSX = require("xlsx");
// create fee structure

const createfeestructureService = async (params) => {
  let info = {
    Designation: params.Designation,
    year: params.year,
    TuitionFee: params.TuitionFee,
    BookFee: params.BookFee,
    BusFee: params.BusFee,
    FirstGraduate_discount: params.FirstGraduate_discount,
    Reserved_students_Discount: params.Reserved_students_Discount,
    TotalAmount: params.TuitionFee + params.BookFee + params.BusFee,
  };

  let result = await feestructure.create(info);
  try {
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
        message: "error",
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

// update feestucture
const updatefeestructureService = async (params) => {
  try {
    let studentFeestrutureId = params.studentFeestrutureId;
    console.log(studentFeestrutureId);
    if (params.password) {
      params.password = await generatePassword(params.password);
    }

    var result = await feestructure.update(params, {
      where: { studentFeestrutureId: studentFeestrutureId },
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
// list Profile and pagenation
const listfeestructureService = async (params) => {
  try {
    var whereQuery = {};
    let feestrutureId = params.feestrutureId;

    if (params.feestrutureId) {
      whereQuery.feestrutureId = feestrutureId;
    }
    let result = await feestructure.findAll({
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

// get  by ID
const getByIdfeestructureService = async (params) => {
  try {
    let feestrutureId = params.feestrutureId;
    let result = await feestructure.findOne({
      attributes: [
        "feestrutureId",
        "Designation",
        "year",
        "TuitionFee",
        "BusFee",
        "FirstGraduate_discount",
        "Reserved_students_Discount",
        "TotalAmount",
      ],
      where: {
        feestrutureId: feestrutureId,
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
      status: 400,
      message: error.message,
      data: {},
    };
  }
};

// soft delete
const deletefeestructureService = async (params) => {
  try {
    let feestrutureId = params.feestrutureId;
    let result = await feestructure.update(
      { is_deleted: true },
      { where: { feestrutureId: feestrutureId } }
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
        statusCode: 400,
        status: false,
        message: "error",
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
// mangement should recieve the student details which where created on that day
const sendMailManagement = async (params) => {
  try {
    let fromDate = params.fromDate;
    let toDate = params.toDate;
    const find = await studentProfile.findAll({
      where: {
        createdAt: {
          [Op.gt]: new Date(fromDate), //"2024-08-18"
          [Op.lt]: new Date(toDate), //"2024-08-19"
        },
      },
      raw: true,
    });
    console.log("find", find);

    if (find) {
      for (let item of find) {
        let url = process.env.managementUrl;
        console.log("testing", url);
        let EmailId = "shabnambegum227@gmail.com";
        const axios = await axiosFunction(item, url, EmailId);

        if (axios) {
          return {
            statusCode: 200,
            status: true,
            message: "login successful",
            data: {},
          };
        } else {
          return {
            statusCode: 400,
            status: true,
            message: "user not found",
            data: {},
          };
        }
      }
    } else {
      return {
        status: 400,
        message: "error",
        data: {},
      };
    }
  } catch (error) {
    console.log("error", error);
    return {
      statusCode: 400,
      status: false,
      message: error.message,
      data: {},
    };
  }
};

const downloadSheetService = async (params) => {
  try {
    let Designation = params.Designation;
    let getDeptDetails = await studentProfile.findAll({
      where: { Designation: "BSC" },
      raw: true,
    });
    let heading = [
      [
        "profileId",
        "Name",
        "EmailId",
        "password",
        "Role",
        "is_FirstGraduate",
        "category",
        "currentYear",
        "feestructureId",
        "studentFeestrutureId",
      ],
    ];
    const data = [
      ["Name", "Age", "Email"],
      ["John Doe", 28, "john@example.com"],
      ["Jane Smith", 32, "jane@example.com"],
    ];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "sheet1");

    XLSX.writeFile(workbook, "data.xlsx");
    
    let buffer = true;
    if (buffer) {
      return {
        statusCode: 200,
        status: true,
        message: " sended",
        data: "buffer",
      };
    }
  } catch (error) {
    console.log("wdvqwef", error);
    return {
      statusCode: 400,
      status: false,
      message: error.message,
      data: {},
    };
  }
};





module.exports = {
  createfeestructureService,
  updatefeestructureService,
  getByIdfeestructureService,
  listfeestructureService,
  deletefeestructureService,
  sendMailManagement,
  downloadSheetService,
};
