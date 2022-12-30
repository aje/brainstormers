import React from 'react';
import {Button, Text} from "@nextui-org/react";
import MyRating from "../MyRating";
import {EmojiSad} from "@styled-icons/entypo/EmojiSad";
import {Check} from "@styled-icons/entypo/Check";

const IdeaRating = ({isOwner, item}) => {
    return isOwner ?
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
        </div>
};

export default IdeaRating;