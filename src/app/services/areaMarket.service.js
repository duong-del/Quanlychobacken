
import { parseInt, toInteger } from "lodash";
import areaMarket from "../model/areaMarket";

export const filterAreaMarket = async ({ q , page , limit ,field, sort})=>{
    q = q ? { "$regex" : q , "$options" : "i"} : null;
    
    const filter = {
        ...(q && {$or : [ 
            {name : q} ,
            {description : q}, 
        ]})
    }
    const jump = (page-1)*limit; 

    const areaM = await areaMarket.find(filter)
        .skip(jump)
        .limit(limit)
        .sort({[field] : sort});

    return areaM;
}

export async function createareaMarket({name,description,priceCost}){
    const areamarket = new areaMarket({
        name : name,
        description : description,
        priceCost : priceCost,
        status : true
    })

    return areamarket.save();
}

export async function detailareaMarket({_id}){
    console.log(_id,"get de")
    return await areaMarket.findById(_id);
}

export async function updateareaMarket({_id,name, description,priceCost,status}){
   const data = await areaMarket.updateOne({_id:_id}, {name, description, priceCost, status});
   return data.acknowledged
}

export async function removeareaMarket({_id}){
    return await areaMarket.deleteOne({_id : _id})
}