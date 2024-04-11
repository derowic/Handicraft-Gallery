import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import Button from "./Button";

export default function Modal({
    buttonText,
    buttonClassName,
    iconPath,
    title,
    description,
    confirmButtonText,
    confirmButtonOnClick,
    cancelButtonText,
    cancelButtonOnClick,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const openDialog = () => {
        setIsOpen(true);
    };
    const closeDialog = () => {
        setIsOpen(false);
    };
    const handle = (func) => {
        if (func) {
            func();
        }
        closeDialog();
    };
    return (
        <div>
            <Button
                className={buttonClassName}
                onClick={openDialog}
                text={buttonText}
                iconPath={iconPath}
            />
            <Dialog
                open={isOpen}
                onClose={closeDialog}
                className="rounded-lg fixed inset-0 flex items-center justify-center z-50 "
            >
                <Dialog.Panel className="bg-white p-4 rounded shadow-md w-1/2">
                    <Dialog.Title>{title}</Dialog.Title>
                    <Dialog.Description>{description}</Dialog.Description>
                    <div className="mt-4 flex justify-end">
                        <Button
                            className="bg-green-500 rounded-lg text-white"
                            text={confirmButtonText}
                            onClick={() => handle(confirmButtonOnClick)}
                        />
                        <Button
                            className="bg-red-500 rounded-lg text-white"
                            text={cancelButtonText}
                            onClick={() => handle(cancelButtonOnClick)}
                        />
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    );
}
