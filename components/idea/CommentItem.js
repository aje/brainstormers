import {Button, Dropdown, Loading, Text, Textarea, User} from "@nextui-org/react";
import Moment from "react-moment";
import clsx from "clsx";
import {Close, DeleteBin} from "@styled-icons/remix-line";
import React, {useState} from "react";
import axios from "../../services/axios";
import {toast} from "react-hot-toast";
import {useRouter} from "next/router";
import DeleteConfirmation from "../DeleteConfirmation";
import {useSession} from "next-auth/react";
import {ChevronDown, ChevronUp, Edit, Reply} from "@styled-icons/entypo";
import {useHookstate} from "@hookstate/core";
import {loginPopper} from "../../pages/_app";
import {SendPlane} from "@styled-icons/remix-line/SendPlane";
import ReactMarkdown from "react-markdown";
import {urlify} from "../utils";
import {Check} from "@styled-icons/entypo/Check";
// import mongoose from "mongoose";

const CommentItem = ({item, dense, idea, withAction, isOwner, isComments, action}) => {
	const {data: session} = useSession();
	const state = useHookstate(loginPopper);
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [description, setDescription] = useState(item.description);
	const [edit, setEdit] = useState(false);
	const [visible, setVisible] = useState(false);
	const [reply, setReply] = useState("");
	const [rep, setRep] = useState(false);
	const [toggle, setToggle] = useState(false);

	const isAuthor = item.author?._id === session?.user?._id;
	const refreshData = () => {
		router.replace(router.asPath);
	};

	const onDropdown = type => {
		const formData = {
			_id: idea._id,
			comment: item,
		};
		setLoading(true);
		axios
			.patch(`/posts?set=${type}`, formData)
			.then(res => {
				toast.success("Successfully updated!");
				// setEditable(null);?
				refreshData();
			})
			.finally(() => setLoading(false));
	};

	const onSubmit = () => {
		setLoading(true);

		if (session) {
			const formData = {
				description: reply,
				idea: {
					_id: idea._id,
					title: idea.title,
				},
			};
			axios
				.post(`/reply?id=${item._id}&to=${item.author.id}`, formData)
				.then(() => {
					setRep(false);
					setReply("");
					router.replace(router.asPath);
					toast.success("Successfully posted!");
				})
				.finally(() => setLoading(false));
		} else {
			state.set(true);
			setLoading(false);
			toast.error("Please login first");
		}
	};

	const onDelete = () => {
		setLoading(true);
		setVisible(false);
		axios
			.delete(`/comments?id=${item._id}`)
			.then(res => {
				toast.success("Successfully deleted!");
				refreshData();
			})
			.finally(() => setLoading(false));
	};

	const deleteReply = _ => () => {
		setLoading(true);
		setVisible(false);
		axios
			.delete(`/reply?commentId=${item._id}&createdAt=${_.createdAt}`)
			.then(res => {
				toast.success("Successfully deleted!");
				refreshData();
			})
			.finally(() => setLoading(false));
	};

	const onEdit = () => {
		setLoading(true);
		axios
			.put(`/comments/${item._id}`, {description})
			.then(res => {
				setEdit(false);
				toast.success("Successfully deleted!");
				refreshData();
			})
			.finally(() => setLoading(false));
	};

	return (
		<div className={clsx(!dense && "mt-5", "hider")}>
			<DeleteConfirmation
				renderItem={() => <CommentItem item={item} />}
				loading={loading}
				visible={visible}
				closeHandler={() => setVisible(false)}
				onDelete={onDelete}
			/>

			{!dense && (
				<div className={"flex mb-2 justify-between  items-center"}>
					{!dense && (
						<User
							className={"pl-0 z-0"}
							size={dense ? "xs" : "sm"}
							src={item.author.image}
							name={
								<Text span className={clsx(dense ? "text-xs text-gray-500" : "  text-gray-600")}>
									{item.author.name}{" "}
									<Text span className={"font-normal text-xs text-gray-400"}>
										<Moment from={new Date()}>{item.createdAt}</Moment>
									</Text>
								</Text>
							}
						/>
					)}
					{action && <div className={"flex"}>{action}</div>}
					{withAction && (
						<div className={"flex"}>
							<Button size={"xs"} className={"z-0 hid"} light auto onClick={() => setRep(rep => !rep)}>
								{!rep ? <Reply size={14} /> : <Close size={16} />}
							</Button>
							{isAuthor && (
								<>
									<Button className={"ml-2 hid z-0 "} onClick={() => setEdit(!edit)} size={"xs"} light auto>
										{edit ? <Close size={16} /> : <Edit size={14} />}
									</Button>
									<Button
										className={"mx-2 hid z-0 opacity-40 hover:opacity-100 hover:text-red-400"}
										onClick={() => setVisible(true)}
										size={"xs"}
										light
										auto>
										<DeleteBin size={14} />
									</Button>
								</>
							)}

							{isOwner && (
								<Dropdown placement={"bottom-right"}>
									<Dropdown.Button ripple={false} size={"xs"} className={"min-w-min hid ml-2 z-0  opacity-70 hover:opacity-100"}>
										Set As
									</Dropdown.Button>
									<Dropdown.Menu aria-label="Static Actions" onAction={onDropdown}>
										<Dropdown.Item key={"upsides"} color="success">
											Upside
										</Dropdown.Item>
										<Dropdown.Item key={"downsides"} color="error">
											Challange
										</Dropdown.Item>
										<Dropdown.Item key={"solutions"}>Solution</Dropdown.Item>
										<Dropdown.Item key={"problems"}>Problem</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							)}
							{/*<Button className={"ml-2"} size={"xs"} auto icon={<Anticlockwise2 size={14} />}>Set As</Button>*/}
						</div>
					)}
				</div>
			)}
			<div className="flex-1 flex relative">
				{item.replies?.length > 0 && !dense && (
					<Button onClick={() => setToggle(!toggle)} size={"xs"} className={"min-w-min -left-1 top-1 absolute"} auto light>
						{!toggle ? <ChevronUp size={20} className={"hid"} /> : <ChevronDown size={20} />}
					</Button>
				)}
				<div
					className={clsx(
						isComments && dense && "bg-gray-50",
						isComments && " bg-gray-100 py-1 px-2",
						dense ? " ml-0 flex" : "ml-10",
						" flex-1"
					)}>
					{dense && (
						<User
							className={"p-0 z-0"}
							size={dense ? "xs" : "sm"}
							src={item.author.image}
							name={
								<Text span className={clsx("text-xs mr-2 text-gray-500")}>
									{item.author.name}
								</Text>
							}
						/>
					)}

					<div className={"flex-1"}>
						{edit ? (
							<div className={"py-2"}>
								<Textarea
									fullWidth
									autoFocus
									onChange={e => setDescription(e.target.value)}
									value={description}
									// minRows={1}
									bordered
								/>

								<div className={"items-center mt-4 flex"}>
									<Button onClick={() => setEdit(false)} light className={"min-w-min px-2 mr-2 z-0"} auto>
										Cancel
									</Button>
									<Button onClick={onEdit} className={"min-w-min px-2 z-0"} auto icon={<Check size={22} />}>
										Save
									</Button>
								</div>
							</div>
						) : (
							<ReactMarkdown linkTarget={"_blank"}>{urlify(item.description)}</ReactMarkdown>
						)}
					</div>
					{dense && <div className={"hid"}>{action}</div>}
				</div>
			</div>
			{(item.replies?.length > 0 || rep) && isComments && !toggle && (
				<div className={clsx("ml-10 mt-2")}>
					{item.replies?.map((_, i) => (
						<CommentItem
							isComments
							key={_.id}
							dense
							item={_}
							action={
								isAuthor && (
									<Button
										className={"mx-2 z-0 opacity-40 hover:opacity-100 hover:text-red-400"}
										onClick={deleteReply(_)}
										size={"xs"}
										light
										auto>
										<DeleteBin size={"14"} />
									</Button>
								)
							}
						/>
					))}
					{rep && (
						<>
							<Textarea
								fullWidth
								autoFocus
								onChange={e => setReply(e.target.value)}
								value={reply}
								className={"mt-3"}
								minRows={1}
								bordered
								placeholder={"What do you think?"}
							/>
							<Button
								auto
								className={"mt-4 z-0"}
								disabled={loading || reply === ""}
								onClick={onSubmit}
								iconRight={!loading && <SendPlane size={20} />}>
								{loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> : "Post"}
							</Button>
						</>
					)}
					{item.replies?.length > 0 && !rep && (
						<Button icon={<Reply size={14} />} className={"z-0 mt-2"} onClick={() => setRep(true)} size={"xs"} light>
							Reply
						</Button>
					)}
				</div>
			)}
		</div>
	);
};

export default CommentItem;
