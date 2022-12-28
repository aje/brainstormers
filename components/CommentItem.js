import {Text, User} from "@nextui-org/react";
import Moment from "react-moment";
import clsx from "clsx";

const CommentItem = ({item, dense}) => {
    return (<div className={"mb-5 "}>
        <div className={"flex mb-2 justify-between  items-center"}>
            <User
                className={"pl-0"}
                size={dense ? "xs" : "sm"}
                src={item.author.image}
                name={item.author.name}
                description={ <Text className={"text-xs text-gray-400"}><Moment format={"LL"}>{item.createdAt}</Moment></Text>}
            />
            {/*{!dense && <Text className={"text-xs text-gray-400"}><Moment format={"LL"}>{item.createdAt}</Moment></Text>}*/}
        </div>
        <Text className={clsx(!dense && "pl-10")}>{item.description}</Text>

        </div>);
};

export default CommentItem;
