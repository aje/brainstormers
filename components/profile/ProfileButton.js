import {useSession} from "next-auth/react";
import {Navbar, User} from "@nextui-org/react";
import {useGlobalToggle} from "../../store";

const ProfileButton = () => {
	const {data: session} = useSession();
	const state = useGlobalToggle();
	const onOpen = () => {
		state.toggleOn("profileSidebar");
		document.body.style.overflow = "hidden";
	};
	return (
		<>
			<Navbar.Link onClick={onOpen}>
				<User size={"sm"} src={session.user.image} name={session.user.name} />
			</Navbar.Link>
		</>
	);
};

export default ProfileButton;
