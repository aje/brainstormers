import {Container, Navbar, Text} from "@nextui-org/react";
import Link from "next/link";

const Footer = () => {
	return (
		<div className={"py-12 bg-red-200 "}>
			<Container lg className={"flex justify-between items-center"}>
				<Text h6 className={"mb-0"}>
					All right reserved for IdeaStorm
				</Text>
				<Navbar.Content>
					<Link href="/">
						<Navbar.Link>Home</Navbar.Link>
					</Link>
					<Link href="/explore">
						<Navbar.Link>Explore</Navbar.Link>
					</Link>
					<Link href="/about">
						<Navbar.Link>About</Navbar.Link>
					</Link>
					<Link href="/contact">
						<Navbar.Link>Support</Navbar.Link>
					</Link>
				</Navbar.Content>
			</Container>
		</div>
	);
};

export default Footer;
