import {useEffect, useState} from 'react';
import {Button, Card, Container, Grid, Link, Text, User} from "@nextui-org/react";
import MyRating from "../MyRating";

const LatestIdeas = () => {

    const ideas = [
        {
            author: {
                name: "behrooz",
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
            },
            ratingsQuantity: 3,
            ratingsAverage: 3,
            title: "Gym app that also motivates",
            description: "All gyms are paid by yearly or 6 month, better to create an app to also motivates them to go to the gym",
            tags: ["TECH", "INTERNET", "ONLINE"]
        },
        {
            author: {
                name: "Ame behroz",
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
            },
            ratingsQuantity: 3,
            ratingsAverage: 3,
            title: "Business of a club or somethign",
            description: "All gyms are paid by yearly or 6 month, better to create an app to also motivates them to go to the gym",
            tags: ["INTERNET", "ONLINE"]
        },
        {
            author: {
                name: "Parios",
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
            },
            ratingsQuantity: 3,
            ratingsAverage: 3,
            title: "This is better be a good idea",

            description: "lorem ipsum do luco  ",
            tags: ["INTERNET", "ONLINE"]
        },
        {
            author: {
                name: "behrooz",
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
            },
            ratingsQuantity: 5643,
            ratingsAverage: 4.5,
            title: "Gym app that also motivates",

            description: "All gyms are paid by yearly or 6 month, better to create an app to also motivates them to go to the gym",
            tags: ["TECH", "INTERNET", "ONLINE"]
        },
        {
            author: {
                name: "Ame behroz",
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
            },
            ratingsQuantity: 123,
            ratingsAverage: 4,
            title: "Business of a club or somethign",

            description: "All gyms are paid by yearly or 6 month, better to create an app to also motivates them to go to the gym",
            tags: ["INTERNET", "ONLINE"]
        },
        {
            author: {
                name: "Parios",
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
            },
            ratingsQuantity: 12,
            ratingsAverage: 4,
            title: "This is better be a good idea",

            description: "lorem ipsum do luco  ",
            tags: ["INTERNET", "ONLINE"]
        },
    ]

    return (<div className={"py-20"}>
        <Container >
            <main >
                <h2>
                    Get <span className="text-primary">inspired</span> by other ideas <span className="font-normal"> and help them to grow the and this is the best</span>
                </h2>
                <h3>Last month <span className="font-normal"> best ideas (33)</span></h3>
                <Grid.Container gap={2}>
                    {ideas.map(idea => <Grid sm={4} >
                        <Card isPressable className={"bg-primary/10"}>
                            <Card.Header className={"flex-col pb-0 mt-2 items-start"}>
                                <User size={"xs"} className={"-ml-1 mb-2"}  src={idea.author.avatar} name={idea.author.name}/>
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
