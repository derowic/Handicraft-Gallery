import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function Notify (text, type = "default", code = null)  {
    if (type == "default") {
        toast(text, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    } else if (type == "success" || code == 201) {
        toast.success(text);
    } else if (type == "error" || code == 500) {
        toast.error(text);
    } else if (type == "warning" || code == 404) {
        toast.warning(text);
    } else if (type == "info" || code == 200) {
        toast.info(text);
    }

    return null;
};

