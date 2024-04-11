import React, { useState } from "react";
import { usePage } from "@inertiajs/react";

export default function LogedIn () {
    if (usePage().props.auth.user) {
        return true;
    } else {
        return false;
    }
}
