import {Button, Dropdown, Text, User} from "@nextui-org/react";
import Moment from "react-moment";
import clsx from "clsx";
import {DeleteBin} from "@styled-icons/remix-line";
import {Anticlockwise2} from "@styled-icons/remix-line/Anticlockwise2";
import React, {useState} from "react";
import axios from "../../services/axios";
import {toast} from "react-hot-toast";
import {useRouter} from "next/router";
import DeleteConfirmation from "../DeleteConfirmation";
import {useSession} from "next-auth/react";


const CommentItem = ({item, dense, idea, withAction, isOwner, action}) => {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const { data: session } = useSession();


    const isAuthor = item.author?._id === session?.user?._id;

    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
    }

    const onDropdown = (type) => {
        const formData = {
            _id : idea._id,
            comment: item,
        }
        setLoading(true);
        axios.patch(`/posts?set=${type}`, formData).then((res)=>{
            toast.success("Successfully updated!");
            // setEditable(null);?
            refreshData();
        }).finally(() => setLoading(false))
    }


    function onDelete() {
        setLoading(true);
        setVisible(false)
        axios.delete(`/reviews?id=${item._id}`).then((res)=>{

            toast.success("Successfully deleted!");
            refreshData();
        }).finally(() => setLoading(false))
    }
    return (<div className={"mb-5 "}>
        <DeleteConfirmation renderItem={()=><CommentItem item={item}/>} loading={loading} visible={visible} closeHandler={()=>setVisible(false)} onDelete={onDelete}/>

        <div className={"flex mb-2 justify-between  items-center"}>
            <User
                className={"pl-0"}
                size={dense ? "xs" : "sm"}
                src={item.author.image}
                name={item.author.name}
                description={ <Text className={"text-xs text-gray-400"}><Moment format={"LL"}>{item.createdAt}</Moment></Text>}
            />

            {action && <div className={"flex"}>{action}</div>}
            {withAction &&
                <div className={"flex"}>
                    {isAuthor && <Button onClick={()=>setVisible(true)}  size={"xs"} light color={"error"} auto><DeleteBin size={"14"}/></Button>}
                    {/*<Button className={"ml-2"} size={"xs"} light auto ><Edit size={14}/></Button>*/}

                    {isOwner &&
                        <Dropdown placement={"bottom-right"}>
                            <Dropdown.Button
                                ripple={false} size={"xs"} color={false} className={"min-w-min ml-2"}
                                icon={<Anticlockwise2 size={14}/>}>Set As</Dropdown.Button>
                            <Dropdown.Menu aria-label="Static Actions" onAction={onDropdown}>
                                {/*<Dropdown.Item key="edit">Edit</Dropdown.Item>*/}
                                {/*<Dropdown.Item key="copy">Copy link</Dropdown.Item>*/}
                                {/*<Dropdown.Item key="edit">Edit file</Dropdown.Item>*/}
                                <Dropdown.Item key={"upsides"} color="success">
                                    Upside
                                </Dropdown.Item>
                                <Dropdown.Item key={"downsides"} color="error">
                                    Downside
                                </Dropdown.Item>
                                <Dropdown.Item key={"solutions"}>
                                    Solution
                                </Dropdown.Item>
                                <Dropdown.Item key={"problems"}>
                                    Problem
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                    {/*<Button className={"ml-2"} size={"xs"} auto icon={<Anticlockwise2 size={14} />}>Set As</Button>*/}
                </div>
            }
        </div>
        <Text className={clsx(!dense && "pl-10")}>{item.description}</Text>
    </div>);
};

export default CommentItem;
