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
import Input from "../BasicElements/Input";

export default function Filters({
    category,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    width,
    setWidth,
    length,
    setLength,
    height,
    setHeight,
    diameter,
    setDiameter,
}) {
    return (
        <div className="bg-[#fff] h-full w-full py-1 justify-center items-center">
            <div className="">{category && category.name}</div>
            <div className="w-full text-2xl tracking-widest py-2 text-center">
                Filtr
            </div>
            <div className="w-full text-center flex justify-center items-center ">
                <div className="flex w-5/6 justify-center items-center">
                    <Input
                        type={"number"}
                        placeholder={"cena od"}
                        className={"rounded-lg w-1/2"}
                        onChange={(e) => setMinPrice(e.target.value)}
                        value={minPrice}
                    />
                    <div className="ml-6 py-2">-</div>
                    <Input
                        type={"number"}
                        placeholder={"cena do"}
                        className={"rounded-lg w-1/2"}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        value={maxPrice}
                    />
                </div>
                {/* <Input
                    type={"number"}
                    placeholder={"szerokość"}
                    className={"rounded-lg w-1/6"}
                    onChange={(e) => setWidth(e.target.value)}
                    value={width}
                />
                <Input
                    type={"number"}
                    placeholder={"długość"}
                    className={"rounded-lg w-1/6"}
                    onChange={(e) => setLength(e.target.value)}
                    value={length}
                />
                <Input
                    type={"number"}
                    placeholder={"wysokość"}
                    className={"rounded-lg px-2 w-1/6"}
                    onChange={(e) => setHeight(e.target.value)}
                    value={height}
                />
                <Input
                    type={"number"}
                    placeholder={"średnica"}
                    className={"rounded-lg w-1/6"}
                    onChange={(e) => setDiameter(e.target.value)}
                    value={diameter}
                /> */}
            </div>
        </div>
    );
}
