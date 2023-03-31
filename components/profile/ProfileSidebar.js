import {Button, Card, Divider, Dropdown, Loading, Text} from "@nextui-org/react";
import {signOut, useSession} from "next-auth/react";
import MyRating from "../MyRating";
import Image from "next/image";
import {Heart} from "@styled-icons/entypo/Heart";
import React, {useEffect, useState} from "react";
import {Tab} from "@headlessui/react";
import clsx from "clsx";
import axios from "../../services/axios";
import IdeaItem from "../IdeaItem";
import {Blackboard, ChevronDown, LogOut} from "@styled-icons/entypo";
import {useGlobalToggle} from "../../store";

const ProfileSidebar = () => {
	const {data: session} = useSession();
	const [ideas, setIdeas] = useState([]);
	const [rated, setRated] = useState([]);
	const [sor, setSor] = useState("ranking");
	const [loading, setLoading] = useState(false);

	const state = useGlobalToggle();
	const onClose = () => {
		state.toggleOff("profileSidebar");
		document.body.style.overflow = "auto";
	};

	const onDropdown = key => {
		setSor(key);
		let first = key.values().next();
		let value = first.value;
		switch (value) {
			case "new":
				getIdeas({createdAt: "desc"});
				break;
			case "old":
				getIdeas({createdAt: "asc"});
				break;
			case "rank":
				getIdeas({ratingsAverage: -1});
				break;
			default:
		}
	};

	useEffect(() => {
		getIdeas();
		getRated();
	}, []);

	function getIdeas(params) {
		setLoading(true);
		axios
			.get("/profile/ideas", {params})
			.then(res => {
				setIdeas(res.data);
			})
			.finally(() => setLoading(false));
	}

	function getRated() {
		setLoading(true);
		axios
			.get("/profile/rated")
			.then(res => {
				setRated(res.data);
			})
			.finally(() => setLoading(false));
	}

	return (
		session && (
			<>
				<div
					onClick={onClose}
					style={{zIndex: 400, backdropFilter: "saturate(180%) blur(6px)"}}
					className={" bg-white/30 w-screen h-screen fixed top-0 left-0"}
				/>
				<Card
					css={{borderRadius: 0}}
					style={{zIndex: 400}}
					className="fadeInAnimated bg-white h-screen w-2/3 md:w-1/3  fixed p-0 top-0 right-0">
					<Card.Body className={"p-0"}>
						<div className="flex p-6 bg-primary/5 items-center justify-between">
							<div className="flex items-center">
								<Image className="rounded-full" src={session.user.image} height={100} width={100} />
								<div className={"ml-6"}>
									<Text h2 className={"mb-0"}>
										{session.user.name}{" "}
										<span
											className={
												"align-middle capitalize border-gray-300 text-gray-400 text-xs font-normal border-solid border bg-amber-50 rounded-md px-2"
											}>
											{session.user.role || "user"}
										</span>
									</Text>
									<MyRating size={"md"} value={4} readonly />
									<div className="mt-3">
										{/*{tags.map(t => <a className={"hover:underline hover:text-gray-500 transition-all font-bold italic text-gray-300 mr-3"}>{t}</a>)}*/}
									</div>
								</div>
							</div>

							<Button color={"error"} onClick={() => signOut()} light auto>
								<LogOut size={18} /> Logout
							</Button>

							{/*<Dropdown  placement={"bottom-right"}>*/}
							{/*    <Dropdown.Button ripple={false} light  icon={<Cog size={22} />}>Settings</Dropdown.Button>*/}
							{/*    <Dropdown.Menu aria-label="Static Actions" onAction={onDropdown}>*/}
							{/*        <Dropdown.Item key="edit">Edit profile</Dropdown.Item>*/}
							{/*        <Dropdown.Item key={"logout"} color="error" onClick={() => signOut()}>*/}
							{/*            Logout*/}
							{/*        </Dropdown.Item>*/}
							{/*    </Dropdown.Menu>*/}
							{/*</Dropdown>*/}
						</div>

						<Tab.Group>
							<Tab.List className="flex ">
								<Tab
									className={({selected}) =>
										clsx(
											"w-full border-0 py-4 text-lg leading-5  bg-transparent",
											" ",
											selected
												? "border-b-4 border-primary border-solid text-primary "
												: "border-b-4 border-transparent border-solid"
										)
									}>
									<Blackboard size={20} className={"mr-2"} />
									Ideas
								</Tab>
								<Tab
									className={({selected}) =>
										clsx(
											"w-full border-0 py-4 text-lg leading-5  bg-transparent",
											" ",
											selected
												? "border-b-4 border-primary border-solid text-primary "
												: "border-b-4 border-transparent border-solid"
										)
									}>
									<Heart size={20} className={"mr-2"} />
									Favorites
								</Tab>
								{/*<Tab className={({ selected }) =>*/}
								{/*    clsx(*/}
								{/*        'w-full border-0 py-4 text-lg leading-5  bg-transparent',*/}
								{/*        ' ',*/}
								{/*        selected*/}
								{/*            ? 'border-b-4 border-primary border-solid text-primary'*/}
								{/*            : 'border-b-4 border-transparent border-solid'*/}

								{/*    )*/}
								{/*} ><Cog size={20} className={"mr-2"}/>Settings</Tab>*/}
							</Tab.List>
							<Divider />
							<Tab.Panels className={"overflow-y-scroll"}>
								<Tab.Panel
								// className={clsx(
								//     'rounded-xl bg-white p-3',
								//     'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
								// )}
								>
									{/*<Grid.Container gap={2}>*/}
									<div className="flex px-4 pt-4 justify-between">
										<Text h4>My ideas</Text>
										<Dropdown placement={"bottom-right"}>
											<Dropdown.Button ripple={false} light icon={<ChevronDown size={22} />}>
												Sort by <span className={"ml-2 text-primary"}> {sor}</span>
											</Dropdown.Button>
											<Dropdown.Menu
												onSelectionChange={onDropdown}
												selectionMode="single"
												selectedKeys={sor}
												aria-label="Static Actions">
												<Dropdown.Item key="new">Date Newest</Dropdown.Item>
												<Dropdown.Item key="old">Date Oldest</Dropdown.Item>
												<Dropdown.Item key="rank">Ranking</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									</div>
									<div className={"grid gap-4  p-4 md:grid-cols-2 md:gap-4"}>
										{loading ? <Loading size={"lg"} /> : ideas.map(idea => <IdeaItem noOwner onCallback={onClose} item={idea} />)}
									</div>
								</Tab.Panel>
								<Tab.Panel className={"grid gap-4  p-4 md:grid-cols-2 md:gap-4"}>
									{loading ? <Loading size={"lg"} /> : rated.map(idea => <IdeaItem noOwner onCallback={onClose} item={idea} />)}
								</Tab.Panel>
								<Tab.Panel className={"grid gap-4  p-4 md:grid-cols-2 md:gap-4"}>
									{/*<Input*/}
									{/*    onChange={onChange}*/}
									{/*    contentRight={<Button onClick={onSave} className={"min-w-min px-2 -ml-2"} auto icon={<Check size={22}/>}/>}*/}
									{/*    fullWidth*/}
									{/*    className={""}*/}
									{/*    bordered value={item.title}/>*/}
								</Tab.Panel>
							</Tab.Panels>
						</Tab.Group>

						{/*{edit ? <Edit /> : <>*/}
						{/*<div className="mt-10">*/}
						{/*    <div className="flex justify-between mx-3">*/}
						{/*        <Text h4 className={"font-sans"}>My Ideas <span className={""}>(254)</span></Text>*/}

						{/*    </div>*/}

						{/*   */}
						{/*</div>*/}

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
			</>
		)
	);
};

export default ProfileSidebar;
