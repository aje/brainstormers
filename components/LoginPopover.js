import React from 'react';
import {Button, Input, Navbar, Popover, Text} from "@nextui-org/react";
import {Login} from "@styled-icons/entypo/Login";
import {Github} from "@styled-icons/remix-line/Github";
import {signIn} from "next-auth/react";

const LoginPopover = ({ providers }) => {
    // console.log(providers);
    return (<>
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
                {/*{Object.values(providers).map((provider) =>*/}
                {/*    <Button  onPress={() => signIn(provider.id)} key={provider.name} icon={<Google size={22} fill="currentColor" />} bordered className={"w-full"} >{provider.name} Login</Button>*/}
                {/*)}*/}
                {/*<Button  onPress={() => signIn("github")} icon={<Google size={22} fill="currentColor" />} bordered className={"w-full"} >Google Login</Button>*/}
                <Button  onPress={() => signIn("github")}  icon={<Github size={22} fill="currentColor" />} bordered className={"w-full mt-2"} >Github Login</Button>
            </Popover.Content>
        </Popover>
        </>);
};

export default LoginPopover;
