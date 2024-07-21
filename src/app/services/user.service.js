import { User } from "../model/user.model";
import _ from "lodash"
import { updateareaMarket } from "./areaMarket.service";

export const createUser = async (req) => {
    try {
        const payload = req.body;

        const user = new User({
            name: payload.name ,
            password: payload.password,
            email: payload.email,
            phone : payload.phone,
            address: payload.address,
            bio: payload.bio || "",
        });

        return await user.save();
    }
    catch (err) {
        return false;
    }
}

export const detailUser = async ({email}) => {
    const user = await User.findOne({email:email});
    return user;
}

export const updateCost = async (req) => {
    const {areaCost} = req.body || [];
    console.log(areaCost)
    const newarea = _.uniq(areaCost) ;
    const {email} = req.curentUser;
    const user = await User.findOne({email:email});
    
    await Promise.all(user.areaCost.map(async (_id) => {
        await updateareaMarket({
            _id: _id,
            status: true,
        })
    })) 
    
    user.areaCost = newarea
    await Promise.all(newarea.map( async (_id)=>{
        await updateareaMarket({
            _id : _id,
            status : false,
        })
    }))
    return await user.save();
}

export async function paymentUser(req){
    const {email} = req.curentUser;
    const user = await User.findOne({email:email})
    if(user){
        user.unpaid = 0
        return await user.save();
    }
    else{
        return false;
    }
}

export const updateUser = async (req) => { 
    const user = await User.findOne({email:req.curentUser.email});
    if(!user) return false;
    const payload = req.body;

    payload.name ? user.name = payload.name : "";
    payload.email ? user.email = payload.email : "";
    payload.phone? user.phone = payload.phone : "";
    payload.address? user.address = payload.address : "";
    payload.bio ? user.bio = payload.bio : "";

    return await user.save();
}

export const removeUser = async ({email})=>{
    return await User.deleteOne({email : email});
}

//login/out

export const loginUser = async (payload)=>{
    const user = await User.findOne({email : payload.email , password : payload.password});
    return user;
}
