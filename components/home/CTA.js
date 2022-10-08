import {Button, Container} from "@nextui-org/react";
import {Flag} from "@styled-icons/entypo/Flag";

const Cta = () => {
    return (<div className={"bg-primary/10 pt-52 pb-32 text-center"}
                 style={{backgroundImage: "url(/homepage.png)", backgroundSize: "cover", backgroundPosition:"bottom"}}>

        {/*<Image src={} objectFit={"cover"} width={2000} height={400} className={"absolute top-0"} />*/}
        <Container >
            <div >
                <main className={"flex flex-col items-center"}>
                    <h1 className={"font-bold text-5xl"}>Everything begins with an <span className="text-primary"> idea</span></h1>
                    <p className={"text-2xl mx-auto w-1/2 my-7"}> Start your journey by brainstorming your ideas with other people around the globe or your friends</p>
                    <Button size={"xl"} icon={<Flag size={30} />} className={"font-bold text-2xl"}  color="primary">Start ideation</Button>
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
    </div>);
};

export default Cta;
