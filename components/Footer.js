import {Container, Navbar, Text} from "@nextui-org/react";

const Footer = () => {
    return (<div className={"py-12 bg-red-200 "}>
        <Container className={"flex justify-between items-center"}>
            <Text h6 className={"mb-0"}>All right reserved for IdeaStorm</Text>
            <Navbar.Content>
                <Navbar.Link href="/">Home</Navbar.Link>
                <Navbar.Link href="/explore">Explore</Navbar.Link>
                {/*<Navbar.Link href="#">Blog</Navbar.Link>*/}
                <Navbar.Link href="/about">About</Navbar.Link>
                <Navbar.Link href="/contact">Support</Navbar.Link>
            </Navbar.Content>
        </Container>
        </div>);
};

export default Footer;
