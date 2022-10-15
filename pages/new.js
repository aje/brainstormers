import React, {useEffect, useState} from 'react';
import {Button, Input, Loading, Textarea} from "@nextui-org/react";
import axios from "../services/axios"
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {toast} from "react-hot-toast";
import {useHookstate} from "@hookstate/core";
import {ideaFormData} from "./_app";

const Upload = () => {
    const { data: session } = useSession();

    const state = useHookstate(ideaFormData);
    console.log(state.get())
    const router = useRouter();
    // console.log(session);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: state.get()?.description || "",
        tags: [],
        type: state.get()?.type || "IDEA",
        problems: [],
        alternatives: [],
        costs: [],
        targetAudience: [],
        marketSize: 0,
        author: null
        // user: session?.user?._id
    });

    useEffect(()=>{
        if(session)
            onChange("author")(session?.user?._id)
    }, [session]);

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

    const disabled = formData.title === "" || formData.description === "" || formData.type;

    return (<>
        <div className={"flex relative flex-col z-10 p-8"} >
            <Input
                value={formData.title}
                onChange={onChange("title")}
                required size={"lg"} bordered
                className={"mb-3"}
                label={"Title *"}
                placeholder={"Choose a good title"}/>
            <Textarea
                value={formData.description}
                onChange={onChange("description")}
                required  rows={4} size={"lg"} bordered
                className={"mb-3"} label={"Description *"}
                placeholder={"Describe the trip with enthusiasm"} />

            <Input required value={formData.date} onChange={onChange("date")} size={"lg"} bordered className={"mb-3"} label={"Month of the trip *"} type="month"/>
            <div><Button auto disabled={loading || disabled} onPress={onSubmit} className={"mb-10 mt-3"}  iconRight={!loading && <KeyboardArrowRight size={20}/>}>
                {loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> :
                "Publish" }
            </Button></div>
        </div>
    </>);
};

export default Upload;
