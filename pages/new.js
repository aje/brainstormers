import React, {useState} from 'react';
import {Button, Card, Container, Input, Text} from "@nextui-org/react";
import axios from "../services/axios"
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {toast} from "react-hot-toast";
import {useHookstate} from "@hookstate/core";
import {AddToList} from "@styled-icons/entypo/AddToList"
import {Trash} from "@styled-icons/entypo/Trash"
import {ideaFormData} from "./index";

const Upload = () => {
    const { data: session } = useSession();

    const state = useHookstate(ideaFormData);
    // console.log("state", state.get())
    const router = useRouter();
    const {problem, idea} = state.get();
    // console.log(session);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tags: [],
        solutions: [idea],
        problems: [problem],
        alternatives: [],
        costs: [],
        targetAudience: [],
        marketSize: 0,
    });

    const [problems, setProblems] = useState([problem]);
    const [ideas, setIdeas] = useState([idea]);

    //
    // useEffect(()=>{
    //     if(session)
    //         onChange("author")(session?.user?._id)
    // }, [session, state]);

    const onChange = name => event => {
        setFormData( {...formData, [name]: event?.target ? event.target.value: event });
    };

    const onSubmit = () => {
        setLoading(true);
        axios.post(`/posts`, formData).then(()=>{
            toast.success("Successfully created!");
            router.push('/')
        }).finally(() => setLoading(false))
    };

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

    const disabled = formData.title === "";

    return (<>
        <div className={"py-20 bg-violet-50"} >
            <Container>

                <Text h1 editable>Start <span className={"text-primary"}>Ideation</span> <span className={"font-normal"}>and brainstorm</span></Text>



                <div className="grid gap-5 grid-cols-2  mb-5">
                    <div  className={"bg-green-50 px-1 rounded-3xl"}>
                        <Card.Header className={"pb-0"}>
                            <Text h3 className={"text-green-500"}>Solutions</Text>
                        </Card.Header>

                        {ideas.map((p, i) => <div key={i} className="flex w-full px-4 pb-4">
                                <Input
                                    underlined
                                    css={{flexGrow: 1}}
                                    value={p}
                                    onChange={onChangeIdeas(i)}
                                    required size={"lg"}/>
                                {i === (ideas.length -1 ) ?
                                    <Button css={{minWidth: 24, width: 24}} ripple={false} onPress={addIdeas}  disabled={p === ""} light color={"success"}
                                            className={"ml-2 hover:text-green-800"} auto>
                                        <AddToList size={24}/>
                                    </Button>
                                    :
                                    <Button css={{minWidth: 24, width: 24}} ripple={false} onPress={removeIdeas(i)} light color={"success"}
                                            className={"ml-2 hover:text-green-800"} auto>
                                        <Trash size={16}/>
                                    </Button>
                                }
                            </div>
                        )}
                    </div>
                    <div  className={"bg-red-50 px-1 rounded-3xl"}>
                        <Card.Header className={"pb-0"}>
                            <Text h3 className={"text-red-500"}>Problems</Text>
                        </Card.Header>
                        {problems.map((p, i) => <div key={i} className="flex w-full px-4 pb-4">
                                <Input
                                    underlined
                                    css={{flexGrow: 1}}
                                    value={p}
                                    onChange={onChangeProblem(i)}
                                    required size={"lg"}/>
                            {i === (problems.length -1 ) ?
                                <Button css={{minWidth: 24, width: 24}} ripple={false} onPress={addProblem} disabled={p === ""} light color={"error"}
                                        className={"ml-2 hover:text-red-800"} auto>
                                    <AddToList size={24}/>
                                </Button>
                                :
                                <Button css={{minWidth: 24, width: 24}} ripple={false} onPress={removeProblem(i)} light color={"error"}
                                        className={"ml-2 hover:text-red-800"} auto>
                                    <Trash size={16}/>
                                </Button>
                            }
                            </div>
                        )}

                    </div>
                </div>

                <Text h3 >Title</Text>
                <Input
                    // label={"Title"}
                    value={formData.title}
                    onChange={onChange("title")}
                    required size={"xl"}
                    fullWidth
                    underlined
                    className={"mb-6"}
                    placeholder={"Choose a name or small explaination"}/>

                <Button className={"mt-5"} onPress={onSubmit} disabled={disabled}>Save & Next</Button>

            </Container>



            {/*<Input required value={formData.date} onChange={onChange("date")} size={"lg"} bordered className={"mb-3"} label={"Month of the trip *"} type="month"/>*/}
            {/*<div>*/}
            {/*    <Button auto disabled={loading || disabled} onPress={onSubmit} className={"mb-10 mt-3"}  iconRight={!loading && <SendPlane size={20}/>}>*/}
            {/*        {loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> :*/}
            {/*        "Publish" }*/}
            {/*    </Button>*/}
            {/*</div>*/}
        </div>
    </>);
};

export default Upload;
