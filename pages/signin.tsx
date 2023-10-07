import {getProviders, getSession, signIn} from "next-auth/react";
import React from "react";

export default function SignIn({providers}) {
	// @ts-ignore
	return (
		<div className={"bg-grey"}>
			{Object.values(providers).map(provider => (
				// @ts-ignore
				<div key={provider?.name}>
					{/*// @ts-ignore*/}
					<button onClick={() => signIn(provider?.id)}>
						{/*// @ts-ignore*/}
						Sign in with {provider?.name}
					</button>
				</div>
			))}
		</div>
	);
}

export async function getServerSideProps(context) {
	const {req} = context;
	const session = await getSession({req});
	if (session) {
		return {
			redirect: {destination: "/"},
		};
	}

	return {
		props: {
			providers: await getProviders(),
		},
	};
}
