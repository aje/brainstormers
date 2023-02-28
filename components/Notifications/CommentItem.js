import React from "react";
import {Avatar, Link, Text} from "@nextui-org/react";
import Moment from "react-moment";

const CommentItem = ({item}) => {
	return (
		<Link href={`/ideas/idea/${item.content.idea._id}`} className={"flex p-3 min-w-full hover:bg-gray-100 rounded-xl"}>
			<Avatar src={item.content.author.image} />
			<span className="flex-1 ml-3">
				<Text small>
					<strong>{item.content.author.name}</strong> <span className={"text-gray-400"}>commented on</span> {item.content.idea.title}
				</Text>
				<Text>
					{item.content.description.substring(0, 100)} {item.content.description.length > 99 && "..."}
				</Text>
				<Text className={"text-xs text-gray-400"}>
					<Moment format={"LL, HH:mm"}>{item.createdAt}</Moment>
				</Text>
			</span>
		</Link>
	);
};

export default CommentItem;