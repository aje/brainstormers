import Nav from './Nav'
import Footer from './Footer'
import {Toaster} from "react-hot-toast";
import ProfileSidebar from "./ProfileSidebar";
import {useHookstate} from '@hookstate/core';
import {notificationState, sidebarState} from "../pages/_app";
import NotificationSidebar from "./Notifications/NotificationSidebar";


const Layout = ({children}) => {
    const state = useHookstate(sidebarState);
    const notificationSidebar = useHookstate(notificationState);
    return (<>
            <Nav  />
            <main>{children}</main>
            <Footer />
            {state.get() && <ProfileSidebar />}
            {notificationSidebar.get() && <NotificationSidebar />}
            <Toaster reverseOrder />
        </>
)
};

export default Layout
