import { responseError, responseSuccess } from "@/utils/helpers/response.helper"
import {
    create as adminCreate,
    login as adminLogin,
    remove as adminRemove

}from "@/app/services/admin.service"
    
import { addCache } from "@/utils/helpers/cache";
import { SECRET_KEY_ADMIN } from "@/config/constant";
import { genToken } from "@/utils/helpers/genToken";

export async function login(req, res, next) {
    const admin = await adminLogin(req.body);
    if(admin){
        return await responseSuccess(res, {
            email : admin.email,
            password : admin.password.slice(0, -3) + '***',
            token :genToken(req.body,SECRET_KEY_ADMIN)
        });
    }
    else{
        return await responseError(res, null, 400, "false");
    }
}

export async function create(req,res,next){
    const admin = await adminCreate(req.body)
    return admin ?
        await responseSuccess(res, admin, 200, "true")
        : await responseError(res, null, 400, "false");
}
export async function remove(req,res,next){
    const data = req.curentAdmin;
    console.log(data)
    const admin = await adminRemove({email : data.email});
    return await responseSuccess(res,admin,200,"true")
}

export const logout = async (req,res)=>{
    const token = req.headers['authorization'].replace(/Bearer/, '').trim();
    const exp = req.curentAdmin.exp;
    const ttl = exp-Math.floor(Date.now() / 1000);
    addCache(token,"token",ttl);
    return responseSuccess(res,null,200,"true");
}

