import React, { useState, useEffect } from "react";
import Img from "../Img";
import BackgroundImage from "../../../Layouts/BackgroundImage";
import { usePage } from "@inertiajs/react";
import CustomButton from "../../BasicElements/Button";
import AxiosPut from "@/Pages/API/AxiosPut";
import ImgDropFiled from "./ImgDropFiled";
import AxiosDelete from "@/Pages/API/AxiosDelete";
import { Inertia } from "@inertiajs/inertia";
import AxiosPost from "@/Pages/API/AxiosPost";
import AxiosGet from "@/Pages/API/AxiosGet";
import Authenticated from "@/Layouts/AuthenticatedLayout";
// import { useForm } from '@inertiajs/inertia-react';
import { useForm } from "@inertiajs/react";

export default function FormPost({ title, categories, postData }) {
    console.log(postData);
    const user = usePage().props.auth.user;
    const [images, setImages] = useState(postData ? postData.images : null);
    const [selectedOption, setSelectedOption] = useState(postData ? postData.category_id : null);
    const [preViewImages, setPreViewImages] = useState([]);
    const { data, setData, post, put, processing, errors, setError } = useForm({
        forceFormData: true,
        title: postData ? postData.title : "",
        description: postData ? postData.description : "",
        price: postData ? postData.price : 0,
        category: postData ? postData.category_id : 0,
    });

    const closeDialog = () => {
        setIsOpen(false);
    };

    const handleChange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        //setSelectedOption(event.target.value);
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const response = await (postData
        //     ? Inertia.put(route("post.update", { post: postData.id }), data)
        //     : Inertia.post(route("post.store"), data));
        //console.log(postData);
        if (postData) {
            put(route("post.update", { post: postData.id }),
                // {
                //     ...data,
                //     _method: "put",
                //     preserveScroll: true,
                // },
                {
                    onSuccess: (response) => {
                        console.log(response);
                        //closeDialog();
                    },
                    onError: (errors) => {
                        console.log(errors);
                        setError(errors);
                    },
                    onFinish: (params) => {
                        console.log(params);
                    },
                },
            );
        } else {
            post(route("post.store"),
                // {
                //     ...data,
                //     _method: "post",
                //     preserveScroll: true,
                // },
                {
                    onSuccess: (response) => {
                        console.log(response);
                        //closeDialog();
                    },
                    onError: (errors) => {
                        console.log(errors);
                        setError(errors);
                        //toast.error(translation.t("Error"));
                    },
                    onFinish: (params) => {
                        console.log(params);
                    }
                }
            );
        }
    };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     let tmp= "l";
    //     //     // const response = await AxiosPost('/your/route', { /* your route data */ }, { /* your data */ });
    //     //     // console.log("Response data: ", response.data);
    //     //
    //     // try {
    //         if (post) {
    //             const response = await AxiosPut(
    //                 "post.update",
    //                 { post: post.id },
    //                 {
    //                     title: postData.title,
    //                     description: postData.description,
    //                     price: postData.price,
    //                     category: selectedOption,
    //                 },
    //             );
    //             console.log(response);
    //         } else {
    //             tmp = AxiosPost("post.store", null, {
    //                 title: postData.title,
    //                 description: postData.description,
    //                 price: postData.price,
    //                 category: selectedOption,
    //             });
    //             console.log(tmp);
    //         }
    //     //   } catch (error) {
    //     //     console.error("Błąd podczas wysyłania żądania:", error);
    //     //   }
    //     //await Inertia.post('/post/update', postData);
    //     //Inertia.visit(route("dashboard"));
    // };

    const refreshImages = async () => {
        AxiosGet("image.fetchImages", { post: postData.id }, null, setImages);
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
        setData({
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
        <Authenticated>
            <BackgroundImage />
            <div className="w-full text-center p-2 bg-white text-red-600 text-3xl font-bold">{title}</div>
            <div className="flex relative w-full p-2">
                <form onSubmit={handleSubmit} className="w-2/6 mx-auto bg-white rounded-lg h-1/2 ">
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
                                value={data.title}
                                onChange={handleChange}
                                className="w-full rounded-lg p-2"
                            />
                            {errors.title && <span className="text-red-500">{errors.title}</span>}
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
                                value={data.description}
                                onChange={handleChange}
                                className="w-full rounded-lg p-2"
                            ></textarea>
                            {errors.description && <span className="text-red-500">{errors.description}</span>}
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
                                value={data.price}
                                onChange={handleChange}
                                className="w-full rounded-lg p-2"
                            />
                            {errors.price && <span className="text-red-500">{errors.price}</span>}
                        </div>
                        <div className="w-5/6 text-black m-2">
                            <label
                                htmlFor="price"
                                className="block text-center"
                            >
                                Kategoria
                            </label>
                            <select
                                type="number"
                                id="price"
                                name="category"
                                value={selectedOption}
                                onChange={(e) => handleChange(e)}
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
                            {errors.category && <span className="text-red-500">{errors.category}</span>}
                        </div>
                    </div>
                </form>
                <div className="w-4/6">
                    <div className="w-full flex justify-center items-center">
                        <ImgDropFiled
                            post={postData}
                            preViewImages={preViewImages}
                            setPreViewImages={setPreViewImages}
                            refreshImages={refreshImages}
                        />
                    </div>
                    <div className="overflow-y-auto h-[85vh] relative">
                        <div className="text-2xl text-center">{images && images.length == 0 && "Nie załadowano jeszcze żadnych zdjęć"}</div>
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
            <div className="absolute bottom-0 right-0 w-full flex justify-end">
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
        </Authenticated>
    );
}
