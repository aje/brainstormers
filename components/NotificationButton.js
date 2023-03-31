import React from "react";
import {Badge, Navbar} from "@nextui-org/react";
import {Notification} from "@styled-icons/remix-line";
import useSWR from "swr";
import {useGlobalToggle} from "../store";

const NotificationButton = () => {
	const state = useGlobalToggle();
	const {data} = useSWR(`/stats`);
	const onOpen = () => {
		state.toggleOn("notificationSidebar");
		document.body.style.overflow = "hidden";
	};
	return (
		<Navbar.Link onClick={onOpen}>
			<Badge disableOutline color="error" isInvisible={!data || data?.notifications < 1} content={data?.notifications}>
				<Notification size={26} />
			</Badge>
		</Navbar.Link>
	);
};

export default NotificationButton;
