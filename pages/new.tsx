import React, {useState} from "react";
import {Button, Card, Container, Input, Loading, Text, Textarea} from "@nextui-org/react";
import axios from "../services/axios";
import {toast} from "react-hot-toast";
import {useHookstate} from "@hookstate/core";
import {AddToList} from "@styled-icons/entypo/AddToList";
import {Trash} from "@styled-icons/entypo/Trash";
import {SendPlane} from "@styled-icons/remix-line/SendPlane";
import Empty from "../components/Empty";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import {useRouter} from "next/router";
import {ideaFormData, loginPopper} from "./_app";
import {useSession} from "next-auth/react";
import {IdeaType} from "../types";

const Upload = () => {
	const {data: session} = useSession();
	const state = useHookstate<{problem?: string; idea?: string}>(ideaFormData);
	const login = useHookstate<boolean>(loginPopper);
	const router = useRouter();
	const {problem, idea} = state.get();
	const [loading, setLoading] = useState<boolean>(false);
	// @ts-ignore
	const [formData, setFormData] = useState<IdeaType>({
		title: idea || problem,
		description: "",
		tags: [],
		targetAudience: [""],
	});
	const [problems, setProblems] = useState<string[]>([problem]);
	const [ideas, setIdeas] = useState<string[]>([idea]);
	const [alts, setAlts] = useState<string[]>([""]);
	const [step, setStep] = useState<number>(0);

	const onChange = name => event => {
		setFormData({...formData, [name]: event?.target ? event.target.value : event});
	};

	const onSubmit = () => {
		setLoading(true);
		const data = formData;
		if (problems.length > 1 || problems[0] !== "") data.problems = problems;
		if (ideas.length > 1 || ideas[0] !== "") data.solutions = ideas;
		if (session) {
			axios
				.post(`/posts`, data)
				.then(({data}) => {
					toast.success("Successfully created!");
					setFormData(data);
					setStep(1);
					// router.push('/')
				})
				.finally(() => setLoading(false))
				.catch(e => {
					toast.error(e.message);
				});
		} else {
			login.set(true);
			setLoading(false);
			toast.error("Please login first");
		}
	};

	const onSubmitFinal = () => {
		setLoading(true);
		const data = formData;
		if (alts.length > 1 || alts[0] !== "") data.alternatives = alts;
		axios
			.patch(`/posts`, data)
			.then(res => {
				toast.success("Successfully updated!");
				// setFormData(data)
				// setStep(1)
				router.push(`/ideas/${res.data?._id}`);
			})
			.finally(() => setLoading(false))
			.catch(e => {
				toast.error(e.message);
			});
	};

	const addProblem = () => {
		const t = [...problems];
		t.push("");
		setProblems(t);
	};

	const removeProblem = i => () => {
		const t = [...problems];
		t.splice(i, 1);
		setProblems(t);
	};

	const onChangeProblem = i => e => {
		const t = [...problems];
		t[i] = e.target.value;
		setProblems(t);
	};

	const addIdeas = () => {
		const t = [...ideas];
		t.push("");
		setIdeas(t);
	};

	const removeIdeas = i => () => {
		const t = [...ideas];
		t.splice(i, 1);
		setIdeas(t);
	};

	const onChangeIdeas = i => e => {
		const t = [...ideas];
		t[i] = e.target.value;
		setIdeas(t);
	};

	const addAlts = () => {
		const t = [...alts];
		t.push("");
		setAlts(t);
	};

	const removeAlts = i => () => {
		const t = [...alts];
		t.splice(i, 1);
		setAlts(t);
	};

	const onChangeAlts = i => e => {
		const t = [...alts];
		t[i] = e.target.value;
		setAlts(t);
	};

	const disabled = formData.title === "" || loading;

	return (
		<>
			<div className={"py-20 bg-violet-50"}>
				<Container>
					<Text h1>
						Start <span className={"text-primary"}>Ideation</span> <span className={"font-normal"}>and brainstorm</span>
					</Text>
					{step === 0 && (
						<>
							<div className={"bg-white  rounded-3xl mb-5"}>
								<div className="p-4">
									<Input
										label={"Title"}
										value={formData.title}
										onChange={onChange("title")}
										required
										size={"xl"}
										className={"mb-3"}
										fullWidth
										// underlined
										placeholder={"Choose a name or small explanation"}
									/>

									<Textarea
										size={"xl"}
										value={formData.description}
										onChange={onChange("description")}
										// className={"mb-6"}
										// underlined
										fullWidth
										label="Description"
										placeholder="Enter your amazing ideas."
									/>
								</div>
							</div>
							<div className="grid gap-5 grid-cols-2  mb-5">
								<div className={"bg-red-50 px-1 rounded-3xl"}>
									<Card.Header className={"pb-0 block"}>
										<Text h3 className={"text-red-500"}>
											Problems to be solved
										</Text>
										<Text className={"-mt-3 text-gray-500"}>What problems are you solving?</Text>
									</Card.Header>
									{problems.map((p, i) => (
										<div key={i} className="flex w-full px-4 pb-4">
											<form
												onSubmit={e => {
													e.preventDefault();
													addProblem();
												}}
												className={"flex-1"}>
												<Input
													autoFocus
													underlined
													fullWidth
													value={p}
													placeholder={"A problem to fix"}
													onChange={onChangeProblem(i)}
													required
													size={"lg"}
												/>
											</form>
											{i === problems.length - 1 ? (
												<Button
													css={{minWidth: 24, width: 24}}
													ripple={false}
													onClick={addProblem}
													disabled={p === ""}
													light
													color={"error"}
													className={"ml-2 hover:text-red-800"}
													auto>
													<AddToList size={24} />
												</Button>
											) : (
												<Button
													css={{minWidth: 24, width: 24}}
													ripple={false}
													onClick={removeProblem(i)}
													light
													color={"error"}
													className={"ml-2 hover:text-red-800"}
													auto>
													<Trash size={16} />
												</Button>
											)}
										</div>
									))}
								</div>
								<div className={"bg-green-50 px-1 rounded-3xl"}>
									<Card.Header className={"pb-0 block mb-2"}>
										<Text h3 className={"text-green-500"}>
											My Solutions
										</Text>
										<Text className={"-mt-3 text-gray-500"}>How do you solve a problem?</Text>
									</Card.Header>

									{ideas.map((p, i) => (
										<div key={i} className="flex w-full px-4  pb-4">
											<form
												onSubmit={e => {
													e.preventDefault();
													addIdeas();
												}}
												className={"flex-1"}>
												<Input
													autoFocus
													placeholder={"Solutions or ideas"}
													underlined
													fullWidth
													value={p}
													onChange={onChangeIdeas(i)}
													required
													size={"lg"}
												/>
											</form>
											{i === ideas.length - 1 ? (
												<Button
													css={{minWidth: 24, width: 24}}
													ripple={false}
													onClick={addIdeas}
													disabled={p === ""}
													light
													color={"success"}
													className={"ml-2 hover:text-green-800"}
													auto>
													<AddToList size={24} />
												</Button>
											) : (
												<Button
													css={{minWidth: 24, width: 24}}
													ripple={false}
													onClick={removeIdeas(i)}
													light
													color={"success"}
													className={"ml-2 hover:text-green-800"}
													auto>
													<Trash size={16} />
												</Button>
											)}
										</div>
									))}
								</div>
							</div>
							<Button className={"mt-5"} onClick={onSubmit} iconRight={!loading && <SendPlane size={20} />} disabled={disabled}>
								{loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> : "Save & Next"}
							</Button>
						</>
					)}

					{step === 1 && (
						<>
							<Text h2>
								<span className={"font-normal text-gray-500"}>Title:</span> {formData.title}
							</Text>
							<Text>{formData.description}</Text>
							<div className="grid gap-5 my-5 grid-cols-2">
								<div className="bg-green-50 rounded-3xl px-1">
									<Card.Header className={"pb-0 block mb-2"}>
										<Text h3 className={"text-green-500"}>
											Solutions
										</Text>
									</Card.Header>
									{formData.solutions.length === 0 ? (
										<Empty />
									) : (
										formData.solutions.map((p, i) => (
											<div key={i} className="flex w-full px-4  pb-4">
												{typeof p === "string" ? <p>{p}</p> : null}
											</div>
										))
									)}
								</div>
								<div className="bg-red-50 rounded-3xl px-1">
									<Card.Header className={"pb-0 block"}>
										<Text h3 className={"text-red-500"}>
											Problems
										</Text>
									</Card.Header>

									{formData.problems.length === 0 ? (
										<Empty />
									) : (
										formData.problems.map((p, i) => (
											<div key={i} className="flex w-full px-4  pb-4">
												{typeof p === "string" ? <p>{p}</p> : null}
											</div>
										))
									)}
								</div>
							</div>

							<Text h4>Existing Alternatives</Text>
							<Text small className={"-mt-2 mb-3"}>
								List how these problems are solved today
							</Text>
							<div className="bg-white rounded-3xl pt-2 mb-5">
								{alts.map((p, i) => (
									<div key={i} className="flex w-full px-4  pb-4">
										<Input underlined css={{flexGrow: 1}} value={p} onChange={onChangeAlts(i)} required size={"lg"} />
										{i === alts.length - 1 ? (
											<Button
												css={{minWidth: 24, width: 24}}
												ripple={false}
												onClick={addAlts}
												disabled={p === ""}
												light
												className={"ml-2 hover:text-green-800"}
												auto>
												<AddToList size={24} />
											</Button>
										) : (
											<Button
												css={{minWidth: 24, width: 24}}
												ripple={false}
												onClick={removeAlts(i)}
												light
												className={"ml-2 hover:text-green-800"}
												auto>
												<Trash size={16} />
											</Button>
										)}
									</div>
								))}
							</div>

							<Text h4>Early adopters ( Target audience )</Text>
							<Text small className={"-mt-2 mb-3"}>
								List characteristics of your ideal customer
							</Text>
							<div className="bg-white rounded-3xl pt-2 px-4 mb-5">
								<Input
									value={formData.targetAudience}
									onChange={onChange("targetAudience")}
									required
									size={"xl"}
									className={"mb-3 "}
									fullWidth
									underlined
									placeholder={"Who is eligible to use your product or service or who has the problems?"}
								/>
							</div>

							<Text h4>
								Tags <small className={"text-gray-500 ml-1"}> Enter to add</small>
							</Text>
							<TagsInput
								tagProps={{
									className: "react-tagsinput-tagd rounded-xl px-2 pb-1 pt-0 border border-solid border-gray-300 mr-2",
									classNameRemove: "before:content-['×'] text-gray-500 hover:text-gray-800 cursor-pointer pl-2 ",
								}}
								className={"rounded-3xl bg-white px-4 pt-3 pb-2"}
								// maxTags={5} addOnBlur
								value={formData.tags}
								onChange={onChange("tags")}
							/>

							<Button className={"mt-5 "} onClick={onSubmitFinal} iconRight={!loading && <SendPlane size={20} />} disabled={disabled}>
								{loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> : "Save"}
							</Button>
						</>
					)}
				</Container>

				{/*<Input required value={formData.date} onChange={onChange("date")} size={"lg"} bordered className={"mb-3"} label={"Month of the trip *"} type="month"/>*/}
				{/*<div>*/}
				{/*    <Button auto disabled={loading || disabled} onClick={onSubmit} className={"mb-10 mt-3"}  iconRight={!loading && <SendPlane size={20}/>}>*/}
				{/*        {loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> :*/}
				{/*        "Publish" }*/}
				{/*    </Button>*/}
				{/*</div>*/}
			</div>
		</>
	);
};

export default Upload;
