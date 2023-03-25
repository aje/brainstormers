import mongoose, {Schema} from "mongoose";
import User from "./User";

const ideaStatuses = [
	{
		OPEN: {value: "OPEN"},
		CLOSE: {value: "CLOSE"},
		REOPEN: {value: "REOPEN"},
		NONE_EXECUTABLE: {value: "NONE_EXECUTABLE"},
	},
];

export const IdeaSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		// createdAt: {
		//     type: Date,
		//     default: new Date(),
		// },
		raters: [Schema.Types.ObjectId],
		rates: Schema.Types.Mixed,
		ratingsAverage: Number,
		status: {
			type: String,
			enum: Object.keys(ideaStatuses),
		},
		lists: Schema.Types.Mixed,
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		upsides: [],
		downsides: [],
		problems: [],
		solutions: [],
		alternatives: [String],
		targetAudience: String,
		tags: [String],
	},
	{
		toJSON: {virtuals: true}, // So `res.json()` and other `JSON.stringify()` functions include virtuals
		toObject: {virtuals: true}, // So `console.log()` and other functions that use `toObject()` include virtuals
	}
);

IdeaSchema.set("timestamps", true);

IdeaSchema.virtual("comments", {
	ref: "Comment",
	localField: "_id",
	foreignField: "idea",
});
IdeaSchema.virtual("customField", {
	ref: "CustomField",
	localField: "_id",
	foreignField: "idea",
});

IdeaSchema.virtual("ratingsQuantity").get(function () {
	return this.raters?.length || 0;
});

IdeaSchema.statics.calcPostCount = async function (userId) {
	// this points to current model
	//
	// const rates = await this.aggregate([
	//     {
	//         $match: { user: userId }
	//     },
	// ]);
	const userPosts = await this.aggregate([
		{
			$match: {author: userId},
		},
		{
			$count: "postCount",
		},
	]);

	try {
		const t = await User.findByIdAndUpdate(
			userId,
			{
				postCount: userPosts[0].postCount,
			},
			{new: true}
		);
	} catch (e) {
		console.log(e);
	}
};
//
// IdeaSchema.statics.markAsRead = async function (author) {
//     try {
//
//         // if(idea.author.equals(content.author)) {
//             await Notification.create({
//                 type: notificationTypes.RATE.value,
//                 // content: content,
//                 user: author,
//             });
//         // } else {
//         //     console.log("Same user");
//         // }
//     } catch (e) {
//         console.log(e);
//     }
// };

IdeaSchema.post("save", function () {
	this.constructor.calcPostCount(this.author);
});

// IdeaSchema.post('findOne', function() {
//     console.log('findOne', this)
//
//     this.constructor.markAsRead(this.author);
// });

IdeaSchema.pre("deleteOne", function () {
	// console.log('delete', this)
	this.constructor.calcPostCount(this.author);
});

export const Idea = mongoose.models.Idea || mongoose.model("Idea", IdeaSchema);
export default Idea;
