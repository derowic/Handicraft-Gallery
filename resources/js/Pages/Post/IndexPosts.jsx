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
import InfiniteScrollPosts from "./InfiniteScrollPosts";

export default function IndexPosts({ category }) {
    const [page, setPage] = useState(1);

    return (
        <div className="w-full h-full">
            <InfiniteScrollPosts
                page={page}
                setPage={setPage}
                category={category}
            />
        </div>
    );
}
