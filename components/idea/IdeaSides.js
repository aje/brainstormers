import React from 'react';
import {Grid, Text} from "@nextui-org/react";
import CommentItem from "./CommentItem";
import Empty from "../Empty";

const IdeaSides = ({item}) => {
    return (
        <>
            <Grid xs={6} className={"bg-green-50 p-5"}>
                <div className={"w-full"}>
                    <Text h3 className={"text-green-500"}>{item.upsides?.length} Upside{item.upsides?.length > 1 && "s"}</Text>
                    {item.upsides?.length > 0 ?
                        item.upsides?.map((u, i) => <CommentItem dense item={u} key={i}/>)
                        : <Empty noIcon />
                    }
                </div>
            </Grid>
            <Grid xs={6} className={"bg-red-50 p-5"}>
                <div className={"w-full"}>
                    <Text h3 className={"text-red-500"}>{item.downsides?.length} Downside{item.downsides?.length > 1 && "s"}</Text>
                    {item.downsides?.length > 0 ?
                        item.downsides?.map((u, i) => <CommentItem dense item={u} key={i}/>)
                        : <Empty noIcon />
                    }
                </div>
            </Grid>
        </>
    );
};

export default IdeaSides;