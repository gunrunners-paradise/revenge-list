
const {StatusCodes} = require('http-status-codes');
const errorHandlerMiddleware = (err,req,res,next) => {
      
      let CustomError = {
            // set default
            statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
            msg: err.message || err.msg || 'Something went wrong try again later',
            error: true
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
            CustomError.msg = `No item found with the id: ${err.value._id || err.value}`;
            CustomError.statusCode = StatusCodes.NOT_FOUND;
      }

      if (err.type === 'entity.parse.failed') {
            CustomError.msg = "Could not parse the incoming JSON because the client sent malformed JSON.";
            CustomError.statusCode = StatusCodes.BAD_REQUEST;
      }

      // return res.status(CustomError.statusCode).json({err});
      return res.status(CustomError.statusCode).json({msg: CustomError.msg});
};

module.exports = errorHandlerMiddleware;