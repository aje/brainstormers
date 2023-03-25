import {Button, Input} from "@nextui-org/react";
import {AddToList} from "@styled-icons/entypo/AddToList";
import {Trash} from "@styled-icons/entypo/Trash";
import {useEffect} from "react";

const FormList = ({value, onChange, ...rest}) => {
	const add = () => {
		const t = [...value];
		t.push("");
		onChange(t);
	};

	useEffect(() => {
		console.log(value);
		if (!value || value.length === 0) add();
	}, []);

	const remove = i => e => {
		const t = [...value];
		t.splice(i, 1);
		onChange(t);
	};

	const onChangeValue = i => e => {
		const t = [...value];
		t[i] = e.target.value;
		onChange(t);
	};

	return value?.map((p, i) => (
		<div key={i} className="flex w-full  pb-4">
			<Input
				placeholder={"Solutions or value"}
				underlined
				css={{flexGrow: 1}}
				{...rest}
				disabled={typeof p !== "string"}
				value={typeof p === "string" ? p : p.description}
				onChange={onChangeValue(i)}
				required
			/>
			{i === value.length - 1 ? (
				<>
					<Button css={{minWidth: 18, width: 18}} ripple={false} onClick={remove(i)} light color={"error"} className={"ml-2 "} auto>
						<Trash size={16} />
					</Button>
					<Button
						css={{minWidth: 18, width: 18}}
						ripple={false}
						onClick={add}
						disabled={p === ""}
						light
						className={"ml-2 hover:text-gray-500"}
						auto>
						<AddToList size={18} />
					</Button>
				</>
			) : (
				<Button css={{minWidth: 24, width: 24}} ripple={false} onClick={remove(i)} light color={"error"} className={"ml-2 "} auto>
					<Trash size={16} />
				</Button>
			)}
		</div>
	));
};

export default FormList;
