import {useSession} from "next-auth/react";
import {Navbar, User} from "@nextui-org/react";
import {useHookstate} from "@hookstate/core";
import {sidebarState} from "../pages/_app";


const ProfileButton = () => {
    const { data: session } = useSession();
    const state = useHookstate(sidebarState);
    // console.log(state.get());
    const onOpen = () => {
        state.set(true)
        document.body.style.overflow = "hidden";
    }
    return (<><Navbar.Link href="#" onPress={onOpen}>
            <User size={"sm"} src={session.user.image} name={session.user.name}/>
        </Navbar.Link>
    </>
    );
};

export default ProfileButton;
