import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import { Link, Head } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import AxiosGet from "../API/AxiosGet";
import InfiniteScroll from "react-infinite-scroll-component";
import Img from "./Img";

export default function ImgList({ images }) {
    const [isHovered, setIsHovered] = useState(false);
    const [imgNr, setImgNr] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const imgNrDesc = () => {
        setImageLoaded(false);
        setImgNr((prevNr) => (prevNr === 0 ? images.length - 1 : prevNr - 1));
    };

    const imgNrAsc = () => {
        setImageLoaded(false);
        setImgNr((prevNr) => (prevNr === images.length ? 0 : prevNr + 1));

        setImageLoaded(false);
        let nr = imgNr + 1;

        if (nr > images.length - 1) {
            nr = 0;
        }
        setImgNr(nr);
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <div className="w-full flex">
            <div className="sm:w-full lg:w-5/6 overflow-y-auto grid items-center h-[50vh]">
                {images.map((image, imageIndex) => (
                    // <img
                    //     key={imageIndex}
                    //     id={"yourposts" + image.id}
                    //     src={"/images/" + image.path_to_image ?? "no_image.png"}
                    //     alt="Opis obrazka"
                    //     className="m-auto lg:w-3/6 sm:w-full h-5/6"
                    //     onMouseEnter={handleMouseEnter}
                    //     onMouseLeave={handleMouseLeave}
                    //     onLoad={handleImageLoad}
                    // />
                    <Img
                        className={"lg:w-3/4 w-full  m-auto"}
                        image={image}
                        imageIndex={imageIndex}
                        key={imageIndex}
                    />
                ))}
            </div>
            <div className="w-1/6 h-full justify-center items-center">
                Product data:
                {images[imgNr] && images[imgNr].id}{" "}
                <div>ilość zdjęć:{images.length + 1}</div>
            </div>
        </div>
    );
}
