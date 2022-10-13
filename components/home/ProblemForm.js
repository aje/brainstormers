import React from 'react';
import {Button, Container, Textarea} from "@nextui-org/react";
import {Plus} from "@styled-icons/entypo/Plus";
import Image from "next/image";

const ProblemForm = () => {
    return (
        <div className={"bg-red-50"}>
            <Container >
                <main className={"flex items-center"}>
                    <div  style={{lineHeight: 0}} className="w-2/5 relative h-full">
                        <Image style={{lineHeight: 0}} src={"/problem.png"} width={500} height={500} objectFit="cover"/>
                    </div>
                    <div className="w-3/5 pl-20">
                        <h2 className={"mb-6 font-sans"} >You have a <span className={"text-red-400"}>problem</span>? <span className={"font-normal  font-serif"}>Explain it, to find a feasable solution</span></h2>
                        <Textarea bordered className={"mb-6 bg-white"} placeholder={"Something that makes ..."} fullWidth  size={"xl"} />
                        <div className="flex items-center">
                            <Button icon={<Plus size={32}/>}  className={" uppercase font-bold bg-red-500"} size={"lg"}>Add probelm</Button>
                            {/*<Button auto light className={" uppercase font-bold ml-3"} size={"lg"}>Login or Sign up</Button>*/}
                        </div>
                    </div>
                </main>
            </Container>
        </div>
    );
};

export default ProblemForm;
