import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import { Link, Head } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import AxiosGet from "./API/AxiosGet";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollPosts from "./Post/InfiniteScrollPosts";
import Categories from "./Category/Categories";
import NavBar from "./NavBar";
import Filters from "./Post/Filters";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BackgroundImage from "./BackgroundImage";

export default function Dashboard({ auth }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [width, setWidth] = useState("");
    const [length, setLength] = useState("");
    const [height, setHeight] = useState("");
    const [diameter, setDiameter] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [screenWidth, setScreenWidth] = useState(
        window.navigator.userAgentData?.mobile,
    );
    //console.log(selectedCategory, categories);

    const fetchPaginatedImage = async () => {
        if (setPosts) {
            let response = await AxiosGet(
                "posts.fetchPosts",
                {
                    page: page,
                    category: selectedCategory ? selectedCategory : null,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    width: width,
                    length: length,
                    height: height,
                    diameter: diameter,
                },
                null,
                null,
            );

            setHasMore(response.hasMore);
            setPosts((prevData) => [...prevData, ...response.posts]);
            setPage(page + 1);
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
        //setPage(1);
        fetchPaginatedImage();
        // toggleDrawer();
    }, [selectedCategory, minPrice, maxPrice, width, length, height, diameter]);

    return (
        <>
            {screenWidth ? (
                <>
                    <BackgroundImage />
                    <div className="w-full bg-[#fff] text-[#333]">
                        {/* <NavBar auth={auth}/> */}
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
                                    {/* <div className="m-auto text-center ">
                                        <Filters
                                            category={null}
                                            minPrice={minPrice}
                                            setMinPrice={setMinPrice}
                                            maxPrice={maxPrice}
                                            setMaxPrice={setMaxPrice}
                                            width={width}
                                            setWidth={setWidth}
                                            length={length}
                                            setLength={setLength}
                                            height={height}
                                            setHeight={setHeight}
                                            diameter={diameter}
                                            setDiameter={setDiameter}
                                        />
                                    </div> */}
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
                                fetchPaginatedImage={fetchPaginatedImage}
                                hasMore={hasMore}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="bg-[#fff] text-[#333]">
                        <NavBar auth={auth} />
                        <div className="flex">
                            <div className="lg:sticky top-12 w-1/6 h-screen flex flex-col justify-between">
                                <Categories
                                    setPage={setPage}
                                    categories={categories}
                                    selectedCategory={selectedCategory}
                                    setSelectedCategory={setSelectedCategory}
                                />

                                <div className="w-full bg-green-300">
                                    {/* <Filters
                                        category={null}
                                        minPrice={minPrice}
                                        setMinPrice={setMinPrice}
                                        maxPrice={maxPrice}
                                        setMaxPrice={setMaxPrice}
                                        width={width}
                                        setWidth={setWidth}
                                        length={length}
                                        setLength={setLength}
                                        height={height}
                                        setHeight={setHeight}
                                        diameter={diameter}
                                        setDiameter={setDiameter}
                                    /> */}
                                </div>
                                <div className="h-3/6"></div>

                                <div className=" text-center text-sl m-auto ">
                                    <p className="text-ml">Kontakt</p>
                                    <p>tel.669 365 417</p>
                                    <p>Ruda 77a, Sieradz 98-200</p>
                                </div>
                                <div></div>
                            </div>
                            <div className="w-5/6 ">
                                <InfiniteScrollPosts
                                    posts={posts}
                                    fetchPaginatedImage={fetchPaginatedImage}
                                    hasMore={hasMore}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
