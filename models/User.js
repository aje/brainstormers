import {model, models, Schema} from "mongoose";

export const userRoles = ['ENTREPRENEUR', 'ADMIN', 'USER', 'CRITIC'];

export const UserSchema = new Schema({
    name: { type: String, required: true},
    email: String,
    avatar: String,
    bio: String,
    password: String,
    role: {
        type: String,
        enum: userRoles
    },
});

export const  User = models.User || model('User', UserSchema);
export default User;
