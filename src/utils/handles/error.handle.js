export const errorHandler = (err, req, res, next) =>{
    if(err){
        console.log(err);
        res.status(err.status || 500).json({
            status: err.status || 500,
            message: err.message || 'Internal Server Error',
            error: err.stack
        })
        next(err);
    }
    next();
  }