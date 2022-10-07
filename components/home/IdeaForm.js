import React from 'react';
import {Button, Container, Textarea} from "@nextui-org/react";
import {Plus} from "@styled-icons/entypo/Plus";
import Image from "next/image";

const IdeaForm = () => {

    return (
        <div className={"bg-blue-50"}>
            <Container >
                <main className={"flex items-center"}>
                    <div className="w-3/5 pr-20">
                        <h2 className={"mb-6"} >Write your <span className={"text-blue-400"}>idea</span> down <span className={"font-normal"}>and ask other people's opinion</span></h2>
                        <Textarea bordered className={"mb-6 bg-white"} placeholder={"Something that makes ..."} fullWidth  size={"xl"} />
                        <div className="flex items-center">
                            <Button icon={<Plus size={32}/>}  className={" uppercase font-bold"} size={"lg"}>Add idea</Button>
                            {/*<Button auto light className={" uppercase font-bold ml-3"} size={"lg"}>Login or Sign up</Button>*/}
                        </div>
                    </div>
                    <div  style={{lineHeight: 0}} className="w-2/5 relative h-full">
                        <Image style={{lineHeight: 0}} src={"/homepageAddIdea.png"} width={500} height={500} objectFit="cover"/>
                    </div>
                </main>
            </Container>
        </div>
    );
};

export default IdeaForm;
