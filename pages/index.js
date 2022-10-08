import IdeaSlider from "../components/home/IdeaSlider";
import IdeaForm from "../components/home/IdeaForm";
import LatestIdeas from "../components/home/LatestIdeas";
import LatestUsers from "../components/home/LatestUsers";
import CTA from "../components/home/CTA";

export default function Home() {
    // const { data: session } = useSession();
    // const {theme} = useTheme()

    return (<>
        <CTA />
        <IdeaSlider />
        <IdeaForm />
        <LatestIdeas />
        <LatestUsers />
        </>
    )
}
