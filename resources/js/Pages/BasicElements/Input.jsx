import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";

export default function Input({
    type,
    title,
    value,
    onChange,
    required = null,
    className,
    placeholder,
}) {
    /*const handleInputChange = (event) => {
        func(event.target.value);
    };
    */

    return (
        <div className={className}>
            <label className="m-2">{title}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={"w-full rounded-lg"}
                required={required}
                placeholder={placeholder}
            />
        </div>
    );
}
