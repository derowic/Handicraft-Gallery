import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import { Link, Head } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import AxiosGet from "../API/AxiosGet";
import InfiniteScroll from "react-infinite-scroll-component";
import clsx from "clsx";
import { Dialog } from "@headlessui/react";
import Button from "../BasicElements/Button";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import AxiosPost from "../API/AxiosPost";

export default function SynchModal({}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSync, setIsSync] = useState(true);

    const openDialog = async () => {
        setIsOpen(true);
        let tmp = await AxiosPost("facebook.refreshPosts");
        if(tmp.status == 201)
        {
            setIsSync(false);
        }
    };
    const closeDialog = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <Button
                text={"Synchronizuj dane z facebook"}
                onClick={openDialog}
                className="bg-blue-500 hover:bg-blue-400 text-white rounded-lg"
                iconPath={"sync.png"}
            />
            <Dialog
                open={isOpen}
                onClose={closeDialog}
                className="rounded-lg fixed inset-0 flex items-center justify-center z-50 "
            >
                <Dialog.Panel className="bg-white p-4 rounded shadow-md w-1/2">
                    <div className="flex">
                        <Dialog.Title
                            className={"text-2xl text-blue-400 w-full text-center"}
                        >
                            {"Synchronizacja postów z facebook"}
                        </Dialog.Title>
                        <button
                            onClick={closeDialog}
                            className="pl-6 justify-top text-gray-500 hover:text-gray-700 focus:outline-none">
                                X
                        </button>
                    </div>
                    <div className="mt-4 flex justify-center">
                        {isSync
                            ? "Rozpoczęto synchronizacje danych, synchronizacja wykonuje się w tle, możesz zamknąć to okno. Nowe posty będą widocze po odświeżeniu strony"
                            : "Synchronizację zakończono"}
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    );
}
