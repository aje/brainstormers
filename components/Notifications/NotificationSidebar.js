import React from 'react';
import {useHookstate} from "@hookstate/core";
import {notificationState} from "../../pages/_app";
import {Card, Text} from "@nextui-org/react";
import Empty from "../Empty";
import useSWR from "swr"

const NotificationSidebar = () => {
    const state = useHookstate(notificationState);
    const {data, error} = useSWR('/notificatinos')

    const onClose = () => {
        state.set(false)
        document.body.style.overflow = "auto";
    }

    return (<>
        <div onClick={onClose} style={{zIndex: 400, backdropFilter: "saturate(180%) blur(6px)"}} className={" bg-white/30 w-screen h-screen fixed top-0 left-0"} />
        <Card  css={{ borderRadius: 0}} style={{zIndex: 400}}
               className="fadeInAnimated bg-white h-screen w-2/3 fixed top-0 right-0"
        >
            <Card.Body className={"p-10"}>
                <Text h3>Notifications</Text>
                <Empty label={"You're allright"}/>
            </Card.Body>
        </Card>
        </>
    );
};

export default NotificationSidebar;