import {model, models, Schema} from "mongoose";

export const notificationTypes = {
	COMMENT: {value: "COMMENT"},
	RATE: {value: "RATE"},
};

export const NotificationSchema = new Schema({
    type: {
        type: String,
        enum: Object.keys(notificationTypes)
    },
    content: Schema.Types.Mixed,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    seen: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
},{
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});



export const  Notification = models.Notification || model('Notification', NotificationSchema);
export default Notification;