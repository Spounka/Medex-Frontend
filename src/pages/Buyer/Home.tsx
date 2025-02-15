import { useEffect, useState } from "react";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import Slider, { Settings } from "react-slick";

import { Link } from "react-router-dom";

import axios from "axios";
import ProductCard from "../../components/Buyer/shared/ProductCard";
import { UilAngleRight } from "@iconscout/react-unicons";

import { IoSearchOutline as UilSearch } from "react-icons/io5";
import { Brand, Category, Product } from "@domain/product";
import { useTranslation } from "react-i18next";
import { default as Container } from "../../components/ui/container";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BrandCard } from "./BrandsList.tsx";
import { CategoryLink } from "./CategoryLink";
import { useQuery } from "@tanstack/react-query";

async function getCategories(featured = false) {
    return await axios.get<Category[]>(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/category?level=0${featured ? "&featured=true" : ""}`,
    );
}

const Home = ({ addToCart }: { addToCart: any }) => {
    const { t, i18n } = useTranslation();

    const [ads, setAds] = useState<{ id: number; thumbnail: string }[]>([]);

    const [sale, setSale] = useState<Product[]>([]);
    const [recent, setRecent] = useState<Product[]>([]);
    const [bestSupplier, setBestSupplier] = useState<Product[]>([]);

    const [brands, setBrands] = useState<Brand[]>([]);
    const [activeCategory, setActiveCategory] = useState<Category | null>(null);
    const [randomCategories, setRandomCategories] = useState<{
        [key: string]: Product[];
    } | null>(null);

    const categoriesQuery = useQuery({
        queryFn: () => getCategories(),
        queryKey: ["categories"],
        notifyOnChangeProps: "all",
    });

    const featuredCategoriesQuery = useQuery({
        queryFn: () => getCategories(true),
        queryKey: ["categories", "featured"],
    });

    const fetchBrands = async () => {
        await axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/product/brand?limit=6")
            .then((res) => {
                setBrands(res.data);
            })
            .catch(() => {
                setBrands([]);
            });
    };

    const fetchProductsByQuery = async (query: string) => {
        try {
            let response = null;

            if (query != "on_sale") {
                response = await axios.get(
                    `${
                        import.meta.env.VITE_BACKEND_URL
                    }/api/product/product?order=${query}&ads=${true}`,
                );
            } else {
                response = await axios.get(
                    `${
                        import.meta.env.VITE_BACKEND_URL
                    }/api/product/product?on_sale=true&ads=${true}`,
                );
            }

            return response.data;
        } catch (error) {
            return null;
        }
    };

    if (categoriesQuery.isSuccess && !activeCategory)
        setActiveCategory(categoriesQuery.data.data[0]);

    useEffect(() => {
        const fetchProductsOnSale = async () => {
            const products = await fetchProductsByQuery("on_sale");

            if (products?.products) {
                setSale(products?.products);
                setAds(products?.ads);
            }
        };

        const fetchRecentlyAddedProducts = async () => {
            const products = await fetchProductsByQuery("-created");

            if (products?.products) {
                setRecent(products?.products);
                setAds(products?.ads);
            }
        };

        const fetchBestSellingProducts = async () => {
            const products = await fetchProductsByQuery("best_selling");
            if (products?.products) {
                setBestSupplier(products?.products);
                setAds(products?.ads);
                setRandomCategories(products?.random_categories_products);
            }
        };

        fetchBrands();
        // fetchCategories();
        fetchProductsOnSale();
        fetchRecentlyAddedProducts();
        fetchBestSellingProducts();
    }, []);

    const bannersSlider: Settings = {
        infinite: true,
        speed: 350,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        lazyLoad: "ondemand",
        className: "center",
        arrows: false,
        autoplaySpeed: 2500,
    };
    // TODO: re-enable autoplay
    const settings: Settings = {
        infinite: false,
        speed: 350,
        slidesToShow: 5,
        slidesToScroll: 4,
        autoplay: false,
        lazyLoad: "ondemand",
        arrows: false,
        autoplaySpeed: 2500,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToScroll: 3,
                    slidesToShow: 4,
                    arrows: true,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToScroll: 3,
                    slidesToShow: 4,
                    arrows: false,
                    centerMode: false,
                },
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    arrows: false,
                    centerMode: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    centerMode: false,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                    centerMode: false,
                },
            },
        ],
    };

    return (
        <main className={"tw-flex tw-flex-col tw-gap-4 tw-py-3 md:tw-gap-8"}>
            <Container node={"section"}>
                <div
                    className="input-group m-0 tw-border-none xl:tw-hidden"
                    style={{
                        direction: "ltr",
                    }}
                >
                    <button
                        type="submit"
                        className="input-group-text tw-border-none tw-bg-white"
                        id="header-search-bar"
                    >
                        <UilSearch
                            width={"2.0rem"}
                            height={"auto"}
                            fill={"black"}
                        />
                    </button>
                    <input
                        type="text"
                        name="keyword"
                        className="form-control tw-border-none tw-bg-white tw-py-1.5 tw-font-poppins tw-text-sm focus:tw-bg-white"
                        placeholder={`${t("header.search_product")}...`}
                        aria-label={`${t("header.search_product")}...`}
                        aria-describedby="header-search-bar"
                    />
                </div>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={2}
                    breakpointsBase={"window"}
                    // onChange={(e) => console.log(e)}
                    breakpoints={{
                        320: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        425: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                        640: {
                            slidesPerView: 6,
                            spaceBetween: 15,
                        },
                        768: {
                            slidesPerView: 6,
                            spaceBetween: 15,
                        },
                        1000: {
                            slidesPerView: 8,
                            spaceBetween: 20,
                        },
                        1440: {
                            slidesPerView: 6,
                            spaceBetween: 25,
                        },
                        1650: {
                            slidesPerView: 10,
                        },
                    }}
                    className={
                        "tw-flex tw-w-auto tw-flex-wrap tw-gap-2 tw-border-b tw-border-b-gray-300 tw-px-2.5 tw-py-4 md:tw-gap-6"
                    }
                >
                    {categoriesQuery.data?.data.map((category, i) => (
                        <SwiperSlide
                            key={category.id}
                            className={clsx(
                                "tw-flex tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-full tw-px-0.5 tw-py-0.5 tw-text-[0.6rem] tw-transition-colors tw-duration-75 tw-ease-out md:tw-px-2.5 lg:tw-px-3 lg:tw-text-xs 2xl:tw-py-1 2xl:tw-text-xs",
                                category.id === activeCategory?.id
                                    ? "tw-bg-black tw-fill-white tw-font-poppins tw-text-white "
                                    : "tw-bg-none tw-font-poppins tw-font-normal tw-text-gray-600",
                            )}
                            onClick={() => setActiveCategory(category)}
                        >
                            <span className="tw-font-bold">{category.name}</span>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
            <Container node={"section"}>
                <Slider {...bannersSlider}>
                    {ads.map((ad) => {
                        return (
                            <img
                                alt={""}
                                key={ad.id}
                                className="tw-mx-auto tw-max-h-[250px] tw-min-h-[150px] tw-w-screen tw-rounded-3xl tw-object-cover tw-object-center"
                                src={ad.thumbnail}
                            />
                        );
                    })}
                </Slider>
            </Container>
            <Container
                node={"section"}
                className=""
            >
                <div className="">
                    <div>
                        <div className="row d-flex align-items-center tw-border-b tw-border-b-gray-300">
                            <div className="col-8">
                                <h3 className="m-0 home__sections-title fw-bolder tw-font-black">
                                    {t("buyer_pages.home.featured_cat")}
                                </h3>
                            </div>
                            <div className="col-4 d-flex justify-content-end">
                                <Link
                                    style={{
                                        backgroundColor: "white",
                                        borderRadius: "8px",
                                    }}
                                    to="/categories"
                                    className="p-1 px-2 d-flex align-items-center justify-content-center home__sections-link text-nowrap tw-gap-1.5 hover:tw-text-purple"
                                >
                                    {t("buyer_pages.home.all")}
                                    {i18n.resolvedLanguage == "en" ? (
                                        <UilAngleRight />
                                    ) : (
                                        <UilAngleRight className={"tw-rotate-180"} />
                                    )}
                                </Link>
                            </div>
                        </div>
                        <div className="row pt-4">
                            <div className="col-12">
                                <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-4 tw-fill-slate-700 lg:tw-gap-0 xl:tw-px-32">
                                    {featuredCategoriesQuery.data?.data.map(
                                        (category) => {
                                            return (
                                                <CategoryLink
                                                    to={"/products?category=XxMed"}
                                                    icon={
                                                        <img
                                                            key={category.id}
                                                            alt={""}
                                                            src={`${import.meta.env.VITE_BACKEND_URL}${category.image}`}
                                                            className=" tw-h-full tw-w-full tw-min-w-5 tw-fill-inherit md:tw-min-w-8 lg:tw-min-w-11"
                                                        />
                                                    }
                                                    text={category.name}
                                                />
                                            );
                                        },
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <Container
                node={"section"}
                className="py-5"
            >
                <div className="">
                    <div className="row d-flex align-items-center">
                        <div className="col-8">
                            <h3 className="m-0 home__sections-title fw-bolder">
                                {t("buyer_pages.home.sale")}
                            </h3>
                        </div>
                        <div className="col-4 d-flex justify-content-end">
                            <Link
                                to="/products"
                                state={{ products: sale, type: "On Sale" }}
                                className="d-flex align-items-center justify-content-center gap-1 home__sections-link hover:tw-text-purple"
                            >
                                {t("buyer_pages.home.all")}
                                {i18n.resolvedLanguage == "en" ? (
                                    <AiOutlineArrowRight />
                                ) : (
                                    <AiOutlineArrowLeft />
                                )}
                            </Link>
                        </div>
                    </div>
                    <div className="row py-4">
                        <div className="col-14 p-0 p-md-1">
                            {sale ? (
                                <Slider {...settings}>
                                    {sale.map((product) => (
                                        <ProductCard
                                            product={product}
                                            cart={true}
                                            key={product.sku}
                                            addToCart={addToCart}
                                        />
                                    ))}
                                </Slider>
                            ) : (
                                <p className="text-center">
                                    {t("buyer_pages.home.sale_none")}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
            <Container
                node={"section"}
                className=""
            >
                <div className="">
                    <div className="row d-flex align-items-center">
                        <div className="col-8">
                            <h3 className="m-0 home__sections-title fw-bolder">
                                {t("buyer_pages.home.best_sell")}
                            </h3>
                        </div>
                        <div className="col-4 d-flex justify-content-end">
                            <Link
                                to="/products"
                                className="d-flex align-items-center justify-content-center gap-1 home__sections-link hover:tw-text-purple"
                            >
                                {t("buyer_pages.home.all")}
                                {i18n.resolvedLanguage == "en" ? (
                                    <AiOutlineArrowRight />
                                ) : (
                                    <AiOutlineArrowLeft />
                                )}
                            </Link>
                        </div>
                    </div>
                    <div className="row py-4">
                        <div className="col-14 p-0 p-md-2">
                            {bestSupplier && bestSupplier.length > 0 ? (
                                <Slider {...settings}>
                                    {/* Exclude products on sale from best selling */}
                                    {bestSupplier
                                        .filter(
                                            (product) => product.sale_price === "0.00",
                                        )
                                        .map((product) => (
                                            <ProductCard
                                                product={product}
                                                cart={true}
                                                key={product.sku}
                                                addToCart={addToCart}
                                                isBestSelling
                                            />
                                        ))}
                                </Slider>
                            ) : (
                                <p className="text-center">
                                    {t("buyer_pages.home.none")}!
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
            <Container
                node={"section"}
                className="py-2"
            >
                <div className="">
                    <div className="row d-flex align-items-center">
                        <div className="col-8">
                            <h3 className="m-0 home__sections-title fw-bolder">
                                {t("buyer_pages.home.recent")}
                            </h3>
                        </div>
                        <div className="col-4 d-flex justify-content-end">
                            <Link
                                to="/products"
                                className="d-flex align-items-center justify-content-center gap-1 home__sections-link hover:tw-text-purple"
                            >
                                {t("buyer_pages.home.all")}
                                {i18n.resolvedLanguage == "en" ? (
                                    <AiOutlineArrowRight />
                                ) : (
                                    <AiOutlineArrowLeft />
                                )}
                            </Link>
                        </div>
                    </div>
                    <div className="row py-4">
                        <div className="col-12">
                            {recent && recent.length > 0 ? (
                                <Slider {...settings}>
                                    {recent.map((product) => (
                                        <ProductCard
                                            product={product}
                                            cart={true}
                                            key={product.sku}
                                            addToCart={addToCart}
                                        />
                                    ))}
                                </Slider>
                            ) : (
                                <p className="text-center">
                                    {t("buyer_pages.home.none")}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
            {randomCategories &&
                Object.keys(randomCategories).map((u) => {
                    if (randomCategories[u].length == 0) return null;
                    return (
                        <Container
                            node={"section"}
                            className="py-2"
                            key={u}
                        >
                            <div className="">
                                <div className="row d-flex align-items-center">
                                    <div className="col-8">
                                        <h3 className="m-0 home__sections-title fw-bolder">
                                            {u}
                                        </h3>
                                    </div>
                                    <div className="col-4 d-flex justify-content-end">
                                        <Link
                                            to="/products"
                                            className="d-flex align-items-center justify-content-center gap-1 home__sections-link hover:tw-text-purple"
                                        >
                                            {t("buyer_pages.home.all")}
                                            {i18n.resolvedLanguage == "en" ? (
                                                <AiOutlineArrowRight />
                                            ) : (
                                                <AiOutlineArrowLeft />
                                            )}
                                        </Link>
                                    </div>
                                </div>
                                <div className="row py-4">
                                    <div className="col-12">
                                        <Swiper
                                            slidesPerView={2}
                                            spaceBetween={10}
                                            breakpoints={{
                                                320: {
                                                    slidesPerView: 2,
                                                },
                                                425: {
                                                    slidesPerView: 3,
                                                },
                                                768: {
                                                    slidesPerView: 4,
                                                },
                                                1000: {
                                                    slidesPerView: 5,
                                                },
                                                1440: {
                                                    slidesPerView: 6,
                                                },
                                            }}
                                            className={"tw-p-0"}
                                        >
                                            {randomCategories[u].map((product) => {
                                                return (
                                                    <SwiperSlide key={product.sku}>
                                                        <ProductCard
                                                            product={product}
                                                            cart={true}
                                                            addToCart={addToCart}
                                                            key={product.sku}
                                                        />
                                                    </SwiperSlide>
                                                );
                                            })}
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    );
                })}
            <Container node={"section"}>
                <div className="">
                    <div className="tw-flex tw-flex-col tw-gap-8">
                        <div className="row d-flex align-items-center tw-border-b tw-border-b-gray-300 tw-pb-4">
                            <div className="col-8">
                                <h3 className="m-0 home__sections-title fw-bolder">
                                    {t("buyer_pages.home.by_brand")}
                                </h3>
                            </div>
                            <div className="col-4 d-flex justify-content-end">
                                <Link
                                    to="brands"
                                    className="d-flex align-items-center justify-content-center gap-1 home__sections-link hover:tw-text-purple"
                                >
                                    {t("buyer_pages.home.all")}
                                    {i18n.resolvedLanguage == "en" ? (
                                        <AiOutlineArrowRight />
                                    ) : (
                                        <AiOutlineArrowLeft />
                                    )}
                                </Link>
                            </div>
                        </div>
                        <div className="tw-flex tw-h-max tw-flex-wrap tw-justify-start tw-gap-3.5 lg:tw-justify-start">
                            {brands && brands.length > 0 ? (
                                brands.slice(1).map((brand) => {
                                    return (
                                        <BrandCard
                                            brand={brand}
                                            key={brand.id}
                                            className={
                                                "tw-flex-[0_0_30%] md:tw-flex-1 lg:tw-flex-[0_0_18%] xl:tw-flex-[0_0_15%]"
                                            }
                                        />
                                    );
                                })
                            ) : (
                                <p className="text-center">
                                    {t("buyer_pages.brands_list.none")}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
};

export default Home;
