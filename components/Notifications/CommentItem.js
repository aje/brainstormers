import React from "react";
import {Avatar, Text} from "@nextui-org/react";
import Moment from "react-moment";
import clsx from "clsx";
import Link from "next/link";
import {useHookstate} from "@hookstate/core";
import {notificationState} from "../../pages/_app";
import ReactMarkdown from "react-markdown";

const CommentItem = ({item}) => {
	const state = useHookstate(notificationState);
	const onClick = () => {
		state.set(false);
		document.body.style.overflow = "auto";
	};
	return (
		<Link href={`/ideas/${item.content.idea._id}`}>
			<a onClick={onClick} className={clsx(!item.seen && "bg-red-50", "flex p-3 min-w-full hover:bg-gray-100")}>
				<Avatar src={item.content.author.image} />
				<span className="flex-1 ml-3">
					<Text small>
						<strong>{item.content.author.name}</strong> <span className={"text-gray-400"}>commented on</span> {item.content.idea.title}
					</Text>
					<ReactMarkdown linkTarget={"_blank"} className={"text-gray-700"}>
						{item.content.description.substring(0, 100)}
					</ReactMarkdown>
					<Text className={"text-xs text-gray-400"}>
						<Moment format={"LL, HH:mm"}>{item.createdAt}</Moment>
					</Text>
				</span>
			</a>
		</Link>
	);
};

export default CommentItem;
