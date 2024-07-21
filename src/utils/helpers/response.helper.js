export const responseSuccess = (res , data , status = 200 , message = "Success") =>{
    return res.status(status).json({
        status,
        error : false,
        data,
        message
    })
}

export const responseError = (res , data , status = 400 ,  message = "Error") =>{
    return res.status(status).json({
        status,
        error : true,
        data,
        message
    })
}