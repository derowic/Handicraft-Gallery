import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Button from "../BasicElements/Button";
import { usePage } from "@inertiajs/react";
import CategoryEditModal from "./CategoryEditModal";

export default function Categories({
    setPage,
    categories,
    selectedCategory,
    setSelectedCategory,
    toggleDrawer,
}) {
    const user = usePage().props.auth.user;
    const selectCategory = (id) => {
        if (selectedCategory == id) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(id);
        }
        setPage(1);
        toggleDrawer();
    };

    return (
        <div className="w-full">
            {/* {user &&
                <div className="text-sm text-center flex justify-between">
                    <div></div>
                    <Button
                        className="bg-green-500 rounded-lg text-white"
                        text={"Edytuj kategorie"}
                        iconPath={"edit.png"}
                    />
                </div>
                <CategoryEditModal/>
            } */}
            <InfiniteScroll
                dataLength={categories.length}
                next={null}
                hasMore={true}
                loader={null}
                endMessage={null}
            >
                <div className="m-auto w-5/6 text-2xl tracking-widest py-2 text-center">
                    Kategorie
                </div>
                <div className="m-auto w-5/6 grid grid-cols-1 gap-1 overflow-y-auto max-h-[60vh] justify-center items-center text-center">
                    {categories.map((category, categoryIndex) => (
                        <button
                            className="w-full"
                            key={categoryIndex}
                            onClick={() => selectCategory(category.id)}
                        >
                            <div
                                className={
                                    "flex justify-center items-center" +
                                    (selectedCategory == category.id
                                        ? "px-2 py-1 bg-green-400 rounded-lg text-white"
                                        : "")
                                }
                                style={{ width: "100%" }}
                            >
                                <div className="flex">
                                    {category.name}
                                    <div className="ml-4">
                                        {selectedCategory == category.id &&
                                            " x"}
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
}
