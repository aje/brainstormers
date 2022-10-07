import {StarOutlined} from "@styled-icons/entypo/StarOutlined"
import {Star} from "@styled-icons/entypo/Star"
import {Text} from "@nextui-org/react";
import Rating from "react-rating";
import React from "react";

const MyRating = ({count, value, size = "sm", ...rest}) => {
    const sizeMap = {
        lg: 32,
        xl: 48,
        sm: 20
    }
    const color = "#FFC107";
    return (<div className={"flex-shrink-0"}>
        <Rating
            initialRating={value}
            {...rest}
            fullSymbol={<Star  size={sizeMap[size]} className={'-mr-1'} color={color}/>}
            emptySymbol={<StarOutlined   size={sizeMap[size]} className={'-mr-1'} color={color}/>}
        />
        {(count || count === 0) && <Text span className={"ml-1 align-middle font-bold"} color={color}>({count})</Text>}
    </div>);
};

export default MyRating;
