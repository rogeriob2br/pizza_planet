import mongoose = require('mongoose');

export interface IUser extends mongoose.Document{
    _id: mongoose.Types.ObjectId;
    name: string;
    password: string;
}