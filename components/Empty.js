import {CircleWithCross} from "@styled-icons/entypo/CircleWithCross";
import {Text} from "@nextui-org/react";

const Empty = ({label, noIcon}) => {
	return (
		<span className={"flex py-2 flex-col w-full justify-center items-center"}>
			{!noIcon && <CircleWithCross color={"#aaa"} size={40} />}
			<Text h5 className={"mt-2"} color={"#aaa"}>
				{label || "No data"}
			</Text>
		</span>
	);
};

export default Empty;
