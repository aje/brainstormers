import React from "react";
import {Badge, Navbar} from "@nextui-org/react";
import {Notification} from "@styled-icons/remix-line";
import {useHookstate} from "@hookstate/core";
import {notificationState} from "../pages/_app";
import useSWR from "swr";

const NotificationButton = () => {
	const state = useHookstate(notificationState);
	const {data} = useSWR(`/stats`);
	const onOpen = () => {
		state.set(true);
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