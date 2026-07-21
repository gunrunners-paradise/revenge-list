
const {StatusCodes} = require('http-status-codes');
const errorHandlerMiddleware = (err,req,res,next) => {
      
      let CustomError = {
            // set default
            statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
            msg: err.message || 'Something went wrong try again later'
      };

      if (err.name === 'ValidationError') {
            CustomError.msg = Object.values(err.errors).map((item) => item.message).join(',');
            CustomError.statusCode = StatusCodes.BAD_REQUEST;
      }

      if (err.code && err.code == 11000) {
            CustomError.msg = `Duplicate input value for ${Object.keys(err.keyValue)} field, please input another value`;
            CustomError.statusCode = StatusCodes.BAD_REQUEST;
      }

      if (err.name === 'CastError') {
            CustomError.msg = `No item found with the id: ${err.value}`;
            CustomError.statusCode = StatusCodes.NOT_FOUND;
      }

      // return res.status(CustomError.statusCode).json({err});
      return res.status(CustomError.statusCode).json({msg: CustomError.msg});
};

module.exports = errorHandlerMiddleware;