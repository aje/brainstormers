import React, {useState} from 'react';
import {Button, Card, Text, User} from "@nextui-org/react";
import {EmojiSad} from "@styled-icons/entypo/EmojiSad";
import MyRating from "../components/MyRating";
import {Check} from "@styled-icons/entypo/Check";
import clsx from "clsx";
import {ideaTypes} from "../variables";

const Explore = () => {

    const ideas = [
        {
            author: {
                name: "Number 0",
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
            },
            type: "IDEA",
            title: "Gym app that also motivates",
            description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.\n" +
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
            tags: ["TECH", "INTERNET", "ONLINE"]
        },
        {
            author: {
                name: "Number 1",
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
            },
            type: "IDEA",
            title: "Business of a club or somethign",
            description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.\n" +
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
            tags: ["INTERNET", "ONLINE", "ONLINE", "ONLINE"]
        },
        {
            author: {
                name: "Number 2",
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
            },
            type: "IDEA",
            title: "This is better be a good idea",
            description: "lorem ipsum do luco  ",
            tags: ["INTERNET", "ONLINE"]
        },
        {
            author: {
                name: "Number 3",
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
            },
            type: "IDEA",
            title: "This is better be a good idea",
            description: "lorem ipsum do luco  ",
            tags: ["INTERNET", "ONLINE"]
        },
        {
            author: {
                name: "Number 3",
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
            },
            type: "IDEA",
            title: "This is better be a good idea",
            description: "lorem ipsum do luco  ",
            tags: ["INTERNET", "ONLINE"]
        },
        {
            author: {
                name: "Number 2",
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
            },
            type: "PROBLEM",
            title: "This is better be a good idea",
            description: "lorem ipsum do luco  ",
            tags: ["INTERNET", "ONLINE"]
        },
        {
            author: {
                name: "Number 3",
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
            },
            type: "IDEA",
            title: "This is better be a good idea",
            description: "lorem ipsum do luco  ",
            tags: ["INTERNET", "ONLINE"]
        },
        {
            author: {
                name: "Number 3",
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
            },
            type: "IDEA",
            title: "This is better be a good idea",
            description: "lorem ipsum do luco  ",
            tags: ["INTERNET", "ONLINE"]
        },
    ]
    const [index, setIndex] = useState(0);

    const onDo = () => {
        setIndex(index + 1)
    }

    const onDontDo = () => {
        setIndex(0)
    }

    return (
        <div
            className={"bg-pink-50 p-20"}
            style={{height: "calc(100vh - 117px)" , backgroundImage: "url(/explorebg.png)", backgroundSize: "cover", backgroundPosition:"bottom"}}>
            <Text h2 className={"my-10 font-sans"}>Get <span className={"text-primary timing"}>inspired</span> by other ideas</Text>
            <div
                className={"flex relative h-full"}
                // className={clsx("flex h-full pb-32  w-160% transition-all transition duration-1000", index === 0 ?  "translate-x-0" : "-translate-x-50%" )}
            >
                {ideas.map((idea, i) => {
                    const state = index === i ? "ACTIVE" : index === i - 1 ? "NEXT" : index === i + 1 ? "PREV" : "HIDE";
                    return <Card
                        // onPress={}
                        isPressable
                        style={{borderRadius: 34, height: "calc(100% - 150px)"}}
                        className={clsx("absolute  duration-500 w-80% top-0",
                            state === "ACTIVE" && "translate-x-0 scale-100 opacity-100",
                            state === "PREV" && "-translate-x-100% scale-50 opacity-75",
                            state === "HIDE" && "translate-x-200% scale-0 opacity-0",
                            state === "NEXT"  &&"translate-x-100% top-0 scale-[0.8] opacity-75")}
                        // className={clsx(index === 1 ? "scale-50 opacity-75 " : " mr-10" , 'h-full ')}
                        // className={"-translate-x-70% scale-75 translate-y-50% h-70%"}
                    >
                        <Card.Body className={"p-10 block"}>
                            <User size="sm" src={idea.author.avatar}
                                  name={idea.author.name}/>
                            <Text h2 className={"font-sans"}>{ideaTypes[idea.type]?.value}: <span className={"font-normal"}>{idea.title}</span></Text>
                            <Text className={"text-2xl mb-5 text-gray-500 font-light"}>{idea.description}</Text>
                            {idea.tags.map(t => <a className={"hover:underline hover:text-gray-500 transition-all font-bold italic text-gray-300 mr-3"}>{t}</a>)}
                        </Card.Body>
                        <Card.Footer className={"justify-around p-10 "}>
                            <Button
                                onPress={onDontDo} borderWeight={"bold"} icon={<EmojiSad size={34} />} bordered size={"xl"} ghost color={"error"} className={" font-bold text-2xl"}>DON'T DO IT</Button>
                            <MyRating size={"xl"} />
                            <Button
                                onPress={onDo} borderWeight={"bold"}  icon={<Check size={40} />} bordered size={"xl"} ghost color={"primary"} className={" font-bold text-2xl"}>LET'S DO IT</Button>
                        </Card.Footer>
                    </Card>
                })}

                {/*<Card*/}
                {/*    className={clsx("absolute  duration-1000 w-80% top-0 ", index === 0 ? " translate-x-100% top-0 scale-[0.8] opacity-75" : "translate-x-0 scale-100 opacity-100")}*/}
                {/*    style={{borderRadius: 34, height: "calc(100% - 150px)"}}*/}
                {/*    // className={clsx(index === 0 ? "scale-[0.8] opacity-75 " : " mr-10" , "h-full")}*/}
                {/*>*/}
                {/*    <Card.Body className={"p-10 block"}>*/}
                {/*        <User size="sm" src={ideas[d+1].author.avatar}*/}
                {/*              name={ideas[d+1].author.name}/>*/}

                {/*        <Text h2>Idea: <span className={"font-normal"}>{ideas[d+1].title}</span></Text>*/}
                {/*        <Text className={"text-2xl mb-5 text-gray-500 font-light"}>{ideas[d+1].description}</Text>*/}
                {/*        {ideas[d+1].tags.map(t => <a className={"hover:underline hover:text-gray-500 transition-all font-bold italic text-gray-300 mr-3"}>{t}</a>)}*/}
                {/*    </Card.Body>*/}
                {/*    <Card.Footer className={"justify-around p-10"}>*/}
                {/*        <Button*/}
                {/*            onPress={onDontDo}*/}
                {/*            borderWeight={"bold"}*/}
                {/*            icon={<EmojiSad size={34} />}*/}
                {/*            bordered*/}
                {/*            size={"xl"}*/}
                {/*            ghost*/}
                {/*            color={"error"}*/}
                {/*            className={" font-bold text-2xl"}>DON'T DO IT</Button>*/}
                {/*        <MyRating size={"xl"} />*/}
                {/*        <Button*/}
                {/*            onPress={onDo}*/}
                {/*            borderWeight={"bold"}*/}
                {/*            icon={<Check size={40} />}*/}
                {/*            bordered*/}
                {/*            size={"xl"}*/}
                {/*            ghost*/}
                {/*            color={"primary"}*/}
                {/*            className={" font-bold text-2xl"}>LET'S DO IT</Button>*/}
                {/*    </Card.Footer>*/}
                {/*</Card>*/}

                {/*<Card*/}
                {/*    className={"absolute w-80% -left-80% top-0 scale-[0.8] opacity-75"}*/}
                {/*    style={{borderRadius: 34, height: "calc(100% - 150px)"}}*/}
                {/*    // className={clsx(index === 0 ? "scale-[0.8] opacity-75 " : " mr-10" , "h-full")}*/}
                {/*>*/}
                {/*    <Card.Body className={"p-10 block"}>*/}
                {/*        <User size="sm" src={ideas[d+1].author.avatar}*/}
                {/*              name={ideas[d+1].author.name}/>*/}

                {/*        <Text h2>Idea: <span className={"font-normal"}>{ideas[d+1].title}</span></Text>*/}
                {/*        <Text className={"text-2xl mb-5 text-gray-500 font-light"}>{ideas[d+1].description}</Text>*/}
                {/*        {ideas[d+1].tags.map(t => <a className={"hover:underline hover:text-gray-500 transition-all font-bold italic text-gray-300 mr-3"}>{t}</a>)}*/}
                {/*    </Card.Body>*/}
                {/*    <Card.Footer className={"justify-around p-10"}>*/}
                {/*        <Button*/}
                {/*            onPress={onDontDo}*/}
                {/*            borderWeight={"bold"}*/}
                {/*            icon={<EmojiSad size={34} />}*/}
                {/*            bordered*/}
                {/*            size={"xl"}*/}
                {/*            ghost*/}
                {/*            color={"error"}*/}
                {/*            className={" font-bold text-2xl"}>DON'T DO IT</Button>*/}
                {/*        <MyRating size={"xl"} />*/}
                {/*        <Button*/}
                {/*            onPress={onDo}*/}
                {/*            borderWeight={"bold"}*/}
                {/*            icon={<Check size={40} />}*/}
                {/*            bordered*/}
                {/*            size={"xl"}*/}
                {/*            ghost*/}
                {/*            color={"primary"}*/}
                {/*            className={" font-bold text-2xl"}>LET'S DO IT</Button>*/}
                {/*    </Card.Footer>*/}
                {/*</Card>*/}
            </div>
        </div>
    );
};

export default Explore;