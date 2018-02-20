import mongoose = require('mongoose');
import { Document, Schema, Model, model} from "mongoose";
import { IClient } from "../MongoDB/IClient";

export var clientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cpf: {type: String},
    phone1: {type: String, required: true},
    phone2: {type: String},
    address: {
        place: {type: String},
        city: {type: String},
        zipCode: {type: String},
        number: {type: String},
        neighborhood: {type: String},
        info: {type: String}
    }

});