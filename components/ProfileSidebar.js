import {Button, Card, Dropdown, Grid, Modal, Popover, Text, User} from "@nextui-org/react";
import {signOut, useSession} from "next-auth/react";
import {useHookstate} from "@hookstate/core";
import {sidebarState} from "../pages/_app";
import MyRating from "./MyRating";
import Empty from "./Empty";
import Moment from "react-moment";
import Image from "next/image";
import {Cog} from "@styled-icons/entypo/Cog";

const ProfileSidebar = () => {
    const { data: session } = useSession();
    const state = useHookstate(sidebarState);
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

    const tags = ["TECH", "INTERNET", "ONLINE"];
    const myComments = [{
        author: {name: "Behrouz Erfanian", image: "https://i.pravatar.cc/150?u=a042581f4e29026704d"},
        description: "This is the description expenct making it longer than usual and loremq expenct making it longer than usual and loremq expenct making it longer than usual and loremq expenct making it longer than usual and loremq  of the item",
        createdAt: new Date()
    },{
        author: {name: "Behrouz Erfanian", image: "https://i.pravatar.cc/150?u=a042581f4e29026704d"},
        description: "This Goes for noghitn expenct making it longer than usual and loremq  This is the description of the item",
        createdAt: new Date()
    },{
        author: {name: "Behrouz Erfanian", image: "https://i.pravatar.cc/150?u=a042581f4e29026704d"},
        description: "expenct making it longer than usual and loremq expenct making it longer than usual and loremq expenct making it longer than usual and loremq expenct making it longer than usual and loremq  This is the description of the item",
        createdAt: new Date()
    },]


    const onDropdown = (key) => {
        switch (key) {
            case "upload":

                break;
            case "edit":

                break;
            case "logout":
                signOut({ callbackUrl: '/' });
                break;
            default:

        }
    };
    return (session && <>
        <div onClick={onClose} style={{zIndex: 400, backdropFilter: "saturate(180%) blur(6px)"}} className={" bg-white/30 w-screen h-screen fixed top-0 left-0"} />
        {/*<Modal*/}
        {/*    // closeButton*/}
        {/*    // fullScreen*/}
        {/*    blur*/}
        {/*    // visibale={state.get() || false}*/}
        {/*    aria-labelledby="modal-title"*/}
        {/*    open={state.get()}*/}
        {/*    onClose={()=>state.set(false)}*/}
        {/*>*/}
        <Card  css={{ borderRadius: 0}} style={{zIndex: 400}}
               className=" bg-white h-screen w-2/3 fixed top-0 right-0"
        >
            <Card.Body className={"p-10"}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Image className="rounded-full" src={session.user.image} height={100} width={100}/>
                        <div className={"ml-8"}>
                            <Text h2 className={"mb-0"}>{session.user.name} <span size={12} className={"align-middle capitalize border-gray-300 text-gray-400 text-xs font-normal border-solid border bg-amber-50 rounded-md px-2"}>{session.user.role || "user"}</span></Text>
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

                <div className="mt-10">
                    <div className="flex justify-between mx-3">
                        <Text h4 className={"font-sans"}>My Ideas <span className={""}>(254)</span></Text>
                        <Button size={"sm"} auto flat>See all ideas</Button>
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

                <div className="mt-10">
                    <div className="flex justify-between mx-3">
                        <Text h4 className={"font-sans"}>My comments <span className={""}>(254)</span></Text>
                        <Button size={"sm"} auto flat>See all comments</Button>
                    </div>
                    {myComments.length === 0 ? <Empty />
                        : myComments.map(item => <div className="ml-3 mt-6">
                            <User description={<Moment date={item.createdAt} format={"LL MM:mm"}/>} size={"sm"} className={"-ml-3"}  src={item.author.image} name={item.author.name}/>
                            <Text className={"mt-1"}>{item.description}</Text>
                        </div>)
                    }

                </div>

                <div className="mt-10">
                    <div className="flex justify-between mx-3">
                        <Text h4 className={"font-sans"}>My Bookmarks <span className={""}>(254)</span></Text>
                        <Button size={"sm"} auto flat>See all bookmarks</Button>
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
            </Card.Body>
        </Card>
        {/*</Modal>*/}
        </>);
};

export default ProfileSidebar;
