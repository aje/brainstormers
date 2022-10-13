import IdeaSlider from "../components/home/IdeaSlider";
import IdeaForm from "../components/home/IdeaForm";
import LatestIdeas from "../components/home/LatestIdeas";
import LatestUsers from "../components/home/LatestUsers";
import CTA from "../components/home/CTA";
import ProblemForm from "../components/home/ProblemForm";
import {Container, Text} from "@nextui-org/react";
import Image from "next/image";
import React from "react";

export default function Home() {
    // const { data: session } = useSession();
    // const {theme} = useTheme()

    return (<>
            <CTA />
            <IdeaSlider />
            <IdeaForm />

        <div className={" py-20 text-center "}
             style={{backgroundImage: "url(/homepage.png)" , backgroundSize: "50%"}}
        >
            <Container >
                <main>
                    <Text className={"text-primary font-sanse"} h2>You have no idea?</Text>
                    <Text className={"text-2xl "}>Do not worry! You tell us what <span className="text-red-500">problem</span> in life you have and we will try to find a <span className={"text-primary"}>solution</span> for it! </Text>
                </main>
            </Container>
        </div>
            <ProblemForm />
            <LatestIdeas />
            <LatestUsers />
        </>
    )
}
