import {useState} from "react";
import {ChevronSmallLeft} from "@styled-icons/entypo/ChevronSmallLeft";
import {ChevronSmallRight} from "@styled-icons/entypo/ChevronSmallRight";
import {Button, Container, Link, Text, User} from "@nextui-org/react";
import MyRating from "../MyRating";
import {Check} from "@styled-icons/entypo/Check";
import {EmojiSad} from "@styled-icons/entypo/EmojiSad";
import Empty from "../Empty";
import axios from "../../services/axios";
import {toast} from "react-hot-toast";
import {useSession} from "next-auth/react";
import {useHookstate} from "@hookstate/core";
import {loginPopper} from "../../pages/_app";
import Carousel from "nuka-carousel";
import {Plus} from "@styled-icons/entypo";

const CarouselContent = ({item, onNext}) => {
	const {data: session} = useSession();
	const [loading, setLoading] = useState(false);
	const state = useHookstate(loginPopper);

	const onNotLoggedIn = () => {
		if (!session) {
			state.set(true);
			toast.error("Please login first");
		}
	};
	const onReview = item => value => {
		if (!session) onNotLoggedIn();
		else {
			setLoading(true);
			axios
				.post(`/rate?value=${value}&id=${item._id}`)
				.then(res => {
					toast.success("Successfully updated!");
					onNext();
				})
				.finally(() => setLoading(false))
				.catch(error => {
					toast.error(error?.response?.data?.message);
				});
		}
	};
	return (
		<div className={"flex-1 text-center"}>
			<User className={"z-0"} size="sm" src={item.author?.avatar} name={item.author?.name} />

			<Text h2 className={"flex justify-center"}>
				<Link href={`ideas/${item._id}`} className={"font-normal font-sans"}>
					{item.title}
				</Link>
			</Text>
			<Text className={"text-2xl mb-5 px-6 text-gray-500"}>{item.description?.substring(0, 400) || "No description"}</Text>
			{item.tags.map((t, io) => (
				<a key={io} className={"hover:underline hover:text-gray-500 transition-all font-bold italic text-gray-300 mr-3"}>
					{t}
				</a>
			))}

			<div className="flex justify-around items-center mt-5">
				<Button
					onClick={() => onReview(item)(1)}
					borderWeight={"bold"}
					auto
					icon={<EmojiSad size={34} />}
					bordered
					size={"xl"}
					ghost
					color={"error"}
					className={"z-0 font-bold text-2xl"}>
					DON'T DO IT
				</Button>
				<MyRating onChange={onReview(item)} size={"xl"} />
				<Button
					onClick={() => onReview(item)(5)}
					borderWeight={"bold"}
					auto
					icon={<Check size={40} />}
					bordered
					size={"xl"}
					ghost
					color={"primary"}
					className={"z-0 font-bold text-2xl"}>
					LET'S DO IT
				</Button>
			</div>
		</div>
	);
};

const IdeaSlider = ({latest: ideas}) => {
	const [index, setIndex] = useState(0);

	const onNext = () => {
		if (index < ideas.length - 1) setIndex(index + 1);
	};

	const onPrev = () => {
		if (index > 0) setIndex(index - 1);
	};

	return (
		<>
			<div className={" py-20 "}>
				<Container lg>
					{ideas?.length > 0 ? (
						<main>
							{/*<Button ripple={false} light icon={<ChevronSmallLeft size={80} />} disabled={index===0} size="xl" onClick={onPrev} css={{ minWidth: 40}}  className={"z-0 hover:text-primary active:text-primary"}/>*/}
							<Carousel
								renderCenterLeftControls={({previousDisabled, previousSlide}) => (
									<Button
										onClick={previousSlide}
										disabled={previousDisabled}
										ripple={false}
										light
										icon={<ChevronSmallLeft size={80} />}
										size="xl"
										css={{minWidth: 40}}
										className={"z-0 hover:text-primary active:text-primary"}
									/>
								)}
								renderCenterRightControls={({nextDisabled, nextSlide}) => (
									<Button
										onClick={nextSlide}
										disabled={nextDisabled}
										ripple={false}
										icon={<ChevronSmallRight size={80} />}
										size="xl"
										css={{minWidth: 40}}
										auto
										light
										className={"z-0 hover:text-primary active:text-primary"}
									/>
								)}
								slidesToShow={1}
								slideIndex={index}
								renderBottomCenterControls={false}>
								{ideas.map(item => (
									<CarouselContent key={item.id} item={item} onNext={onNext} />
								))}
							</Carousel>
							{/*<Button ripple={false} icon={<ChevronSmallRight size={80} />} disabled={index === (ideas.length - 1)} size="xl"  css={{ minWidth: 40}}  onClick={onNext} auto light  className={"z-0 hover:text-primary active:text-primary"}/>*/}
						</main>
					) : (
						<div className={"justify-self-center w-full flex items-center justify-center flex-col self-center"}>
							<Empty label={"We are out of ideas!"} />
							<Button bordered href="/new" as={"a"} className={"mt-8 cursor-pointer"} icon={<Plus size={22} />} size="lg">
								Add New Idea
							</Button>
						</div>
					)}
				</Container>
			</div>
		</>
	);
};

export default IdeaSlider;
