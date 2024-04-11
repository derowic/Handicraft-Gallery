import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import Img from "../Post/Img";

export default function Button({
    onClick,
    text,
    className,
    iconPath,
    iconClassName,
}) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center m-2 p-2 ${className}`}
        >
            {iconPath && (
                <img
                    src={`/icons/${iconPath}`}
                    alt={iconPath}
                    className={`w-6 h-6 mr-2 ${iconClassName}`}
                    style={{ objectFit: "contain" }}
                />
            )}
            <div className="text-center">{text}</div>
        </button>
    );
}
