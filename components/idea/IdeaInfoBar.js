import React, {useState} from "react";
import {Button, Dropdown, Input, Text, Textarea, User} from "@nextui-org/react";
import MyRating from "../MyRating";
import {Check} from "@styled-icons/entypo/Check";
import TagsInput from "react-tagsinput";
import {Edit} from "@styled-icons/entypo";
import {DotsThreeVertical} from "@styled-icons/entypo/DotsThreeVertical";
import {Close} from "@styled-icons/remix-line";
import axios from "../../services/axios";
import {toast} from "react-hot-toast";
import {useRouter} from "next/router";
import DeleteConfirmation from "../DeleteConfirmation";
import IdeaRating from "./IdeaRating";
import {useSession} from "next-auth/react";
import Moment from "react-moment";
import {urlify} from "../utils";
import ReactMarkdown from "react-markdown";
import CustomListItem from "./CustomListItem";

const IdeaInfoBar = ({item, isOwner}) => {
	const [editable, setEditable] = useState(null);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState(item);
	const [visible, setVisible] = useState(false);
	const router = useRouter();
	const {data: session} = useSession();
	const isRated = item.raters?.includes(session?.user?._id);

	const refreshData = () => {
		router.replace(router.asPath);
	};
	const onDropdown = key => {
		switch (key) {
			case "upload":
				break;
			case "edit":
				break;
			case "delete":
				setVisible(true);
				break;
			default:
		}
	};
	const editItem = name => e => {
		if (isOwner) setEditable(name);
		if (name === null) {
			setFormData(item);
		}
	};
	const onChange = name => event => {
		setFormData({...formData, [name]: event?.target ? event.target.value : event});
	};
	function onSave() {
		return axios.patch(`/posts`, formData);
	}
	function onDelete() {
		setLoading(true);
		setVisible(false);
		axios
			.delete(`/posts?id=${item.id}`)
			.then(res => {
				toast.success("Successfully deleted!");
				router.push("/");
			})
			.finally(() => setLoading(false));
	}

	const renderHeader = () => (
		<>
			{/*? Author */}
			<User
				className={"-ml-3"}
				description={<Moment from={new Date()}>{item.createdAt}</Moment>}
				size="sm"
				src={item.author?.image}
				name={item.author?.name}
			/>
			{/*? title tags */}
			<div className="flex justify-center">
				<div className="flex-1">
					{editable === "title" ? (
						<Input
							onChange={onChange("title")}
							contentRight={
								<div className={"-ml-14 flex"}>
									<Button
										onClick={() => setEditable(null)}
										light
										className={"min-w-min px-2 mr-2 z-0"}
										auto
										icon={<Close size={18} />}
									/>
									<Button onClick={onSave} className={"min-w-min px-2 z-0"} auto icon={<Check size={22} />} />
								</div>
							}
							fullWidth
							size={"xl"}
							className={""}
							bordered
							value={item.title}
						/>
					) : (
						<Text h3 className={"cursor-pointer hider mb-0"} onClick={editItem("title")}>
							{item.title}
							{isOwner && (
								<Button
									onClick={editItem("title")}
									color={"warning"}
									light
									size={"xs"}
									auto
									icon={<Edit size={16} />}
									className={"min-w-min ml-2 hid inline-block z-0"}
								/>
							)}
						</Text>
					)}
					<div className={"mb-3 max-w-full hider"}>
						{editable === "tags" ? (
							<>
								<Text h4>
									Tags <small className={"text-gray-500 ml-1"}> Enter to add</small>
								</Text>

								<TagsInput
									tagProps={{
										className:
											"react-tagsinput-tagd break-all mb-2 inline-block rounded-xl flex-wrap px-2 pb-1 pt-0 border border-solid border-gray-300 mr-2",
										classNameRemove: "before:content-['×'] text-gray-500 hover:text-gray-800 cursor-pointer pl-2 ",
									}}
									className={"rounded-3xl bg-white px-3 pt-2 pb-1 "}
									value={formData.tags}
									onChange={onChange("tags")}
								/>
								<div className="flex mt-2">
									<Button size={"xs"} onClick={() => setEditable(null)} light auto z-0>
										Cancel
									</Button>
									<Button size={"xs"} onClick={onSave} auto icon={<Check size={16} />} className={" z-0"}>
										Save
									</Button>
								</div>
							</>
						) : item.tags?.length > 0 ? (
							<>
								{item.tags.map(t => (
									<a className={"hover:underline hover:text-gray-500 transition-all font-bold  italic text-gray-300 mr-3"}>{t}</a>
								))}
								{isOwner && (
									<Button
										onClick={editItem("tags")}
										color={"warning"}
										light
										size={"xs"}
										auto
										icon={<Edit size={16} />}
										className={"min-w-min hid inline-block z-0"}
									/>
								)}
							</>
						) : (
							isOwner && (
								<Button
									onClick={editItem("tags")}
									size={"xs"}
									color={"warning"}
									className={" -ml-3 z-0"}
									light
									auto
									icon={<Edit size={16} />}>
									Add tags
								</Button>
							)
						)}
					</div>
				</div>

				{<MyRating count={item.ratingsQuantity} size={"md"} value={item.ratingsAverage} readonly />}
				{/*? Delete button */}
				{isOwner && (
					<>
						<DeleteConfirmation
							renderItem={() => (
								<div>
									<Text h5>{item.title}</Text>
								</div>
							)}
							loading={loading}
							visible={visible}
							closeHandler={() => setVisible(false)}
							onDelete={onDelete}
						/>

						<Dropdown placement={"bottom-right"}>
							<Dropdown.Button ripple={false} light className={"min-w-min ml-2"} icon={<DotsThreeVertical size={22} />} />
							<Dropdown.Menu aria-label="Static Actions" onAction={onDropdown}>
								{/*<Dropdown.Item key="edit">Edit</Dropdown.Item>*/}
								{/*<Dropdown.Item key="copy">Copy link</Dropdown.Item>*/}
								{/*<Dropdown.Item key="edit">Edit file</Dropdown.Item>*/}
								<Dropdown.Item key={"delete"} color="error">
									Delete
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</>
				)}
			</div>

			{/*? description */}
			{editable === "description" ? (
				<>
					<Textarea onChange={onChange("description")} fullWidth bordered minRows={8} value={item.description} />
					<div className="flex mt-2">
						<Button onClick={() => setEditable(null)} light auto>
							Cancel
						</Button>
						<Button onClick={onSave} auto icon={<Check size={22} />}>
							Save
						</Button>
					</div>
				</>
			) : item.description ? (
				<div onClick={editItem("description")} className={" max-h-96 hider overflow-y-auto mb-5 text-gray-500 font-light cursor-pointer"}>
					<ReactMarkdown linkTarget={"_blank"}>{urlify(item.description)}</ReactMarkdown>
				</div>
			) : (
				isOwner && (
					<Button onClick={editItem("description")} color={"warning"} light auto icon={<Edit size={16} />}>
						Add description
					</Button>
				)
			)}
		</>
	);

	return (
		<div className="hsl px-6 pb-6 flex-1 overflow-y-auto pt-24 md:pt-4">
			{renderHeader()}
			{!isRated && <IdeaRating item={item} isOwner={isOwner} />}

			<CustomListItem
				helper={
					<Text caption className={"text-gray-400"}>
						List your problems
					</Text>
				}
				title={<span className={"text-red-500"}>Problems</span>}
				items={item.problems}
				isOwner={isOwner}
				onSave={onSave}
				onChange={onChange}
				formData={formData}
				itemKey={"problems"}
			/>

			<CustomListItem
				helper={
					<Text caption className={"text-gray-400"}>
						Outline a possible solution for each problem
					</Text>
				}
				title={<span className={"text-green-500"}>Solutions</span>}
				isOwner={isOwner}
				items={item.solutions}
				onSave={onSave}
				onChange={onChange}
				formData={formData}
				itemKey={"solutions"}
			/>

			<CustomListItem
				helper={
					<Text caption className={"text-gray-400"}>
						List how these problems are solved today
					</Text>
				}
				title={<span>Alternatives</span>}
				isOwner={isOwner}
				items={item.alternatives}
				onSave={onSave}
				onChange={onChange}
				formData={formData}
				itemKey={"alternatives"}
			/>

			<CustomListItem
				helper={
					<Text caption className={"text-gray-400"}>
						List the characteristics of your ideal customers
					</Text>
				}
				title={<span>Early adopters</span>}
				isOwner={isOwner}
				items={item.targetAudience}
				onSave={onSave}
				onChange={onChange}
				formData={formData}
				itemKey={"targetAudience"}
			/>
		</div>
	);
};

export default IdeaInfoBar;
