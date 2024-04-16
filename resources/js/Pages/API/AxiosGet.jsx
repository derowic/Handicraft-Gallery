import React, { useState, useEffect } from "react";
import axios from "axios";
import Notify from "./Notify";

export default async function AxiosGet (rout, routData, data, setData) {
    return await axios
        .get(route(rout, routData), data)
        .then((response) => {
            if (response.data.hasMore != null) {
                return response.data;
            } else {
                Notify(response.data.message, null, response.status);
                if (setData) {
                    setData(response.data.data);
                }

                return response.data.data;
            }
        })
        .catch((error) => {
            if (error) {
                Notify(error.response, "error");
                console.error(error);
            } else {
                console.error("error");
            }
        });
};
