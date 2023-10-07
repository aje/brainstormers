import React from "react";
import {Button, Grid} from "@nextui-org/react";
import dbConnect from "../services/dbconnect";
import Idea from "../models/Idea";
import Empty from "../components/Empty";
import * as models from "../models/models";
import {Plus} from "@styled-icons/entypo";
import IdeaItem from "../components/IdeaItem";

export default function Search({ideas}) {
	// const {data: session} = useSession();

	return (
		<div
			className={"bg-purple-50 pt-20 p-5 md:p-20"}
			style={{
				height: "calc(100vh - 117px)",
				// backgroundImage: "url(/explorebg.png)",
				// backgroundSize: "cover",
				// backgroundPosition: "bottom",
			}}>
			<h2 className={"font-sans"}>
				Get <span className="text-primary">inspired</span> by other ideas{" "}
				<span className="font-normal font-serif"> and help them to grow the and this is the best</span>
			</h2>
			<Grid.Container gap={2}>
				{ideas?.length > 0 ? (
					ideas.map(idea => (
						<Grid sm={4} key={idea._id} xs={12}>
							<IdeaItem item={idea} />
						</Grid>
					))
				) : (
					<div className={"justify-self-center w-full flex items-center justify-center flex-col self-center"}>
						<Empty label={"We are out of ideas for now!"} />
						<Button href="/new" as={"a"} className={"mt-8 cursor-pointer"} icon={<Plus size={22} />} size="lg">
							Add New Idea
						</Button>
					</div>
				)}
			</Grid.Container>
		</div>
	);
}

export async function getServerSideProps() {
	let latest = [];
	try {
		await dbConnect();
		latest = await Idea.find({}).populate({path: "author", model: models.User}).sort({createdAt: -1});
	} catch (e) {
		console.log(e);
	}

	return {
		props: {
			ideas: JSON.parse(JSON.stringify(latest)),
		},
	};
}
