import React, {useState} from 'react';
import {Button, Container, Input, Loading, Text, Textarea} from "@nextui-org/react";
import Link from "next/link";
import axios from "axios"

const Contact = () => {
    const [loading, setLoading] = useState(false);

    const onSubmit = () => {
        setLoading(true);
        axios.post(`/support`).then(()=>{

        }).finally(() => setLoading(false))
    };

    return (<>

        <div className={"bg-indigo-50 pt-32"} >
            <Container>
                <Text h1>Contact us <span className={"font-normal"}>Lorem ipsum  ad nissimos fuga harum labore maiores minus</span></Text>
    
                <div className="flex  relative flex-col z-10 pb-20">
                <Input size={"lg"} bordered className={"mb-3"} label={"Subject"} />
                <Textarea  rows={4} size={"lg"} bordered className={"mb-6"} label={"Contact"}  />
                <div><Button auto disabled={loading} onPress={onSubmit} className={"mb-10"}
                             // iconRight={!loading && <KeyboardArrowRight size={20}/>}
                >
                    {loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> :
                    "Submit" }
                </Button></div>
    
                <Text h3>WHY SAFARIA?</Text>
                <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad culpa dignissimos fuga harum labore maiores minus molestiae nisi officia quas qui quia quos rem soluta, ullam velit veritatis vero.</Text>
    
                </div>
            </Container>
        </div>
    </>);
};

export default Contact;
