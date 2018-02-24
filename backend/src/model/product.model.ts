import { Schema, model } from "mongoose";

export const ProductSchema: Schema = new Schema( {
    _id: Number,
    name: String,
    price: Number
});
export default  model('Product', ProductSchema);