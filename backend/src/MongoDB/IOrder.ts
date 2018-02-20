import mongoose = require('mongoose');
import {IClient} from "./IClient";
import {IProduct} from "./IProduct";

export interface IOrder extends mongoose.Document{
    _id: mongoose.Types.ObjectId;
    date: string;
    status: string;
    client: IClient;
    products: {
        product: IProduct;
        amount: number;
    }[];
    totalPrice: number;
}