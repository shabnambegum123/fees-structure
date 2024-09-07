const joi = require("joi");
// student profile

const studentCreateQuery = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      DOB : joi.string().required()
      
    });

    let options = {
      basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
      },
    };

    let { error, value } = await profileValidate.validate(req.query, options);

    if (error && Object.keys(error).length > 0) {
      return res.json({
        statusCode: 400,
        message: `Required in query${error}`,
      });
    } else {
      next();
    }
  } catch (error) {
    return {
      statusCode: 400,
      status: false,
      message: error.message,
    };
  }
}
const updateFeeQuery = async (req,res,next) =>{
    try {
        let profileValidate = joi.object({
          feestrutureId : joi.number().required()
          
        });
    
        let options = {
          basic: {
            abortEarly: false,
            convert: true,
            allowUnknown: false,
            stripUnknown: true,
          },
        };
    
        let { error, value } = await profileValidate.validate(req.body, options);
    
        if (error && Object.keys(error).length > 0) {
          return res.json({
            statusCode: 400,
            message: `Required in query${error}`,
          });
        } else {
          next();
        }
      } catch (error) {
        return {
          statusCode: 400,
          status: false,
          message: error.message,
        };
      } 
}

const DeleteFeeQuery = async (req,res,next) =>{
    try {
        let profileValidate = joi.object({
          feestrutureId : joi.number().required()
          
        });
    
        let options = {
          basic: {
            abortEarly: false,
            convert: true,
            allowUnknown: false,
            stripUnknown: true,
          },
        };
    
        let { error, value } = await profileValidate.validate(req.query, options);
    
        if (error && Object.keys(error).length > 0) {
          return res.json({
            statusCode: 400,
            message: `Required in query${error}`,
          });
        } else {
          next();
        }
      } catch (error) {
        return {
          statusCode: 400,
          status: false,
          message: error.message,
        };
      } 
}

const updateFeestructureQuery = async (req,res,next) =>{
  try {
   
      let profileValidate = joi.object({
        studentFeestrutureId : joi.number().required()
        
      });
  
      let options = {
        basic: {
          abortEarly: false,
          convert: true,
          allowUnknown: false,
          stripUnknown: true,
        },
      };
  
      let { error, value } = await profileValidate.validate(req.query, options);
  
      if (error && Object.keys(error).length > 0) {
        return res.json({
          statusCode: 400,
          message: `Required in query${error}`,
        });
      } else {
        next();
      }
    } catch (error) {
      return {
        statusCode: 400,
        status: false,
        message: error.message,
      };
    } 
}

const getByIdstudentFeeQuery = async (req,res,next) =>{
  try {
    
      let profileValidate = joi.object({
        studentFeestrutureId : joi.number().required()
        
      });
  
      let options = {
        basic: {
          abortEarly: false,
          convert: true,
          allowUnknown: false,
          stripUnknown: true,
        },
      };
  
      let { error, value } = await profileValidate.validate(req.query, options);
  
      if (error && Object.keys(error).length > 0) {
        return res.json({
          statusCode: 400,
          message: `Required in query${error}`,
        });
      } else {
        next();
      }
    } catch (error) {
      return {
        statusCode: 400,
        status: false,
        message: error.message,
      };
    } 
}

module.exports={studentCreateQuery,updateFeeQuery,DeleteFeeQuery,updateFeestructureQuery,getByIdstudentFeeQuery}