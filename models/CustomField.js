import mongoose, {Schema} from "mongoose";
import Idea from "./Idea";

export const CustomFieldSchema = new Schema({
	title: {
		type: String,
		required: [true, "Title cannot be empty!"],
	},
	idea: {
		type: Schema.Types.ObjectId,
		ref: "Idea",
		required: [true, "Custom field must belong to a post"],
	},
	items: [],
});

CustomFieldSchema.set("timestamps", true);

export const CustomField = mongoose.models.CustomField || mongoose.model("CustomField", CustomFieldSchema);
export default CustomField;
