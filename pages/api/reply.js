import * as models from "../../models/models";
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
    const session = await getSession({ req });
    try {
        if(session) {
            await dbConnect();
            const reply = {...req.body, author: session.user, createdAt: new Date()}

            const update = {
                $push: {
                    replies: reply,
                },
            };
            const result = await models.Comment.findByIdAndUpdate(req.query.id, update);
            res.status(201).json(result);
        }
    } catch (error) {
        res.status(400).json(error);
    }
    res.end()
}).delete(async (req, res) => {
    await dbConnect();
    const session = await getSession({ req });
    // try {
    //     if(session) {
    //         // todo find by id and author
    //         const deleted = await models.Comment.findByIdAndDelete(req.query.id);
    //         res.status(200).json(deleted);
    //     }
    // } catch (error) {
    //     res.status(400).json(error);
    // }
    res.end()
});
export default apiRoute