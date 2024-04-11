import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Button from "../BasicElements/Button";
import { usePage } from "@inertiajs/react";
import { Dialog } from "@headlessui/react";

export default function CategoryEditModal({ categories }) {
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
        <div className="w-full">
            <div className="text-sm text-center flex justify-between">
                <div></div>
                <Button
                    className="bg-green-500 rounded-lg text-white"
                    text={"Edytuj kategorie"}
                    iconPath={"edit.png"}
                    onClick={openDialog}
                />
            </div>
            <Dialog
                open={isOpen}
                onClose={closeDialog}
                className="rounded-lg fixed inset-0 flex items-center justify-center z-50 "
            >
                <Dialog.Panel className="bg-white p-4 rounded shadow-md w-full h-full">
                    <Button
                        text={"Zamknij"}
                        onClick={closeDialog}
                        className={"bg-red-500 rounded-lg text-white"}
                    />
                    <Dialog.Title>Edycja kategorii</Dialog.Title>
                    <Dialog.Description>
                        Tutaj możesz dodawać, edytować i usuwać kategorie
                    </Dialog.Description>
                    <div className="mt-4 flex justify-end">
                        {/* <Button
                             className="bg-green-500 rounded-lg text-white"
                            text={confirmButtonText}
                            onClick={() => handle(confirmButtonOnClick)}
                        />
                        <Button
                            className="bg-red-500 rounded-lg text-white"
                            text={cancelButtonText}
                            onClick={() => handle(cancelButtonOnClick)}
                        /> */}
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    );
}
