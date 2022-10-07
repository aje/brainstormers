import React from 'react';
import {Button, Container, Textarea} from "@nextui-org/react";

const IdeaForm = () => {
    return (
        <div className={"bg-blue-50 py-20"}>
            <Container >
                <main className={"flex  items-center"}>
                    <div className="w-3/5 pr-20">
                        <h2 >Write your <span className={"text-blue-400"}>idea</span> down <span className={"font-normal"}>and ask other people's opinion</span></h2>
                        <Textarea flat className={"mb-6"} placeholder={"Something that makes ..."} fullWidth  size={"xl"} />
                        <div className="flex">
                            <Button>Add idea</Button>
                            <Button flat className={"ml-3"}>Login or Sign up</Button>
                        </div>
                    </div>
                    <div className="w-2/5 bg-red-300">pic</div>
                </main>
            </Container>
        </div>
    );
};

export default IdeaForm;