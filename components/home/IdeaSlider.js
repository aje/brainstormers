import {useState} from 'react';
import {ChevronSmallLeft} from "@styled-icons/entypo/ChevronSmallLeft"
import {ChevronSmallRight} from "@styled-icons/entypo/ChevronSmallRight"
import {Button, Container, Text, User} from "@nextui-org/react";
import MyRating from "../MyRating";
import {Check} from "@styled-icons/entypo/Check"
import {EmojiSad} from "@styled-icons/entypo/EmojiSad"

const IdeaSlider = () => {
    const [index, setIndex] = useState(0);

    const ideas = [
        {
        author: {
            name: "behrooz",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
        },
        title: "Gym app that also motivates",
        description: "All gyms are paid by yearly or 6 month, better to create an app to also motivates them to go to the gym",
        tags: ["TECH", "INTERNET", "ONLINE"]
    },
        {
        author: {
            name: "Ame behroz",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
        },
        title: "Business of a club or somethign",
        description: "All gyms are paid by yearly or 6 month, better to create an app to also motivates them to go to the gym",
        tags: ["INTERNET", "ONLINE"]
    },
        {
        author: {
            name: "Parios",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
        },
        title: "This is better be a good idea",
        description: "lorem ipsum do luco  ",
        tags: ["INTERNET", "ONLINE"]
    },
    ]

    const onNext = () => {
        if(index < (ideas.length - 1)) setIndex(index + 1)
    }

    const onPrev = () => {
        if(index > 0) setIndex(index - 1)
    }

    return (<>
        <div className={" py-20 text-center"}>
            <Container >
                <main className={"flex  items-center"}>
                    <Button ripple={false} light icon={<ChevronSmallLeft size={80} />} disabled={index===0} size="xl" onPress={onPrev} css={{ minWidth: 50}}  className={" hover:text-primary active:text-primary"}>
                    
                    </Button>
                    <div className={"flex-1"}>
                        <User size="sm" src={ideas[index].author.avatar}
                              name={ideas[index].author.name}/>

                        <Text h2>Idea: <span className={"font-normal  font-sans"}>{ideas[index].title}</span></Text>
                        <Text className={"text-2xl mb-5 px-6 text-gray-500"}>{ideas[index].description}</Text>
                        {ideas[index].tags.map(t => <a className={"hover:underline hover:text-gray-500 transition-all font-bold italic text-gray-300 mr-3"}>{t}</a>)}

                        <div className="flex justify-around items-center mt-5">
                            <Button borderWeight={"bold"} icon={<EmojiSad size={34} />} bordered size={"xl"} ghost color={"error"} className={" font-bold text-2xl"}>DON'T DO IT</Button>
                            <MyRating size={"xl"} />
                            <Button borderWeight={"bold"}  icon={<Check size={40} />} bordered size={"xl"} ghost color={"primary"} className={" font-bold text-2xl"}>LET'S DO IT</Button>
                        </div>
                    </div>
                    <Button ripple={false} icon={<ChevronSmallRight size={80} />} disabled={index === (ideas.length - 1)} size="xl"  css={{ minWidth: 50}}  onPress={onNext} auto light  className={"hover:text-primary active:text-primary"}></Button>
                </main>
            </Container>
        </div>
        </>);
};

export default IdeaSlider;
