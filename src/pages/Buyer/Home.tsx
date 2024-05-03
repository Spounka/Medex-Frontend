import { useEffect, useState } from "react";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import Slider, { Settings } from "react-slick";

import { Link } from "react-router-dom";

import axios from "axios";
import ProductCard from "../../components/Buyer/shared/ProductCard";
import { UilAngleRight } from "@iconscout/react-unicons";

import { Brand, Category, Product } from "@domain/product";
import { useTranslation } from "react-i18next";
import { FaPumpMedical } from "react-icons/fa";
import { FaXRay } from "react-icons/fa6";
import { GiChemicalTank } from "react-icons/gi";
import { ImLab } from "react-icons/im";
import { default as Container } from "../../components/ui/container";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BrandCard } from "./BrandsList.tsx";
import { CategoryLink } from "./CategoryLink";

const Home = ({ addToCart }: { addToCart: any }) => {
    const { t, i18n } = useTranslation();

    const [ads, setAds] = useState<{ id: number; thumbnail: string }[]>([]);

    const [sale, setSale] = useState<Product[]>([]);
    const [recent, setRecent] = useState<Product[]>([]);
    const [bestSupplier, setBestSupplier] = useState<Product[]>([]);

    const [brands, setBrands] = useState<Brand[]>([]);
    const [activeCategory, setActiveCategory] = useState(0);
    const [randomCategories, setRandomCategories] = useState<{
        [key: string]: Product[];
    } | null>(null);

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

    // TODO: re-enable autoplay
    const settings: Settings = {
        infinite: true,
        speed: 350,
        slidesToShow: 6,
        slidesToScroll: 5,
        autoplay: false,
        lazyLoad: "ondemand",
        className: "center",
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
                },
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    slidesToShow: 3,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };

    return (
        <main className={"tw-flex tw-flex-col tw-gap-4 md:tw-gap-8"}>
            <Container node={"section"}>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={2}
                    breakpointsBase={"window"}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        425: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 15,
                        },
                        1000: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                        1440: {
                            slidesPerView: 6,
                            spaceBetween: 25,
                        },
                        1650: {
                            slidesPerView: 7,
                        },
                        1920: {
                            slidesPerView: 8,
                            spaceBetween: 30,
                        },
                    }}
                    className={
                        "tw-flex tw-flex-wrap tw-gap-2 tw-border-b tw-border-b-gray-300 tw-px-2.5 tw-py-4 md:tw-gap-6"
                    }
                >
                    {[
                        "Category 1",
                        "Category 2",
                        "Category 3",
                        "Category 4",
                        "Category 5",
                        "Category 6",
                        "Category 7",
                        "Category 8",
                        "Category 9",
                        "Category 10",
                    ].map((category, i) => (
                        <SwiperSlide
                            key={category}
                            className={clsx(
                                "tw-flex tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-full tw-px-2 tw-py-2 tw-transition-colors tw-duration-75 tw-ease-out md:tw-px-3 lg:tw-px-4",
                                i === activeCategory
                                    ? "tw-bg-purple tw-fill-white tw-font-algreya tw-text-white"
                                    : "tw-bg-slate-50 tw-font-algreya tw-font-normal tw-text-black",
                            )}
                            onClick={() => setActiveCategory(i)}
                        >
                            <span className="tw-font-bold">{category}</span>
                            <UilAngleRight className={"tw-rotate-90 tw-fill-inherit"} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
            <Container node={"section"}>
                {ads?.length > 0 ? (
                    <img
                        className="tw-mx-auto tw-max-h-[300px] tw-w-screen tw-rounded-3xl tw-object-cover"
                        src={ads[ads.length - 1].thumbnail}
                        key={ads[ads.length - 1].id}
                    />
                ) : null}
            </Container>
            <Container
                node={"section"}
                className=""
            >
                <div className="">
                    <div>
                        <div className="row d-flex align-items-center tw-border-b tw-border-b-gray-300">
                            <div className="col-8">
                                <h3 className="m-0 home__sections-title fw-bolder">
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
                                    <CategoryLink
                                        to={"/products?category=X-Ray"}
                                        icon={
                                            <FaXRay
                                                className={
                                                    "tw-h-full tw-w-full tw-min-w-6 tw-fill-inherit md:tw-min-w-8 lg:tw-min-w-11"
                                                }
                                            />
                                        }
                                        text={"XRay"}
                                    />
                                    <CategoryLink
                                        to={"/products?category=medex"}
                                        icon={
                                            <GiChemicalTank className=" tw-h-full tw-w-full tw-min-w-6 tw-fill-inherit md:tw-min-w-8 lg:tw-min-w-11" />
                                        }
                                        text={"Medical"}
                                    />
                                    <CategoryLink
                                        to={"/products?category=Medll"}
                                        icon={
                                            <FaPumpMedical className=" tw-h-full tw-w-full tw-min-w-6 tw-fill-inherit md:tw-min-w-8 lg:tw-min-w-11" />
                                        }
                                        text={"Medical"}
                                    />
                                    <CategoryLink
                                        to={"/products?category=Medll"}
                                        icon={
                                            <FaPumpMedical className=" tw-h-full tw-w-full tw-min-w-6 tw-fill-inherit md:tw-min-w-8 lg:tw-min-w-11" />
                                        }
                                        text={"Medical"}
                                    />
                                    <CategoryLink
                                        to={"/products?category=Medx"}
                                        icon={
                                            <ImLab className=" tw-h-full tw-w-full tw-min-w-6 tw-fill-inherit md:tw-min-w-8 lg:tw-min-w-11" />
                                        }
                                        text={"Labs"}
                                    />
                                    <CategoryLink
                                        to={"/products?category=XxMed"}
                                        icon={
                                            <GiChemicalTank className=" tw-h-full tw-w-full tw-min-w-6 tw-fill-inherit md:tw-min-w-8 lg:tw-min-w-11" />
                                        }
                                        text={"Chemicals"}
                                    />
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
                            {sale && sale.length > 0 ? (
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
                                    {bestSupplier.map((product) => (
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
                                                console.log(product);
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
                        <div className="tw-flex tw-h-max tw-flex-wrap tw-justify-between tw-gap-3.5 lg:tw-justify-start">
                            {brands && brands.length > 0 ? (
                                brands.slice(1).map((brand) => {
                                    return (
                                        <BrandCard
                                            brand={brand}
                                            key={brand.id}
                                            className={
                                                "tw-flex-[0_0_30%] lg:tw-flex-[0_0_18%] xl:tw-flex-[0_0_15%]"
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
