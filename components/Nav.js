import {Button, Input, Navbar, Popover, Text} from "@nextui-org/react";
import {Login} from "@styled-icons/entypo/Login";
import {Google} from "@styled-icons/remix-line/Google";
import {Github} from "@styled-icons/remix-line/Github";
import Image from "next/image";


const Nav = () => {
    return (<>
        <Navbar  variant={'sticky'} disableShadow className={"fixed bg-transparent"}>
            <Navbar.Brand>
                <Image src={"/logo.png"} width={200} quality={100} height={60}/>
            </Navbar.Brand>
            <Navbar.Content>
                <Navbar.Link href="#">Home</Navbar.Link>
                <Navbar.Link href="#">Explore</Navbar.Link>
                <Navbar.Link href="#">Blog</Navbar.Link>
                <Popover>
                    <Popover.Trigger>
                        <Navbar.Link color="inherit" className={"text-primary hover:text-primary/80"} >
                            <Login size={20} className={" mr-3"}/> Login or Sign up
                        </Navbar.Link>
                    </Popover.Trigger>
                    <Popover.Content className={"p-5 w-72"}>
                        <Text h4>Phone Login</Text>
                        <Input className={"mb-2"} fullWidth bordered label={"Phone number"}/>
                        <Input
                            fullWidth
                            bordered
                            label={"Code"}
                            contentRightStyling={false}
                            contentRight={
                               <Button size={"xs"} className={"mr-2"}>
                                   GET CODE
                               </Button>
                            }
                        />
                        <Button rounded className={"mt-5 w-full"} >Submit</Button>

                        <Text h4 className={"mt-5"}>Social Login</Text>
                        <Button icon={<Google size={22} fill="currentColor" />} bordered className={"w-full"} >Google Login</Button>
                        <Button icon={<Github size={22} fill="currentColor" />} bordered className={"w-full mt-2"} >Github Login</Button>
                    </Popover.Content>
                </Popover>
            </Navbar.Content>
        </Navbar>
    </>);
};

export default Nav;
