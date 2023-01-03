import IdeaSlider from "../components/home/IdeaSlider";
import IdeaForm from "../components/home/IdeaForm";
import LatestIdeas from "../components/home/LatestIdeas";
import LatestUsers from "../components/home/LatestUsers";
import CTA from "../components/home/CTA";
import ProblemForm from "../components/home/ProblemForm";
import {Container, Text} from "@nextui-org/react";
import React from "react";
import {hookstate} from "@hookstate/core";
import dbConnect from "../services/dbconnect";
import Idea from "../models/Idea";
import User from "../models/User";
import {getSession} from "next-auth/react";
// import * as models from "../models/models"

export const ideaFormData = hookstate({
    problem: "",
    idea: ""
});

export default function Home({latest}) {
    console.log(latest);
    // const { data: session } = useSession();
    // const {theme} = useTheme()

    return (<>
            <CTA />
            <IdeaSlider latest={latest} />
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


export async function getServerSideProps({params, req}) {
    await dbConnect();
    const session = await getSession({ req });
    let latest = [];
    let topLastMonth = []
    try {
        //? get latest for slider
        const latestQuery = session ? {raters: {$not: {$elemMatch:  {$eq: session.user._id}}}} : '';
        latest = await Idea.find(latestQuery,  'title author description tags')
            .populate({path: 'author', model: User}).sort({'createdAt': -1}).limit(50)
        // console.log("latest");
        // console.log(latest);
        // const topQuery = ;
        // todo get count
        // topLastMonth = await Idea.find(topQuery,  'title author description tags')
        //     .populate({path: 'author', model: User}).sort({'createdAt': -1}).limit(6)


    } catch (e) {
        console.log(e)
    }
    return {
        props: {
            topLastMonth: [],
            topEnt: [],

            latest: JSON.parse(JSON.stringify(latest)),

        },
    };
}
