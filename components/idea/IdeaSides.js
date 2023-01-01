import React, {useState} from 'react';
import {Button, Grid, Text} from "@nextui-org/react";
import CommentItem from "./CommentItem";
import Empty from "../Empty";
import {DeleteBin} from "@styled-icons/remix-line";
import DeleteConfirmation from "../DeleteConfirmation";
import axios from "../../services/axios";
import {toast} from "react-hot-toast";
import {useRouter} from "next/router";

const IdeaSides = ({item, isOwner}) => {
    const [delConfirm, setDelConfirm] = useState(null);
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState(null)
    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
    }

    const onDelete = () => {
        setLoading(true);
        axios.delete(`/post/${item.id}/sides?type=${delConfirm}&commentId=${comment._id}`).then(()=>{
            setDelConfirm(null);
            refreshData()
            toast.success("Successfully deleted!");
        }).finally(()=> setLoading(false))
    }

    return (
        <>
            <DeleteConfirmation renderItem={()=><CommentItem item={comment}/>} loading={loading} visible={!!delConfirm} closeHandler={()=>setDelConfirm(null)} onDelete={onDelete}/>

            <Grid xs={6} className={"bg-green-50 p-5"}>
                <div className={"w-full"}>
                    <Text h3 className={"text-green-500 mb-0"}>{item.upsides?.length} Upside{item.upsides?.length > 1 && "s"}</Text>
                    <Text  className={"mb-4 text-green-400 inline-block"}>Set a comment as upside</Text>
                    {item.upsides?.length > 0 ?
                        item.upsides?.map((u, i) => <CommentItem key={u._id} action={isOwner &&
                            <Button onClick={()=> {
                                setDelConfirm("upsides")
                                setComment(u)
                            }}  size={"xs"} light color={"error"} auto><DeleteBin size={"14"}/></Button>}
                            dense item={u}/>)
                        : <Empty noIcon />
                    }
                </div>
            </Grid>
            <Grid xs={6} className={"bg-red-50 p-5"}>
                <div className={"w-full"}>
                    <Text h3 className={"text-red-500 mb-0"}>{item.downsides?.length} Downside{item.downsides?.length > 1 && "s"}</Text>
                    <Text  className={"mb-4 text-red-400 inline-block"}>Set a comment as downside</Text>

                    {item.downsides?.length > 0 ?
                        item.downsides?.map((u, i) => <CommentItem action={isOwner &&
                            <Button onClick={()=> {
                                setDelConfirm("downsides")
                                setComment(u)
                            }}  size={"xs"} light color={"error"} auto><DeleteBin size={"14"}/></Button>} dense item={u} key={u._id}/>)
                        : <Empty noIcon />
                    }
                </div>
            </Grid>
        </>
    );
};

export default IdeaSides;