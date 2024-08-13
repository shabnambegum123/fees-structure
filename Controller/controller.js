const user = require('../Database/modal/user')

const {createstudent,updatestudent,liststudent,getByIdstudent,deletestudent} =  require('../service/service')

const createUser = async (req,res) =>{
const datas = req.body
let result = await createstudent(datas)
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

  console.log("bWSFH WF",datas)

  const result = await updatestudent(datas);
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
    const result = await liststudent(datas);
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
    const result = await getByIdstudent(datas);
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
    const result = await deletestudent(datas);
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





