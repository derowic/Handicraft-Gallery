import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import clsx from "clsx";

export default function Img({
    className,
    image,
    onMouseEnter,
    onMouseLeave,
    onLoad
}) {
    return (
        <>
            <img
                src={`/images/${image ? image.path_to_image : "no_image.png"}`}
                alt={image ? image.path_to_image : "no_image.png"}
                className={clsx("animate-slow", className)}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onLoad={onLoad}
            />
        </>
    );
}
