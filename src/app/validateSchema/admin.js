import { AsyncValidate } from "@/utils/handles/AsyncValidate";
import { Admin } from "../model/admin.model";
import Joi from "joi";

export const adminCreate = Joi.object({
    adminname : Joi.string().min(6).max(40).required().custom((value,helpers)=>
        new AsyncValidate(value, async function(){
            const admin = await Admin.findOne({adminname : value});
            return !admin ? value : helpers.error("any.exists");
        })
    ),
    password : Joi.string().required(),
    email : Joi.string().email().required().custom((value,helpers)=>
        new AsyncValidate(value,async function(){
            const admin = await Admin.findOne({email : value});
            return !admin ? value : helpers.error("any.exists");
        })
    )
});

export const adminLogin = Joi.object({
    email:Joi.string().email().required().custom((value,helpers) => 
        new AsyncValidate(value,async function(){
            const admin = await Admin.findOne({email : value});
            return  admin ? value : helpers.error("any.notFound");
        })
    ),
    password:Joi.string().min(6).max(50).required()
})