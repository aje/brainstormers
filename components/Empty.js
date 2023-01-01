import {CircleWithCross} from "@styled-icons/entypo/CircleWithCross";
import {Text} from "@nextui-org/react";

const Empty = ({label, noIcon}) => {
    return (<span  className={"flex py-2 flex-col w-full justify-center items-center"}>
        {!noIcon && <CircleWithCross color={"#ccc"} size={40}/>}
            <Text span className={"mt-2"} color={"#ccc"}>{label || "No data"}</Text>
        </span>);
};

export default Empty;
