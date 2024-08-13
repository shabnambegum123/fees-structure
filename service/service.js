const { where } = require('sequelize')
const user = require('../Database/modal/user')


const createstudent = async (params) =>{
let info = {
    Name : params.Name,
    EmailId: params.EmailId,
    password : params.password,
    Role : params.Role,
    Designation  : params.Designation,
    is_FirstGraduate : params.is_FirstGraduate,
    Category : params.Category,
    feestructureId : params.feestructureId,
    studentFeestrutureId : params.studentFeestrutureId 
}
let result = user. create (info)
  if(result){
   return {
    statusCode : 200,
    status : true,
    message : "created",
    data : {}
   }
  }
  else {
    return {
        status: 200,
        message: "created",
        data: result.data,
      };
  }
}

const updatestudent = async (params) =>{
let ID = params.ID
 let result = user.update({Name : params.Name},{where :{ID : ID}})
 if(result){
    return {
     statusCode : 200,
     status : true,
     message : "updated",
     data : {}
    }
   }
   else {
     return {
         status: 200,
         message: "updated",
         data: result.data,
       };
   }
}

const liststudent = async (params) =>{

    let result = user.findAll()
    if(result){
        return {
         statusCode : 200,
         status : true,
         message : "created",
         data : {}
        }
       }
       else {
         return {
             status: 200,
             message: "created",
             data: result.data,
           };
       }
}

const getByIdstudent = async (params) =>{
  let ID = params.ID
  let result = user.findOne({where:{ID:ID}})
  if(result){
    return {
     statusCode : 200,
     status : true,
     message : "created",
     data : {}
    }
   }
   else {
     return {
         status: 200,
         message: "created",
         data: result.data,
       };
   }
}

const deletestudent = async (params) =>{
  let ID = params.ID
  let result = user.destroy({where :{ID :ID}})
  if(result){
    return {
     statusCode : 200,
     status : true,
     message : "created",
     data : {}
    }
   }
   else {
     return {
         status: 200,
         message: "created",
         data: result.data,
       };
   }
}

module.exports = {createstudent,updatestudent,liststudent,getByIdstudent,deletestudent}