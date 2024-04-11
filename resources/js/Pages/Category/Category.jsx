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

export default function Category({ category }) {
    useEffect(() => {
        console.log(category.name);
    }, [category]);
    return (
        <div className="w-full">
            {/* <a
                href={route("posts.index", { category: category.id})}
                // onClick={
                //     usedAsSimilarPost
                //         ? undefined
                //         : (e) => {
                //               e.preventDefault();
                //               handleImageClick();
                //           }
                // }
            >
                <img
                    id={"yourcategory" + category.id}
                    src={"/images/" + (category.path_to_image ? category.path_to_image : "no_image.png")}
                    alt="Opis obrazka"
                    className="m-auto w-full lg:h-[50vh]"
                />

            </a> */}

            <h3 className="text-xl font-bold">{category.name}</h3>
        </div>
    );
}
