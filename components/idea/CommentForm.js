import React, {useState} from 'react';
import {Button, Loading, Textarea} from "@nextui-org/react";
import axios from "axios";
import {toast} from "react-hot-toast";
import {useRouter} from "next/router";
import {SendPlane} from "@styled-icons/remix-line/SendPlane";

const CommentForm = ({ideaId}) => {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        description: "",
        idea: ideaId,
    });

    const router = useRouter();

    const onChange = name => event => {
        setFormData( {...formData, [name]: event?.target ? event.target.value: event });
    };

    const onSubmit = () => {
        setLoading(true);
        axios.post(`/api/reviews`, formData).then(()=>{
            router.replace(router.asPath);
            toast.success("Successfully posted!");
        }).finally(() => setLoading(false))
    };

    return (<div className={"mb-10 w-full"}>
        {/*<div className={"flex-1"}>*/}
            <Textarea
                fullWidth
                required
                onChange={onChange("description")}
                value={formData.description}
                // rows={1}
                size={"lg"}
                bordered
                placeholder={"Write something usefull please"} />
        {/*</div>*/}
            <Button
                auto
                className={"mt-4"}
                disabled={loading || formData.description === ""}
                onPress={onSubmit}
                iconRight={!loading && <SendPlane size={20}/>}>
                {loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> :
                    "Post" }
            </Button>

    </div>);
};

export default CommentForm;