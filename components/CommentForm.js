import React, {useState} from 'react';
import {Button, Loading, Textarea} from "@nextui-org/react";
import axios from "axios";
import {toast} from "react-hot-toast";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {SendPlane} from "@styled-icons/remix-line/SendPlane";

const CommentForm = ({postId}) => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        description: "",
        post: postId,
    });

    const router = useRouter();

    const onChange = name => event => {
        setFormData( {...formData, [name]: event?.target ? event.target.value: event });
    };

    const onSubmit = () => {
        setLoading(true);
        const data = {...formData, author: session?.user?._id};
        axios.post(`/api/reviews`, data).then(()=>{
            router.replace(router.asPath);
            toast.success("Successfully posted!");
        }).finally(() => setLoading(false))
    };

    return (<div className={"mb-10 flex items-end"}>
        <div className={"flex-1"}>
        <Textarea
            fullWidth
            required
            onChange={onChange("description")}
            value={formData.description}
            rows={1}
            size={"lg"}
            bordered
            placeholder={"Write something usefull please"} />
        </div>
            <Button
                auto
                className={"ml-4"}
                disabled={loading || formData.description === ""}
                onPress={onSubmit}
                iconRight={!loading && <SendPlane size={20}/>}>
                {loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> :
                    "Post" }
            </Button>

    </div>);
};

export default CommentForm;
