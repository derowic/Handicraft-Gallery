import React, { useState, useEffect } from "react";
import { Drawer } from "@mui/material";
import Img from "./Img";
import BackgroundImage from "../../Layouts/BackgroundImage";
import { usePage } from "@inertiajs/react";
import CustomButton from "../BasicElements/Button";
import Modal from "../BasicElements/Modal";
import { Inertia } from "@inertiajs/inertia";
import AxiosGet from "../API/AxiosGet";

export default function Post({ post, deletingPost }) {
    const [images, setImages] = useState([]);
    const user = usePage().props.auth.user;
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const openDialog = () => {
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
    };

    const handleMouseEnter = () => {
        if (isHovered != true) {
            setIsHovered(true);
        }
    };

    const handleMouseLeave = () => {
        if (isHovered != false) {
            setIsHovered(false);
        }
    };

    useEffect(() => {
        //AxiosGet("image.fetchImages",)
        if(isOpen == true && images.length == 0)
        {
            console.log(post);
            AxiosGet("image.fetchImages",{post: post.id}, null, setImages);
        }
    }, [isOpen]);


    return (
        <div className="relative">
            <button
                className={`relative w-full h-full`}
                onClick={openDialog}
                key={post.id}
            >
                <Img
                    className={"m-auto"}
                    image={post.image}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                />
                {isHovered && (
                    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4">
                        <h3 className="text-lg font-bold">
                            {post.title ? post.title : "produkt nr " + post.id}
                        </h3>
                        <p className="text-sm">
                            {post.price && post.price + "zł"}
                        </p>
                    </div>
                )}
            </button>

            <Drawer
                anchor="bottom"
                open={isOpen}
                onClose={closeDialog} // Tylko tutaj zamykamy panel
                className="items-center justify-center relative"
            >
                <BackgroundImage />
                <div className="fixed m-2 z-10">
                    <CustomButton
                        text={"Zamknij"}
                        onClick={closeDialog}
                        className="bg-red-500 hover:bg-red-400 text-white rounded-lg"
                        iconPath={"close.png"}
                    />
                </div>
                <div className="lg:flex">
                    <div className="w-1/6"></div>
                    <div className="sm:w-full lg:w-4/6 overflow-y-auto h-[100vh] relative">
                        {images.map((image, imageIndex) => (
                            <Img
                                className="w-full mx-auto"
                                image={image}
                                key={imageIndex}
                            />
                        ))}
                    </div>
                    <div className="w-1/6 flex break-all justify-center items-center flex-col">
                        <div>{post.title ?? `Produkt ${post.id}`}</div>
                        <div>Opis: {post.description}</div>
                        <div>cena: {post.price ?? "nie podano"} zł</div>
                        <div>ilość zdjęć: {images.length}</div>
                    </div>
                </div>
            </Drawer>
            {user && (
                <div className="absolute top-0 right-0 flex text-sm">
                    <CustomButton
                        className="bg-green-500 rounded-lg text-white"
                        onClick={() =>
                            Inertia.visit(route("post.edit", { post: post.id }))
                        }
                        text={"Edytuj"}
                        iconPath={"edit.png"}
                    />
                    <Modal
                        buttonText={"Usuń"}
                        buttonClassName="bg-red-500 rounded-lg text-white"
                        iconPath={"delete.png"}
                        title={""}
                        description={
                            "Czy na pewno chcesz usunąć post ? Dane zostaną utracone"
                        }
                        confirmButtonText={"Tak ,Usuń"}
                        confirmButtonOnClick={() => deletingPost(post)}
                        cancelButtonText={"Anuluj"}
                        cancelButtonOnClick={closeDialog}
                    />
                </div>
            )}
        </div>
    );
}
