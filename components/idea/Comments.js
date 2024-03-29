import React from "react";
import {Grid, Text} from "@nextui-org/react";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import Empty from "../Empty";

const Comments = ({item, isOwner}) => {
	return (
		<>
			<Grid xs={12} className={"p-7 bg-white"}>
				<div className={"w-full"}>
					<Text h3 className={"mb-0"}>
						What do <span className={"text-primary"}>YOU</span> think about this idea?
					</Text>
					<Text caption className={"mb-3"}>
						{" "}
						You can use{" "}
						<a target={"_blank"} href={"https://www.markdownguide.org/cheat-sheet/"}>
							Markdown cheatsheet
						</a>
					</Text>
					<CommentForm ideaId={item._id} />
					<Text h3>{item.comments?.length} Comments</Text>

					{item.comments?.length > 0 ? (
						item.comments?.map((u, i) => <CommentItem isOwner={isOwner} withAction idea={item} item={u} key={u._id} isComments />)
					) : (
						<Empty />
					)}
				</div>
			</Grid>
		</>
	);
};

export default Comments;
