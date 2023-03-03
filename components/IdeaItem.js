import React from "react";
import {useRouter} from "next/router";
import {Card, Text, User} from "@nextui-org/react";
import MyRating from "./MyRating";

const IdeaItem = ({item, noOwner, onCallback}) => {
	const router = useRouter();

	const onPress = () => {
		router.push(`/ideas/idea/${item._id}`);
		if (typeof onCallback === "function") {
			onCallback();
		}
	};
	return (
		<Card isPressable onClick={onPress} className={"bg-primary/10"}>
			<Card.Header className={"flex-col pb-0 mt-2 items-start"}>
				{!noOwner && <User size={"xs"} className={"-ml-1 mb-2"} src={item.author?.avatar} name={item.author?.name} />}
				<Text h5 className={"ml-2 mb-0"}>
					{" "}
					{item.title}
				</Text>
			</Card.Header>
			<Card.Body>{item.description?.substring(0, 300)}</Card.Body>
			<Card.Footer className={"justify-end pt-0 pb-5 pr-5"}>
				<MyRating value={item.ratingsAverage} count={item.ratingsQuantity} readonly size={"md"} />
			</Card.Footer>
		</Card>
	);
};

export default IdeaItem;
