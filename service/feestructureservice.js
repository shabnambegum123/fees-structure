const { date } = require("joi");
const feestructure = require("../Database/modal/feestructure");
const studentProfile = require("../Database/modal/studentprofile");
const { default: axios, all } = require("axios");
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

  let result = await feestructure.create(info)
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
};

const updatefeestructureService = async (params) => {
  let feestrutureId = params.feestrutureId;
  let result = feestructure.update(
    { Designation: params.Designation },
    { where: { feestrutureId: feestrutureId } }
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

const listfeestructureService = async (params) => {
  let result = await  feestructure.findAll();
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
};

const getByIdfeestructureService = async (params) => {
  let feestrutureId = params.feestrutureId;
  let result = feestructure.findOne({ where: { feestrutureId: feestrutureId } });
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
      data:{},
    };
  }
};

const deletefeestructureService = async (params) => {
  let feestrutureId = params.feestrutureId;
  let result = feestructure.destroy({ where: { feestrutureId: feestrutureId } });
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
}

const sendMailManagement = async () =>{
  const find = await studentProfile.findAll({where:{createdAt:new Date()}})
  if(find){
    let url = "http://localhost:4000/management/send";
    let sendData = await axios.post(url,{
       find : 'hello'
      })
      console.log(sendData)
    return {
      statusCode: 200,
      status: true,
      message: "created",
      data: {},
    };
  }
  else{
    return {
      status: 400,
      message: "error",
      data: {},
    };
  }
}

module.exports = {
  createfeestructureService,
  updatefeestructureService,
  getByIdfeestructureService,
  listfeestructureService,
  deletefeestructureService,
  sendMailManagement
}



