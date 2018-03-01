import { Schema, model } from "mongoose";


export const UserSchema: Schema = new Schema( {
    id: Number,
    name: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});
export default  model('User', UserSchema);