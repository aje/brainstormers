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
import {Reply} from "@styled-icons/entypo";
import {useHookstate} from "@hookstate/core";
import {loginPopper} from "../../pages/_app";
import {SendPlane} from "@styled-icons/remix-line/SendPlane";

const CommentItem = ({item, dense, idea, withAction, isOwner, isComments, action}) => {
	const {data: session} = useSession();
	const state = useHookstate(loginPopper);
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [reply, setReply] = useState("");
	const [rep, setRep] = useState(false);

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
			};
			axios
				.post(`/reply?id=${item._id}`, formData)
				.then(() => {
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

	function onDelete() {
		setLoading(true);
		setVisible(false);
		axios
			.delete(`/comments?id=${item._id}`)
			.then(res => {
				toast.success("Successfully deleted!");
				refreshData();
			})
			.finally(() => setLoading(false));
	}

	return (
		<div className={"mb-5 "}>
			<DeleteConfirmation
				renderItem={() => <CommentItem item={item} />}
				loading={loading}
				visible={visible}
				closeHandler={() => setVisible(false)}
				onDelete={onDelete}
			/>

			<div className={"flex mb-2 justify-between  items-center"}>
				<User
					className={"pl-0"}
					size={dense ? "xs" : "sm"}
					src={item.author.image}
					name={
						<Text span className={clsx(dense ? "text-xs text-gray-500" : "  text-gray-600")}>
							{item.author.name}{" "}
							<Text span className={"font-normal text-xs text-gray-400"}>
								<Moment from={new Date()} ago>
									{item.createdAt}
								</Moment>
							</Text>
						</Text>
					}
				/>
				{action && <div className={"flex"}>{action}</div>}
				{withAction && (
					<div className={"flex"}>
						<Button size={"xs"} light auto onClick={() => setRep(rep => !rep)}>
							{!rep ? <Reply size={14} /> : <Close size={16} />}
						</Button>
						{isAuthor && (
							<Button className={"mx-2"} onClick={() => setVisible(true)} size={"xs"} light color={"error"} auto>
								<DeleteBin size={"14"} />
							</Button>
						)}

						{isOwner && (
							<Dropdown placement={"bottom-right"}>
								<Dropdown.Button ripple={false} size={"xs"} className={"min-w-min ml-2"}>
									Set As
								</Dropdown.Button>
								<Dropdown.Menu aria-label="Static Actions" onAction={onDropdown}>
									{/*<Dropdown.Item key="edit">Edit</Dropdown.Item>*/}
									{/*<Dropdown.Item key="copy">Copy link</Dropdown.Item>*/}
									{/*<Dropdown.Item key="edit">Edit file</Dropdown.Item>*/}
									<Dropdown.Item key={"upsides"} color="success">
										Upside
									</Dropdown.Item>
									<Dropdown.Item key={"downsides"} color="error">
										Downside
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

			<Text className={clsx(isComments && " bg-gray-50 py-1 px-2", dense ? "ml-8" : "ml-10", " flex-1")}>{item.description}</Text>
			{(item.replies?.length > 0 || rep) && isComments && (
				<div className={clsx("ml-10 mt-4")}>
					{item.replies?.map((_, i) => (
						<CommentItem isComments key={i} dense item={_} />
					))}
					{rep && (
						<>
							<Textarea
								fullWidth
								autoFocus
								onChange={e => setReply(e.target.value)}
								value={reply}
								minRows={1}
								bordered
								placeholder={"Write something usefull please"}
							/>
							<Button
								auto
								className={"mt-4"}
								disabled={loading || reply === ""}
								onClick={onSubmit}
								iconRight={!loading && <SendPlane size={20} />}>
								{loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> : "Post"}
							</Button>
						</>
					)}
					{item.replies?.length > 0 && !rep && (
						<Button icon={<Reply size={14} />} onClick={() => setRep(true)} size={"xs"} light>
							Reply
						</Button>
					)}
				</div>
			)}
		</div>
	);
};

export default CommentItem;
