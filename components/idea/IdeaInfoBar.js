import React, {useState} from 'react';
import {Button, Dropdown, Input, Text, Textarea, User} from "@nextui-org/react";
import MyRating from "../MyRating";
import {Check} from "@styled-icons/entypo/Check";
import TagsInput from "react-tagsinput";
import {Edit} from "@styled-icons/entypo";
import Empty from "../Empty";
import {DotsThreeVertical} from "@styled-icons/entypo/DotsThreeVertical";
import {Close} from "@styled-icons/remix-line";
import FormList from "../FormList";
import axios from "../../services/axios";
import {toast} from "react-hot-toast";
import {useRouter} from "next/router";
import DeleteConfirmation from "../DeleteConfirmation";
import CommentItem from "./CommentItem";


const IdeaInfoBar = ({item, isOwner}) => {
    const [editable, setEditable] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(item);
    const [visible, setVisible] = useState(false);
    const router = useRouter();

    const refreshData = () => {
        router.replace(router.asPath);
    }
    const onDropdown = (key) => {
        switch (key) {
            case "upload":
                break;
            case "edit":
                break;
            case "delete":
                setVisible(true)
                break;
            default:

        }
    };
    const editItem = (name) => e => {
        if (isOwner)
            setEditable(name)
        if(name === null) {
            setFormData(item)
        }
    }
    const onChange = name => event => {
        setFormData({...formData, [name]: event?.target ? event.target.value : event});
    };
    function onSave() {
        setLoading(true);
        axios.patch(`/posts`, formData).then((res) => {
            toast.success("Successfully updated!");
            setEditable(null);
            refreshData();
        }).finally(() => setLoading(false))
    }
    function onDelete() {
        setLoading(true);
        setVisible(false)
        axios.delete(`/posts?id=${item.id}`).then((res) => {
            toast.success("Successfully deleted!");
            router.push("/")
        }).finally(() => setLoading(false))
    }

    const renderHeader = () => <>
        {/*? Author */}
        <div className="flex justify-between items-center">
            <div className="flex flex-col -ml-3">
                <User size="sm" src={item.author.image} name={item.author.name}/>
            </div>
            {!isOwner && <MyRating count={item.ratingsQuantity} size={"lg"} value={item.ratingsAverage} readonly/>}
        </div>
        {/*? title tags */}
        <div className="flex justify-center">
            <div className=" mt-d3 flex-1">
                {editable === "title" ?
                    <Input onChange={onChange("title")} contentRight={<Button onClick={onSave} className={"min-w-min px-2 -ml-2"} auto icon={<Check size={22}/>}/>} fullWidth size={"xl"} className={""} bordered value={item.title}/>
                    :
                    <Text h2 className={"cursor-pointer mb-0"} onClick={editItem("title")}>{item.title}</Text>
                }
                <div className={"mb-3 max-w-full"}>
                    {editable === "tags" ?
                        <>
                            <TagsInput
                                tagProps={{
                                    className: "react-tagsinput-tagd break-all mb-2 inline-block rounded-xl flex-wrap px-2 pb-1 pt-0 border border-solid border-gray-300 mr-2",
                                    classNameRemove: "before:content-['??'] text-gray-500 hover:text-gray-800 cursor-pointer pl-2 "

                                }}
                                className={"rounded-3xl bg-white px-4 pt-3 pb-2 "}
                                // maxTags={5} addOnBlur
                                value={formData.tags} onChange={onChange("tags")}/>
                            <Button
                                onClick={onSave}
                                className={"  mt-2"}
                                auto icon={<Check size={22}/>}>
                                Save
                            </Button>
                        </>
                        :
                        item.tags?.length > 0 ?
                            <>{
                                item.tags.map(t => <a
                                    className={"hover:underline hover:text-gray-500 transition-all font-bold  italic text-gray-300 mr-3"}>{t}</a>)
                            }
                                {isOwner && <Button onClick={editItem("tags")} color={"warning"} light auto
                                                    icon={<Edit size={16}/>} className={"min-w-min inline-block"}/>}
                            </>
                            : <Empty noIcon/>
                    }</div>

            </div>
            {/*? Delete button */}
            {isOwner && <>
                <DeleteConfirmation
                    renderItem={() => <div>
                        <Text h5 onClick={editItem("title")}>{item.title}</Text>
                    </div>}
                    loading={loading} visible={visible} closeHandler={() => setVisible(false)} onDelete={onDelete}/>

                <Dropdown placement={"bottom-right"}>
                    <Dropdown.Button ripple={false} light className={"min-w-min"}
                                     icon={<DotsThreeVertical size={22}/>}/>
                    <Dropdown.Menu aria-label="Static Actions" onAction={onDropdown}>
                        {/*<Dropdown.Item key="edit">Edit</Dropdown.Item>*/}
                        {/*<Dropdown.Item key="copy">Copy link</Dropdown.Item>*/}
                        {/*<Dropdown.Item key="edit">Edit file</Dropdown.Item>*/}
                        <Dropdown.Item key={"delete"} color="error">
                            Delete
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </>}
        </div>

        {/*? description */}
        {editable === "description" ? <>
                <Textarea onChange={onChange("description")} fullWidth bordered value={item.description}/>
                <Button onClick={onSave}
                        className={"  mt-2"}
                        auto icon={<Check size={22}/>}>Save</Button>
            </>
            :
            <Text onClick={editItem("description")}
                  className={"text-2xl mb-5 text-gray-500 font-light cursor-pointer"}>{item.description}</Text>
        }
    </>

    const renderSolutions = () => <>
        <div className={" px-s4 py-2 mt-5 rounded-3xl"}>
            <Text h3 className={"text-green-500 flex justify-between"}>Solutions {isOwner && (editable !== "solutions" ?
                <Button onClick={editItem("solutions")} color={"warning"} light auto icon={<Edit size={16}/>}
                        className={"min-w-min"}/>
                :
                <Button onClick={editItem(null)} light auto color={"error"} icon={<Close size={22}/>}
                        className={"min-w-min"}/>)
            }
            </Text>


            {editable === "solutions" ? <>
                    <FormList value={formData.solutions} onChange={onChange("solutions")} placeholder={"Add solution"}/>
                    <Button onClick={onSave} className={"  mb-2"} auto icon={<Check size={22}/>}>Save</Button>
                </>
                : item.solutions?.length === 0 ?
                    <Empty noIcon/> : item.solutions.map((p, i) => typeof p === "string" ? <Text>{p}</Text> :
                        <CommentItem item={p} dense/>)}
        </div>
    </>

    const renderProblems = () => <>
        <div className={"bg-resd-50 mt-5 pxs-4 py-2 rounded-3xl"}>
            <Text h3 className={"text-red-500 flex justify-between"}>Problems {isOwner && (editable !== "problems" ?
                <Button onClick={editItem("problems")} color={"warning"} light auto icon={<Edit size={16}/>}
                        className={"min-w-min"}/>
                :
                <Button onClick={editItem(null)} light auto color={"error"} icon={<Close size={22}/>}
                        className={"min-w-min"}/>
            )}</Text>
            {editable === "problems" ? <>
                    <FormList value={formData.problems} onChange={onChange("problems")} placeholder={"Add solution"}/>
                    <Button onClick={onSave} className={"  mb-2"} auto icon={<Check size={22}/>}>Save</Button>
                </>
                : item.problems?.length === 0 ?
                    <Empty noIcon/> : item.problems.map((p, i) => typeof p === "string" ? <Text>{p}</Text> :
                        <CommentItem item={p} dense/>)}
        </div>
    </>

    const renderAlternatives = () => <>
        <Text h3 className={"mt-5  flex justify-between"}>Alternatives {isOwner && (editable !== "alternatives" ?
            <Button onClick={editItem("alternatives")} color={"warning"} light auto icon={<Edit size={16}/>}
                    className={"min-w-min"}/>
            :
            <Button onClick={editItem(null)} light auto color={"error"} icon={<Close size={22}/>}
                    className={"min-w-min"}/>
        )}</Text>
        {editable === "alternatives" ? <>
                <FormList value={formData.alternatives} onChange={onChange("alternatives")}
                          placeholder={"Add solution"}/>
                <Button onClick={onSave} className={"  mb-2"} auto icon={<Check size={22}/>}>Save</Button>
            </>
            : item.alternatives?.length === 0 ? <Empty noIcon/> : item.alternatives.map((p, i) => <Text
                className={""}>{p}</Text>)}
    </>

    return (
        <div className="hsl px-6 flex-1 overflow-y-auto">
            {renderHeader()}
            {renderSolutions()}
            {renderProblems()}
            {renderAlternatives()}

            <Text h3 className={"mt-5"}>TargetAudience</Text>
            {editable === "targetAudience" ?
                <Input
                    onChange={onChange("targetAudience")}
                    contentRight={<Button onClick={onSave}
                                          className={"min-w-min px-2 -ml-2"}
                                          auto icon={<Check size={22}/>}/>}
                    fullWidth size={"xl"} className={""} bordered
                    value={item.targetAudience}/> :
                <Text className={"cursor-pointer"} onClick={editItem("targetAudience")}>{item.targetAudience || (isOwner ? "Click to add" : <Empty noIcon />)}</Text>}
        </div>
    );
};

export default IdeaInfoBar;