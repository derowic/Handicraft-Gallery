import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AxiosGet from "./AxiosGet";

export default async function FetchWithPagination (rout, params, setData, page, setPage, setHasMore) {
    try {
        const response = await AxiosGet(rout, params, null, null);
        setData((prevData) => [...prevData, ...response.data]);
        setPage(page + 1);
        setHasMore(response.hasMore);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
};
