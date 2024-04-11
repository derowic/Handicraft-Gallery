import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { usePage } from "@inertiajs/react";

export default function CheckPermission (permissionName) {
    const user = usePage().props.auth.user;

    if (user) {
        let hasPermission = user.roles.some((role) => {
            return role.permissions.some(
                (permission) => permission.name === permissionName,
            );
        });

        if (hasPermission == false) {
            hasPermission = user.permissions.some(
                (permission) => permission.name === permissionName,
            );
        }

        if (hasPermission) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};
