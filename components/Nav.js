import {Button, Navbar} from "@nextui-org/react";
import Image from "next/image";
import LoginPopover from "./LoginPopover";
import {useSession} from "next-auth/react";
import ProfileButton from "./profile/ProfileButton";
import {Plus} from "@styled-icons/entypo/Plus";
import NotificationButton from "./NotificationButton";


const Nav = () => {
    const { data: session } = useSession();
    return (<>
        <Navbar containerCss={{
            background: "transparent",
            // filter: 'blur(5px)',
            // background: "#e5f4f0ab",
            position: "fixed", top: 0, zIndex: 1}} disableShadow disableBlur
                 // className={"fixed "}
        >
            <Navbar.Brand as={"a"} href={"/"}>
                <Image src={"/logo.png"} width={200} quality={100} height={60}/>
            </Navbar.Brand>

            <Navbar.Content className={"font-bold"} >
                <Navbar.Link href="/">Home</Navbar.Link>
                <Navbar.Link href="/explore">Explore</Navbar.Link>
                {/*<Navbar.Link href="#">Blog</Navbar.Link>*/}
                <Navbar.Link href="/new"   ><Button auto color={"primary"} size={"sm"}><Plus size={26}/></Button></Navbar.Link>
                {session ? <><NotificationButton /><ProfileButton /></> :  <LoginPopover />}

            </Navbar.Content>
        </Navbar>
    </>);
};

export default Nav;
