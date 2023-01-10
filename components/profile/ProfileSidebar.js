import {Button, Card, Dropdown, Grid, Navbar, Text, User} from "@nextui-org/react";
import {signOut, useSession} from "next-auth/react";
import {useHookstate} from "@hookstate/core";
import {sidebarState} from "../../pages/_app";
import MyRating from "../MyRating";
import Empty from "../Empty";
import Moment from "react-moment";
import Image from "next/image";
import {Cog} from "@styled-icons/entypo/Cog";
import {useState} from "react";
import Edit from "./edit";
import {useRouter} from "next/router";
import useSWR from "swr";
import { Tab } from '@headlessui/react'
import clsx from "clsx";


const ProfileSidebar = () => {
    const { data: session } = useSession();
    const {data: myIdeas} = useSWR(`/api/profile/ideas`);
    const router = useRouter();
    const state = useHookstate(sidebarState);
    const [edit, setEdit] = useState(false);
    const onClose = () => {
        state.set(false)
        document.body.style.overflow = "auto";
    }
    const ideas = [
        {
            author: {
                name: "behrooz",
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
            },
            ratingsQuantity: 3,
            ratingsAverage: 3,
            title: "Gym app that also motivates",
            description: "All gyms are paid by yearly or 6 month, better to create an app to also motivates them to go to the gym",
            tags: ["TECH", "INTERNET", "ONLINE"]
        },
        {
            author: {
                name: "Ame behroz",
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
            },
            ratingsQuantity: 3,
            ratingsAverage: 3,
            title: "Business of a club or somethign",
            description: "All gyms are paid by yearly or 6 month, better to create an app to also motivates them to go to the gym",
            tags: ["INTERNET", "ONLINE"]
        },
    ]

    const onDropdown = (key) => {
        switch (key) {
            case "upload":

                break;
            case "edit":
                setEdit(true)
                break;
            case "logout":
                signOut({ callbackUrl: '/' });
                break;
            default:

        }
    };
    return (session && <>
        <div onClick={onClose} style={{zIndex: 400, backdropFilter: "saturate(180%) blur(6px)"}} className={" bg-white/30 w-screen h-screen fixed top-0 left-0"} />
        <Card  css={{ borderRadius: 0}} style={{zIndex: 400}}
               className="fadeInAnimated bg-white h-screen w-2/3 fixed p-0 top-0 right-0"
        >
            <Card.Body className={"p-8"}>
                <div className="flex  items-center justify-between">
                    <div className="flex items-center">
                        <Image className="rounded-full" src={session.user.image} height={100} width={100}/>
                        <div className={"ml-8"}>
                            <Text h2 className={"mb-0"}>{session.user.name} <span className={"align-middle capitalize border-gray-300 text-gray-400 text-xs font-normal border-solid border bg-amber-50 rounded-md px-2"}>{session.user.role || "user"}</span></Text>
                            <MyRating size={"md"} value={4} readonly/>
                            <div className="mt-3">
                            {/*{tags.map(t => <a className={"hover:underline hover:text-gray-500 transition-all font-bold italic text-gray-300 mr-3"}>{t}</a>)}*/}
                            </div>
                        </div>
                    </div>
                    <Dropdown  placement={"bottom-right"}>
                        <Dropdown.Button ripple={false} light  icon={<Cog size={22} />}>Settings</Dropdown.Button>
                        <Dropdown.Menu aria-label="Static Actions"   onAction={onDropdown}>
                            <Dropdown.Item key="edit">Edit profile</Dropdown.Item>
                            {/*<Dropdown.Item key="copy">Copy link</Dropdown.Item>*/}
                            {/*<Dropdown.Item key="edit">Edit file</Dropdown.Item>*/}
                            <Dropdown.Item key={"logout"} color="error" onClick={() => signOut()}>
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <Tab.Group>
                    <Tab.List className="flex mt-10  border-b-1 border-gray-200 border-0 border-solid">
                        <Tab  className={({ selected }) =>
                            clsx(
                                'w-full border-0 py-4 text-lg leading-5  bg-transparent',
                                ' ',
                                selected
                                    ? 'border-b-2 border-primary border-solid text-primary '
                                    : ''
                            )
                        }>Tab 1</Tab>
                        <Tab  className={({ selected }) =>
                            clsx(
                                'w-full border-0 py-4 text-lg leading-5  bg-transparent',
                                ' ',
                                selected
                                    ? 'border-b-2 border-primary border-solid text-primary '
                                    : ''
                            )
                        }>Tab 2</Tab>
                        <Tab className={({ selected }) =>
                            clsx(
                                'w-full border-0 py-4 text-lg leading-5  bg-transparent',
                                ' ',
                                selected
                                    ? 'border-b-2 border-primary border-solid text-primary'
                                    : ''
                            )
                        } >Tab 3</Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel
                            className={clsx(
                                'rounded-xl bg-white p-3',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                            )}>Content 1</Tab.Panel>
                        <Tab.Panel
                            className={clsx(
                                'rounded-xl bg-white p-3',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                            )}>Content 2</Tab.Panel>
                        <Tab.Panel
                            className={clsx(
                                'rounded-xl bg-white p-3',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                            )}>Content 3</Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>

                {/*{edit ? <Edit /> : <>*/}
                <div className="mt-10">
                    <div className="flex justify-between mx-3">
                        <Text h4 className={"font-sans"}>My Ideas <span className={""}>(254)</span></Text>

                    </div>

                    <Grid.Container gap={2}>
                        {ideas.map(idea => <Grid sm={6}  >
                            <Card flat isPressable className={"bg-primary/10"}>
                                <Card.Header className={"flex-col pb-0 mt-2 items-start"}>
                                    <User size={"xs"} className={"-ml-1 mb-2"}  src={idea.author.avatar} name={idea.author.name}/>
                                    <Text h5 className={"ml-2 mb-0"}> {idea.title}</Text>
                                </Card.Header>
                                <Card.Body>
                                    {idea.description}
                                </Card.Body>
                                <Card.Footer className={"justify-end pt-0 pb-5 pr-5"}>
                                    <MyRating value={idea.ratingsAverage} count={idea.ratingsQuantity} readonly size={"md"}/>
                                </Card.Footer>
                            </Card>
                        </Grid>)}

                    </Grid.Container>
                </div>

                {/*<div className="mt-10">*/}
                {/*    <div className="flex justify-between mx-3">*/}
                {/*        <Text h4 className={"font-sans"}>My comments <span className={""}>(254)</span></Text>*/}
                {/*        <Button size={"sm"} auto flat onClick={()=> {*/}
                {/*            onClose()*/}
                {/*            router.push("/profile/comments")*/}
                {/*        }}>See all comments</Button>*/}
                {/*    </div>*/}
                {/*    {myComments.length === 0 ? <Empty />*/}
                {/*        : myComments.map(item => <div className="ml-3 mt-6">*/}
                {/*            <User description={<Moment date={item.createdAt} format={"LL MM:mm"}/>} size={"sm"} className={"-ml-3"}  src={item.author.image} name={item.author.name}/>*/}
                {/*            <Text className={"mt-1"}>{item.description}</Text>*/}
                {/*        </div>)*/}
                {/*    }*/}

                {/*</div>*/}

                {/*<div className="mt-10">*/}
                {/*    <div className="flex justify-between mx-3">*/}
                {/*        <Text h4 className={"font-sans"}>My Bookmarks <span className={""}>(254)</span></Text>*/}
                {/*        <Button size={"sm"} onClick={()=> {*/}
                {/*            onClose()*/}
                {/*            router.push("/profile/bookmarks")*/}
                {/*        }}  auto flat><span>See all bookmarks</span></Button>*/}
                {/*    </div>*/}
                {/*    <Grid.Container gap={2}>*/}
                {/*        {ideas.map(idea => <Grid sm={6}  >*/}
                {/*            <Card flat isPressable className={"bg-primary/10"}>*/}
                {/*                <Card.Header className={"flex-col pb-0 mt-2 items-start"}>*/}
                {/*                    <User size={"xs"} className={"-ml-1 mb-2"}  src={idea.author.avatar} name={idea.author.name}/>*/}
                {/*                    <Text h5 className={"ml-2 mb-0"}> {idea.title}</Text>*/}
                {/*                </Card.Header>*/}
                {/*                <Card.Body>*/}
                {/*                    {idea.description}*/}
                {/*                </Card.Body>*/}
                {/*                <Card.Footer className={"justify-end pt-0 pb-5 pr-5"}>*/}
                {/*                    <MyRating value={idea.ratingsAverage} count={idea.ratingsQuantity} readonly size={"md"}/>*/}
                {/*                </Card.Footer>*/}
                {/*            </Card>*/}
                {/*        </Grid>)}*/}

                {/*    </Grid.Container>*/}
                {/*</div>*/}
                {/*</>}*/}
            </Card.Body>
        </Card>
        {/*</Modal>*/}
        </>);
};

export default ProfileSidebar;
