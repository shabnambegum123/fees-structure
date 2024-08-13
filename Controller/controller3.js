const user = require('../Database/modal/user3')
const {createstudent3,updatestudent3,liststudent3,getByIdstudent3,deletestudent3} =  require('../service/service3')

const createUser = async (req,res) =>{
    const datas = req.body
    let result = await createstudent3(datas)
    if(result.status){
        res.status(result.statusCode).json({
            status : result.statusCode,
            message : result.message,
            data :{}
        })
    }
    else{
        res.status(result.statusCode).json({
            status : result.statusCode,
            message : result.message,
            data :result.data
        })
    }
    }
    
    const updateUser = async () =>{
        let datas = {}
       datas.ID = req.query.id;
      datas.Name = req.body.Name;
    
     
    
      const result = await updatestudent3(datas);
      if (result.status) {
        res.status(result.statusCode).json({
          status: result.statusCode,
          message: result.message,
          data: result.data,
        });
      } else {
        res.status(result.statusCode).json({
          status: result.statusCode,
          message: result.message,
          data: result.data,
        });
      }
    }
    
    const listUser = async () =>{
        const datas = req.body;
        const result = await liststudent3(datas);
        if (result.status) {
          res.status(result.statusCode).json({
            status: result.statusCode,
            message: result.message,
            data: result.data,
          });
        } else {
          res.status(result.statusCode).json({
            status: result.statusCode,
            message: result.message,
            data: result.data,
          });
        }
        
    }
    
    const getById = async () =>{
        const datas = req.body;
        const result = await getByIdstudent3(datas);
        if (result.status) {
          res.status(result.statusCode).json({
            status: result.statusCode,
            message: result.message,
            data: result.data,
          });
        } else {
          res.status(result.statusCode).json({
            status: result.statusCode,
            message: result.message,
            data: result.data,
          });
        }
    }
    
    const deleteUser = async () =>{
        const datas = req.body;
        const result = await deletestudent3(datas);
        if (result.status) {
          res.status(result.statusCode).json({
            status: result.statusCode,
            message: result.message,
            data: result.data,
          });
        } else {
          res.status(result.statusCode).json({
            status: result.statusCode,
            message: result.message,
            data: result.data,
          });
        }
    }
    
    module.exports = {createUser,updateUser,listUser,getById,deleteUser}
    
    
    
    
    
    