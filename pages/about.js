import React from 'react';
import {Container, Text} from "@nextui-org/react";
import Link from "next/link";

const About = () => {
    return (<>
        <div className="bg-blue-50 pb-20 pt-32">
            <Container>
                <Text h1>About us <span className={"font-normal"}>Lorem ipsum  ad nissimos fuga harum labore maiores minus</span></Text>
                <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad culpa dignissimos fuga harum labore maiores minus molestiae nisi officia quas qui quia quos rem soluta, ullam velit veritatis vero.</Text>
                <Text h4 className={"mt-4"}>Remaining essentially </Text>
                <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad culpa dignissimos fuga harum labore maiores minus molestiae nisi officia quas qui quia quos rem soluta, ullam velit veritatis vero.</Text>
            </Container>
        </div>
    </>);
};

export default About;
