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
import Head from "next/head";
import {DevSupport} from "@react-buddy/ide-toolbox-next";
import {ComponentPreviews, useInitial} from "../components/dev";

const fonts = {
	sans: "'Proxima Nova',  'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
};
const theme = createTheme({
	type: "light", // it could be "light" or "dark"
	theme: {
		colors: {
			// brand colors
			primaryLight: "$green200",
			primaryLightHover: "$green300",
			primaryLightActive: "$green400",
			primaryLightContrast: "$green600",
			primary: "#00916E",
			primaryBorder: "$green500",
			primaryBorderHover: "$green600",
			primarySolidHover: "$green700",
			primarySolidContrast: "$white",
			primaryShadow: "$green500",

			gradient: "linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)",
			link: "#5E1DAD",
		},
		space: {},
		fonts,
	},
});

export const toggles: {[key: string]: boolean} = hookstate({
	userSidebar: false,
	notificationSidebar: false,
	profileSidebar: false,
	loginPopper: false,
});
export const loginPopper: boolean = hookstate(false);

export const ideaFormData: {problem?: string; idea?: string} = hookstate({
	problem: "",
	idea: "",
});

export default function App({Component, pageProps: {session, ...pageProps}}) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [currentUrl, setCurrentUrl] = useState();
	useEffect(() => {
		const handleStart = (url, {shallow}) => {
			if (url !== currentUrl) setLoading(true);
		};

		const handleStop = (url, {shallow}) => {
			setCurrentUrl(url);
			setLoading(false);
		};

		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleStop);
		router.events.on("routeChangeError", handleStop);

		return () => {
			router.events.off("routeChangeStart", handleStart);
			router.events.off("routeChangeComplete", handleStop);
			router.events.off("routeChangeError", handleStop);
		};
	}, [router]);
	return (
		<>
			<Head>
				<title>Brainstormers - Small business startup ideas</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />

				<meta
					name="Description"
					content="Start your journey by brainstorming your ideas with other people around the globe or your friends"
				/>
				<meta
					name="Keywords"
					content="business startup ideas, tech startup ideas, small business ideas, easy business startup ideas, low cost, best startup ideas, brainstorming ideas,"
				/>
			</Head>
			<NextUIProvider theme={theme}>
				<SWRConfig
					value={{
						refreshInterval: 300000,
						fetcher: swrFetcher,
						errorRetryInterval: 120000,
					}}>
					<SessionProvider session={session}>
						<Layout>
							{loading ? (
								<LoadingPage />
							) : (
								<DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
									<Component {...pageProps} />
								</DevSupport>
							)}
						</Layout>
					</SessionProvider>
				</SWRConfig>
			</NextUIProvider>
		</>
	);
}
