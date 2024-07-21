import { responseSuccess } from "@/utils/helpers/response.helper"
import { filterAreaMarket,createareaMarket,detailareaMarket,updateareaMarket,removeareaMarket } from "../services/areaMarket.service"

export async function filter(req, res, next) {
    const areaMarket = await filterAreaMarket(req.query);
    return areaMarket? await responseSuccess(res,areaMarket)
    : await responseError(res, null);
}

export async function create(req,res,next){
    const areaMarket = await createareaMarket(req.body);
    return areaMarket? await responseSuccess(res,areaMarket)
    : await responseError(res, null); 
}
export async function detail(req,res,next){
    const areaMarket = await detailareaMarket(req.query);
    return areaMarket? await responseSuccess(res,areaMarket)
    : await responseError(res, null); 
}
export async function update(req,res,next){
    const areaMarket = await updateareaMarket(req.body);
    return areaMarket? await responseSuccess(res,areaMarket)
    : await responseError(res, null); 
}
export async function remove(req,res,next){
    const areaMarket = await removeareaMarket(req.body);
    return areaMarket? await responseSuccess(res,areaMarket)
    : await responseError(res, null); 
}

