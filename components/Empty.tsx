import {Text} from "@nextui-org/react";
import clsx from "clsx";
import {Block} from "@styled-icons/entypo";

const Empty = ({label, noIcon, inline}: {label?: string; noIcon?: boolean; inline?: boolean}) => {
	return (
		<div className={clsx(" py-2 flex  w-full ", inline ? "items-center" : "flex-col justify-center items-center")}>
			{!noIcon && <Block color={"#aaa"} size={inline ? 20 : 40} />}
			<Text h5 className={"mb-0 ml-2"} color={"#aaa"}>
				{label || " Empty"}
			</Text>
		</div>
	);
};

export default Empty;
