import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Head, Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import BackgroundImage from "./BackgroundImage";
import { ToastContainer } from "react-toastify";

export default function Authenticated({ children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100">
                <BackgroundImage />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <Head title="Kolorowe nie pachnące" />
                <div className="relative flex  top-0 z-10">
                    <div className="w-full py-2 relative">
                        <Link
                            href={route("welcome")}
                            className="px-5 p-4 w-full tracking-widest text-3xl "
                        >
                            Kolorowe nie pachnące
                        </Link>
                    </div>
                    <div className="flex flex-col">
                        <div className="grid justify-items-end">
                            <nav className="flex flex-1">
                                {user ? (
                                    <div className="hidden sm:flex sm:items-center sm:ms-6">
                                        <div className="ms-3 relative">
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <span className="inline-flex rounded-md">
                                                        <button
                                                            type="button"
                                                            className="relative z-10 rounded-md px-3 py-3 ring-1 ring-transparent transition inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                        >
                                                            {user.name}

                                                            <svg
                                                                className="ms-2 -me-0.5 h-4 w-4"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </span>
                                                </Dropdown.Trigger>

                                                <Dropdown.Content>
                                                    <Dropdown.Link
                                                        href={route(
                                                            "profile.edit",
                                                        )}
                                                    >
                                                        Profile
                                                    </Dropdown.Link>
                                                    <Dropdown.Link
                                                        href={route("logout")}
                                                        method="post"
                                                        as="button"
                                                    >
                                                        Log Out
                                                    </Dropdown.Link>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="relative z-10 rounded-md px-3 py-3 ring-1 ring-transparent transition focus:outline-none focus-visible:ring-[#FF2D20] dark:focus-visible:ring-white"
                                        >
                                            Zaloguj
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </div>
            </nav>

            <main>{children}</main>
        </div>
    );
}
