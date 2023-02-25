import mongoose, {Schema} from "mongoose";
import User from "./User";
import Idea from "./Idea";
import Notification, {notificationTypes} from "./Notification";

const commentTypes = [
	{
		SOLUTION: {value: "SOLUTION"},
		BENEFITS: {value: "BENEFITS"},
		UNIQUENESS: {value: "UNIQUENESS"},
		UPSIDE: {value: "UPSIDE"},
		DOWNSIDE: {value: "DOWNSIDE"},
	},
];

export const CommentSchema = new Schema({
	description: {
		type: String,
		required: [true, "Comment cannot be empty!"],
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, "Comment must have an author"],
	},
	idea: {
		type: Schema.Types.ObjectId,
		ref: "Idea",
		required: [true, "Comment must belong to a post"],
	},
	type: {
		type: String,
		enum: Object.keys(commentTypes),
	},
	replyTo: {
		type: Schema.Types.ObjectId,
		ref: "Comment",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

CommentSchema.statics.notifAuthor = async function (ideaId, content) {
	try {
		const idea = await Idea.findById(ideaId);
		if(!idea.author.equals(content.author)) {
			await Notification.create({
				type: notificationTypes.COMMENT.value,
				content: content,
				user: idea.author,
			});
		} else {
			console.log("Same user");
		}
	} catch (e) {
		console.log(e);
	}
};

CommentSchema.post("save", function () {
	this.constructor.notifAuthor(this.idea, this);
});

// CommentSchema.statics.calcAverageRatings = async function(postId, userId) {
//     // this points to current model
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
//
//     try {
//         const t = await myModels.Driver.findOneAndUpdate({user: userId}, {
//             ratingsQuantity: statsDriver[0].nRatings,
//             ratingsAverage: statsDriver[0].avgRating
//         });
//     } catch (e) {
//     }
// };
//
// CommentSchema.pre(/^findOneAnd/, async function(next) {
//     this.r = await this.findOne();
//     next();
// });
//
// CommentSchema.post(/^findOneAnd/, async function(next) {
//     await this.r.constructor.calcAverageRatings(this.r.post, this.r.user)
// });
//
// CommentSchema.post('save', function() {
//     this.constructor.calcAverageRatings(this.post, this.user);
// });
//
// CommentSchema.post('create', function() {
//     this.constructor.calcAverageRatings(this.post, this.user);
// });

export const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;
