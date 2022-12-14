import mongoose, {Schema} from "mongoose";

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
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    raters: [Schema.Types.ObjectId],
    rates: Schema.Types.Mixed
    ,
    ratingsQuantity: Number,
    ratingsAverage: Number,
    status: {
        type: String,
        enum: Object.keys(ideaStatuses)
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    upsides: [],
    downsides: [],
    problems: [],
    solutions: [],

    alternatives: [String],
    targetAudience: String,
    tags: [String],

},{
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});

IdeaSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'idea'
});

export const Idea  = mongoose.models.Idea ||  mongoose.model('Idea', IdeaSchema);
export default Idea;
