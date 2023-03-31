import Idea from "../../../../models/Idea";
import dbConnect from "../../../../services/dbconnect";
import nextConnect from "next-connect";
import mongoose from "mongoose";

const apiRoute = nextConnect({
	onError(error, req, res) {
		res.status(501).json({error: `Sorry something Happened! ${error.message}`});
	},
	onNoMatch(req, res) {
		res.status(405).json({error: `Method '${req.method}' Not Allowed`});
	},
});

apiRoute.get(async (req, res) => {
	try {
		await dbConnect();
		const {id, ...sort} = req.query;
		const posts = await Idea.find({author: mongoose.Types.ObjectId(id)}).sort(sort);
		res.status(200).json(posts);
	} catch (error) {
		res.status(400).json(error);
	}
	res.end();
});

export default apiRoute;
