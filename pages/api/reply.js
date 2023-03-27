import * as models from "../../models/models";
import {notificationTypes} from "../../models/models";
import dbConnect from "../../services/dbconnect";
import nextConnect from "next-connect";
import {getSession} from "next-auth/react";

const apiRoute = nextConnect({
	onError(error, req, res) {
		res.status(501).json({error: `Sorry something Happened! ${error.message}`});
	},
	onNoMatch(req, res) {
		res.status(405).json({error: `Method '${req.method}' Not Allowed`});
	},
});

apiRoute.post(async (req, res) => {
	const session = await getSession({req});
	try {
		if (session) {
			await dbConnect();
			const reply = {description: req.body.description, author: session.user, createAt: new Date()};

			const update = {
				$push: {
					replies: reply,
				},
			};
			const result = await models.Comment.findByIdAndUpdate(req.query.id, update);
			// console.log("to:", req.query.to, session.user._id);
			if (req.query.to !== session.user._id)
				await models.Notification.create({
					type: notificationTypes.REPLY.value,
					content: {...req.body, author: session.user},
					user: req.query.to,
				});
			res.status(201).json(result);
		}
	} catch (error) {
		res.status(400).json(error);
	}
	res.end();
});
export default apiRoute;
