import {Card, Divider, Dropdown, Loading, Text} from "@nextui-org/react";
import MyRating from "../MyRating";
import Image from "next/image";
import React, {useState} from "react";
import {Tab} from "@headlessui/react";
import clsx from "clsx";
import IdeaItem from "../IdeaItem";
import {Blackboard, ChevronDown} from "@styled-icons/entypo";
import useSWR from "swr";
import {selectedUserState, useGlobalToggle} from "../../store";
import Empty from "../Empty";
import {useHookstate} from "@hookstate/core";

const UserSidebar = ({}) => {
	const selectedUser = useHookstate(selectedUserState);
	const user = selectedUser.get();
	const [params, setParams] = useState({createdAt: "asc"});
	const {data: ideas, isLoading, error} = useSWR(user && [`/users/${user.id}/ideas`, params]);
	const [sor, setSor] = useState("ranking");

	const state = useGlobalToggle();
	const onClose = () => {
		console.log("onlcose");
		state.toggleOff("userSidebar");
		document.body.style.overflow = "auto";
	};

	const onDropdown = key => {
		setSor(key);
		let first = key.values().next();
		let value = first.value;
		switch (value) {
			case "new":
				setParams({createdAt: "desc"});
				break;
			case "old":
				setParams({createdAt: "asc"});
				break;
			case "rank":
				setParams({ratingsAverage: -1});
				break;
			default:
		}
	};

	return (
		<>
			<div
				onClick={onClose}
				style={{zIndex: 400, backdropFilter: "saturate(180%) blur(6px)"}}
				className={" bg-white/30 w-screen h-screen fixed top-0 left-0"}
			/>
			<Card css={{borderRadius: 0}} style={{zIndex: 400}} className="fadeInAnimated bg-white h-screen w-2/3 md:w-1/3  fixed p-0 top-0 right-0">
				<Card.Body className={"p-0"}>
					{user ? (
						<>
							<div className="flex p-6 bg-primary/5 items-center justify-between">
								<div className="flex items-center">
									<Image className="rounded-full" src={user.image} height={100} width={100} />
									<div className={"ml-6"}>
										<Text h2 className={"mb-0"}>
											{user.name}{" "}
											<span
												className={
													"align-middle capitalize border-gray-300 text-gray-400 text-xs font-normal border-solid border bg-amber-50 rounded-md px-2"
												}>
												{user.role || "user"}
											</span>
										</Text>
										<MyRating size={"md"} value={4} readonly />
									</div>
								</div>
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
								</Tab.List>
								<Divider />
								<Tab.Panels className={"overflow-y-scroll"}>
									<Tab.Panel>
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
											{error ? (
												<Empty label={"Error 500"} />
											) : isLoading ? (
												<Loading size={"lg"} />
											) : ideas.length > 0 ? (
												ideas.map(idea => <IdeaItem noOwner onCallback={onClose} item={idea} />)
											) : (
												<Empty />
											)}
										</div>
									</Tab.Panel>
								</Tab.Panels>
							</Tab.Group>
						</>
					) : (
						<Empty label={"No user"} />
					)}
				</Card.Body>
			</Card>
		</>
	);
};

export default UserSidebar;
