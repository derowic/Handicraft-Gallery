import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AxiosGet from "./AxiosGet";

export default async function FetchWithPagination (rout, params, setDatas, page, setData) {
    try {
        const response = await AxiosGet(rout, params, null, null);
        setDatas((prevData) => [...prevData, ...response]);
        if (setData != null) {
            setData(page + 1);
        }
    } catch (error) {
        console.error(error);
    }
};
