import mongoose, {Schema} from "mongoose";
import {CommentSchema} from "./Comment";

const ideaTypes = [{
    ONLINE: {value: 'ONLINE',  },
    OFFLINE: {value: 'OFFLINE',  },
    TECH: {value: 'TECH',  },
    EDU: {value: 'EDU',  }
}];
const ideaStatuses = [{
    OPEN: {value: 'OPEN',  },
    CLOSE: {value: 'CLOSE',  },
    REOPEN: {value: 'REOPEN',  },
    NONE_EXECUTABLE: {value: 'NONE_EXECUTABLE',  }
}];

export const IdeaSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    ratingsQuantity: Number,
    ratingsAverage: Number,
    tags: [{
        type: String,
        enum: Object.keys(ideaTypes)
    }],
    oceanType: {
        type: String,
        enum: ['BLUE', 'RED']
    },
    status: {
        type: String,
        enum: Object.keys(ideaStatuses)
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    upsides: [CommentSchema],
    downsides: [CommentSchema],
    costs: Array,
    targetAudience: Array,
    marketSize: Number,
},{
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});

IdeaSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'idea'
});

export const Idea  = mongoose.models.Idea ||  mongoose.model('idea', IdeaSchema);
export default Idea;
