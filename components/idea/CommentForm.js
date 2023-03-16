import React, {useState} from "react";
import {Button, Loading, Textarea} from "@nextui-org/react";
import axios from "../../services/axios";
import {toast} from "react-hot-toast";
import {useRouter} from "next/router";
import {SendPlane} from "@styled-icons/remix-line/SendPlane";
import {useHookstate} from "@hookstate/core";
import {loginPopper} from "../../pages/_app";
import {useSession} from "next-auth/react";

const CommentForm = ({ideaId}) => {
	const [loading, setLoading] = useState(false);
	const state = useHookstate(loginPopper);
	const {data: session} = useSession();

	const [formData, setFormData] = useState({
		description: "",
		idea: ideaId,
	});

	const router = useRouter();

	const onChange = name => event => {
		setFormData({...formData, [name]: event?.target ? event.target.value : event});
	};

	const onSubmit = () => {
		setLoading(true);
		if (session) {
			axios
				.post(`/comments`, formData)
				.then(() => {
					router.replace(router.asPath);
					toast.success("Successfully posted!");
				})
				.finally(() => {
					onChange("description")("");
					setLoading(false);
				});
		} else {
			state.set(true);
			setLoading(false);
			toast.error("Please login first");
		}
	};

	return (
		<div className={"mb-10 w-full"}>
			<Textarea
				fullWidth
				required
				onChange={onChange("description")}
				value={formData.description}
				// rows={1}
				size={"lg"}
				bordered
				placeholder={"We want your honest opinion!"}
			/>
			{/*</div>*/}
			<Button
				auto
				className={"mt-4 z-0"}
				disabled={loading || formData.description === ""}
				onClick={onSubmit}
				iconRight={!loading && <SendPlane size={20} />}>
				{loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> : "Post"}
			</Button>
		</div>
	);
};

export default CommentForm;
