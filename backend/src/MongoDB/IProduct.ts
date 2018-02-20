import mongoose = require('mongoose');

export interface IProduct extends mongoose.Document{
    _id: mongoose.Types.ObjectId;
    name: string;
    price: number;
}