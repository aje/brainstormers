import {model, models, Schema} from "mongoose";

export const userRoles = ['TRAVELER', 'ADMIN', 'DRIVER', 'AGENT'];

export const UserSchema = new Schema({
    name: { type: String, required: true},
    email: String,
    avatar: String,
    role: {
        type: String,
        enum: userRoles
    },
});

export const  User = models.User || model('user', UserSchema);
export default User;
