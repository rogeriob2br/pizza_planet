import { Schema, model } from "mongoose";
import ClientModel from "./client.model";
import ProductModel from "./product.model";

export const OrderSchema: Schema = new Schema(  {
    _id: Schema.Types.ObjectId,
    date: String,
    status: String,
    client: {
        type: Schema.ObjectId,
        ref: 'Client',
        required: true 
     },
    products: [{
        product:  {
            type: Schema.ObjectId,
            ref: 'Client',
            required: true
         },
        amount: {
            type: Number , 
            required: true 
        },
        required: true 
    }],
    totalPrice: Number
});
export default  model('Order', OrderSchema);