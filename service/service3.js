const user = require('../Database/modal/user3')


const createstudent3 = async () =>{
    let info = {
        Name : params.Name,
       Designation  : params.Designation,
       Year : params.Year,
       TuitionFee : params.TuitionFee,
       BookFee: params. BookFee,
       FirstGraduate_discount : params. FirstGraduate_discount,
       Reserved_students_Discount : params. Reserved_students_Discount,
       TotalAmount : params.TotalAmount
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

const updatestudent3 = async () =>{
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

const liststudent3 = async () =>{

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

const getByIdstudent3 = async () =>{
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

const deletestudent3 = async () =>{
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

module.exports = {createstudent3,updatestudent3,liststudent3,getByIdstudent3,deletestudent3}