import React, {useState} from "react";
import {Button, Loading, Text} from "@nextui-org/react";
import {ChevronDown, ChevronUp, Edit} from "@styled-icons/entypo";
import {Close, DeleteBin} from "@styled-icons/remix-line";
import {Check} from "@styled-icons/entypo/Check";
import Empty from "../Empty";
import CommentItem from "./CommentItem";
import {AddToList} from "@styled-icons/entypo/AddToList";
import {toast} from "react-hot-toast";
import FormList from "../FormList";
import axios from "../../services/axios";
import DeleteConfirmation from "../DeleteConfirmation";
import {useRouter} from "next/router";

const CustomListItem = ({title, custom, helper, itemKey, onSave, isOwner, deletable, item, items, onChange, formData}) => {
	const [editable, setEditable] = useState(false);
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [toggle, setToggle] = useState(false);
	const router = useRouter();

	function onDelete() {
		setLoading(true);
		setVisible(false);
		axios
			.delete(`/post/${item.idea}/customLists?customId=${item._id}`)
			.then(res => {
				toast.success("Successfully deleted!");
				router.replace(router.asPath);
			})
			.finally(() => setLoading(false));
	}

	const onSubmit = async () => {
		setLoading(true);
		onSave()
			.then(() => {
				toast.success("Successfully updated!");
				setEditable(false);
				router.replace(router.asPath);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div className={"mt-6  hider"}>
			<DeleteConfirmation
				renderItem={() => (
					<div>
						<Text h5>{title}</Text>
					</div>
				)}
				loading={loading}
				visible={visible}
				closeHandler={() => setVisible(false)}
				onDelete={onDelete}
			/>

			<div className={"flex items-center relative"}>
				{}
				<Text className={"mb-0"} h4>
					{title} <span className={"text-gray-400 font-normal text-sm"}> ( {items.length} )</span>
				</Text>

				{items.length > 1 && (
					<Button
						icon={!toggle ? <ChevronUp size={20} className={"hid"} /> : <ChevronDown size={20} />}
						onClick={() => setToggle(!toggle)}
						size={"xs"}
						className={"min-w-min  ml-2"}
						auto
						light
					/>
				)}

				{isOwner &&
					(!editable ? (
						<>
							<Button
								onClick={() => setEditable(true)}
								color={"warning"}
								light
								auto
								size="xs"
								icon={<Edit size={14} />}
								className={"min-w-min hid ml-2 z-0"}
							/>
							{deletable && (
								<Button
									onClick={() => setVisible(true)}
									color={"error"}
									light
									auto
									size="xs"
									icon={<DeleteBin size={14} />}
									className={"min-w-min hid ml-2 z-0"}
								/>
							)}
						</>
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
							onClick={onSubmit}
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
				!toggle && items.map((p, i) => (typeof p === "string" ? <Text>{p}</Text> : <CommentItem item={p} dense />))
			)}
		</div>
	);
};

export default CustomListItem;
