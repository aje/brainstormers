import {Container, Grid, Text, User} from "@nextui-org/react";

const LatestUsers = () => {
    const users = [
        {
            name: "Behrouz Erfanian",
            bio: "this is my bio and it might  be long, I work everyday",
            email: "behroozina@live.ocm",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
            role: "ENTREPRENEUR"
        },
        {
            name: "Golnaz Rahim",
            bio: "this is my bio and it might  be long, I work everyday and it might  be long, I work everyday",
            email: "behroozina@live.ocm",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
            role: "ENTREPRENEUR"
        },
        {
            name: "John Due",
            email: "behroozina@live.ocm",
            bio: "this is my bio and it might  be long, I work everyday",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
            role: "ENTREPRENEUR"
        },
    ];
    return (<div className={"py-20 bg-gray-100"} style={{backgroundImage: "url(/ent.png)", backgroundSize: "cover", backgroundPosition:"bottom"}}>
        <Container >
            <main >
                <h2>
                    Get to know our <span className="text-primary">Entrepreneurs</span>
                </h2>
                <h3>Last month <span className="font-normal"> most active entrepreneurs(33)</span></h3>
                <Grid.Container gap={2}>
                    {users.map((user, i) => <Grid key={i} sm={4} className={"flex flex-col text-center items-center mt-4"} >
                        <User size={"2xl"}   src={user.avatar} name={""}/>
                        <h3 className={"mt-4"}>{user.name} <span size={12} className={"capitalize border-gray-300 text-gray-400 text-xs font-normal border-solid border bg-amber-50 rounded-md px-2"}>{user.role}</span></h3>
                        <Text className={"text-white bg-primary px-3 rounded-full mb-3 mt-1"}>54 Ideas</Text>
                        <Text className={"px-8"}>{user.bio}</Text>
                    </Grid>)}
                </Grid.Container>
            </main>
        </Container>
    </div>);
};

export default LatestUsers;
