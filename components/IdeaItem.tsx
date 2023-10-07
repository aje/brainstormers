import React, {useState} from "react";
import {useRouter} from "next/router";
import {Button, Card, Text, User} from "@nextui-org/react";
import MyRating from "./MyRating";
import {EmojiSad} from "@styled-icons/entypo/EmojiSad";
import {Check} from "@styled-icons/entypo/Check";
import axios from "../services/axios";
import {toast} from "react-hot-toast";
import {useSession} from "next-auth/react";
import {useHookstate} from "@hookstate/core";
import {loginPopper} from "../pages/_app";
import {IdeaType} from "../types";

type Props = {
	item: IdeaType;
	noOwner?: boolean;
	onCallback?(): void;
};
const IdeaItem = ({item, noOwner, onCallback}: Props) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const {data: session} = useSession();
	const state = useHookstate(loginPopper);

	// @ts-ignore
	const isRated = item.raters?.includes(session?.user?._id);

	const refreshData = () => {
		router.replace(router.asPath);
	};
	const onPress = () => {
		router.push(`/ideas/${item._id}`);
		if (typeof onCallback === "function") {
			onCallback();
		}
	};

	const onNotLoggedIn = () => {
		if (!session) {
			state.set(true);
			toast.error("Please login first");
		}
	};

	const onReview = value => {
		if (!session) onNotLoggedIn();
		else {
			setLoading(true);
			axios
				.post(`/rate?value=${value}&id=${item._id}`)
				.then(res => {
					toast.success("Successfully updated!");
					refreshData();
				})
				.finally(() => setLoading(false))
				.catch(error => {
					toast.error(error?.response?.data?.message);
				});
		}
	};
	return (
		<Card isPressable onClick={onPress} className={"bg-primary/10"}>
			<Card.Header className={"flex-col pb-0 mt-2 items-start"}>
				{!noOwner && <User size={"xs"} className={"-ml-1 mb-2"} src={item.author?.image} name={item.author?.name} />}
				<Text h5 className={"ml-2 mb-0"}>
					{" "}
					{item.title}
				</Text>
			</Card.Header>
			<Card.Body>{item.description?.substring(0, 300)}</Card.Body>
			<Card.Footer className={"justify-center pt-0 "}>
				{!isRated && (
					<Button
						onClick={() => onReview(1)}
						auto
						borderWeight={"bold"}
						icon={<EmojiSad size={24} />}
						bordered
						size={"md"}
						ghost
						color={"error"}
						className={"z-0 min-w-min mr-4 font-bold"}
					/>
				)}
				<MyRating value={item.ratingsAverage} count={item.ratingsQuantity} readonly size={"md"} />
				{!isRated && (
					<Button
						onClick={() => onReview(5)}
						auto
						borderWeight={"bold"}
						icon={<Check size={26} />}
						bordered
						size={"md"}
						ghost
						color={"primary"}
						className={"z-0 ml-4 font-bold min-w-min"}
					/>
				)}
			</Card.Footer>
		</Card>
	);
};

export default IdeaItem;
