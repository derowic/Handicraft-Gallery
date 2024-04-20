import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import { Link, Head } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Category({ category }) {
    useEffect(() => {}, [category]);

    return (
        <div className="w-full">
            <h3 className="text-xl font-bold">{category.name}</h3>
        </div>
    );
}
