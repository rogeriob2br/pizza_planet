import { Schema, model } from "mongoose";

export const ProductSchema: Schema = new Schema( {
    _id: Schema.Types.ObjectId,
    name: String,
    price: Number,
    ingredientes: [{
        ingrediente: {
            Types: String    
        }
    }]
});
export default  model('Product', ProductSchema);