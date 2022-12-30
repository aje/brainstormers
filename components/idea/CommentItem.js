import {Button, Dropdown, Text, User} from "@nextui-org/react";
import Moment from "react-moment";
import clsx from "clsx";
import {DeleteBin} from "@styled-icons/remix-line";
import {Anticlockwise2} from "@styled-icons/remix-line/Anticlockwise2";
import React from "react";


const CommentItem = ({item, dense}) => {
    const onDropdown = () => {

    }
    return (<div className={"mb-5 "}>
        <div className={"flex mb-2 justify-between  items-center"}>
            <User
                className={"pl-0"}
                size={dense ? "xs" : "sm"}
                src={item.author.image}
                name={item.author.name}
                description={ <Text className={"text-xs text-gray-400"}><Moment format={"LL"}>{item.createdAt}</Moment></Text>}
            />
            <div className={"flex"}>
                <Button className={"mr-2"} size={"xs"} light color={"error"} auto><DeleteBin size={"14"} /></Button>
                {/*<Button className={"ml-2"} size={"xs"} light auto ><Edit size={14}/></Button>*/}

                <Dropdown  placement={"bottom-right"}>
                    <Dropdown.Button ripple={false}  size={"xs"} color={false} className={"min-w-min"} icon={<Anticlockwise2 size={14} />}>Set As</Dropdown.Button>
                    <Dropdown.Menu aria-label="Static Actions" onAction={onDropdown}>
                        {/*<Dropdown.Item key="edit">Edit</Dropdown.Item>*/}
                        {/*<Dropdown.Item key="copy">Copy link</Dropdown.Item>*/}
                        {/*<Dropdown.Item key="edit">Edit file</Dropdown.Item>*/}
                        <Dropdown.Item key={"upside"} color="success" >
                            Upside
                        </Dropdown.Item>
                        <Dropdown.Item key={"downside"} color="error" >
                            Downside
                        </Dropdown.Item>
                        <Dropdown.Item key={"solution"} color="success" >
                            Solution
                        </Dropdown.Item>
                        <Dropdown.Item key={"problem"} color="error" >
                            Problem
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {/*<Button className={"ml-2"} size={"xs"} auto icon={<Anticlockwise2 size={14} />}>Set As</Button>*/}
            </div>
        </div>
        <Text className={clsx(!dense && "pl-10")}>{item.description}</Text>
    </div>);
};

export default CommentItem;
