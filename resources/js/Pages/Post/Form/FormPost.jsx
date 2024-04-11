import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import ImgList from "../ImgList";
import { Button, Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Img from "../Img";
import BackgroundImage from "../../BackgroundImage";
import { usePage } from "@inertiajs/react";
import CustomButton from "../../BasicElements/Button";
import Modal from "../../BasicElements/Modal";
import NavBar from "../../NavBar";
import AxiosPut from "@/Pages/API/AxiosPut";
import ImgDropFiled from "./ImgDropFiled";
import AxiosDelete from "@/Pages/API/AxiosDelete";
import { Inertia } from "@inertiajs/inertia";
import AxiosPost from "@/Pages/API/AxiosPost";
import AxiosGet from "@/Pages/API/AxiosGet";

export default function FormPost({ categories, post }) {
    //console.log(categories, post);
    const user = usePage().props.auth.user;
    const [isOpen, setIsOpen] = useState(false);
    const [images, setImages] = useState(post ? post.images : null);
    const [isHovered, setIsHovered] = useState(false);
    const [selectedOption, setSelectedOption] = useState(
        post ? post.category_id : null,
    );
    const [preViewImages, setPreViewImages] = useState([]);

    const [postData, setPostData] = useState({
        title: post ? post.title : "",
        description: post ? post.description : "",
        price: post ? post.price : 0,
        category: post ? post.category_id : 0,
    });

    const closeDialog = () => {
        setIsOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (post) {
            AxiosPut(
                "post.update",
                { post: post.id },
                {
                    title: postData.title,
                    description: postData.description,
                    price: postData.price,
                    category: selectedOption,
                },
            );
        } else {
            AxiosPost("post.store", null, {
                title: postData.title,
                description: postData.description,
                price: postData.price,
                category: selectedOption,
            });
        }

        //await Inertia.post('/post/update', postData);
        Inertia.visit(route("dashboard"));
    };

    const refreshImages = async () => {
        AxiosGet("image.fetchImages", { post: post.id }, null, setImages);
    };

    const moveUp = (id) => {
        const index = images.findIndex((image) => image.id === id);

        if (index === -1) {
            console.error(`Image with id ${id} not found.1`);
            return;
        }

        if (index === 0) {
            console.log("Image is already at the top.2");
            return;
        }

        const updatedImages = [...images];

        const temp = updatedImages[index];
        updatedImages[index] = updatedImages[index - 1];
        updatedImages[index - 1] = temp;

        setImages(updatedImages);
        console.log("Moved image up:", updatedImages);
    };

    const moveDown = (id) => {
        const index = images.findIndex((image) => image.id === id);

        if (index === -1) {
            console.error(`Image with id ${id} not found.3`);
            return;
        }

        // if (index === 0) {
        //     console.log('Image is already at the top.4');
        //     return;
        // }

        const updatedImages = [...images];

        const temp = updatedImages[index];
        updatedImages[index] = updatedImages[index + 1];
        updatedImages[index + 1] = temp;

        setImages(updatedImages);
        console.log("Moved image down:", updatedImages);
    };

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const deleteImage = (id, preview = null) => {
        if (preview == null) {
            AxiosDelete("image.destroy", { image: id });
            setImages(images.filter((deletedImage) => deletedImage.id !== id));
        } else {
            AxiosDelete("image.destroy", { image: id });
            setPreViewImages(
                preViewImages.filter((deletedImage) => deletedImage.id !== id),
            );
        }
    };

    const reset = () => {
        setPostData({
            title: post.title ?? "",
            description: post.description ?? "",
            price: post.price ?? 0,
            category: post.category_id ?? 0,
        });
        setSelectedOption(post.category_id ?? 0);
    };

    useEffect(() => {
        //console.log(post);
        //console.log(preViewImages);
    }, [postData, preViewImages]);

    return (
        <>
            <NavBar />
            <BackgroundImage />
            <div className="flex relative w-fulls">
                <form onSubmit={handleSubmit} className="w-2/6 mx-auto">
                    <div className="flex flex-col items-center">
                        <div className="w-5/6">
                            <label
                                htmlFor="title"
                                className="block text-center"
                            >
                                Tytuł
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={postData.title}
                                onChange={handleChange}
                                className="w-full rounded-lg p-2"
                            />
                        </div>
                        <div className="w-5/6">
                            <label
                                htmlFor="description"
                                className="block text-center"
                            >
                                Opis
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={postData.description}
                                onChange={handleChange}
                                className="w-full rounded-lg p-2"
                            ></textarea>
                        </div>
                        <div className="w-5/6">
                            <label
                                htmlFor="price"
                                className="block text-center"
                            >
                                Cena
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={postData.price}
                                onChange={handleChange}
                                className="w-full rounded-lg p-2"
                            />
                        </div>
                        <div className="w-5/6 text-black m-2">
                            <label
                                htmlFor="price"
                                className="block text-center"
                            >
                                Kategoria
                            </label>
                            <select
                                value={selectedOption}
                                onChange={handleSelectChange}
                                className="rounded-lg w-full"
                            >
                                <option value={0}>Wybierz opcję...</option>
                                {categories.map((category, categoryIndex) => (
                                    <option
                                        key={categoryIndex}
                                        value={category.id}
                                        className="rounded-lg"
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </form>
                <div className="w-4/6">
                    <div className="w-full flex justify-center items-center">
                        {/* <CustomButton
                            text={"Dodaj zdjęcie"}
                            onClick={closeDialog}
                            className="bg-yellow-500 hover:bg-yellow-400 text-white rounded-lg"
                            iconPath={"add.png"}
                        /> */}
                        <ImgDropFiled
                            post={post}
                            preViewImages={preViewImages}
                            setPreViewImages={setPreViewImages}
                            refreshImages={refreshImages}
                        />
                    </div>
                    <div className="overflow-y-auto h-[85vh] relative">
                        {images &&
                            images.map((image, imageIndex) => (
                                <div className="relative">
                                    <Img
                                        className="w-full mx-auto"
                                        image={image}
                                        imageIndex={imageIndex}
                                        key={imageIndex}
                                    />
                                    <div className="absolute top-0 right-0 m-2">
                                        <CustomButton
                                            text={"Usuń zdjęcie"}
                                            //onClick={closeDialog}
                                            onClick={() =>
                                                deleteImage(image.id)
                                            }
                                            className="bg-red-500 hover:bg-red-400 text-white rounded-lg"
                                            iconPath={"delete.png"}
                                        />
                                        {/* {imageIndex > 0 &&
                                            <CustomButton
                                                text={"Przesuń w górę"}
                                                onClick={() => moveUp(image.id)}
                                                className="bg-yellow-500 hover:bg-yellow-400 text-white rounded-lg"
                                                iconPath={"arrow_up.png"}
                                            />
                                        }
                                        { imageIndex < (images.length -1) &&
                                            <CustomButton
                                                text={"Przesuń w dół"}
                                                onClick={() => moveDown(image.id)}
                                                className="bg-yellow-500 hover:bg-yellow-400 text-white rounded-lg"
                                                iconPath={"arrow_down.png"}
                                            />
                                        } */}
                                    </div>
                                </div>
                            ))}
                        {/* {preViewImages &&
                            preViewImages.map((image, imageIndex) => (
                                <div className="relative">

                                     <img
                                            src={image}
                                            alt="Preview"
                                            className="w-full rounded-lg"
                                        />
                                    <div className="absolute top-0 right-0 m-2">
                                        <CustomButton
                                            text={"Usuń zdjęcie"}
                                            //onClick={closeDialog}
                                            onClick={() => deleteImage(image.id, "preview")}
                                            className="bg-red-500 hover:bg-red-400 text-white rounded-lg"
                                            iconPath={"delete.png"}
                                        />
                                    </div>
                                </div>
                            ))
                        } */}
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 right-0  bg-white w-full flex justify-end">
                <CustomButton
                    text={"Zapisz"}
                    onClick={handleSubmit}
                    className="bg-green-500 hover:bg-green-400 text-white rounded-lg"
                    iconPath={"save.png"}
                />
                <CustomButton
                    text={"Cofnij zmiany"}
                    onClick={reset}
                    className="bg-yellow-500 hover:bg-yellow-400 text-white rounded-lg"
                    iconPath={"clear.png"}
                />
                <CustomButton
                    text={"Anuluj"}
                    onClick={() => Inertia.visit(route("dashboard"))}
                    className="bg-red-500 hover:bg-red-400 text-white rounded-lg"
                    iconPath={"delete.png"}
                />
            </div>
        </>
    );
}
