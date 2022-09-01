import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import {createTheme, NextUIProvider} from '@nextui-org/react';
import Layout from "../components/Layout";


const fonts = {
    sans: "'Century Gothic',  'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
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
export default function App({Component,pageProps: { session, ...pageProps },}) {
    return (
        <NextUIProvider  theme={theme}>
            <SessionProvider session={session}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SessionProvider>
        </NextUIProvider>
    )
}
