import { Schema, model } from "mongoose";
import ClientModel from "./client.model";
import ProductModel from "./product.model";

export const OrderSchema: Schema = new Schema(  {
    _id: Number,
    date: String,
    status: String,
    client: ClientModel,
    products: {
        product: ProductModel,
        amount: Number
    }[],
    totalPrice: Number
});
export default  model('Order', OrderSchema);