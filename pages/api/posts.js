import Idea from "../../models/Idea";
import dbConnect from "../../services/dbconnect";
import User from "../../models/User";
import {unstable_getServerSession} from "next-auth/next";
import {authOptions} from "./auth/[...nextauth]";
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

apiRoute.put(async (req, res) => {
    await dbConnect();
    const session = await unstable_getServerSession(req, res, authOptions)
        // console.log(req.body);
        const update = {
            title: req.body.title,
        }
    const posts = await Post.findByIdAndUpdate(req.body._id)
        // .populate({path: 'user', model: User});
    // const file = req.file;
    // findOneAndUpdate
    // if (session) {
    //     // Signed in
    //     await dbConnect();
    //
    //     const filter = { user: session.user };
    //     const update = { $push: {
    //             qualifications: req.body,
    //         },};
    //     const d = await Driver.findOneAndUpdate(
    //         filter,
    //         update,
    //     );
    //     res.status(200).json({data: d});
    // } else {
    //     // Not Signed in
    //     res.status(401)
    // }

    res.end()
    // res.status(200).json({data: "success"});
    // console.log("apiRoute.post");
}).post(async (req, res) => {
    await dbConnect();
    const session = await getSession({ req });
    try {
        if(session) {
            console.log(session.user);
            const data = await Idea.create({...req.body, author: session.user});
            res.status(201).json({data: data});
        }
        res.status(401).json({data: "Not authorized"})
    } catch (error) {
        res.status(400).json({error});
    }
}).get(async (req, res) => {
    await dbConnect();
    try {
        const posts = await Idea.find({})
            .populate({path: 'user', model: User});
        res.status(200).json({data: posts});
    } catch (error) {
        res.status(400).json({error});
    }
});

export default apiRoute;

// export default async function handler(req, res) {
//     const { method } = req;
//     const session = await unstable_getServerSession(req, res, authOptions)
//
//     await dbConnect();
//
//     switch (method) {
//         case 'GET':
//             try {
//                 const posts = await Post.find({})
//                     .populate({ path: 'user', model: User});
//                 res.status(200).json({ success: true, data: posts});
//             } catch (error) {
//                 res.status(400).json({ success: false });
//             }
//             break;
//         case 'POST':
//             try {
//                 const data = await Post.create({...req.body, user: session.user });
//                 res.status(201).json({ success: true, data: data });
//             } catch (error) {
//                 res.status(400).json({ success: false });
//             }
//             break;
//         default:
//             res.status(400).json({ success: false });
//             break;
//     }
// }
