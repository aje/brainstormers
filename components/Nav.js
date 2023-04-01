import {Navbar} from "@nextui-org/react";
import Image from "next/image";
import LoginPopover from "./LoginPopover";
import {useSession} from "next-auth/react";
import ProfileButton from "./profile/ProfileButton";
import {Plus} from "@styled-icons/entypo/Plus";
import NotificationButton from "./NotificationButton";
import Link from "next/link";
import {useRouter} from "next/router";

const Nav = () => {
	const {data: session} = useSession();
	const router = useRouter();

	return (
		<>
			<Navbar
				// css={{
				// 	backdropFilter: " blur(7px)",
				// 	background: "transparent",
				// }}
				// className={"h-20"}
				containerCss={{
					backdropFilter: " blur(7px)",
					background: "transparent",
					// filter: 'blur(5px)',
					// background: "#e5f4f0ab",
					position: "fixed",
					top: 0,
					zIndex: 1,
				}}
				disableShadow
				disableBlur
				// className={"fixed "}
			>
				<Navbar.Brand className={"cursor-pointer"} onClick={() => router.push("/")}>
					<Image src={"/logo.png"} width={200} quality={100} height={60} />
				</Navbar.Brand>

				<Navbar.Content className={"font-bold"} variant={"underline"} activeColor={"primary"}>
					<Link href="/">
						<Navbar.Link isActive={router.route === "/"} className="font-bold">
							Home
						</Navbar.Link>
					</Link>
					<Link href="/explore">
						<Navbar.Link isActive={router.route === "/explore"}>Explore</Navbar.Link>
					</Link>
					{/*<Navbar.Link href="#">Blog</Navbar.Link>*/}
					<Link href="/new">
						<Navbar.Link>
							<span className={"bg-primary rounded-xl px-3 py-1 text-white active:translate-y-0.5 duration-75"}>
								<Plus size={26} />
							</span>
						</Navbar.Link>
					</Link>
					{session ? (
						<>
							<NotificationButton />
							<ProfileButton />
						</>
					) : (
						<LoginPopover />
					)}
				</Navbar.Content>
			</Navbar>
		</>
	);
};

export default Nav;
