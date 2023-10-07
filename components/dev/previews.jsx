import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox-next";
import {PaletteTree} from "./palette";
import CustomListItem from "../idea/CustomListItem";
import Upload from "../../pages/new";

const ComponentPreviews = () => {
	return (
		<Previews palette={<PaletteTree />}>
			<ComponentPreview path="/CustomListItem">
				<CustomListItem />
			</ComponentPreview>
			<ComponentPreview path="/CustomListItem">
				<CustomListItem />
			</ComponentPreview>
			<ComponentPreview path="/Upload">
				<Upload />
			</ComponentPreview>
		</Previews>
	);
};

export default ComponentPreviews;
