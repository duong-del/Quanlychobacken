import { createUser,updateUser,removeUser,loginUser,detailUser, paymentUser, updateCost } from "../services/user.service"
import { responseError, responseSuccess } from "@/utils/helpers/response.helper"
import { genToken } from "@/utils/helpers/genToken";
import { SECRET_KEY_USER } from "@/config/constant";
import { addCache } from "@/utils/helpers/cache";
import { filterAreaMarket } from "../services/areaMarket.service";


export const filter = async (req, res,next) => {
    const areaM = await filterAreaMarket(req.query);
    await responseSuccess(res,areaM);
}
export async function login(req,res,next){
    const user = await loginUser(req.body);
    if(user){
        const token = genToken({email:user.email, password:user.password},SECRET_KEY_USER)
        return await responseSuccess(res, {
            email : user.email,
            password : user.password.slice(0, -3) + "***",
            address: user.address,
            token : token
        },200,"true");
    }
    else{
        responseError(res,null);
    }
}


export function logout(req, res,next){
    const token = req.headers['authorization'].replace(/Bearer/, '').trim();
    const exp = req.curentUser.exp;
    const ttl = exp-Math.floor(Date.now() / 1000);
    addCache(token,"token",ttl);
    return responseSuccess(res,null);
}

export async function create(req,res,next){
    const user = await createUser(req);
    if(user){
        return await responseSuccess(res, {
            id : user._id,
            name : user.name,
            email : user.email,
            password : user.password.slice(0,-3) + "***",
        }, 200, "true");
    }
    else{
        responseError(res,null);
    }
}
export async function detail(req,res,next){
    const curentUser = req.curentUser;
    const user = await detailUser(curentUser);
    return user ? await responseSuccess(res,user,200,"ok") : 
    responseError(res,null);
}
export async function update(req,res,next){
    const user = await updateUser(req)
    if(user){
        return await responseSuccess(res,user);
    }
    else{
        responseError(res,"token này không còn giá trị");
    }
}
export async function uploadArea(req,res,next){
    const user = await updateCost(req)
    return user ? await responseSuccess(res,user) : 
    responseError(res,"không thể cập nhập khu vực");
}

export async function remove(req,res,next){
    const curentUser  = req.curentUser;
    const user =  await removeUser(curentUser)
    responseSuccess(res,user)
}

export async function payment(req, res, next){
    const user = await paymentUser(req);
    return user? await responseSuccess(res,user) :
    responseError(res,"token này không còn giá trị");
}
