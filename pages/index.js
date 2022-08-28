import Head from 'next/head'
import {signIn, useSession, signOut} from "next-auth/react";
import Link from "next/link";

export default function Home() {
    const { data: session } = useSession();
    // console.log(session);
    return (
        <div className="container">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <h1 className="title">
                    {session && <>
                        {session.user.email}
                        <button onClick={() => signOut()}>Sign out</button>
                    </>}

                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>


                <Link href={'/pages/signin'}>
                    <a onClick={e=> {
                        e.preventDefault();
                        signIn().then(r => console.log(r))
                    }}>Sign In</a>
                </Link>

            </main>
        </div>
    )
}
