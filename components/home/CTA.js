import {Button, Container} from "@nextui-org/react";
import {Flag} from "@styled-icons/entypo/Flag";

const Cta = () => {
	return (
		<div
			className={"bg-primary/10 pt-52 pb-32 text-center"}
			style={{
				backgroundImage: "url(/homepage.png)",
				backgroundSize: "cover",
				backgroundPosition: "bottom",
			}}>
			<Container>
				<div>
					<main className={"flex flex-col items-center"}>
						<h1 className={"font-bold text-5xl  font-sans"}>
							Everything begins with an <span className="text-primary"> idea</span>
						</h1>
						<p className="text-3xl text-gray-600 mx-auto w-1/2 my-7 leading-10">
							Start your journey by brainstorming your ideas with other people around the globe or your friends
						</p>
						<Button
							as={"a"}
							href={"/explore"}
							size={"xl"}
							icon={<Flag size={30} />}
							auto
							className={"font-bold text-2xl"}
							color="primary">
							Explore Ideas
						</Button>
					</main>
				</div>
			</Container>
		</div>
	);
};

export default Cta;
