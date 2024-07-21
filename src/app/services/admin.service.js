
import {Admin} from "../model/admin.model"


export const create = async (payload)=>{
   
    const admmin = new Admin({
        adminname : payload.adminname,
        email : payload.email,
        password :  payload.password
    })

    return await admmin.save();
}
    
export const login = async (payload)=>{
    const admin = await Admin.findOne({email : payload.email});
    admin.password = admin.password.slice(0, -3) + '***';

    return admin;
}

export const remove = async (payload)=>{
    return await Admin.deleteOne(payload);
}