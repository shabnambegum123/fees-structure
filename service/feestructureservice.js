const { date } = require("joi");
const feestructure = require("../Database/modal/feestructure");
const studentProfile = require("../Database/modal/studentprofile");
const { default: axios, all } = require("axios");
const {axiosFunction } = require("../axios");
const { Op } = require("sequelize");
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
    if (params.password) {
      params.password = await generatePassword(params.password);
    }

    var result = await feestructure.update(params, {
      where: { feestructureId: params.feestructureId },
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
// list Profile and pagenation
const listfeestructureService = async (params) => {
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
};

// get  by ID
const getByIdfeestructureService = async (params) => {
  try {
    let feestrutureId = params.feestrutureId;
    let result = feestructure.findOne({
      where: { feestrutureId: feestrutureId },
    });
    if (result) {
      return {
        statusCode: 200,
        status: true,
        message: "fees amount",
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

// soft delete
const deletefeestructureService = async (params) => {
  try {
    let feestructureId = params.feestructureId;
    let result = feestructure.update(
      { feestructureId: params.feestructureId },
      { where: { is_deleted: true } }
    );
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
// mangement should recieve the student details which where created on that day
const sendMailManagement = async (params) => {
  try {
    //let Date = params.Date;
    const find = await studentProfile.findAll({
      where: {
        createdAt: {
          [Op.gt]: new Date("2024-08-18"),
          [Op.lt]: new Date("2024-08-19"),
        },
      },
      raw: true,
    });
    console.log(find, "find");
    if (find) {

  for (let item of find) {
    let url = process.env.managementUrl;
    const axios = await axiosFunction(item,url);
  }

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
      // let url = "http://localhost:4000/management/send";
      // let sendData = await axios.post(url, {
      //   find: "hello",
      // });
      // console.log(sendData);
    } else {
      return {
        status: 400,
        message: "error",
        data: {},
      };
    }
  } catch (error) {
    return {
      statusCode: 400,
      status: false,
      message: "error",
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
};
