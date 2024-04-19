import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AxiosGet from "./AxiosGet";
import Notify from "./Notify";

export default async function FetchWithPagination(
    rout,
    params,
    setData,
    page,
    setPage,
    setHasMore,
) {
    try {
        const response = await AxiosGet(rout, params, null, null);
        setData((prevData) => [...prevData, ...response.data.data]);
        setPage(page + 1);
        setHasMore(response.data.hasMore);

        return response;
    } catch (error) {
        Notify("Błąd podczas pobierania zdjęć");
        console.error(error);
    }
}
