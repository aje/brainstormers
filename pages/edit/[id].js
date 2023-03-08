import {Card, Container, Text, Textarea} from "@nextui-org/react";
import React, {useState} from "react";
import {useRouter} from "next/router";

const EditNewIdea = () => {
	const router = useRouter();
	const [step, setStep] = useState(0);
	const [formData, setFormData] = useState({});

	return (
		<div className={"py-20 bg-violet-50"}>
			<Container>
				<Text h1>
					Start <span className={"text-primary"}>Ideation</span> <span className={"font-normal"}>and brainstorm</span>
				</Text>

				<Text h3>Title of the edited lwelkhjasl h;kjnasd,m h</Text>

				<div className="grid gap-5 grid-cols-2 ">
					<div className={"bg-blue-100 px-1 rounded-3xl"}>
						<Card.Header className={"pb-0"}>
							<Text h3 className={"text-blue-500"}>
								Solutions
							</Text>
						</Card.Header>
					</div>
					<div className={"bg-red-100 px-1 rounded-3xl"}>
						<Card.Header className={"pb-0"}>
							<Text h3 className={"text-red-500"}>
								Problems
							</Text>
						</Card.Header>
					</div>
				</div>
				{
					<Card className={"mt-5 shadow-none"}>
						<Card.Header className={"pb-0 block"}>
							<Text h3 className={"mb-0"}>
								Description
							</Text>
							<Text>Describe your idea or problem more</Text>
						</Card.Header>
						<Card.Body className={"px-4"}>
							<Textarea bordered rows={5} fullWidth placeholder={"Describe what you have in your mind!"} />
						</Card.Body>
					</Card>
				}
			</Container>
		</div>
	);
};

export default EditNewIdea;
