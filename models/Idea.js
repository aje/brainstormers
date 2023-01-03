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
    rates: Schema.Types.Mixed,
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
//
// IdeaSchema.statics.calcAverageRatings = async function(postId) {
//     // console.log("[calcAverageRatings]",  userId);
//     // this points to current model
//     // console.log("[calcAverageRatings]");
//     //
//     const rates = await this.aggregate([
//         {
//             $match: { user: userId }
//         },
//     ]);
//
//     try {
//         // const t = await myModels.Driver.findOneAndUpdate({user: userId}, {
//         //     ratingsQuantity: statsDriver[0].nRatings,
//         //     ratingsAverage: statsDriver[0].avgRating
//         // });
//     } catch (e) {
//         console.log(e)
//     }
// };
//
// IdeaSchema.pre(/^findOneAnd/, async function(next) {
//     this.r = await this.findOne();
//     // console.log(r);
//     next();
// });
//
// IdeaSchema.post(/^findOneAnd/, async function(next) {
//     await this.r.constructor.calcAverageRatings(this.r.post, this.r.user)
// });
//
// IdeaSchema.post('save', function() {
//     this.constructor.calcAverageRatings(this.post, this.user);
// });

// IdeaSchema.post('create', function() {
//     this.constructor.calcAverageRatings(this.post, this.user);
// });

export const Idea  = mongoose.models.Idea ||  mongoose.model('Idea', IdeaSchema);
export default Idea;
