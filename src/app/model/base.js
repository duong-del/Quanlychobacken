import {Schema , model } from "mongoose";

export const createModel = (name , define , options ) => {
    const schema = new Schema(define, {
        timestamps : { createdAt : "created_at" , updatedAt : "updated_at"},
        ...(options ? options : {})
    });
    return model(name, schema);
};