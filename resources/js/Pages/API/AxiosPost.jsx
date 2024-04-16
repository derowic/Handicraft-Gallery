import React, { useState, useEffect } from "react";
import axios from "axios";
import Notify from "@/Pages/API/Notify";

export default async function AxiosPost(
    rout,
    routData,
    data,
    returnType = null,
) {
    try {
        let response = await axios.post(route(rout, routData), data);
        Notify(response.data.message, null, response.status);

        return response;
    } catch (error) {
        Notify(error.response.data.message, "error");
        console.error("Axios post error: ", error);
    }
}
