import React, {useState} from 'react';
import {Button, Loading, Navbar, Popover, Text} from "@nextui-org/react";
import {Login} from "@styled-icons/entypo/Login";
import {Github} from "@styled-icons/remix-line/Github";
import {signIn} from "next-auth/react";
import {Google} from "@styled-icons/remix-line";
import {useHookstate} from "@hookstate/core";
import {loginPopper} from "../pages/_app";

const LoginPopover = ({ providers }) => {
    const [loading, setLoading] = useState(false);
    // const [more, setMore] = useState(false);
    const state = useHookstate(loginPopper);

    const onSocial = provider => () => {
        setLoading(true);
        signIn("github").then(r => setLoading(false) )
    }

    return (<>
        {/*<Navbar.Link color="inherit" className={"text-primary hover:text-primary/80"}>*/}
        {/*    <Key2 size={20} className={"mr-2"}/>*/}
        {/*    Register as Guest*/}
        {/*</Navbar.Link>*/}
        <Popover isOpen={state.get()} onOpenChange={state.set}>
            <Popover.Trigger>
                <Navbar.Link color="primary">
                    <Login size={20} className={" mr-3"}/> Login
                </Navbar.Link>
            </Popover.Trigger>
            <Popover.Content className={"p-5 w-72"}>
                {/*<Text h4>Guest Login</Text>*/}
                {/*<Button  className={"mb-5"}  bordered>Log me in as a guest</Button>*/}


                {/*<Button onClick={()=>setMore(!more)} light  icon={more ? <ArrowUpS size={20}/> :  <ArrowDownS size={20}/>} auto>More options</Button>*/}
                {/*{more && <div className={"mt-5 "}>*/}
                {/*<Text h4>Phone Login</Text>*/}
                {/*<Input className={"mb-2"} fullWidth bordered label={"Phone number"}/>*/}
                {/*<Input*/}
                {/*    fullWidth*/}
                {/*    bordered*/}
                {/*    label={"Code"}*/}
                {/*    contentRightStyling={false}*/}
                {/*    contentRight={*/}
                {/*        <Button size={"xs"} className={"mr-2"}>*/}
                {/*            GET CODE*/}
                {/*        </Button>*/}
                {/*    }*/}
                {/*/>*/}
                {/*<Button rounded className={"mt-5 w-full"} >Submit</Button>*/}

                <Text h4 >Login using socials</Text>
                {/*{Object.values(providers).map((provider) =>*/}
                {/*    <Button  onClick={() => signIn(provider.id)} key={provider.name} icon={<Google size={22} fill="currentColor" />} bordered className={"w-full"} >{provider.name} Login</Button>*/}
                {/*)}*/}
                <Button  onClick={() => signIn("github")} icon={<Google size={22} fill="currentColor" />} bordered className={"w-full"} >Google Login</Button>
                <Button  onClick={onSocial("github")} disabled={loading}  icon={<Github size={22} fill="currentColor" />} bordered className={"w-full mt-2"} >
                    {loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> :
                        "Github Login" }

                </Button>
                {/*</div>}*/}
            </Popover.Content>
        </Popover>
        </>);
};

export default LoginPopover;
