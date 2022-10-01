import Head from 'next/head'
import {signIn, useSession, signOut} from "next-auth/react";

import {Button, Container, styled, Text, useTheme} from "@nextui-org/react";

import {Flag} from "@styled-icons/entypo/Flag";


export default function Home() {
    const { data: session } = useSession();
    const {theme} = useTheme()

    return (
        <div className={"bg-primary/10 pt-52 pb-32 text-center"}>
            <Container xl>
            <div >

                <main className={"flex flex-col items-center"}>
                    <h1 className={"font-bold text-5xl"}>Everything begins with an <span className="text-primary"> idea</span></h1>
                    <p className={"text-2xl mx-auto w-1/2 mt-4 mb-4"}> Start your journey by brainstorming your ideas with other people around the globe or your friends</p>
                    <Button size={"lg"} icon={<Flag size={30} />}   color="primary">Start ideation</Button>
                    {/*<h1 className="text-5xl ">*/}
                    {/*    {session && <>*/}
                    {/*        {session.user.email}*/}
                    {/*        <button onClick={() => signOut()}>Sign out</button>*/}
                    {/*    </>}*/}

                    {/*    */}
                    {/*</h1>*/}


                    {/*<Link href={'/pages/signin'}>*/}
                    {/*    <a onClick={e=> {*/}
                    {/*        e.preventDefault();*/}
                    {/*        signIn().then(r => console.log(r))*/}
                    {/*    }}>Sign In</a>*/}
                    {/*</Link>*/}

                </main>
            </div>
            </Container>
        </div>
    )
}
