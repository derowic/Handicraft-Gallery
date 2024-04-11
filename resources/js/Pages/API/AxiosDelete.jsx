import React, { useState, useEffect } from "react";
import axios from "axios";
import Notify from "@/Pages/API/Notify";

export default async function AxiosDelete (rout, routData, data, returnType) {
    try {
        const response = await axios.delete(route(rout, routData), data);
        Notify(response.data.message, null, response.status);

        if (returnType == null) {
            return response.data.data;
        } else if (returnType == 1) {
            return response;
        }
    } catch (error) {
        Notify(error.response.data.message, "error");
        console.error("Axios delete error: ", error);
    }
};
