import {Button, Container, Grid} from "@nextui-org/react";
import IdeaItem from "../IdeaItem";

const LatestIdeas = ({topLastMonth: ideas, countLastMonth}) => {
	return (
		<div className={"py-20"}>
			<Container lg>
				<main>
					<h2 className={"font-sans"}>
						Get <span className="text-primary">inspired</span> by other ideas{" "}
						<span className="font-normal font-serif"> and help them to grow the and this is the best</span>
					</h2>
					<h3>
						Last month <span className="font-normal"> best ideas ({countLastMonth})</span>
					</h3>
					<Grid.Container gap={2}>
						{ideas.map(idea => (
							<Grid sm={4} key={idea._id} xs={12}>
								<IdeaItem item={idea} />
							</Grid>
						))}
					</Grid.Container>

					<div className="flex justify-center mt-5">
						<Button ghost size={"lg"} className={"z-0"}>
							SEE ALL
						</Button>
					</div>
				</main>
			</Container>
		</div>
	);
};

export default LatestIdeas;
