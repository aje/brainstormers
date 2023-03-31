import Nav from "./Nav";
import Footer from "./Footer";
import {Toaster} from "react-hot-toast";
import ProfileSidebar from "./profile/ProfileSidebar";
import NotificationSidebar from "./Notifications/NotificationSidebar";
import UserSidebar from "./profile/UserSidebar";
import {useGlobalToggle} from "../store";

const Layout = ({children}) => {
	const state = useGlobalToggle();
	const {userSidebar, profileSidebar, notificationSidebar} = state.getAll();
	return (
		<>
			<Nav />
			<main className={" grid justify-items-stretch"} style={{minHeight: "calc(100vh - 117px)"}}>
				{children}
			</main>
			<Footer />
			{profileSidebar && <ProfileSidebar />}
			{userSidebar && <UserSidebar />}
			{notificationSidebar && <NotificationSidebar />}
			<Toaster reverseOrder />
		</>
	);
};

export default Layout;
