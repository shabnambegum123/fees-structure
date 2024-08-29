const joi = require("joi");
// student profile

const studentCreate = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      Name: joi.string().required(),
      EmailId: joi.string().email().min(15).max(56).required(),
      password: joi.string().min(6).max(10).required(),
      Role: joi.string().required(),
      Designation: joi.string().required(),
      is_FirstGraduate: joi.string().required(),
      category: joi.string().required(),
      currentYear: joi.string().required(),
      feestructureId: joi.number().required(),
      mobileNumber: joi.number().min(10).required(),
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
        message: error.message,
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
};

const studentLogin = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      EmailId: await joi.string().email().min(12).required(),
      password: await joi.string().required().min(6).max(10),
    });

    let options = {
      basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
      },
    };
    let { error, value } = profileValidate.validate(req.body, options);

    if (error && Object.keys(error).length > 0) {
      return res.json({
        statusCode: 400,
        message: error.message,
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
};

const updateStudent = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      Name: joi.string(),
      EmailId: joi.string().email().min(15).max(56),
      password: joi.string().min(6).max(10),
      Role: joi.string().default("Student"),
      Designation: joi.string(),
      is_FirstGraduate: joi.string(),
      category: joi.string(),
      currentYear: joi.string(),
      feestructureId: joi.number(),
      mobileNumber: joi.number().min(10),
    });

    let options = {
      basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
      },
    };
    let { error, value } = profileValidate.validate(req.body, options);

    if (error && Object.keys(error).length > 0) {
      return res.json({
        statusCode: 400,
        message: error.message,
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
};

const liststudentId = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      page: joi.number(),
      limit: joi.number(),
    });

    let options = {
      basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
      },
    };
    let { error, value } = profileValidate.validate(req.body, options);

    if (error && Object.keys(error).length > 0) {
      return res.json({
        statusCode: 400,
        message: error.message,
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
};

// staff profile

const staffCreate = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      Name: joi.string().required(),
      EmailId: joi.string().email().min(9).required(),
      password: joi.string().min(10).required(),
      Role: joi.string().required(),
      Designation: joi.string().required(),
    });

    let options = {
      basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
      },
    };
    let { error, value } = profileValidate.validate(req.body, options);

    if (error && Object.keys(error).length > 0) {
      return res.json({
        statusCode: 400,
        message: error.message,
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
};

const updateStaff = async (req, res) => {
  try {
    let profileValidate = joi.object({
      Name: joi.string(),
      EmailId: joi.string().email().min(9),
      password: joi.string().min(6).min(10),
      Role: joi.string(),
      Designation: joi.string(),
    });

    let options = {
      basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
      },
    };
    let { error, value } = profileValidate.validate(req.body, options);

    if (error && Object.keys(error).length > 0) {
      return res.json({
        statusCode: 400,
        message: error.message,
      });
    }
  } catch (error) {
    return {
      statusCode: 400,
      status: false,
      message: error.message,
    };
  }
};
const listId = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      page: joi.number(),
      limit: joi.number(),
    });

    let options = {
      basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
      },
    };
    let { error, value } = profileValidate.validate(req.body, options);

    if (error && Object.keys(error).length > 0) {
      return res.json({
        statusCode: 400,
        message: error.message,
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
};

const loginStaff = async (req, res) => {
  try {
    let profileValidate = joi.object({
      EmailId: await joi.string().email().min(12).required(),
      password: await joi.string().required().min(6).max(10),
    });

    let options = {
      basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
      },
    };
    let { error, value } = profileValidate.validate(req.body, options);

    if (error && Object.keys(error).length > 0) {
      return res.json({
        statusCode: 400,
        message: error.message,
      });
    }
  } catch (error) {
    return {
      statusCode: 400,
      status: false,
      message: error.message,
    };
  }
};

// fee structure

const createFee = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      Designation: joi.string().required(),
      year: joi.string().required(),
      TuitionFee: joi.number().required(),
      BookFee: joi.number().required(),
      BusFee: joi.number().required(),
      FirstGraduate_discount: joi.string().required(),
      Reserved_students_Discount: joi.string().required(),
    });

    let options = {
      basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
      },
    };
    let { error, value } = profileValidate.validate(req.body, options);

    if (error && Object.keys(error).length > 0) {
      return res.json({
        statusCode: 400,
        message: error.message,
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
};

const updateFee = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      Designation: joi.string(),
      year: joi.string(),
      TuitionFee: joi.number(),
      BookFee: joi.number(),
      BusFee: joi.number(),
      FirstGraduate_discount: joi.number(),
      Reserved_students_Discount: joi.number(),
    });

    let options = {
      basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
      },
    };
    let { error, value } = profileValidate.validate(req.body, options);

    if (error && Object.keys(error).length > 0) {
      return res.json({
        statusCode: 400,
        message: error.message,
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
};

const listById = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      page: joi.number(),
      limit: joi.number(),
    });

    let options = {
      basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
      },
    };
    let { error, value } = profileValidate.validate(req.body, options);

    if (error && Object.keys(error).length > 0) {
      return res.json({
        statusCode: 400,
        message: error.message,
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

// studentFeeStructure

const updateFeestructureValidation = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
     
      Designation: joi.string(),
      year: params.joi.string(),
      TuitionFee: joi.number(),
      BookFee: joi.number(),
      BusFee: joi.number(),
      FirstGraduate_discount: joi.string(),
      Reserved_students_Discount :joi.string()
    });

    let options = {
      basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
      },
    };
    let { error, value } = profileValidate.validate(req.body, options);

    if (error && Object.keys(error).length > 0) {
      return res.json({
        statusCode: 400,
        message: error.message,
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


const listByIdFee = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      page: joi.number(),
      limit: joi.number(),
    });

    let options = {
      basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
      },
    };
    let { error, value } = profileValidate.validate(req.body, options);

    if (error && Object.keys(error).length > 0) {
      return res.json({
        statusCode: 400,
        message: error.message,
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


module.exports = {
  studentLogin,
  studentCreate,
  updateStudent,
  liststudentId,
  staffCreate,
  updateStaff,
  listId,
  updateFeestructureValidation,
  loginStaff,
  listByIdFee,
  createFee,
  updateFee,
  listById,
};
