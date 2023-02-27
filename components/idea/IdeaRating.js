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
//
// const avg = (r) => {
//     if(!r) return 0;
//     // r is the entire ratings object
//     let items = Object.entries(r); // get an array of key/value pairs of the object like this [[1:1], [2:1]...]
//     let sum = 0; // sum of weighted ratings
//     let total = 0; // total number of ratings
//     for(let [key,value] of items){
//         total += value;
//         sum += value * parseInt(key); // multiply the total number of ratings by it's weight in this case which is the key
//     }
//     return Math.round(sum / total)
// }

const IdeaRating = ({isOwner, item}) => {
    const {data: session} = useSession()
    const state = useHookstate(loginPopper);
    const [loading, setLoading] = useState(false);
    const isRated = item.raters?.includes(session?.user?._id);
    const count =  item.rates && Object.values(item.rates).reduce((a, b) => a + b, 0)
    const avgRating = item.ratingsAverage;

    const router = useRouter();

    const refreshData = () => {
        router.replace(router.asPath);
    }

    const onReview = (value) => {
        if(!session)
            onNotLoggedIn();
        else {
            setLoading(true);
            axios
				.post(`/rate?value=${value}&id=${item._id}`)
				.then(res => {
					toast.success("Successfully updated!");
					refreshData();
				})
				.finally(() => setLoading(false))
				.catch(error => {
					toast.error(error?.response?.data?.message);
				});
        }
    }

    const onNotLoggedIn = () => {
        if(!session) {
            state.set(true);
            toast.error("Please login first")
        }
    }

    return !isOwner ?
        <div className=" to-blue-50 pt-0     bsg-gradient-to-t sfrom-white  w-full">
            <Text className={"text-2xl text-gray-400 mt-5 font-light"}>Rating</Text>
            <MyRating count={count} size={"lg"} value={item.ratingsAverage} readonly/>
        </div>
        :
        <div className=" to-blue-50 pt-0  sbg-gradient-to-t sfrom-white  w-full">
            <Text className={"text-2xl text-gray-400 mt-5 font-light"}>Rate this idea:</Text>
            <MyRating  count={count} onChange={onReview} size={"xl"} value={isRated && avgRating} readonly={isRated}/>
            {!isRated &&
                <div className={"justify-between mt-5 flex"}>
                    <Button
                        onClick={()=>onReview(1)}
                        auto
                        borderWeight={"bold"}
                        icon={<EmojiSad size={34}/>}
                        bordered size={"xl"} ghost color={"error"}
                        className={" font-bold text-2xl"}>DON'T DO IT</Button>

                    <Button
                        onClick={()=>onReview(5)}
                        auto
                        borderWeight={"bold"}
                        icon={<Check size={40}/>}
                        bordered
                        size={"xl"}
                        ghost color={"primary"}
                        className={" font-bold text-2xl"}>LET'S DO IT</Button>
                </div>
            }
        </div>
};

export default IdeaRating;