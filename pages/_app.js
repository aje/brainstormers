import "../styles/globals.css";
import {SessionProvider} from "next-auth/react";
import {createTheme, NextUIProvider} from "@nextui-org/react";
import Layout from "../components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import LoadingPage from "../components/LoadingPage";
import {hookstate} from "@hookstate/core";
import {swrFetcher} from "../services/axios";
import {SWRConfig} from "swr";

const fonts = {
	sans: "'Proxima Nova',  'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
};
const theme = createTheme({
    type: "light", // it could be "light" or "dark"
    theme: {
        colors: {
            // brand colors
            primaryLight: '$green200',
            primaryLightHover: '$green300',
            primaryLightActive: '$green400',
            primaryLightContrast: '$green600',
            primary: '#00916E',
            primaryBorder: '$green500',
            primaryBorderHover: '$green600',
            primarySolidHover: '$green700',
            primarySolidContrast: '$white',
            primaryShadow: '$green500',

            gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
            link: '#5E1DAD',

        },
        space: {},
        fonts
    }
})

export const sidebarState = hookstate(false);
export const notificationState = hookstate(false);
export const loginPopper = hookstate(false);

export const ideaFormData = hookstate({
    problem: "",
    idea: "",
});
export default function App({Component,pageProps: { session, ...pageProps },}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const handleStart = (url, { shallow }) => {
            setLoading(true);
        };

        const handleStop = (url, { shallow }) => {
            setLoading(false);
        };

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleStop);
        router.events.on('routeChangeError', handleStop);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleStop);
            router.events.off('routeChangeError', handleStop)
        }
    }, [router]);
    return (
        <NextUIProvider  theme={theme}>
            <SWRConfig
                value={{
                    refreshInterval: 300000, fetcher: swrFetcher, errorRetryInterval: 120000
                }}
            >
            <SessionProvider session={session}>
                <Layout>
                    {loading ? <LoadingPage/> :
                        <Component {...pageProps} />}
                </Layout>
            </SessionProvider>
            </SWRConfig>
        </NextUIProvider>
    )
}

