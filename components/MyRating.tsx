import {StarOutlined} from "@styled-icons/entypo/StarOutlined";
import {Star} from "@styled-icons/entypo/Star";
import {Text} from "@nextui-org/react";
import Rating, {RatingComponentProps} from "react-rating";
import React from "react";

type Props = {
	count?: number;
	value?: number;
	size?: "sm" | "xl" | "md" | "lg";
};

const MyRating = ({count, value, size = "sm", ...rest}: Props & RatingComponentProps) => {
	const sizeMap = {
		lg: 32,
		xl: 48,
		sm: 20,
		md: 26,
	};
	const color = "#FFC107";
	// @ts-ignore
	return (
		<div className={"flex-shrink-0"}>
			{/*// @ts-ignore*/}
			<Rating
				initialRating={value}
				{...rest}
				fullSymbol={<Star size={sizeMap[size]} className={"-mr-1"} color={color} />}
				emptySymbol={<StarOutlined size={sizeMap[size]} className={"-mr-1"} color={color} />}
			/>
			{(count || count === 0) && (
				<Text span style={{fontSize: sizeMap[size] - 5}} className={"ml-1 align-middle font-bold"} color={color}>
					({count})
				</Text>
			)}
		</div>
	);
};

export default MyRating;
