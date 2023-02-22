import mongoose, {Schema} from "mongoose";
import User from "./User";

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
    rates: Schema.Types.Mixed,
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

IdeaSchema.virtual('ratingsQuantity').get(function () {
    return this.raters?.length || 0
});


IdeaSchema.statics.calcPostCount = async function(userId) {
    // this points to current model
    //
    // const rates = await this.aggregate([
    //     {
    //         $match: { user: userId }
    //     },
    // ]);
    const userPosts = await this.aggregate([
        {
            $match: { author: userId }
        },
        {
            $count: "postCount"
        }
        ]);


    try {
        const t = await User.findByIdAndUpdate(userId, {
            postCount: userPosts[0].postCount,
        }, {new: true });
    } catch (e) {

    }
};

IdeaSchema.post('save', function() {
    this.constructor.calcPostCount(this.author);
});

// IdeaSchema.post(/^findOneAnd/, function() {
//     console.log('findOneAnd', this)
//
//     this.constructor.calcPostCount(this.author);
// });

IdeaSchema.pre('deleteOne', function() {
    // console.log('delete', this)
    this.constructor.calcPostCount(this.author);
});

export const Idea  = mongoose.models.Idea ||  mongoose.model('Idea', IdeaSchema);
export default Idea;
