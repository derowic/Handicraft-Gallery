import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDropzone } from "react-dropzone";
import Button from "@/Pages/BasicElements/Button";
import Img from "../Img";
import { Drawer } from "@mui/material";
import BackgroundImage from "@/Pages/BackgroundImage";
import Notify from "@/Pages/API/Notify";

export default function ImgDropFiled({
    post,
    preViewImages,
    setPreViewImages,
    refreshImages,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [images, setImages] = useState([]);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            if (!isRemovingImage) {
                setImages((image) => [...image, ...acceptedFiles]);

                if (acceptedFiles.length > 0) {
                    addPreviewImage(acceptedFiles);
                }
            }
        },
    });

    const addPreviewImage = (selectedImages) => {
        const newPreviews = selectedImages.map((selectedImage) =>
            URL.createObjectURL(selectedImage),
        );
        setPreViewImages((prevPreviews) => [...prevPreviews, ...newPreviews]);
    };

    const [isRemovingImage, setIsRemovingImage] = useState(false);

    const removeImage = (index) => {
        setIsRemovingImage(true);
        let newPreviews = [...preViewImages];
        newPreviews.splice(index, 1);
        setPreViewImages(newPreviews);

        newPreviews = [...images];
        newPreviews.splice(index, 1);
        setImages(newPreviews);
        setIsRemovingImage(false);
        // console.log(index);
        // setPreViewImages(preViewImages.filter(deletedImage => deletedImage.id !== index));
    };

    const handleImageUpload = async () => {
        const formData = new FormData();
        images.forEach((image) => {
            formData.append("images[]", image); // Dodaj każde zdjęcie do obiektu FormData
        });

        try {
            const response = await axios.post(
                route("image.store", { post: post.id }), // Zmień na odpowiedni endpoint
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );
            console.log(response.data); // Obsłuż odpowiedź z backendu
            Notify(response.data.message, null, response.status);
            setImages([]);
            setPreViewImages([]);
            closeModal();
            refreshImages();
        } catch (error) {
            console.error("Error uploading images:", error);
            Notify(error.response.data.message, "error");
        }
    };

    useEffect(() => {
        console.log(preViewImages);
        // console.log(images);
    }, [preViewImages]);

    Modal.setAppElement("#root");

    return (
        <>
            <Button
                text={"Dodaj zdjęcia"}
                onClick={openModal}
                className="bg-yellow-500 hover:bg-yellow-400 text-white rounded-lg"
                iconPath={"add.png"}
            />
            <Drawer
                anchor="bottom"
                open={isOpen}
                onClose={closeModal} // Tylko tutaj zamykamy panel
                className="items-center justify-center relative"
            >
                <div className="relative h-full h-screen">
                    <BackgroundImage />
                    <Button
                        onClick={closeModal}
                        className="relative text-white bg-red-500 hover:bg-red-400 rounded-lg m-2 p-2"
                        text={"Zamknij"}
                    />
                    <div className="flex">
                        <div
                            {...getRootProps({ className: "dropzone" })}
                            className="w-1/3 m-9 h-[50vh]"
                        >
                            <div className="w-full rounded-lg border-2 border-gray-300 ">
                                <img
                                    src={"/icons/image-gallery.png"}
                                    alt="Preview"
                                    className="m-auto w-1/6 opacity-30 w-5/6"
                                />
                                <div className="m-auto m-4 text-center text-xl w-full">
                                    <p>
                                        Przeciągnij i upuść zdjęcia tutaj lub
                                        kliknij, aby wybrać pliki.
                                    </p>
                                </div>
                                <input {...getInputProps()} />
                            </div>
                        </div>
                        <div className="w-1/3 ">
                            <div className="w-1/2 m-auto text-center text-xl w-full">
                                <p>Podgląd zdjęć</p>
                            </div>
                            <div className="w-[50vw]  gap-4 relative z-10 h-[80vh] overflow-y-auto rounded-lg border-2 border-gray-300 m-2">
                                {preViewImages.map((image, imageIndex) => (
                                    <div
                                        key={imageIndex}
                                        className="relative p-4 m-auto"
                                    >
                                        <img
                                            src={image}
                                            alt="Preview"
                                            className="w-full rounded-lg"
                                        />
                                        <div className="absolute top-10 right-10">
                                            <Button
                                                text={"Usuń zdjęcie"}
                                                onClick={() =>
                                                    removeImage(imageIndex)
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
                    <div className="relative bg-white w-full flex justify-end z-10">
                        <Button
                            onClick={handleImageUpload}
                            className="text-white bg-green-500 hover:bg-green-400 rounded-lg mx-5"
                            iconPath={"save.png"}
                            text={"Dodaj zdjęcia"}
                        />
                    </div>
                </div>
            </Drawer>
        </>
    );
}
