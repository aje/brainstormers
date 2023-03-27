import React, {useState} from "react";
import {Button, Input, Loading, Text} from "@nextui-org/react";
import {Check} from "@styled-icons/entypo/Check";
import {Plus} from "@styled-icons/entypo/Plus";
import {Close} from "@styled-icons/remix-line";
import axios from "../../services/axios";
import {useRouter} from "next/router";
import CustomListItem from "./CustomListItem";

const CustomList = ({item, isOwner}) => {
	const [title, setListTitle] = useState("");
	const [openAdd, setOpenAdd] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState(item.customField);
	const router = useRouter();

	const onChangeItem = index => newArray => {
		const t = [...formData];
		t[index].items = newArray;
		setFormData(t);
	};

	const onAddList = () => {
		setLoading(true);
		axios
			.post(`/post/${item.id}/customLists`, {title})
			.then(r => {
				setOpenAdd(false);
				router.replace(router.asPath);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const onSave = item => () => {
		return axios.patch(`/post/${item.id}/customLists`, item);
	};

	return (
		<div className={"p-4 w-full"}>
			<div className="flex justify-between items-center">
				<Text h3>Custom lists</Text>
				{isOwner && (
					<Button light auto onClick={() => setOpenAdd(!openAdd)}>
						{openAdd ? <Close size={24} /> : <Plus size={24} />}
					</Button>
				)}
			</div>

			{openAdd && (
				<Input
					autoFocus
					bordered
					label={"List title"}
					// placeholder={"List title"}
					contentRight={
						<Button
							disabled={loading}
							onClick={onAddList}
							className={"min-w-min px-2 -ml-2 z-0"}
							auto
							icon={loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> : <Check size={22} />}
						/>
					}
					size={"xl"}
					fullWidth
					className={"mb-4"}
					value={title}
					onChange={e => setListTitle(e.target.value)}
					required
				/>
			)}
			{!!formData &&
				formData?.map((_, index) => {
					return (
						<CustomListItem
							deletable
							onSave={onSave(_)}
							custom
							key={_.id}
							items={_.items}
							title={_.title}
							item={_}
							isOwner={isOwner}
							onChange={onChangeItem(index)}
						/>
					);
				})}
		</div>
	);
};

export default CustomList;
