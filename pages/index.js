import {useSession} from "next-auth/react";

import {Button, Container, Textarea, useTheme} from "@nextui-org/react";

import {Flag} from "@styled-icons/entypo/Flag";
import IdeaSlider from "../components/home/IdeaSlider";
import IdeaForm from "../components/home/IdeaForm";
import LatestIdeas from "../components/home/LatestIdeas";


export default function Home() {
    const { data: session } = useSession();
    const {theme} = useTheme()

    return (<>
        <div className={"bg-primary/10 pt-52 pb-32 text-center"}>
            <Container >
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
        <IdeaSlider />
            <IdeaForm />
        <LatestIdeas />
        <div className={"py-20 bg-gray-100"}>
            <Container >
                <main >
                    <h2>
                        Get to know our <span className="text-primary">Entrepreneurs</span>
                    </h2>
                    <h3>Last month (33)</h3>
                    list of Entrepreneurs
                </main>
            </Container>
        </div>
        </>
    )
}
