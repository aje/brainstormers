import React from "react";
import {useHookstate} from "@hookstate/core";
import {notificationState} from "../../pages/_app";
import {Button, Card, Divider, Text} from "@nextui-org/react";
import Empty from "../Empty";
import useSWR from "swr";
import CommentItem from "./CommentItem";
import {Check} from "@styled-icons/entypo";
import RateItem from "./RateItem";

const mapToItem = {
	COMMENT: item => <CommentItem item={item} />,
	RATE: item => <RateItem item={item} />,
};

const NotificationSidebar = () => {
	const state = useHookstate(notificationState);
	const {data, error} = useSWR("/notifications");

	const onClose = () => {
		state.set(false);
		document.body.style.overflow = "auto";
	};

	return (
		<>
			<div
				onClick={onClose}
				style={{zIndex: 400, backdropFilter: "saturate(180%) blur(6px)"}}
				className={" bg-white/30 w-screen h-screen fixed top-0 left-0"}
			/>
			<Card css={{borderRadius: 0}} style={{zIndex: 400}} className="fadeInAnimated bg-white h-screen  w-2/3 md:w-1/3 fixed top-0 right-0">
				<Card.Body>
					<div className="flex justify-between items-center">
						<Text h3>Notifications ({data?.length})</Text>
						<Button light size={"sm"} color={"primary"} icon={<Check size={18} />}>
							Mark as read
						</Button>
					</div>
					{data?.length > 0 ? (
						data.map(item => (
							<>
								<>{mapToItem[item.type](item)}</>
								<Divider className={"my-2"} light />
							</>
						))
					) : (
						<Empty label={"You're allright"} />
					)}
				</Card.Body>
			</Card>
		</>
	);
};

export default NotificationSidebar;
