const user = require('../Database/modal/user4')


const createstudent4 = async () =>{
    let info = {
        studentId: params.studentId,
        Designation: params.Designation,
        pursuingYear : params.pursuingYear,
        feestrutureId : params.feestrutureId,
        currentYear  : params.currentYear,
        paidStatus : params.paidStatus,
        TotalAmount : params.TotalAmount,
        fineAmount : params.fineAmount,
        
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

const updatestudent4 = async () =>{
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

const liststudent4 = async () =>{

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

const getByIdstudent4 = async () =>{
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

const deletestudent4 = async () =>{
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

module.exports = {createstudent4,updatestudent4,liststudent4,getByIdstudent4,deletestudent4}