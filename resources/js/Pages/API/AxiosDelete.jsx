import React, { useState, useEffect } from "react";
import axios from "axios";
import Notify from "@/Pages/API/Notify";

export default async function AxiosDelete(rout, routData, data, setData) {
    return await axios.delete(route(rout, routData), data)
        .then((response) => {
            if (setData) {
                setData(response.data.data);
            }
            Notify(response.data.message, null, response.status);
            Notify(response.message, null, response.status);

            console.log(response);

            return response;
        })
        .catch((error) => {
            if (error.response.data) {
                Notify("Błąd", "error");
                console.error(error);
            } else {
                Notify("Błąd", "error");
                console.error("error");
                console.error(error);
            }
        }
    );
}
