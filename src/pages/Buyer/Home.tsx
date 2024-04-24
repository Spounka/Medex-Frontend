import { useEffect, useState } from "react";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import Slider, { Settings } from "react-slick";

import { Link } from "react-router-dom";

import axios from "axios";
import ProductCard from "../../components/Buyer/shared/ProductCard";

import { Brand, Product } from "@domain/product";
import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";
import { FaBriefcaseMedical, FaPumpMedical } from "react-icons/fa";
import { FaXRay } from "react-icons/fa6";
import { GiChemicalTank } from "react-icons/gi";
import { ImLab } from "react-icons/im";
import Container from "../../components/shared/Container.tsx";

const Home = ({ addToCart }: { addToCart: any }) => {
    const { t, i18n } = useTranslation();

    const [ads, setAds] = useState<{ id: number; thumbnail: string }[]>([]);

    const [sale, setSale] = useState<Product[]>([]);
    const [recent, setRecent] = useState<Product[]>([]);
    const [bestSupplier, setBestSupplier] = useState<Product[]>([]);

    const [brands, setBrands] = useState<Brand[]>([]);

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
            console.log(products);

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
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        lazyLoad: "ondemand",
        className: "center",
        arrows: false,
        autoplaySpeed: 2500,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                    arrows: true,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    arrows: false,
                    centerMode: false,
                },
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3,
                    arrows: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                    arrows: false,
                },
            },
        ],
    };
    const settings3 = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        cssEase: "ease-in-out",
        dots: true,
        arrows: true,
    };

    return (
        <main className={"tw-flex tw-flex-col tw-gap-4 md:tw-gap-8"}>
            <Container<HTMLDivElement>
                node={"section"}
                className="tw-relative tw-h-auto tw-w-dvw xl:tw-h-dvh"
            >
                <div className="tw-pt-4 md:tw-hidden">
                    <div className="two">
                        <form
                            method="get"
                            action="/products"
                        >
                            <div
                                className={`w-100 ${
                                    i18n.resolvedLanguage == "en" ? "me-lg-5" : "ms-lg-5"
                                }`}
                            >
                                <div className="nav-link">
                                    <div
                                        className="input-group m-0"
                                        style={{
                                            direction: "ltr",
                                        }}
                                    >
                                        <input
                                            type="text"
                                            name="keyword"
                                            className="form-control py-2"
                                            placeholder={`${t(
                                                "header.search_product",
                                            )}...`}
                                            aria-label={`${t(
                                                "header.search_product",
                                            )}...`}
                                            aria-describedby="header-search-bar"
                                            style={{
                                                borderRight: "none",
                                                height: "35px",
                                            }}
                                        />

                                        <button
                                            type="submit"
                                            className="input-group-text "
                                            id="header-search-bar"
                                            style={{
                                                borderLeft: "none",
                                                borderColor: "#bbbbbb",
                                                backgroundColor: "#ffffff",
                                            }}
                                        >
                                            <CiSearch
                                                className="fs-5"
                                                style={{
                                                    color: "var(--theme-color-primary)",
                                                }}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
            {ads && ads.length > 0
                ? ads.map((ad) => (
                      <img
                          className="imgg tw-inset-0 tw-h-auto tw-w-screen tw-object-contain xl:tw-absolute xl:tw-h-screen xl:tw-object-cover"
                          src={ad.thumbnail}
                          key={ad.id}
                      />
                  ))
                : null}

            <section className="pb-5 tw-px-4">
                <div className="">
                    <div>
                        <div className="row d-flex align-items-center">
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
                                    className="p-1 px-2 d-flex align-items-center justify-content-center gap-1 home__sections-link text-nowrap hover:tw-text-purple"
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
                        <div className="row pt-4">
                            <div className="col-12">
                                <div className="gs d-flex flex-wrap tw-w-full">
                                    <Link
                                        to="/products?category=X-Ray"
                                        className="cat d-flex flex-column gap-1 align-items-center"
                                    >
                                        <div
                                            style={{
                                                backgroundColor: "rgb(250 250 250)",
                                                borderRadius: "50%",
                                                cursor: "pointer",
                                                transition: "0.3s",
                                            }}
                                        >
                                            <FaXRay
                                                className="p-3"
                                                size={65}
                                            />
                                        </div>
                                        <p
                                            className="text-center m-0"
                                            style={{ transition: "0.3s" }}
                                        >
                                            XRay
                                        </p>
                                    </Link>
                                    <Link
                                        to="/products?category=medex"
                                        className="cat d-flex flex-column gap-1 align-items-center"
                                    >
                                        <div
                                            style={{
                                                backgroundColor: "rgb(250 250 250)",
                                                borderRadius: "50%",
                                                cursor: "pointer",
                                                transition: "0.3s",
                                            }}
                                        >
                                            <FaBriefcaseMedical
                                                className="p-3"
                                                size={65}
                                            />
                                        </div>
                                        <p
                                            className="text-center m-0"
                                            style={{ transition: "0.3s" }}
                                        >
                                            Medical
                                        </p>
                                    </Link>
                                    <Link
                                        to="/products?category=Medll"
                                        className="cat d-flex flex-column gap-1 align-items-center"
                                    >
                                        <div
                                            style={{
                                                backgroundColor: "rgb(250 250 250)",
                                                borderRadius: "50%",
                                                cursor: "pointer",
                                                transition: "0.3s",
                                            }}
                                        >
                                            <FaPumpMedical
                                                className="p-3"
                                                size={65}
                                            />
                                        </div>
                                        <p
                                            className="text-center m-0"
                                            style={{ transition: "0.3s" }}
                                        >
                                            MedicalL
                                        </p>
                                    </Link>
                                    <Link
                                        to="/products?category=Medx"
                                        className="cat d-flex flex-column gap-1 align-items-center"
                                    >
                                        <div
                                            style={{
                                                backgroundColor: "rgb(250 250 250)",
                                                borderRadius: "50%",
                                                cursor: "pointer",
                                                transition: "0.3s",
                                            }}
                                        >
                                            <ImLab
                                                className="p-3"
                                                size={65}
                                            />
                                        </div>
                                        <p
                                            className="text-center m-0"
                                            style={{ transition: "0.3s" }}
                                        >
                                            Labs
                                        </p>
                                    </Link>
                                    <Link
                                        to="/products?category=XxMed"
                                        className="cat d-flex flex-column gap-1 align-items-center"
                                    >
                                        <div
                                            style={{
                                                backgroundColor: "rgb(250 250 250)",
                                                borderRadius: "50%",
                                                cursor: "pointer",
                                                transition: "0.3s",
                                            }}
                                        >
                                            <GiChemicalTank
                                                className="p-3"
                                                size={65}
                                            />
                                        </div>
                                        <p
                                            className="text-center m-0"
                                            style={{ transition: "0.3s" }}
                                        >
                                            Chemicals
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-2">
                <div className="tw-px-4">
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
                        <div className="col-14 p-0 p-md-2 padded-track">
                            {bestSupplier && bestSupplier.length > 0 ? (
                                <Slider {...settings}>
                                    {bestSupplier.map((product) => (
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
                                    {t("buyer_pages.home.none")}!
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-5">
                <div className="tw-px-4">
                    <div>
                        <div className="row d-flex align-items-center">
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
                        <div className="pt-2 gg tw-grid tw-grid-cols-3 md:tw-grid-cols-4 lg:tw-grid-cols-6">
                            {brands && brands.length > 0 ? (
                                brands.map((brand) => {
                                    return (
                                        <Link
                                            to={`/products?brand=${brand.slug}`}
                                            key={brand.id}
                                            className={
                                                "tw-aspect-square tw-w-full tw-flex-[1_1_30%] md:tw-flex-[1_1_20%]"
                                            }
                                        >
                                            <div
                                                className="card d-flex align-items-center justify-content-center home__brand-card"
                                                style={{ borderRadius: "10px" }}
                                            >
                                                <img
                                                    src={brand.image}
                                                    alt="Brand"
                                                    className="img-fluid px-4"
                                                />
                                            </div>
                                        </Link>
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
            </section>
            <section className="py-2">
                <div className="tw-px-4">
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
                        <div className="col-12 p-0 p-md-0">
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
            </section>
            <section className="py-5">
                <div className="tw-px-4">
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
            </section>
        </main>
    );
};

export default Home;
