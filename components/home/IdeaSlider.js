import {useState} from 'react';
import {ChevronSmallLeft} from "@styled-icons/entypo/ChevronSmallLeft"
import {ChevronSmallRight} from "@styled-icons/entypo/ChevronSmallRight"
import {Button, Container, Link, Text, User} from "@nextui-org/react";
import MyRating from "../MyRating";
import {Check} from "@styled-icons/entypo/Check"
import {EmojiSad} from "@styled-icons/entypo/EmojiSad"
import Empty from "../Empty";
import axios from "../../services/axios";
import {toast} from "react-hot-toast";
import {useSession} from "next-auth/react";

const IdeaSlider = ({latest:ideas}) => {
    const [index, setIndex] = useState(0);
    //
    //
    //
    // const ideas = [
    //     {
    //     author: {
    //         name: "behrooz",
    //         avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    //     },
    //     title: "Gym app that also motivates",
    //     description: "All gyms are paid by yearly or 6 month, better to create an app to also motivates them to go to the gym",
    //     tags: ["TECH", "INTERNET", "ONLINE"]
    // },
    //     {
    //     author: {
    //         name: "Ame behroz",
    //         avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    //     },
    //     title: "Business of a club or somethign",
    //     description: "All gyms are paid by yearly or 6 month, better to create an app to also motivates them to go to the gym",
    //     tags: ["INTERNET", "ONLINE"]
    // },
    //     {
    //     author: {
    //         name: "Parios",
    //         avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    //     },
    //     title: "This is better be a good idea",
    //     description: "lorem ipsum do luco  ",
    //     tags: ["INTERNET", "ONLINE"]
    // },
    // ]

    const onNext = () => {
        if(index < (ideas.length - 1)) setIndex(index + 1)
    }

    const onPrev = () => {
        if(index > 0) setIndex(index - 1)
    }

    const {data: session} = useSession()
    const [loading, setLoading] = useState(false);

    const onReview = item => (value) => {
        if(!session)
            onNotLoggedIn();
        else {
            setLoading(true);
            axios.patch(`/posts?rate=${value}`, {_id: item._id}).then((res) => {
                toast.success("Successfully updated!");
                onNext();
            }).finally(() => setLoading(false)).catch(error => {
                toast.error(error?.response?.data?.message);
            })
        }
    }

    return (<>
        <div className={" py-20 text-center"}>
            <Container >
                {ideas?.length > 0 ?
                <main className={"flex  items-center"}>
                    <Button ripple={false} light icon={<ChevronSmallLeft size={80} />} disabled={index===0} size="xl" onClick={onPrev} css={{ minWidth: 40}}  className={"z-0 hover:text-primary active:text-primary"}/>
                    <div className={"flex-1"}>
                        <User
                            css={{zIndex: 0}}
                            size="sm" src={ideas[index].author?.avatar}
                              name={ideas[index].author?.name}/>

                        <Text h2 className={"flex justify-center"}><Link href={`ideas/idea/${ideas[index]._id}`}  className={"font-normal font-sans"}>{ideas[index].title}</Link></Text>
                        <Text className={"text-2xl mb-5 px-6 text-gray-500"}>{ideas[index].description || "No description"}</Text>
                        {ideas[index].tags.map((t, io) => <a key={io} className={"hover:underline hover:text-gray-500 transition-all font-bold italic text-gray-300 mr-3"}>{t}</a>)}

                        <div className="flex justify-around items-center mt-5">
                            <Button onClick={()=>onReview(ideas[index])(1)} borderWeight={"bold"} auto icon={<EmojiSad size={34} />} bordered size={"xl"} ghost color={"error"} className={" font-bold text-2xl"}>DON'T DO IT</Button>
                            <MyRating onChange={onReview(ideas[index])} size={"xl"} />
                            <Button onClick={()=>onReview(ideas[index])(5)} borderWeight={"bold"} auto  icon={<Check size={40} />} bordered size={"xl"} ghost color={"primary"} className={" font-bold text-2xl"}>LET'S DO IT</Button>
                        </div>
                    </div>
                    <Button ripple={false} icon={<ChevronSmallRight size={80} />} disabled={index === (ideas.length - 1)} size="xl"  css={{ minWidth: 40}}  onClick={onNext} auto light  className={"z-0 hover:text-primary active:text-primary"}/>
                </main>
                    : <Empty label={"You rated all new Ideas"}/>
                    }
            </Container>
        </div>
        </>);
};

export default IdeaSlider;
