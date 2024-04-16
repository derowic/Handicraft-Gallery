import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import { Link } from "@inertiajs/react";
import AxiosGet from "./API/AxiosGet";
import InfiniteScrollPosts from "./Post/InfiniteScrollPosts";
import Categories from "./Category/Categories";
import AuthenticatedLayout from "../Layouts/AuthenticatedLayout";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BackgroundImage from "../Layouts/BackgroundImage";
import Button from "./BasicElements/Button";
import { Inertia } from "@inertiajs/inertia";
import SynchModal from "./Post/SynchModal";
import { usePage } from "@inertiajs/react";
import FetchWithPagination from "./API/FetchWithPagination";

export default function Dashboard({}) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [screenWidth, setScreenWidth] = useState(
        window.navigator.userAgentData?.mobile,
    );
    const user = usePage().props.auth.user;

    const fetchPaginatedImage = async () => {
        if (setPosts) {
            FetchWithPagination(
                "post.fetchPosts",
                {
                    page: page,
                    category: selectedCategory ? selectedCategory : null,
                },
                setPosts,
                page,
                setPage,
                setHasMore,
            );
        }
    };

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const resetScroll = () => {
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        fetchPaginatedImage();
        AxiosGet("category.index", null, null, setCategories);
    }, []);

    useEffect(() => {
        resetScroll();
        setPosts([]);
        fetchPaginatedImage();
    }, [selectedCategory]);

    return (
        <AuthenticatedLayout>
            {screenWidth ? (
                <>
                    <BackgroundImage />
                    <div className="w-full bg-[#fff] text-[#333]">
                        <div className="flex">
                            <Link
                                href={route("welcome")}
                                className="px-5 p-4 w-full tracking-widest text-xl "
                            >
                                Kolorowe nie pachnące
                            </Link>
                            <IconButton onClick={toggleDrawer}>
                                <MenuIcon />
                            </IconButton>
                        </div>
                        <Drawer
                            anchor="left"
                            open={isOpen}
                            onClose={toggleDrawer}
                            className="w-[100vw] bg-white"
                        >
                            <div className="w-[100vw]">
                                <IconButton onClick={toggleDrawer}>
                                    <ArrowBackIcon />
                                </IconButton>
                                <div className="w-full">
                                    <Categories
                                        toggleDrawer={toggleDrawer}
                                        setPage={setPage}
                                        categories={categories}
                                        selectedCategory={selectedCategory}
                                        setSelectedCategory={
                                            setSelectedCategory
                                        }
                                    />
                                    <div className="h-[40vh]"></div>
                                    <div className=" text-center text-sl m-auto h-1/6">
                                        <p className="w-full text-2xl tracking-widest py-2 text-center">
                                            Kontakt
                                        </p>
                                        <p>tel.669 365 417</p>
                                        <p>Ruda 77a, Sieradz 98-200</p>
                                    </div>
                                </div>
                            </div>
                        </Drawer>
                        <div className="w-full">
                            <InfiniteScrollPosts
                                posts={posts}
                                setPosts={setPosts}
                                fetchPaginatedImage={null}
                                hasMore={hasMore}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex">
                        <div className="lg:sticky top-12 w-1/6 h-screen flex flex-col justify-between">
                            <Categories
                                setPage={setPage}
                                categories={categories}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                toggleDrawer={toggleDrawer}
                            />

                            <div className="w-full bg-green-300"></div>
                            <div className="h-3/6"></div>

                            <div className=" text-center text-sl m-auto ">
                                <p className="text-ml">Kontakt</p>
                                <p>tel.669 365 417</p>
                                <p>Ruda 77a, Sieradz 98-200</p>
                            </div>
                            <div></div>
                        </div>
                        <div className="w-5/6 relative">
                            <div className="flex w-full justify-center text-center">
                                {user && (
                                    <>
                                        <Button
                                            text={"Dodaj nowy post"}
                                            onClick={() =>
                                                Inertia.visit(
                                                    route("post.create"),
                                                )
                                            }
                                            className="bg-yellow-500 hover:bg-yellow-400 text-white rounded-lg"
                                            iconPath={"add.png"}
                                        />
                                        <SynchModal />
                                    </>
                                )}
                            </div>
                            <InfiniteScrollPosts
                                posts={posts}
                                setPosts={setPosts}
                                fetchPaginatedImage={fetchPaginatedImage}
                                hasMore={hasMore}
                            />
                        </div>
                    </div>
                </>
            )}
        </AuthenticatedLayout>
    );
}
