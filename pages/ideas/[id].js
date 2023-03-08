import React from "react";
import * as models from "../../models/models";
import {Grid} from "@nextui-org/react";
import dbConnect from "../../services/dbconnect";
import Idea from "../../models/Idea";
import Empty from "../../components/Empty";
import "react-tagsinput/react-tagsinput.css";
import IdeaSides from "../../components/idea/IdeaSides";
import Comments from "../../components/idea/Comments";
import IdeaInfoBar from "../../components/idea/IdeaInfoBar";
import {getSession} from "next-auth/react";
import Notification from "../../models/Notification";
import mongoose from "mongoose";

const IdeaPage = ({item, isOwner}) => {
	if (!item)
		return (
			<div className={"my-28"}>
				<Empty label={"Error 404"} />
			</div>
		);

	return (
		<Grid.Container gap={0} justify="center">
			<Grid sm={5} xs={12} className="bg-blue-50 pt-24 ">
				<div className="relative h-full flex flex-col flex-1">
					<IdeaInfoBar item={item} isOwner={isOwner} />
				</div>
			</Grid>
			<Grid xs={12} sm={7} className=" bg-red-50s md:pt-20 -full">
				<Grid.Container alignContent={"start"} className={" overflow-y-auto h-full"}>
					<IdeaSides item={item} isOwner={isOwner} />
					<Comments item={item} isOwner={isOwner} />
				</Grid.Container>
			</Grid>
		</Grid.Container>
	);
};

export default IdeaPage;

export async function getServerSideProps({params, req}) {
	const {id} = params;
	const session = await getSession({req});

	let isOwner = false;
	let item = null;
	try {
		await dbConnect();
		item = await Idea.findById(id)
			.populate({path: "author", model: models.User})
			.populate({
				path: "comments",
				populate: {
					path: "author",
					model: models.User,
				},
				select: "idea  description replies createdAt",
				options: {sort: {createdAt: -1}},
			});
		isOwner = session?.user?._id === item?.author._id?.toString();

		if (isOwner) {
			// Schema.Types.ObjectId
			const tquery = {
				user: mongoose.Types.ObjectId(session.user._id),
				"content.idea": mongoose.Types.ObjectId(id),
				seen: false,
			};
			const t = await Notification.updateMany(tquery, {seen: true});
		}
	} catch (e) {
		console.log(e);
	}
	return {
		props: {
			item: JSON.parse(JSON.stringify(item)),
			isOwner,
		},
	};
}
