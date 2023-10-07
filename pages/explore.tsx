import React, {useState} from "react";
import {Button, Card, Text, User} from "@nextui-org/react";
import {EmojiSad} from "@styled-icons/entypo/EmojiSad";
import MyRating from "../components/MyRating";
import {Check} from "@styled-icons/entypo/Check";
import clsx from "clsx";
import dbConnect from "../services/dbconnect";
import {getSession, useSession} from "next-auth/react";
import Idea from "../models/Idea";
import Empty from "../components/Empty";
import * as models from "../models/models";
import {ChevronSmallLeft, ChevronSmallRight, Plus} from "@styled-icons/entypo";
import axios from "../services/axios";
import {toast} from "react-hot-toast";
import {useHookstate} from "@hookstate/core";
import {loginPopper} from "./_app";
import {useRouter} from "next/router";

export default function Explore({ideas}) {
	const {data: session} = useSession();
	const state = useHookstate(loginPopper);
	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(false);
	const [rates, setRates] = useState(new Map());
	const router = useRouter();

	const onRate = value => {
		onNext();
		onReview(value);
	};

	const onNext = () => {
		setIndex(index => (index < ideas.length - 1 ? index + 1 : index));
	};

	const onReview = value => {
		if (!session) onNotLoggedIn();
		else {
			// setLoading(true);
			axios
				.post(`/rate?value=${value}&id=${ideas[index]._id}`)
				.then(res => {
					const rat = rates;
					rat.set(res.data.id, res.data.ratingsAverage);
					setRates(rat);
					toast.success("Successfully updated!");
				})
				// .finally(() => setLoading(false))
				.catch(error => {
					toast.error(error?.response?.data?.message);
				});
		}
	};

	const onNotLoggedIn = () => {
		if (!session) {
			state.set(true);
			toast.error("Please login first");
		}
	};

	const onClickItem = (idea, i) => {
		const state = index === i ? "ACTIVE" : index === i - 1 ? "NEXT" : index === i + 1 ? "PREV" : "HIDE";
		if (state === "NEXT") setIndex(index + 1);
		else router.push(`/ideas/${idea.id}`);
	};

	return (
		<div
			className={"bg-pink-50 pt-20 p-5 md:p-20"}
			style={{
				height: "calc(100vh - 117px)",
				backgroundImage: "url(/explorebg.png)",
				backgroundSize: "cover",
				backgroundPosition: "bottom",
			}}>
			<Text h2 className={"my-10 font-sans"}>
				Get <span className={"text-primary timing"}>inspired</span> by other ideas
			</Text>
			<div
				className={"flex relative h-full"}
				// className={clsx("flex h-full pb-32  w-160% transition-all transition duration-1000", index === 0 ?  "translate-x-0" : "-translate-x-50%" )}
			>
				{ideas?.length > 0 ? (
					ideas.map((idea, i) => {
						const state = index === i ? "ACTIVE" : index === i - 1 ? "NEXT" : index === i + 1 ? "PREV" : "HIDE";
						// @ts-ignore
						// const isRated = idea.raters?.includes(session?.user?._id);
						return (
							<Card
								key={idea.id}
								onClick={() => onClickItem(idea, i)}
								isPressable
								style={{borderRadius: 34, height: "calc(100% - 150px)"}}
								className={clsx(
									"absolute  duration-500 w-80% top-0",
									state === "ACTIVE" && "translate-x-0 scale-100 opacity-100",
									state === "PREV" && "-translate-x-100% scale-50 opacity-75",
									state === "HIDE" && "translate-x-200% scale-0 opacity-0",
									state === "NEXT" && "translate-x-100% top-0 scale-[0.8] opacity-75"
								)}
								// className={clsx(index === 1 ? "scale-50 opacity-75 " : " mr-10" , 'h-full ')}
								// className={"-translate-x-70% scale-75 translate-y-50% h-70%"}
							>
								{index > 0 && state === "ACTIVE" && (
									<Button
										// disabled=
										light
										auto
										onClick={() => setIndex(index => index - 1)}
										style={{top: "40%"}}
										className={"absolute z-50 h-32 hover:scale-110 left-3"}>
										<ChevronSmallLeft size={70} />
									</Button>
								)}
								{index < ideas.length - 1 && (
									<Button
										light
										auto
										onClick={onNext}
										style={{top: "40%"}}
										className={"absolute  z-50 h-32 hover:scale-110  right-3"}>
										<ChevronSmallRight size={70} />
									</Button>
								)}
								<Card.Body className={"p-10 block"}>
									<User size="sm" src={idea.author?.avatar} name={idea.author?.name} />
									<Text h2 className={"font-sans"}>
										<span className={"font-normal"}>{idea.title}</span>
									</Text>
									<Text className={"text-2xl mb-5 text-gray-500 font-light"}>{idea.description}</Text>
									{idea.tags.map(t => (
										<a className={"hover:underline hover:text-gray-500 transition-all font-bold italic text-gray-300 mr-3"}>
											{t}
										</a>
									))}
								</Card.Body>
								<Card.Footer className={"justify-around p-10 "}>
									<Button
										disabled={state !== "ACTIVE" || rates.has(idea._id)}
										onClick={() => onRate(1)}
										borderWeight={"bold"}
										icon={<EmojiSad size={34} />}
										bordered
										size={"xl"}
										ghost
										color={"error"}
										className={" font-bold text-2xl"}>
										DON'T DO IT
									</Button>
									<MyRating size={"xl"} onChange={onRate} value={rates.get(idea._id)} readonly={rates.has(idea._id)} />
									<Button
										disabled={state !== "ACTIVE" || rates.has(idea._id)}
										onClick={() => onRate(5)}
										borderWeight={"bold"}
										icon={<Check size={40} />}
										bordered
										size={"xl"}
										ghost
										color={"primary"}
										className={" font-bold text-2xl"}>
										LET'S DO IT
									</Button>
								</Card.Footer>
							</Card>
						);
					})
				) : (
					<div className={"justify-self-center w-full flex items-center justify-center flex-col self-center"}>
						<Empty label={"You have rated all ideas. We are out of ideas for now!"} />
						<Button href="/new" as={"a"} className={"mt-8 cursor-pointer"} icon={<Plus size={22} />} size="lg">
							Add New Idea
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}

export async function getServerSideProps({req}) {
	const session = await getSession({req});
	let latest = [];
	try {
		await dbConnect();
		//? get latest for slider
		// @ts-ignore
		const latestQuery = session ? {raters: {$not: {$elemMatch: {$eq: session.user._id}}}} : "";
		// @ts-ignore
		latest = await Idea.find(latestQuery, "title author description tags")
			.populate({path: "author", model: models.User})
			.sort({createdAt: -1})
			.limit(50);
	} catch (e) {
		console.log(e);
	}

	return {
		props: {
			ideas: JSON.parse(JSON.stringify(latest)),
		},
	};
}
