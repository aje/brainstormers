import React from 'react';
import {Navbar} from "@nextui-org/react";
import {Notification} from "@styled-icons/remix-line";
import {useHookstate} from "@hookstate/core";
import {notificationState} from "../pages/_app";

const NotificationButton = () => {
    const state = useHookstate(notificationState);
    const onOpen = () => {
        state.set(true)
        document.body.style.overflow = "hidden";
    }
    return (
        <Navbar.Link  onClick={onOpen} ><Notification size={26}/></Navbar.Link>
    );
};

export default NotificationButton;