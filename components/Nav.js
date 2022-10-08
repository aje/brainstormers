import {Navbar} from "@nextui-org/react";
import Image from "next/image";
import LoginPopover from "./LoginPopover";
import {useSession} from "next-auth/react";
import ProfileButton from "./ProfileButton";


const Nav = () => {
    const { data: session } = useSession();
    // console.log(session, sidebar);
    return (<>
        <Navbar  variant={'stinky'} containerCss={{background: "transparent"}} disableShadow disableBlur
                 // className={"fixed "}
        >
            <Navbar.Brand>
                <Image src={"/logo.png"} width={200} quality={100} height={60}/>
            </Navbar.Brand>
            <Navbar.Content >
                <Navbar.Link href="#">Home</Navbar.Link>
                <Navbar.Link href="#">Explore</Navbar.Link>
                <Navbar.Link href="#">Blog</Navbar.Link>
                {session ? <ProfileButton /> :  <LoginPopover />}
            </Navbar.Content>
        </Navbar>
    </>);
};

export default Nav;
