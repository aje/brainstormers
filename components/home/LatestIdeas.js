import {Button, Card, Container, Grid, Text, User} from "@nextui-org/react";
import MyRating from "../MyRating";
import {useRouter} from "next/router";

const LatestIdeas = ({topLastMonth: ideas, countLastMonth}) => {

    const router = useRouter()

    return (<div className={"py-20"}>
        <Container >
            <main>
                <h2 className={"font-sans"}>
                    Get <span className="text-primary">inspired</span> by other ideas <span className="font-normal font-serif"> and help them to grow the and this is the best</span>
                </h2>
                <h3>Last month <span className="font-normal"> best ideas ({countLastMonth})</span></h3>
                <Grid.Container gap={2}>
                    {ideas.map(idea => <Grid sm={4} key={idea._id} xs={12}>
                        <Card  isPressable onPress={()=>router.push(`/ideas/idea/${idea._id}`)} className={"bg-primary/10"}>
                            <Card.Header className={"flex-col pb-0 mt-2 items-start"}>
                                <User size={"xs"} className={"-ml-1 mb-2"}  src={idea.author?.avatar} name={idea.author?.name}/>
                                <Text h5 className={"ml-2 mb-0"}> {idea.title}</Text>
                            </Card.Header>
                            <Card.Body>
                                {idea.description}
                            </Card.Body>
                            <Card.Footer className={"justify-end pt-0 pb-5 pr-5"}>
                                <MyRating value={idea.ratingsAverage} count={idea.ratingsQuantity} readonly size={"md"}/>
                            </Card.Footer>
                        </Card>
                    </Grid>)}

                </Grid.Container>

                <div className="flex justify-center mt-5">
                <Button ghost  size={"lg"} >SEE ALL</Button>
                </div>
            </main>
        </Container>
    </div>);
};

export default LatestIdeas;
