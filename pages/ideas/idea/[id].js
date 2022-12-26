import React, {useState} from 'react';
// import {useRouter} from "next/router";
import {Button, Dropdown, Grid, Input, Text, Textarea, User,} from "@nextui-org/react"
import {EmojiSad} from "@styled-icons/entypo/EmojiSad";
import MyRating from "../../../components/MyRating";
import {Check} from "@styled-icons/entypo/Check";
import * as PropTypes from "prop-types";
import CommentItem from "../../../components/CommentItem";
import CommentForm from "../../../components/CommentForm";
import dbConnect from "../../../services/dbconnect";
import Idea from "../../../models/Idea";
import {models} from "mongoose";
import Empty from "../../../components/Empty";
import {DotsThreeVertical} from "@styled-icons/entypo/DotsThreeVertical";
import axios from "../../../services/axios";
import {toast} from "react-hot-toast";
import {useRouter} from "next/router";
import {Edit} from "@styled-icons/entypo";
import {Close} from "@styled-icons/remix-line";
import FormList from "../../../components/FormList";
import TagsInput from "react-tagsinput";
import 'react-tagsinput/react-tagsinput.css'

CommentItem.propTypes = {
    item: PropTypes.shape({
        createdAt: PropTypes.number,
        author: PropTypes.any,
        replyTo: PropTypes.string,
        description: PropTypes.string,
        type: PropTypes.string
    })
};
const  IdeaPage = ({item, isOwner}) => {
    // console.log(item);
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

    const [editable, setEditable] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(item);

    const [problems, setProblems] = useState(item.problems);
    const [ideas, setIdeas] = useState(item.solutions);
    const [alts, setAlts] = useState(item.alternatives);

    const onDropdown = (key) => {
        switch (key) {
            case "upload":

                break;
            case "edit":
                // setEdit(true)
                break;
            case "logout":
                // signOut({ callbackUrl: '/' });
                break;
            default:

        }
    };


    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
    }
    const  editItem = (name) => e => {
        if(isOwner)
            setEditable(name)
    }

    const onChange = name => event => {
        setFormData( {...formData, [name]: event?.target ? event.target.value: event });
    };

    function onSave() {
        setLoading(true);
        axios.patch(`/posts`, formData).then((res)=>{
            toast.success("Successfully updated!");
            setEditable(null);
            refreshData();
            // console.log(data);
            // setFormData(data)
            // setStep(1)
            // router.push(`/ideas/idea/${res.data?.id}`)
        }).finally(() => setLoading(false))
    }
    // const router = useRouter();
    // const { id } = router.query;


    const addProblem = () => {
        const t = [...problems]
        t.push("");
        setProblems(t);
    }

    const removeProblem = (i) => e => {
        const t = [...problems]
        t.splice(i, 1);
        setProblems(t);
    }

    const onChangeProblem = (i) => e => {
        const t = [...problems]
        t[i] = e.target.value;
        setProblems(t);
    }

    const addIdeas = () => {
        const t = [...ideas]
        t.push("");
        setIdeas(t);
    }

    const removeIdeas = (i) => e => {
        const t = [...ideas]
        t.splice(i, 1);
        setIdeas(t);
    }

    const onChangeIdeas = (i) => e => {
        const t = [...ideas]
        t[i] = e.target.value;
        setIdeas(t);
    }

    const addAlts = () => {
        const t = [...alts]
        t.push("");
        setAlts(t);
    }

    const removeAlts = (i) => e => {
        const t = [...alts]
        t.splice(i, 1);
        setAlts(t);
    }

    const onChangeAlts = (i) => e => {
        const t = [...alts]
        t[i] = e.target.value;
        setAlts(t);
    }
    if(!item) return <div className={"my-28"}><Empty label={"Error 404"} /></div>
    console.log(editable);

    return (<Grid.Container
        style={{height: "calc(100vh - 117px)"}}
        gap={0} justify="center" className={"overflow-y-hidden"}>
        <Grid xs={5} className="bg-blue-50 pt-24 h-full">
            <div className="relative h-full flex flex-col w-full">
                <div className="hsl px-6 flex-1 overflow-y-auto">
                    <div className="flex justify-between items-center">
                    <div className="flex flex-col -ml-3">
                        <User size="sm" src={item.author.image} name={item.author.name}/>
                        {/*<div className={"mt-1"}>{item.tags?.length > 0 ?*/}
                        {/*    item.tags.map(t => <a className={"hover:underline hover:text-gray-500 transition-all font-bold  italic text-gray-300 ml-3"}>{t}</a>)*/}
                        {/*    : <Empty noIcon/>*/}
                        {/*}</div>*/}
                    </div>
                        {!isOwner && <MyRating count={item.ratingsQuantity} size={"lg"} value={item.ratingsAverage} readonly/>}
                    </div>
                    <div className="flex justify-center">
                        <div className=" mt-d3 flex-1">
                        {editable === "title" ? <Input onChange={onChange("title")}
                                                       contentRight={<Button onClick={onSave}
                                                                             className={"min-w-min px-2 -ml-2"}
                                                                             auto icon={<Check  size={22} />}/>}
                                                       fullWidth size={"xl"} className={""} bordered value={item.title}/> :
                            <Text h2 className={"cursor-pointer mb-0"} onClick={editItem("title")}>{item.title}</Text>
                        }
                            <div className={"mb-3 max-w-full"}>
                                {editable === "tags" ? <><TagsInput
                                    tagProps={{
                                        className:"react-tagsinput-tagd break-all mb-2 inline-block rounded-xl flex-wrap px-2 pb-1 pt-0 border border-solid border-gray-300 mr-2",
                                        classNameRemove: "before:content-['×'] text-gray-500 hover:text-gray-800 cursor-pointer pl-2 "

                                    }}
                                    className={"rounded-3xl bg-white px-4 pt-3 pb-2 "}
                                    // maxTags={5} addOnBlur
                                    value={formData.tags} onChange={onChange("tags")} />


                                <Button onClick={onSave}
                                        className={"  mt-2"}
                                        auto icon={<Check  size={22} />}>Save</Button>
                                    </>
                                    :
                                item.tags?.length > 0 ?
                                <>{item.tags.map(t => <a
                                    className={"hover:underline hover:text-gray-500 transition-all font-bold  italic text-gray-300 mr-3"}>{t}</a>)
                                  }
                                    {isOwner && <Button onClick={editItem("tags")} color={"warning"} light auto icon={<Edit size={16} />} className={"min-w-min inline-block"}/>
                                    }
                                  </>
                                : <Empty noIcon/>
                            }</div>

                        </div>



                        <Dropdown  placement={"bottom-right"}>
                            <Dropdown.Button ripple={false} light className={"min-w-min"} icon={<DotsThreeVertical size={22} />}/>
                            <Dropdown.Menu aria-label="Static Actions" onAction={onDropdown}>
                                <Dropdown.Item key="edit">Edit</Dropdown.Item>
                                {/*<Dropdown.Item key="copy">Copy link</Dropdown.Item>*/}
                                {/*<Dropdown.Item key="edit">Edit file</Dropdown.Item>*/}
                                <Dropdown.Item key={"delete"} color="error" >
                                    Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    {editable === "description" ? <>
                        <Textarea onChange={onChange("description")} fullWidth bordered value={item.description}/>
                            <Button onClick={onSave}
                                    className={"  mt-2"}
                                    auto icon={<Check  size={22} />}>Save</Button>
                        </>
                        :

                        <Text onClick={editItem("description")}
                              className={"text-2xl mb-5 text-gray-500 font-light cursor-pointer"}>{item.description}</Text>
                    }
                    <div className={"bg-green-50 px-4 py-2 mt-5 rounded-3xl"}>
                        <Text h3 className={"text-green-500 flex justify-between"}>Solutions {isOwner && editable !== "solutions" ?
                            <Button onClick={editItem("solutions")} color={"warning"} light auto icon={<Edit size={16} />} className={"min-w-min"}/>
                            :
                            <Button onClick={editItem(null)} light auto  color={"error"} icon={<Close size={22} />} className={"min-w-min"}/>
                        }
                        </Text>


                        {editable === "solutions" ? <>
                                <FormList value={formData.solutions} onChange={onChange("solutions")} placeholder={"Add solution"} />
                                <Button onClick={onSave} className={"  mb-2"} auto icon={<Check  size={22} />}>Save</Button>
                        </>
                         : item.solutions?.length === 0 ? <Empty noIcon /> : item.solutions.map((p, i) => <Text>{p}</Text>)}
                    </div>

                    <div className={"bg-red-50 mt-5 px-4 py-2 rounded-3xl"}>
                        <Text h3 className={"text-red-500 flex justify-between"}>Problems {isOwner && editable !== "problems" ?
                            <Button onClick={editItem("problems")} color={"warning"} light auto icon={<Edit size={16} />} className={"min-w-min"}/>
                            :
                            <Button onClick={editItem(null)} light auto  color={"error"} icon={<Close size={22} />} className={"min-w-min"}/>
                        }</Text>
                        {editable === "problems" ? <>
                                <FormList value={formData.problems} onChange={onChange("problems")} placeholder={"Add solution"} />
                                <Button onClick={onSave} className={"  mb-2"} auto icon={<Check  size={22} />}>Save</Button>
                            </>
                            : item.problems?.length === 0 ? <Empty noIcon /> : item.problems.map((p, i) => <Text>{p}</Text>)}
                    </div>


                    <Text h3 className={"mt-5  flex justify-between"}>Alternatives {isOwner && editable !== "alternatives" ?
                        <Button onClick={editItem("alternatives")} color={"warning"} light auto icon={<Edit size={16} />} className={"min-w-min"}/>
                        :
                        <Button onClick={editItem(null)} light auto  color={"error"} icon={<Close size={22} />} className={"min-w-min"}/>
                    }</Text>
                    {editable === "alternatives" ? <>
                            <FormList value={formData.alternatives} onChange={onChange("alternatives")} placeholder={"Add solution"} />
                            <Button onClick={onSave} className={"  mb-2"} auto icon={<Check  size={22} />}>Save</Button>
                        </>
                        : item.alternatives?.length === 0 ? <Empty noIcon /> : item.alternatives.map((p, i) => <Text className={""}>{p}</Text>)}

                    {/*<Text h3 className={"mt-5"}>Costs:</Text>*/}
                    {/*{item.problems.map((p, i) => <Text className={""}>- {p}</Text>)}*/}

                    <Text h3 className={"mt-5"}>TargetAudience:</Text>
                    {editable === "targetAudience" ? <Input onChange={onChange("targetAudience")}
                                                   contentRight={<Button onClick={onSave}
                                                                         className={"min-w-min px-2 -ml-2"}
                                                                         auto icon={<Check  size={22} />}/>}
                                                   fullWidth size={"xl"} className={""} bordered value={item.targetAudience}/> :
                    <Text className={"cursor-pointer"} onClick={editItem("targetAudience")}>{item.targetAudience}</Text>}
                    {/*{item.problems.map((p, i) => <Text className={""}>- {p}</Text>)}*/}

                    {/*<Text h3 className={"mt-5"}>MarketSize:</Text>*/}
                    {/*{item.problems.map((p, i) => <Text className={""}>- {p}</Text>)}*/}
                    {/*<Text h3 className={"mt-5"}>Costs:</Text>*/}
                    {/*{item.problems.map((p, i) => <Text className={""}>- {p}</Text>)}*/}


                </div>
                {isOwner ?
                <div className=" to-blue-50 pt-0 p-5 bg-gradient-to-t from-white  w-full">
                    <Text className={"text-2xl text-gray-400 mt-5 font-light"}>Rating</Text>
                    <MyRating count={item.ratingsQuantity} size={"lg"} value={item.ratingsAverage} readonly/>
                </div>
                    :
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
                </div>}
            </div>
        </Grid>
        <Grid xs={7} className=" bg-red-50s pt-20 h-full">
            <Grid.Container alignContent={"start"} className={" overflow-y-auto h-full"}>
                <Grid xs={6} className={"bg-green-50 p-5"}>
                    <div className={"w-full"}>
                        <Text h3 className={"text-green-500"}>{item.upsides?.length} Upside{item.upsides?.length > 1 && "s"}</Text>
                        {item.upsides?.map((u, i) => <CommentItem dense item={u} key={i}/>)}
                    </div>
                </Grid>
                <Grid xs={6} className={"bg-red-50 p-5"}>
                    <div className={"w-full"}>
                        <Text h3 className={"text-red-500"}>{item.downsides?.length} Downside{item.downsides?.length > 1 && "s"}</Text>
                        {item.downsides?.map((u, i) => <CommentItem dense item={u} key={i}/>)}
                    </div>
                </Grid>

                <Grid xs={12} className={"p-7"}>
                    <div className={"w-full"}>
                        <Text h3>What do <span className={"text-primary"}>YOU</span> think about this idea?</Text>
                        <CommentForm />
                        <Text h3>{item.comments?.length} Comments</Text>

                        {item.comments?.length > 0 ? item.comments?.map((u, i) => <CommentItem item={u} key={i}/>)
                            : <Empty />
                        }

                    </div>
                </Grid>
            </Grid.Container>
        </Grid>
    </Grid.Container>);
};

export default IdeaPage;
//
export async function getServerSideProps({ params }) {
    const {id} = params;
    await dbConnect();
    let item = null;
    try {
        item = await Idea.findOne({ _id: id})
            .populate({ path: 'author', model: models.User})
            // .populate({ path: 'reviews', select: 'post user rating description createdAt', options: { sort: { 'createdAt': -1 } }});
        console.log(item);
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
