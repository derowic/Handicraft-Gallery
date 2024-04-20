import React, { useState, useEffect } from "react";
import Img from "../Img";
import BackgroundImage from "../../../Layouts/BackgroundImage";
import { usePage } from "@inertiajs/react";
import CustomButton from "../../BasicElements/Button";
import ImgDropFiled from "./ImgDropFiled";
import AxiosDelete from "@/Pages/API/AxiosDelete";
import { Inertia } from "@inertiajs/inertia";
import AxiosPost from "@/Pages/API/AxiosPost";
import AxiosGet from "@/Pages/API/AxiosGet";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";

export default function FormPost({ title, categories, postData }) {
    const user = usePage().props.auth.user;
    const [images, setImages] = useState(postData ? postData.images : null);
    const [preViewImages, setPreViewImages] = useState([]);

    const { data, setData, post, put, processing, errors, setError } = useForm({
        forceFormData: true,
        title: postData ? postData.title : "",
        description: postData ? postData.description : "",
        price: postData ? postData.price : 0,
        category: postData ? postData.category_id : 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (postData) {
            put(route("post.update", { post: postData.id }), {
                onSuccess: (response) => {
                    Inertia.visit(route("dashboard"));
                },
                onError: (errors) => {
                    setError(errors);
                },
                onFinish: (params) => {},
            });
        } else {
            post(route("post.store"), {
                onSuccess: (response) => {
                    Inertia.visit(route("dashboard"));
                },
                onError: (errors) => {
                    setError(errors);
                },
                onFinish: (params) => {},
            });
        }
    };

    const refreshImages = async () => {
        AxiosGet("image.fetchImages", { post: postData.id }, null, setImages);
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
    };

    useEffect(() => {}, [postData, preViewImages]);

    return (
        <Authenticated>
            <BackgroundImage />
            <div className="w-full text-center p-2 bg-white text-red-600 text-3xl font-bold">
                {title}
            </div>
            <div className="flex relative w-full p-2">
                <form
                    onSubmit={handleSubmit}
                    className="w-2/6 mx-auto bg-white rounded-lg h-1/2 "
                >
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
                                value={data.title ?? ""}
                                onChange={handleChange}
                                className="w-full rounded-lg p-2"
                            />
                            {errors.title && (
                                <span className="text-red-500">
                                    {errors.title}
                                </span>
                            )}
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
                                value={data.description ?? ""}
                                onChange={handleChange}
                                className="w-full rounded-lg p-2"
                            ></textarea>
                            {errors.description && (
                                <span className="text-red-500">
                                    {errors.description}
                                </span>
                            )}
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
                                value={data.price ?? 0}
                                onChange={handleChange}
                                className="w-full rounded-lg p-2"
                            />
                            {errors.price && (
                                <span className="text-red-500">
                                    {errors.price}
                                </span>
                            )}
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
                                value={data.category ?? 0}
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
                            {errors.category && (
                                <span className="text-red-500">
                                    {errors.category}
                                </span>
                            )}
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
                        <div className="text-2xl text-center">
                            {images &&
                                images.length == 0 &&
                                "Nie załadowano jeszcze żadnych zdjęć"}
                        </div>
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
                                    </div>
                                </div>
                            ))}
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
