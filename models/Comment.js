import mongoose, {Schema} from "mongoose";

const commentTypes = [{
    SOLUTION: {value: 'SOLUTION',  },
    BENEFITS: {value: 'BENEFITS',  },
    UNIQUENESS: {value: 'UNIQUENESS',  },
    UPSIDE: {value: 'UPSIDE',  },
    DOWNSIDE: {value: 'DOWNSIDE',  }
}];

export const CommentSchema = new Schema({
    description: {
        type: String,
        required: [true, 'Comment cannot be empty!']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Comment must have an author']
    },
    idea: {
        type: Schema.Types.ObjectId,
        ref: 'Idea',
        required: [true, 'Comment must belong to a post']
    },
    type: {
        type: String,
        enum: Object.keys(commentTypes)
    },
    replyTo: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

// CommentSchema.statics.calcAverageRatings = async function(postId, userId) {
//     // console.log("[calcAverageRatings]",  userId);
//     // this points to current model
//     // console.log("[calcAverageRatings]");
//
//     const statsDriver = await this.aggregate([
//         {
//             $match: { user: userId }
//         },
//         {
//             $group: {
//                 _id: '$post',
//                 nRatings: { $sum: 1 },
//                 avgRating: { $avg: '$rating' }
//             }
//         }
//     ]);
//
//     const stats = await this.aggregate([
//         {
//             $match: { post: postId }
//         },
//         {
//             $group: {
//                 _id: '$post',
//                 nRatings: { $sum: 1 },
//                 avgRating: { $avg: '$rating' }
//             }
//         }
//     ]);
//     await myModels.Idea.findByIdAndUpdate(postId, {
//         ratingsQuantity: stats[0].nRatings,
//         ratingsAverage: stats[0].avgRating
//     });
//     //
//     // console.log("[StatsDriver]", statsDriver);
//
//     try {
//         const t = await myModels.Driver.findOneAndUpdate({user: userId}, {
//             ratingsQuantity: statsDriver[0].nRatings,
//             ratingsAverage: statsDriver[0].avgRating
//         });
//         // console.log("[RESULT]",t);
//     } catch (e) {
//         console.log(e)
//     }
// };
//
// CommentSchema.pre(/^findOneAnd/, async function(next) {
//     this.r = await this.findOne();
//     // console.log(r);
//     next();
// });
//
// CommentSchema.post(/^findOneAnd/, async function(next) {
//     await this.r.constructor.calcAverageRatings(this.r.post, this.r.user)
// });
//
// CommentSchema.post('save', function() {
//     console.log("[POST SAVE]",  this.post);
//     this.constructor.calcAverageRatings(this.post, this.user);
// });
//
// CommentSchema.post('create', function() {
//     console.log("[POST create]", this.user);
//     this.constructor.calcAverageRatings(this.post, this.user);
// });


export const Comment = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
export default Comment;
