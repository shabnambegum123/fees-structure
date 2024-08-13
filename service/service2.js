const user = require('../Database/modal/user2')


const createstudent2 = async (params) =>{
    let info = {
        Name : params.Name,
        EmailId: params.EmailId,
        password : params.password,
        Role : params.Role,
        Designation  : params.Designation,
       
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

const updatestudent2 = async (param) =>{
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

const liststudent2 = async (param) =>{

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

const getByIdstudent2 = async (param) =>{
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

const deletestudent2 = async (param) =>{
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

module.exports = {createstudent2,updatestudent2,liststudent2,getByIdstudent2,deletestudent2}