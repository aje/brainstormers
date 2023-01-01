import React, {useState} from 'react';
import {Button, Text} from "@nextui-org/react";
import MyRating from "../MyRating";
import {EmojiSad} from "@styled-icons/entypo/EmojiSad";
import {Check} from "@styled-icons/entypo/Check";
import {useSession} from "next-auth/react";
import {toast} from "react-hot-toast";
import {useHookstate} from "@hookstate/core";
import {loginPopper} from "../../pages/_app";
import axios from "../../services/axios";
import {useRouter} from "next/router";

const IdeaRating = ({isOwner, item}) => {
    const {data: session} = useSession()
    const state = useHookstate(loginPopper);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const refreshData = () => {
        router.replace(router.asPath);
    }
    const onDont = () => {
       if(!session)
           onNotLoggedIn();
       else {

       }
    }

    const onDo = () => {
        if(!session)
            onNotLoggedIn();
        else {

        }
    }

    const onReview = (value) => {
        if(!session)
            onNotLoggedIn();
        else {
            setLoading(true);
            axios.patch(`/posts?rate=${value}`, {_id: item._id}).then((res) => {
                toast.success("Successfully updated!");
                refreshData();
            }).finally(() => setLoading(false)).catch(error => {
                toast.error(error?.response?.data?.message);
            })
        }
    }

    const onNotLoggedIn = () => {
        if(!session) {
            state.set(true);
            toast.error("Please login first")
        }
    }

    return !isOwner ?
        <div className=" to-blue-50 pt-0 p-5 bsg-gradient-to-t sfrom-white  w-full">
            <Text className={"text-2xl text-gray-400 mt-5 font-light"}>Rating</Text>
            <MyRating count={item.ratingsQuantity} size={"lg"} value={item.ratingsAverage} readonly/>
        </div>
        :
        <div className=" to-blue-50 pt-0 p-5 sbg-gradient-to-t sfrom-white  w-full">
            <Text className={"text-2xl text-gray-400 mt-5 font-light"}>Rate this idea:</Text>
            <MyRating onChange={onReview} size={"xl"} />
            <div className={"justify-between mt-5 flex"}>
                <Button
                    onClick={onDont}
                    auto
                    borderWeight={"bold"}
                    icon={<EmojiSad size={34} />}
                    bordered size={"xl"} ghost color={"error"}
                    className={" font-bold text-2xl"}>DON'T DO IT</Button>

                <Button
                    onClick={onDo}
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