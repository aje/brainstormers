import * as models from "../../models/models";
import dbConnect from "../../services/dbconnect";
import nextConnect from "next-connect";
import {getSession} from "next-auth/react";

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.post(async (req, res) => {
    const session = await getSession({ req });
    try {
        if(session) {
            await dbConnect();
            const comment = {...req.body, author: session.user}
            const result = await models.Comment.create(comment);
            res.status(201).json(result);
        }
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
    res.end()
})
//
// export default async function handler(req, res) {
//     const { method } = req;
//
//     await dbConnect();
//
//     switch (method) {
//         case 'GET':
//             // try {
//             //     const posts = await Post.find({})
//             //         .populate({ path: 'user', model: User});
//             //     // const totalElements = await Post.count({});
//             //     res.status(200).json({ success: true, data: posts});
//             // } catch (error) {
//             //     res.status(400).json({ success: false });
//             // }
//             break;
//         case 'POST':
//             try {
//                 const comment = {...req.body, author: session.user}
//                 const result = await models.Comment.create(comment);
//                 res.status(201).json(result);
//             } catch (error) {
//                 res.status(400).json(error);
//             }
//             break;
//         default:
//             res.status(400).json({ success: false });
//             break;
//     }
// }
export default apiRoute