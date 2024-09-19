const joi = require("joi");
// student profile

const studentCreate = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      Name: joi.string().required().messages({
        "string.empty": "Name is required.",
        "any.required": "Name is required.",
      }),
      EmailId: joi.string().email().min(15).max(56).required().messages({
        "string.empty": "EmailId is required.",
        "any.required": "EmailId is required.",
      }),
      password: joi.string().min(6).max(10).required().messages({
        "string.empty": " password is required.",
        "any.required": "password is required.",
      }),
      Role: joi.string().required().messages({
        "string.empty": "Role is required.",
        "any.required": "Role is required.",
      }),
      Designation: joi.string().required().messages({
        "string.empty": "Designation is required.",
        "any.required": "Designation is required.",
      }),
      is_FirstGraduate: joi.string().required().messages({
        "string.empty": "is_FirstGraduate is required.",
        "any.required": "is_FirstGraduate is required.",
      }),
      category: joi.string().required().messages({
        "string.empty": "category is required.",
        "any.required": "category is required.",
      }),
      currentYear: joi.string().required().messages({
        "string.empty": "currentYear is required.",
        "any.required": "currentYear is required.",
      }),
      feestructureId: joi.number().required().messages({
        "string.empty": "feestructureId is required.",
        "any.required": "feestructureId is required.",
      }),
      mobileNumber: joi.number().min(10).required().messages({
        "string.empty": "mobileNumber is required.",
        "any.required": "mobileNumber is required.",
      }),
    });

    let options = {
      basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
      },
    };

    let profilevalidate = joi.object({
      DOB: joi.string().required(),
    });

    const { error: bodyError, value: bodyValue } =
      await profileValidate.validate(req.body, options);

    if (bodyError) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        statusCode: 400,
        message: errorMessages,
      });
    }

    const { error: queryError, value: queryValue } = profilevalidate.validate(
      req.query,
      options
    );

    if (queryError) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        statusCode: 400,
        message: errorMessages,
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      status: false,
      message: error.message,
    });
  }
};

const studentLogin = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      EmailId: await joi.string().email().min(12).required().messages({
        "string.empty": "EmailId is required.",
        "any.required": "EmailId is required.",
      }),
      password: await joi.string().required().min(6).max(10).messages({
        "string.empty": "password is required.",
        "any.required": "password is required.",
      }),
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

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        statusCode: 400,
        message: errorMessages,
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      status: false,
      message: error.message,
    });
  }
};

const updateStudent = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      Name: joi.string().messages({
        "string.empty": "Name is required.",
        "any.required": "Name is required.",
      }),
      EmailId: joi.string().email().min(15).max(56).messages({
        "string.empty": "EmailId is required.",
        "any.required": "EmailId is required.",
      }),
      password: joi.string().min(6).max(10).messages({
        "string.empty": "password is required.",
        "any.required": "password is required.",
      }),
      Role: joi.string().default("Student").messages({
        "string.empty": "Role is required.",
        "any.required": "Role is required.",
      }),
      Designation: joi.string().messages({
        "string.empty": "Designation is required.",
        "any.required": "Designation is required.",
      }),
      is_FirstGraduate: joi.string().messages({
        "string.empty": "is_FirstGraduate is required.",
        "any.required": "is_FirstGraduate is required.",
      }),
      category: joi.string().messages({
        "string.empty": "category is required.",
        "any.required": "category is required.",
      }),
      currentYear: joi.string().messages({
        "string.empty": "currentYear is required.",
        "any.required": "currentYear is required.",
      }),
      feestructureId: joi.number().messages({
        "string.empty": "feestructureId is required.",
        "any.required": "feestructureId is required.",
      }),
      mobileNumber: joi.number().min(10).messages({
        "string.empty": "mobileNumber is required.",
        "any.required": "mobileNumber is required.",
      }),
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

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        statusCode: 400,
        message: errorMessages,
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      status: false,
      message: error.message,
    });
  }
};

const liststudentId = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      page: joi.number().required().messages({
        "string.empty": "page is required.",
        "any.required": "page is required.",
      }),
      limit: joi.number().required().messages({
        "string.empty": "limit is required.",
        "any.required": "limit is required.",
      }),
      profileId: joi.number(),
    });

    let options = {
      basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
      },
    };
    let { error, value } = profileValidate.validate(req.query, options);

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        statusCode: 400,
        message: errorMessages,
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      status: false,
      message: error.message,
    });
  }
};
const validatePassword = async (req, res, next) => {
  try {
    const profileValidate = joi.object({
      newPassword: joi.string().required().messages({
        "string.empty": "New password is required.",
        "any.required": "New password is required.",
      }),
      confirmPassword: joi.string().required().messages({
        "string.empty": "Confirm password is required.",
        "any.required": "Confirm password is required.",
      }),
      oldPassword: joi.string().required().messages({
        "string.empty": "Old password is required.",
        "any.required": "Old password is required.",
      }),
    });

    const options = {
      abortEarly: false, // Validate all fields and return all errors.
      convert: true, //Attempt type conversion on input values.
      allowUnknown: false, //: Reject input with extra fields not defined in the schema
      stripUnknown: true, // Remove extra fields from the validated output.
    };

    const { error, value } = profileValidate.validate(req.body, options);

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        statusCode: 400,
        message: errorMessages,
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      status: false,
      message: error.message,
    });
  }
};

const forgetPasswordValidity = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      EmailId: joi.string().email().min(15).max(56).required().messages({
        "string.empty": "EmailId  is required.",
        "any.required": "EmailId  is required.",
      }),
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

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        statusCode: 400,
        message: errorMessages,
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      status: false,
      message: error.message,
    });
  }
};

const changePasswordValidity = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      password: joi.string().required().messages({
        "string.empty": "password  is required.",
        "any.required": "password  is required.",
      }),
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

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        statusCode: 400,
        message: errorMessages,
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      status: false,
      message: error.message,
    });
  }
};

// staff profile

const staffCreate = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      Name: joi.string().required().messages({
        "string.empty": "Name  is required.",
        "any.required": "Name  is required.",
      }),
      EmailId: joi.string().email().min(9).required().messages({
        "string.empty": "EmailId  is required.",
        "any.required": "EmailId  is required.",
      }),
      password: joi.string().min(7).required().messages({
        "string.empty": "password  is required.",
        "any.required": "password  is required.",
      }),
      Role: joi.string().required().messages({
        "string.empty": "Role is required.",
        "any.required": "Role is required.",
      }),
      Designation: joi.string().required().messages({
        "string.empty": "Designation  is required.",
        "any.required": "Designation  is required.",
      }),
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

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        statusCode: 400,
        message: errorMessages,
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      status: false,
      message: error.message,
    });
  }
};

const updateStaff = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      Name: joi.string().messages({
        "string.empty": "Name  is required.",
        "any.required": "Name  is required.",
      }),
      EmailId: joi.string().email().min(9).messages({
        "string.empty": "EmailId  is required.",
        "any.required": "EmailId  is required.",
      }),
      password: joi.string().min(6).min(10).messages({
        "string.empty": "password  is required.",
        "any.required": "password  is required.",
      }),
      Role: joi.string().messages({
        "string.empty": "Role  is required.",
        "any.required": "Role  is required.",
      }),
      Designation: joi.string().messages({
        "string.empty": "Designation  is required.",
        "any.required": "Designation  is required.",
      }),
      fineAmount: joi.object().keys({
        type: joi.string(),
        Amount: joi.number(),
        paidstatus: joi.string().messages({
          "string.empty": "fineAmount  is required.",
          "any.required": "fineAmount  is required.",
        }),
      }),
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

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        statusCode: 400,
        message: errorMessages,
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      status: false,
      message: error.message,
    });
  }
};
const listId = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      page: joi.number().required().messages({
        "string.empty": "page  is required.",
        "any.required": "page  is required.",
      }),
      limit: joi.number().required().messages({
        "string.empty": "limit  is required.",
        "any.required": "limit  is required.",
      }),
      staffId: joi.number().messages({
        "string.empty": "staffId  is required.",
        "any.required": "staffId  is required.",
      }),
    });

    let options = {
      basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
      },
    };
    let { error, value } = profileValidate.validate(req.query, options);

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        statusCode: 400,
        message: errorMessages,
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      status: false,
      message: error.message,
    });
  }
};

const loginStaff = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      EmailId: await joi.string().email().min(12).required().messages({
        "string.empty": "EmailId  is required.",
        "any.required": "EmailId  is required.",
      }),
      password: await joi.string().required().min(7).messages({
        "string.empty": "password  is required.",
        "any.required": "password  is required.",
      }),
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

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        statusCode: 400,
        message: errorMessages,
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      status: false,
      message: error.message,
    });
  }
};

// fee structure

const createFee = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      Designation: joi.string().required().messages({
        "string.empty": "Designation  is required.",
        "any.required": "Designation  is required.",
      }),
      year: joi.string().required().messages({
        "string.empty": "year  is required.",
        "any.required": "year  is required.",
      }),
      TuitionFee: joi.number().required().messages({
        "string.empty": "TuitionFee  is required.",
        "any.required": "TuitionFee  is required.",
      }),
      BookFee: joi.number().required().messages({
        "string.empty": "BookFee  is required.",
        "any.required": "BookFee  is required.",
      }),
      BusFee: joi.number().required().messages({
        "string.empty": "BusFee  is required.",
        "any.required": "BusFee  is required.",
      }),
      FirstGraduate_discount: joi.string().required().messages({
        "string.empty": "FirstGraduate_discount  is required.",
        "any.required": "FirstGraduate_discount  is required.",
      }),
      Reserved_students_Discount: joi.string().required().messages({
        "string.empty": "Reserved_students_Discount  is required.",
        "any.required": "Reserved_students_Discount  is required.",
      }),
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

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        statusCode: 400,
        message: errorMessages,
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      status: false,
      message: error.message,
    });
  }
};

const updateFee = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      Designation: joi.string().messages({
        "string.empty": "Designation  is required.",
        "any.required": "Designation  is required.",
      }),
      year: joi.string().messages({
        "string.empty": "year  is required.",
        "any.required": "year  is required.",
      }),
      TuitionFee: joi.number().messages({
        "string.empty": "TuitionFee  is required.",
        "any.required": "TuitionFee  is required.",
      }),
      BookFee: joi.number().messages({
        "string.empty": "BookFee  is required.",
        "any.required": "BookFee  is required.",
      }),
      BusFee: joi.number().messages({
        "string.empty": "BusFee  is required.",
        "any.required": "BusFee  is required.",
      }),
      FirstGraduate_discount: joi.number().messages({
        "string.empty": "FirstGraduate_discount  is required.",
        "any.required": "FirstGraduate_discount  is required.",
      }),
      Reserved_students_Discount: joi.number().messages({
        "string.empty": "Reserved_students_Discount  is required.",
        "any.required": "Reserved_students_Discount  is required.",
      }),
    });

    let options = {
      basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
      },
    };
    let { error: bodyError, value } = profileValidate.validate(
      req.body,
      options
    );

    if (bodyError) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        statusCode: 400,
        message: errorMessages,
      });
    }

    let ProfileValidate = joi.object({
      feestrutureId: joi.number().required().messages({
        "string.empty": "feestrutureId  is required.",
        "any.required": "feestrutureId  is required.",
      }),
    });

    let { error: queryError, value: queryValue } = ProfileValidate.validate(
      req.query,
      options
    );

    if (queryError) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        statusCode: 400,
        message: errorMessages,
      });
    }

    next();
  } catch (error) {
    return {
      statusCode: 400,
      status: false,
      message: error.message,
    };
  }
};

let profileValidate = joi.object({
  page: joi.string().required().messages({
    "string.empty": "page  is required.",
    "any.required": "page  is required.",
  }),
  limit: joi.string().required().messages({
    "string.empty": "limit  is required.",
    "any.required": "limit  is required.",
  }),
  feestrutureId: joi.number().messages({
    "string.empty": "feestrutureId  is required.",
    "any.required": "feestrutureId  is required.",
  }),
});

let profileSchema = joi.object({
  page: joi.string().required().messages({
    "string.empty": "page  is required.",
    "any.required": "page  is required.",
  }),
  limit: joi.string().required().messages({
    "string.empty": "limit  is required.",
    "any.required": "limit  is required.",
  }),
  feestrutureId: joi.number().messages({
    "string.empty": "feestrutureId  is required.",
    "any.required": "feestrutureId  is required.",
  }),
});
let options = {
  basic: {
    abortEarly: false,
    convert: true,
    allowUnknown: false,
    stripUnknown: true,
  },
};
const listById = async (req, res, next) => {
  try {
    const { error: bodyError, value: bodyValue } = profileValidate.validate(
      req.body,
      options
    );

    if (bodyError) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        statusCode: 400,
        message: errorMessages,
      });
    }

    const { error: queryError, value: queryValue } = profileSchema.validate(
      req.query,
      options
    );

    if (queryError) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        statusCode: 400,
        message: errorMessages,
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      status: false,
      message: error.message,
    });
  }
};

const getByIdFee = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      feestrutureId: joi.number().required().messages({
        "string.empty": "feestrutureId  is required.",
        "any.required": "feestrutureId  is required.",
      }),
    });

    let options = {
      basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
      },
    };
    let { error, value } = profileValidate.validate(req.query, options);

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        statusCode: 400,
        message: errorMessages,
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      status: false,
      message: error.message,
    });
  }
};
// studentFeeStructure

const updateFeestructureValidation = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      Designation: joi.string().messages({
        "string.empty": "Designation  is required.",
        "any.required": "Designation  is required.",
      }),
      year: joi.string().messages({
        "string.empty": "year  is required.",
        "any.required": "year  is required.",
      }),
      feestrutureId: joi.number().messages({
        "string.empty": "feestrutureId  is required.",
        "any.required": "feestrutureId  is required.",
      }),
      paidStatus: joi.string().messages({
        "string.empty": "paidStatus  is required.",
        "any.required": "paidStatus  is required.",
      }),
      TotalAmount: joi.number().messages({
        "string.empty": "TotalAmount  is required.",
        "any.required": "TotalAmount  is required.",
      }),
      fineAmount: joi.object().keys({
        type: joi.string().messages({
          "string.empty": "fineAmount is required.",
          "any.required": "fineAmount is required.",
        }),
        Amount: joi.string().messages({
          "string.empty": " Amount  is required.",
          "any.required": " Amount  is required.",
        }),
        paidStatus: joi.string().messages({
          "string.empty": "paidStatus is required.",
          "any.required": "paidStatus is required.",
        }),
      }),
    });

    let options = {
      basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
      },
    };

    let { bodyError, value } = profileValidate.validate(req.body, options);

    if (bodyError) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        statusCode: 400,
        message: errorMessages,
      });
    }

    let profilevalidate = joi.object({
      studentFeestrutureId : joi.number().required()
      
    });
    const { error: queryError, value: queryValue } = profilevalidate.validate(
      req.query,
      options
    );

    if (queryError) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        statusCode: 400,
        message: errorMessages,
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      status: false,
      message: error.message,
    });
  }
   
};

const listByIdFee = async (req, res, next) => {
  try {
    let profileValidate = joi.object({
      page: joi.number().required().messages({
        "string.empty": "page  is required.",
        "any.required": "page  is required.",
      }),
      limit: joi.number().required().messages({
        "string.empty": "limit  is required.",
        "any.required": "limit  is required.",
      }),
      studentFeestrutureId: joi.number().messages({
        "string.empty": "studentFeestrutureId  is required.",
        "any.required": "studentFeestrutureId  is required.",
      }),
    });

    let options = {
      basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
      },
    };
    let { error, value } = profileValidate.validate(req.query, options);

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        statusCode: 400,
        message: errorMessages,
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      status: false,
      message: error.message,
    });
  }
}


const DeleteFeeQuery = async (req,res,next) =>{
  try {
      let profileValidate = joi.object({
        feestrutureId : joi.number().required().messages({
          "string.empty": "feestrutureId is required.",
          "any.required": "feestrutureId is required.",
        })
        
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
  
      if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({
          statusCode: 400,
          message: errorMessages,
        });
      } else {
        next();
      }
    } catch (error) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: error.message,
      });
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
  validatePassword,
  getByIdFee,
  forgetPasswordValidity,
  changePasswordValidity,
  DeleteFeeQuery
};
