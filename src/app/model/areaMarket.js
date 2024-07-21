import { createModel } from "./base";
import { Schema } from "mongoose";
const schema = new Schema({
    name : String,
    description : String,
    priceCost : Number,
    status : Boolean
})

const areaMarket = createModel("areaMarket", schema);  
export default areaMarket;