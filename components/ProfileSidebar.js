import {Card, Modal, User} from "@nextui-org/react";
import {useSession} from "next-auth/react";
import {useHookstate} from "@hookstate/core";
import {sidebarState} from "../pages/_app";

const ProfileSidebar = () => {
    const { data: session } = useSession();
    const state = useHookstate(sidebarState);
    const onClose = () => {
        state.set(false)
        document.body.style.overflow = "auto";
    }
    return (session && <>
        <div onClick={onClose} style={{zIndex: 400, backdropFilter: "saturate(180%) blur(6px)"}} className={" bg-white/30 w-screen h-screen fixed top-0 left-0"} />
        {/*<Modal*/}
        {/*    // closeButton*/}
        {/*    // fullScreen*/}
        {/*    blur*/}
        {/*    // visibale={state.get() || false}*/}
        {/*    aria-labelledby="modal-title"*/}
        {/*    open={state.get()}*/}
        {/*    onClose={()=>state.set(false)}*/}
        {/*>*/}
        <Card  css={{ borderRadius: 0}} style={{zIndex: 400}}
               className=" bg-white h-screen w-2/3 fixed top-0 right-0"
        >
            <Card.Body>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
                <User className={" blur-md"} src={session.user.image} size={"2xl"} name={session.user.name}/>
            </Card.Body>
        </Card>
        {/*</Modal>*/}
        </>);
};

export default ProfileSidebar;
