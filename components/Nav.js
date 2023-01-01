import {Navbar} from "@nextui-org/react";
import Image from "next/image";
import LoginPopover from "./LoginPopover";
import {useSession} from "next-auth/react";
import ProfileButton from "./ProfileButton";


const Nav = () => {
    const { data: session } = useSession();
    // console.log(session, sidebar);
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
                {session ? <ProfileButton /> :  <LoginPopover />}

            </Navbar.Content>
        </Navbar>
    </>);
};

export default Nav;
