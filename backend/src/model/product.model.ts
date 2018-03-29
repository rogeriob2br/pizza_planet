import { Schema, model } from "mongoose";

export const ProductSchema: Schema = new Schema( {
    _id: Schema.Types.ObjectId,
    combo: Number,
    categoria: String,
    name: String,
    price: Number,
    ingredientes: [{   
            type: String         
    }]
});
export default  model('Product', ProductSchema);