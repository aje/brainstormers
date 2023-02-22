import React from "react";
import * as models from "../../../models/models";
import {Grid} from "@nextui-org/react";
import dbConnect from "../../../services/dbconnect";
import Idea from "../../../models/Idea";
import Empty from "../../../components/Empty";
import "react-tagsinput/react-tagsinput.css";
import IdeaSides from "../../../components/idea/IdeaSides";
import Comments from "../../../components/idea/Comments";
import IdeaRating from "../../../components/idea/IdeaRating";
import IdeaInfoBar from "../../../components/idea/IdeaInfoBar";
import {getSession} from "next-auth/react";

// CommentItem.propTypes = {
//     item: PropTypes.shape({
//         createdAt: PropTypes.number,
//         author: PropTypes.any,
//         replyTo: PropTypes.string,
//         description: PropTypes.string,
//         type: PropTypes.string
//     })
// };
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
					<IdeaRating item={item} isOwner={isOwner} />
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
	await dbConnect();
	const session = await getSession({req});

	let isOwner = false;
	let item = null;
	try {
		item = await Idea.findOne({_id: id})
			.populate({path: "author", model: models.User})
			.populate({
				path: "comments",
				populate: {
					path: "author",
					model: models.User,
				},
				select: "idea  description createdAt",
				options: {sort: {createdAt: -1}},
			});
		isOwner = session?.user?._id === item?.author._id?.toString();
	} catch (e) {}
	return {
		props: {
			item: JSON.parse(JSON.stringify(item)),
			isOwner,
		},
	};
}
