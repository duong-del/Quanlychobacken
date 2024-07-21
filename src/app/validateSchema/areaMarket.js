import { AsyncValidate } from "@/utils/handles/AsyncValidate";
import areaMarket from "../model/areaMarket";
import Joi from "joi";
import { tryValidateOrDefault } from "@/utils/helpers/validate.helpers"
import {isValidObjectId} from "mongoose"

export const filterArea = Joi.object({
    q : tryValidateOrDefault(Joi.string().trim(),""),
    page : tryValidateOrDefault(Joi.number().integer().min(1),1),
    limit : tryValidateOrDefault(Joi.number().integer().min(5),20),
    field: tryValidateOrDefault(Joi.valid("created_at", "name", "description","priceCost"), "created_at"),
    sort : tryValidateOrDefault(Joi.number().integer().valid(1,-1),1)
}).unknown(true)

export const areaCreate = Joi.object({
    name : Joi.string().min(6).max(40).required().custom((value,helpers)=>
        new AsyncValidate(value, async function(){
            const admin = await areaMarket.findOne({name : value});
            return !admin ? value : helpers.error("any.exists");
        })
    ),
    description : Joi.string().required(),
    priceCost : Joi.number().required().label("gía thuê khu vực bán của chợ"),
    status : Joi.boolean().label("chưa được thuê")
});

export const areaUpdate = Joi.object({
    _id : Joi.string().required().custom((value,helpers)=>{
        if(!isValidObjectId(value)){
            return helpers.error("any.invalid");
        }
        return new AsyncValidate(value, async function(){
            const area = await areaMarket.findOne({_id:value});
            return area? value : helpers.error("any.notFound");
        })}
    ),
    name : Joi.string().min(6).max(40).custom((value,helpers)=>
        new AsyncValidate(value, async function(){
            const admin = await areaMarket.findOne({name : value});
            return !admin ? value : helpers.error("any.exists");
        })
    ),
    description : Joi.string(),
    priceCost : Joi.number().label("gía thuê khu vực bán của chợ"),
    status : Joi.boolean().label("chưa được thuê")
})

export const areaDelete = Joi.object({
    _id : Joi.string().required().custom((value,helpers)=>{
        if(!isValidObjectId(value)){
            return helpers.error("any.invalid");
        }
        return new AsyncValidate(value, async function(){
            const area = await areaMarket.findOne({_id:value});
            return area? value : helpers.error("any.notFound");
        })}
    )
})

