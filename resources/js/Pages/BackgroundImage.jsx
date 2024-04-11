import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import { Link, Head } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import AxiosGet from "./API/AxiosGet";
import InfiniteScroll from "react-infinite-scroll-component";

export default function BackgroundImage() {
    return (
        <img
            src={"/data/dashboard_title_image.png"}
            alt="background image"
            className="w-full h-full object-cover fixed top-0 left-0 opacity-30 "
        />
    );
}
