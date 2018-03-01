import { Schema, model } from "mongoose";

export const ClientSchema: Schema = new Schema( {
    _id: Schema.Types.ObjectId,
    name: String,
    cpf: String,
    phone1: String,

    phone2: String,
    address: {
        place: String,
        city: String,
        zipCode: String,
        number: Number,
        neighborhood: String,
        info: String
    }
});
export default  model('Client', ClientSchema);