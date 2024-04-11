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
import clsx from "clsx";

export default function Img({
    className,
    image,
    onMouseEnter,
    onMouseLeave,
    onLoad,
}) {
    return (
        <>
            <img
                src={`/images/${image ? image.path_to_image : "no_image.png"}`}
                alt={image ? image.path_to_image : "no_image.png"}
                className={clsx("animate-slow", className)}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />
        </>
    );
}
