import {model, models, Schema} from "mongoose";

export const userRoles = ["ENTREPRENEUR", "ADMIN", "USER", "CRITIC"];

export const UserSchema = new Schema({
    name: { type: String, required: true},
    email: String,
    avatar: String,
    bio: String,
    password: String,
    postCount: Number,
    role: {
        type: String,
        enum: userRoles
    },
},{
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});





export const  User = models.User || model('User', UserSchema);
export default User;
