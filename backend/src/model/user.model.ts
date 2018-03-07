import { Schema, model } from "mongoose";


export const UserSchema: Schema = new Schema( {
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});
export default  model('User', UserSchema);