import mongoose = require('mongoose');

export interface IClient extends mongoose.Document{
    _id: mongoose.Types.ObjectId;
    name: string;
    cpf: string;
    phone1: string;
    phone2: string;
    address: {
        place: string;
        city: string;
        zipCode: string;
        number: number;
        neighborhood: string;
        info: string;
    }
}
