import React from "react";
import {useHookstate} from "@hookstate/core";
import {notificationState} from "../../pages/_app";
import {Badge, Card, Divider, Loading, Text} from "@nextui-org/react";
import Empty from "../Empty";
import useSWR from "swr";
import CommentItem from "./CommentItem";
import RateItem from "./RateItem";

const mapToItem = {
	COMMENT: item => <CommentItem item={item} />,
	RATE: item => <RateItem item={item} />,
	REPLY: item => <CommentItem item={item} />,
};

const NotificationSidebar = () => {
	const state = useHookstate(notificationState);
	const {data: notif, error} = useSWR("/notifications");
	const onClose = () => {
		state.set(false);
		document.body.style.overflow = "auto";
	};

	// if (!data && !error) return <Loading />;

	return (
		<>
			<div
				onClick={onClose}
				style={{zIndex: 400, backdropFilter: "saturate(180%) blur(6px)"}}
				className={" bg-white/30 w-screen h-screen fixed top-0 left-0"}
			/>
			<Card
				css={{borderRadius: 0}}
				style={{zIndex: 400}}
				className="fadeInAnimated overflow-y-scroll bg-white h-screen  w-2/3 md:w-1/3 fixed top-0 right-0">
				<div className="flex justify-between items-center px-3 pt-3">
					<Badge disableOutline color="error" isInvisible={!notif || notif?.unreadCount < 1} content={notif?.unreadCount}>
						<Text h3>Notifications</Text>
					</Badge>
					{/*<Button light size={"sm"} color={"primary"} icon={<Check size={18} />}>*/}
					{/*	Mark as read*/}
					{/*</Button>*/}
				</div>
				{!notif && !error ? (
					<Loading size={"lg"} />
				) : notif?.data?.length > 0 ? (
					notif?.data.map(item => (
						<>
							<>{mapToItem[item.type](item)}</>
							<Divider light />
						</>
					))
				) : (
					<Empty label={"You're allright"} />
				)}
			</Card>
		</>
	);
};

export default NotificationSidebar;
