import Nav from './Nav'
import Footer from './Footer'
import {Toaster} from "react-hot-toast";
import ProfileSidebar from "./ProfileSidebar";
import {useHookstate} from '@hookstate/core';
import {sidebarState} from "../pages/_app";


const Layout = ({children}) => {
    const state = useHookstate(sidebarState);
    // console.log(state.get());
    return (<>
            <Nav  />
            <main>{children}</main>
            <Footer />
        {state.get() && <ProfileSidebar />}
            <Toaster reverseOrder />
        </>
)
};

export default Layout
