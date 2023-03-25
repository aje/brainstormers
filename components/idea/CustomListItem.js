import React, {useState} from "react";
import {Button, Loading, Text} from "@nextui-org/react";
import {Edit} from "@styled-icons/entypo";
import {Close} from "@styled-icons/remix-line";
import {Check} from "@styled-icons/entypo/Check";
import Empty from "../Empty";
import CommentItem from "./CommentItem";
import {AddToList} from "@styled-icons/entypo/AddToList";
import axios from "../../services/axios";
import {toast} from "react-hot-toast";
import {useRouter} from "next/router";
import FormList from "../FormList";

const CustomListItem = ({title, custom, helper, itemKey, onSaveOverride, isOwner, items, onChange, formData}) => {
	const [editable, setEditable] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	function onSave() {
		setLoading(true);
		if (typeof onSaveOverride === "function") onSaveOverride();
		else
			axios
				.patch(`/posts`, formData)
				.then(res => {
					toast.success("Successfully updated!");
					setEditable(false);
					router.replace(router.asPath);
				})
				.finally(() => setLoading(false));
	}

	return (
		<div className={"mt-6  hider"}>
			<div className={"flex items-center"}>
				<Text className={"mb-0"} h4>
					{title}
				</Text>

				{isOwner &&
					items.length > 0 &&
					(!editable ? (
						<Button
							onClick={() => setEditable(true)}
							color={"warning"}
							light
							auto
							size="xs"
							icon={<Edit size={14} />}
							className={"min-w-min hid ml-2 z-0"}
						/>
					) : (
						<Button
							size="xs"
							onClick={() => setEditable(false)}
							light
							auto
							color={"error"}
							icon={<Close size={14} />}
							className={"min-w-min ml-2 z-0"}
						/>
					))}
			</div>

			{items.length === 0 && isOwner && helper}
			{editable ? (
				<>
					{custom ? (
						<FormList value={items} onChange={onChange} placeholder={`Add`} />
					) : (
						<FormList value={formData[itemKey]} onChange={onChange(itemKey)} placeholder={`Add a ${itemKey}`} />
					)}
					<div className="flex items-center">
						<Button disabled={loading} size={"xs"} onClick={() => setEditable(false)} light className={" z-0 mb-2"} auto>
							Cancel
						</Button>
						<Button
							disabled={loading}
							size={"xs"}
							onClick={onSave}
							className={" z-0 ml-2 mb-2"}
							auto
							icon={!loading && <Check size={16} />}>
							{loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> : "Save"}
						</Button>
					</div>
				</>
			) : items?.length === 0 ? (
				isOwner ? (
					<Button
						ripple={false}
						light
						size={"xs"}
						icon={<AddToList size={16} />}
						onClick={() => setEditable(true)}
						className={"mt-2 z-0 -ml-2 opacity-50"}
						auto>
						Add item
					</Button>
				) : (
					<Empty inline />
				)
			) : (
				items.map((p, i) => (typeof p === "string" ? <Text>{p}</Text> : <CommentItem item={p} dense />))
			)}
		</div>
	);
};

export default CustomListItem;
