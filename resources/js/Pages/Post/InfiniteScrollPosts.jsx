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
import Post from "./Post";
import NavBar from "../NavBar";
import Filters from "./Filters";
import AxiosDelete from "../API/AxiosDelete";

export default function InfiniteScrollPosts({
    posts,
    setPosts,
    fetchPaginatedImage,
    hasMore,
}) {
    const deletingPost = async (post) => {
        let tmp = await AxiosDelete("post.destroy", { post: post.id }, null, 1);
        if (tmp.status == 201) {
            setPosts(posts.filter((deletedPost) => deletedPost.id !== post.id));
        }
    };

    useEffect(() => {}, [posts]);

    return (
        <div className="w-full h-full m-auto">
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchPaginatedImage}
                hasMore={hasMore}
                loader={
                    <p className="text-center text-xl py-5">{"Ładowanie..."}</p>
                }
                endMessage={
                    <p className="text-center text-xl py-5">{"Koniec"}</p>
                }
            >
                <div className="px-3">
                    <div className="gap-0.5 w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {posts.map((post, postIndex) => (
                            <Post
                                post={post}
                                key={postIndex}
                                deletingPost={deletingPost}
                            />
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    );
}
