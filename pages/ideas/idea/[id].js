import React from 'react';
import * as models from "../../../models/models"
import {Grid,} from "@nextui-org/react"
import dbConnect from "../../../services/dbconnect";
import Idea from "../../../models/Idea";
import Empty from "../../../components/Empty";
import 'react-tagsinput/react-tagsinput.css'
import IdeaSides from "../../../components/idea/IdeaSides";
import Comments from "../../../components/idea/Comments";
import IdeaRating from "../../../components/idea/IdeaRating";
import IdeaInfoBar from "../../../components/idea/IdeaInfoBar";

// CommentItem.propTypes = {
//     item: PropTypes.shape({
//         createdAt: PropTypes.number,
//         author: PropTypes.any,
//         replyTo: PropTypes.string,
//         description: PropTypes.string,
//         type: PropTypes.string
//     })
// };
const  IdeaPage = ({item, isOwner}) => {
    console.log(item);
    // const item ={
    //     ratingsAverage: 4,
    //     ratingsQuantity: 52 ,
    //     tags: ["Online", "Internet"],
    //     problems: ["Porblems that can be solved ", "For example there is a problem with the social we can"],
    //     upsides: [{
    //         description: "The problem is we corblems that can be solved ",
    //         author: {
    //             name: "behjrooz", image: "https://i.pravatar.cc/150?u=a04258114e29026702d"
    //         },
    //         type: "UPSIDE",
    //         replyTo: "",
    //         createdAt: 1663143033901,
    //     },{
    //         description: "The problem is we can not do that",
    //         author: {
    //             name: "behjrooz", image: "https://i.pravatar.cc/150?u=a04258114e29026702d"
    //         },
    //         type: "UPSIDE",
    //         replyTo: "",
    //         createdAt: 1663143033901,
    //     },{
    //         description: "The problem is we can not do that",
    //         author: {
    //             name: "behjrooz", image: "https://i.pravatar.cc/150?u=a04258114e29026702d"
    //         },
    //         type: "UPSIDE",
    //         replyTo: "",
    //         createdAt: 1663143033901,
    //     },{
    //         description: "The problem is we can not do that",
    //         author: {
    //             name: "behjrooz", image: "https://i.pravatar.cc/150?u=a04258114e29026702d"
    //         },
    //         type: "UPSIDE",
    //         replyTo: "",
    //         createdAt: 1663143033901,
    //     },
    //     ],
    //     downsides: [{
    //         description: "The problem is we can not do that",
    //         author: {
    //             name: "behjrooz", image: "https://i.pravatar.cc/150?u=a04258114e29026702d"
    //         },
    //         type: "DOWNSIDE",
    //         replyTo: "",
    //         createdAt: 1663143033901,
    //     }],
    //     alternatives: ["GYMNER"],
    //     costs: ["1000Rmb"],
    //     targetAudience: ["Everyone"],
    //     marketSize: 10,
    //
    //     title: "This was the great idea",
    //     description: "Lorem  ipsum docolor lorem   Lorem  ipsum docolor lorem   Lorem  ipsum docolor lorem   Lorem  ipsum docolor lorem   Lorem  ipsum docolor lorem    ",
    //     author: {
    //         image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    //         name: "Ariana Wattson",
    //     },
    //     status: "OPEN",
    //     createdAt: 1663143033901,
    //     comments: [
    //         {
    //             author: {
    //                 image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    //                 name: "Ariana Wattson",
    //             },
    //             rating: 2.5,
    //             description: "This idea was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
    //             timestamp: 1663143033901
    //         },
    //         {
    //             author: {
    //                 image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    //                 name: "Ariana Wattson Golabforoush",
    //             },
    //             rating: 5,
    //             description: "This idea was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
    //             images: [
    //                 "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    //                 "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    //                 "https://i.pravatar.cc/150?u=a04258114e29026702d",
    //                 "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    //             ],
    //             timestamp: 1663143033901
    //         },
    //         {
    //             author: {
    //                 image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    //                 name: "Ariana Wattson",
    //             },
    //             rating: 2.5,
    //             description: "This idea was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
    //             timestamp: 1663143033901
    //         },
    //         {
    //             author: {
    //                 image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    //                 name: "Ariana Wattson",
    //             },
    //             rating: 2.5,
    //             description: "This idea was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
    //             timestamp: 1663143033901
    //         },
    //         {
    //             author: {
    //                 image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    //                 name: "Ariana Wattson",
    //             },
    //             rating: 2.5,
    //             description: "This idea was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
    //             timestamp: 1663143033901
    //         },
    //         {
    //             author: {
    //                 image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    //                 name: "Ariana Wattson",
    //             },
    //             rating: 2.5,
    //             description: "This idea was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
    //             timestamp: 1663143033901
    //         },
    //         {
    //             author: {
    //                 image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    //                 name: "Ariana Wattson",
    //             },
    //             rating: 2.5,
    //             description: "This idea was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
    //             timestamp: 1663143033901
    //         },
    //         {
    //             author: {
    //                 image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    //                 name: "Ariana Wattson",
    //             },
    //             rating: 2.5,
    //             description: "This idea was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
    //             timestamp: 1663143033901
    //         },
    //         {
    //             author: {
    //                 image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    //                 name: "Ariana Wattson",
    //             },
    //             rating: 2.5,
    //             description: "This idea was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
    //             timestamp: 1663143033901
    //         },
    //         {
    //             author: {
    //                 image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    //                 name: "Ariana Wattson",
    //             },
    //             rating: 2.5,
    //             description: "This idea was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
    //             timestamp: 1663143033901
    //         },
    //     ]
    // };





    if(!item) return <div className={"my-28"}><Empty label={"Error 404"} /></div>

    return (<Grid.Container
        style={{height: "calc(100vh - 117px)"}}
        gap={0} justify="center" className={"overflow-y-hidden"}>

        <Grid xs={5} className="bg-blue-50 pt-24 h-full">
            <div className="relative h-full flex flex-col w-full">
                <IdeaInfoBar item={item} isOwner={isOwner}/>
                <IdeaRating item={item} isOwner={isOwner}/>
            </div>
        </Grid>
        <Grid xs={7} className=" bg-red-50s pt-20 h-full">
            <Grid.Container alignContent={"start"} className={" overflow-y-auto h-full"}>
                <IdeaSides item={item}/>
                <Comments item={item}/>
            </Grid.Container>
        </Grid>
    </Grid.Container>);
};

export default IdeaPage;

export async function getServerSideProps({ params }) {
    const {id} = params;
    await dbConnect();
    let item = null;
    try {
        item = await Idea.findOne({ _id: id})
            .populate({ path: 'author', model: models.User})
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    model: models.User
                },
                select: 'idea  description createdAt' ,
                options: { sort: { 'createdAt': -1 } }})
        // console.log(item);
    } catch (e) {
        console.log(e);
    }
    return {
        props: {
            item: JSON.parse(JSON.stringify(item)),
            isOwner: true
        },
    };
}
