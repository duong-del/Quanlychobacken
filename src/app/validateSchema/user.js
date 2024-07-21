import { AsyncValidate } from "@/utils/handles/AsyncValidate";
import { User } from "../model/user.model";
import Joi from "joi";
import { Admin } from "../model/admin.model";
import { isValidObjectId } from "mongoose";

export const userCreate = Joi.object({
    name : Joi.string().min(6).max(50).label("tên người dùng").required(),
    email : Joi.string().email().required().label("email").custom((value,helpers)=>
        new AsyncValidate(value,async function(){
            const admin = await Admin.findOne({email: value});
            const user = await User.findOne({email : value});
            return admin || user ? helpers.error("any.exists") : value;

        })
    ),    
    password : Joi.string().min(8).max(50).required().label("mật khẩu"),
    bio : Joi.string().max(500).label("mô tả user"),
    phone : Joi.string().max(10).label("sdt").required(),
    address : Joi.string().max(50).required().label("địa chỉ"),
});

export const userUpdate = Joi.object({
    name : Joi.string().min(6).max(50).label("tên người dùng"),
    email : Joi.string().email().label("email").custom((value,helpers)=>
        new AsyncValidate(value,async function(){
            const admin = await Admin.findOne({email: value});
            const user = await User.findOne({email : value});
            return admin || user ? helpers.error("any.exists") : value;

        })
    ),    
    password : Joi.string().min(8).max(50).label("mật khẩu"),
    bio : Joi.string().max(500).label("mô tả user"),
    phone : Joi.string().max(10).label("sdt"),
    address : Joi.string().max(50).label("địa chỉ"),
});


export const userUpdateArea = Joi.object({
    areaCost: Joi.array().label("danh sach khu ban hang").custom((value, helpers) => {
        for (let i = 0; i < value.length; i++) {
            if (!isValidObjectId(value[i])) {
                return helpers.error("any.invalidmore");
            }
        }
        return value;
    })
})

//login

export const userLogin = Joi.object({
    email:Joi.string().email().required().custom((value,helpers) => 
        new AsyncValidate(value,async function(){
            const user = await User.findOne({email : value});
            return  user ? value : helpers.error("any.notFound");
        })
    ),
    password:Joi.string().min(6).max(50).required().label("password")
})
