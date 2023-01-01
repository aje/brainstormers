import React from 'react';
import {Grid, Text} from "@nextui-org/react";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import Empty from "../Empty";

const Comments = ({item, isOwner}) => {
    return (
        <>
            <Grid xs={12} className={"p-7"}>
                <div className={"w-full"}>
                    <Text h3>What do <span className={"text-primary"}>YOU</span> think about this idea?</Text>
                    <CommentForm ideaId={item._id}/>
                    <Text h3>{item.comments?.length} Comments</Text>

                    {item.comments?.length > 0 ? item.comments?.map((u, i) => <CommentItem isOwner={isOwner} withAction idea={item} item={u} key={u._id}/>)
                        : <Empty />
                    }

                </div>
            </Grid>
        </>
    );
};

export default Comments;