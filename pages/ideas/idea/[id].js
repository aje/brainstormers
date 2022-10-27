import React, {useState} from 'react';
// import {useRouter} from "next/router";
import {Button, Card, Grid, Text, User,} from "@nextui-org/react"
import {EmojiSad} from "@styled-icons/entypo/EmojiSad";
import MyRating from "../../../components/MyRating";
import {Check} from "@styled-icons/entypo/Check";
import * as PropTypes from "prop-types";
import CommentItem from "../../../components/CommentItem";
import CommentForm from "../../../components/CommentForm";


CommentItem.propTypes = {
    item: PropTypes.shape({
        createdAt: PropTypes.number,
        author: PropTypes.any,
        replyTo: PropTypes.string,
        description: PropTypes.string,
        type: PropTypes.string
    })
};
const  IdeaPage = () => {
    // console.log(item);
    const item ={
        ratingsAverage: 4,
        ratingsQuantity: 52 ,
        tags: ["Online", "Internet"],
        problems: ["Porblems that can be solved ", "For example there is a problem with the social we can"],
        upsides: [{
            description: "The problem is we corblems that can be solved ",
            author: {
                name: "behjrooz", image: "https://i.pravatar.cc/150?u=a04258114e29026702d"
            },
            type: "UPSIDE",
            replyTo: "",
            createdAt: 1663143033901,
        },{
            description: "The problem is we can not do that",
            author: {
                name: "behjrooz", image: "https://i.pravatar.cc/150?u=a04258114e29026702d"
            },
            type: "UPSIDE",
            replyTo: "",
            createdAt: 1663143033901,
        },{
            description: "The problem is we can not do that",
            author: {
                name: "behjrooz", image: "https://i.pravatar.cc/150?u=a04258114e29026702d"
            },
            type: "UPSIDE",
            replyTo: "",
            createdAt: 1663143033901,
        },{
            description: "The problem is we can not do that",
            author: {
                name: "behjrooz", image: "https://i.pravatar.cc/150?u=a04258114e29026702d"
            },
            type: "UPSIDE",
            replyTo: "",
            createdAt: 1663143033901,
        },
        ],
        downsides: [{
            description: "The problem is we can not do that",
            author: {
                name: "behjrooz", image: "https://i.pravatar.cc/150?u=a04258114e29026702d"
            },
            type: "DOWNSIDE",
            replyTo: "",
            createdAt: 1663143033901,
        }],
        alternatives: ["GYMNER"],
        costs: ["1000Rmb"],
        targetAudience: ["Everyone"],
        marketSize: 10,

        title: "This was the great idea",
        description: "Lorem  ipsum docolor lorem   Lorem  ipsum docolor lorem   Lorem  ipsum docolor lorem   Lorem  ipsum docolor lorem   Lorem  ipsum docolor lorem    ",
        author: {
            image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            name: "Ariana Wattson",
        },
        status: "OPEN",
        createdAt: 1663143033901,
        comments: [
            {
                author: {
                    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    name: "Ariana Wattson",
                },
                rating: 2.5,
                description: "This idea was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
                timestamp: 1663143033901
            },
            {
                author: {
                    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
                    name: "Ariana Wattson Golabforoush",
                },
                rating: 5,
                description: "This idea was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
                images: [
                    "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                    "https://i.pravatar.cc/150?u=a042581f4e29026704d",
                    "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    "https://i.pravatar.cc/150?u=a048581f4e29026701d",
                ],
                timestamp: 1663143033901
            },
            {
                author: {
                    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    name: "Ariana Wattson",
                },
                rating: 2.5,
                description: "This idea was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
                timestamp: 1663143033901
            },
            {
                author: {
                    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    name: "Ariana Wattson",
                },
                rating: 2.5,
                description: "This idea was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
                timestamp: 1663143033901
            },
            {
                author: {
                    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    name: "Ariana Wattson",
                },
                rating: 2.5,
                description: "This idea was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
                timestamp: 1663143033901
            },
            {
                author: {
                    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    name: "Ariana Wattson",
                },
                rating: 2.5,
                description: "This idea was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
                timestamp: 1663143033901
            },
            {
                author: {
                    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    name: "Ariana Wattson",
                },
                rating: 2.5,
                description: "This idea was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
                timestamp: 1663143033901
            },
            {
                author: {
                    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    name: "Ariana Wattson",
                },
                rating: 2.5,
                description: "This idea was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
                timestamp: 1663143033901
            },
            {
                author: {
                    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    name: "Ariana Wattson",
                },
                rating: 2.5,
                description: "This idea was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
                timestamp: 1663143033901
            },
            {
                author: {
                    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    name: "Ariana Wattson",
                },
                rating: 2.5,
                description: "This idea was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
                timestamp: 1663143033901
            },
        ]
    };

    // const router = useRouter();
    // const { id } = router.query;
    return (<Grid.Container
        style={{height: "calc(100vh - 117px)"}}
        gap={0} justify="center" className={"overflow-y-hidden"}>
        <Grid xs={5} className="bg-blue-50 pt-24 h-full">
            <div className="relative h-full flex flex-col">
                <div className="hsl px-10 flex-1 overflow-y-auto">
                    <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <User size="sm" src={item.author.avatar} name={item.author.name}/>
                            <div>{item.tags.map(t => <a className={"hover:underline hover:text-gray-500 transition-all font-bold italic text-gray-300 mr-3"}>{t}</a>)}</div>
                    </div>
                        <MyRating count={item.ratingsQuantity} size={"lg"} value={item.ratingsAverage} readonly/>
                    </div>
                    <Text h2>Idea: <span className={"font-normal"}>{item.title}</span></Text>


                    <Text className={"text-2xl mb-5 text-gray-500 font-light"}>{item.description}</Text>
                    <Text h3>Problems:</Text>
                    {item.problems.map((p, i) => <Text className={""}>- {p}</Text>)}


                    <Text h3 className={"mt-5"}>Alternatives:</Text>
                    {item.problems.map((p, i) => <Text className={""}>- {p}</Text>)}

                    <Text h3 className={"mt-5"}>Costs:</Text>
                    {item.problems.map((p, i) => <Text className={""}>- {p}</Text>)}

                    <Text h3 className={"mt-5"}>TargetAudience:</Text>
                    {item.problems.map((p, i) => <Text className={""}>- {p}</Text>)}

                    <Text h3 className={"mt-5"}>MarketSize:</Text>
                    {item.problems.map((p, i) => <Text className={""}>- {p}</Text>)}
                    <Text h3 className={"mt-5"}>Costs:</Text>
                    {item.problems.map((p, i) => <Text className={""}>- {p}</Text>)}


                </div>
                <div className=" to-blue-50 pt-0 p-5 bg-gradient-to-t from-white  w-full">
                    <Text className={"text-2xl text-gray-400 mt-5 font-light"}>Rate this idea:</Text>
                    <MyRating size={"xl"} />
                    <div className={"justify-between mt-5 flex"}>
                        <Button
                            auto
                            borderWeight={"bold"}
                            icon={<EmojiSad size={34} />}
                            bordered size={"xl"} ghost color={"error"}
                            className={" font-bold text-2xl"}>DON'T DO IT</Button>

                        <Button
                            auto
                            borderWeight={"bold"}
                            icon={<Check size={40} />}
                            bordered
                            size={"xl"}
                            ghost color={"primary"}
                            className={" font-bold text-2xl"}>LET'S DO IT</Button>
                    </div>
                </div>
            </div>
        </Grid>
        <Grid xs={7} className=" bg-red-50s pt-20 h-full">
            <Grid.Container alignContent={"start"} className={" overflow-y-auto h-full"}>
                <Grid xs={6} className={"bg-green-50 p-5"}>
                    <div className={"w-full"}>
                        <Text h3 className={"text-green-500"}>{item.upsides.length} Upside{item.upsides.length > 1 && "s"}</Text>
                        {item.upsides.map((u, i) => <CommentItem dense item={u} key={i}/>)}
                    </div>
                </Grid>
                <Grid xs={6} className={"bg-red-50 p-5"}>
                    <div className={"w-full"}>
                        <Text h3 className={"text-red-500"}>{item.downsides.length} Downside{item.downsides.length > 1 && "s"}</Text>
                        {item.downsides.map((u, i) => <CommentItem dense item={u} key={i}/>)}
                    </div>
                </Grid>

                <Grid xs={12} className={"p-7"}>
                    <div>
                        <Text h3>What do <span className={"text-primary"}>YOU</span> think about this idea?</Text>
                        <CommentForm />
                        <Text h3>{item.comments.length} Comments</Text>

                        {item.comments.map((u, i) => <CommentItem item={u} key={i}/>)}



                    </div>
                </Grid>
            </Grid.Container>
        </Grid>
    </Grid.Container>);
};

export default IdeaPage;
//
// export async function getServerSideProps({ params }) {
//     const {id} = params;
//     await dbConnect();
//     let item = null;
//     try {
//         item = await Idea.findOne({ _id: id})
//             // .populate({ path: 'user', model: models.User})
//             // .populate({ path: 'reviews', select: 'post user rating description createdAt', options: { sort: { 'createdAt': -1 } }});
//         // console.log(item);
//     } catch (e) {
//         console.log(e);
//     }
//     return {
//         props: {
//             item: JSON.parse(JSON.stringify(item)),
//         },
//     };
// }
