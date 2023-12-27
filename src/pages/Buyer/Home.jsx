import { useEffect, useState } from "react";

import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { BiSolidRightArrowAlt, BiSolidLeftArrowAlt } from "react-icons/bi";

import Slider from "react-slick";

import { Link } from "react-router-dom";

import axios from "axios";
import ProductCard from "../../components/Buyer/shared/ProductCard";

import heroVideo from "../../assets/videos/hero-video.mp4";
import { useTranslation } from "react-i18next";

const Home = (props) => {
    const { t, i18n } = useTranslation();

    const { addToCart } = props;

    const [featuredCategories, setFeaturedCategories] = useState([]);
    const [sale, setSale] = useState([]);
    const [recent, setRecent] = useState([]);
    const [bestSupplier, setBestSupplier] = useState([]);

    const [brands, setBrands] = useState([]);

    const fetchBrands = async () => {
        await axios
            .get(
                import.meta.env.VITE_BACKEND_URL + "/api/product/brand?limit=6"
            )
            .then((res) => {
                setBrands(res.data);
            })
            .catch(() => {
                setBrands([]);
            });
    };

    const fetchCategories = async () => {
        await axios
            .get(
                import.meta.env.VITE_BACKEND_URL +
                    `/api/product/category?featured=${true}`
            )
            .then((res) => {
                setFeaturedCategories(res.data);
            });
    };

    const fetchProductsByQuery = async (query) => {
        try {
            let response = null;

            if (query != "on_sale") {
                response = await axios.get(
                    `${
                        import.meta.env.VITE_BACKEND_URL
                    }/api/product/product?order=${query}`
                );
            } else {
                response = await axios.get(
                    `${
                        import.meta.env.VITE_BACKEND_URL
                    }/api/product/product?on_sale=true`
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
            if (products) {
                setSale(products);
            }
        };

        const fetchRecentlyAddedProducts = async () => {
            const products = await fetchProductsByQuery("-created");
            if (products) {
                setRecent(products);
            }
        };

        const fetchBestSellingProducts = async () => {
            const products = await fetchProductsByQuery("-best_suppliers");
            if (products) {
                setBestSupplier(products);
            }
        };

        fetchBrands();
        fetchCategories();
        fetchProductsOnSale();
        fetchRecentlyAddedProducts();
        fetchBestSellingProducts();
    }, []);

    useEffect(() => {
        const headerHeight =
            document.getElementsByTagName("header")[0].clientHeight;
        document.getElementById("hero").style.height =
            window.innerHeight - headerHeight - 1 + "px";
    }, []);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        lazyLoad: true,
        className: "center",
        centerPadding: "30px",
        autoplaySpeed: 2500,
        cssEase: "ease-in",
        centerMode: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2,
                    centerPadding: "50px",
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "70px",
                },
            },
        ],
    };

    return (
        <main>
            <section
                className="d-flex justify-content-center align-items-center position-relative"
                id="hero"
            >
                <video
                    style={{
                        zIndex: 1,
                        objectFit: "cover",
                        objectPosition: "50% 50%",
                    }}
                    className="position-absolute w-100 h-100"
                    autoPlay
                    muted
                    preload="auto"
                    loop
                    playsInline
                >
                    <source src={heroVideo} type="video/mp4" />
                </video>
                <div
                    style={{ zIndex: 2 }}
                    className="text-center col-11 col-md-8 home__hero-banner p-5 shadow"
                >
                    <div className=" mb-4">
                        <div>
                            <h1 className="display-3 fw-bolder">
                                {t("buyer_pages.home.welcome")}
                            </h1>
                        </div>
                    </div>

                    <div>
                        <div>
                            <p>{t("buyer_pages.home.intro")}.</p>

                            <Link
                                to="/products"
                                className="gradient-bg-color px-3 py-2 text-white rounded shadow mt-3 fw-bold"
                            >
                                {t("buyer_pages.home.more")}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-5">
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="col-8">
                            <h3 className="m-0 home__sections-title fw-bolder">
                                {t("buyer_pages.home.featured_cat")}
                            </h3>
                        </div>
                        <div className="col-4 d-flex justify-content-end">
                            <Link
                                to="/categories"
                                className="d-flex align-items-center justify-content-center gap-1 home__sections-link"
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
                            <div className="home__featured-section">
                                {featuredCategories &&
                                featuredCategories.length > 0 ? (
                                    featuredCategories
                                        .slice(0, 6)
                                        .map((category, index) => (
                                            <div
                                                className={`home__featured-div${
                                                    index + 1
                                                }`}
                                                key={category.id}
                                            >
                                                <div
                                                    className={`card home__featured-card position-relative shadow ${
                                                        index + 1 == 4 &&
                                                        " h-100"
                                                    }`}
                                                >
                                                    <div className="position-absolute w-100 h-100">
                                                        <img
                                                            src={
                                                                import.meta.env
                                                                    .VITE_BACKEND_URL +
                                                                category.image
                                                            }
                                                            alt="Category"
                                                            className="home__featured-card-img"
                                                        />
                                                    </div>
                                                    <div className="home__featured-card-content position-relative">
                                                        <div className="d-flex h-100 flex-column justify-content-between align-items-between">
                                                            <div className="d-flex flex-column gap-2">
                                                                <h5 className="home__featured-card-content-title text-white">
                                                                    {
                                                                        category.name
                                                                    }
                                                                </h5>
                                                            </div>
                                                        </div>
                                                        {category.level == 0 ? (
                                                            <Link
                                                                to={`/products?category=${category.slug}`}
                                                                className="position-absolute d-flex justify-content-center align-items-center home__featured-card-content-link gradient-bg-color"
                                                            >
                                                                {i18n.resolvedLanguage ==
                                                                "en" ? (
                                                                    <BiSolidRightArrowAlt />
                                                                ) : (
                                                                    <BiSolidLeftArrowAlt />
                                                                )}
                                                            </Link>
                                                        ) : (
                                                            <Link
                                                                to={`/products?category=${category.parent_slug}&sub-category=${category.slug}`}
                                                                className="position-absolute d-flex justify-content-center align-items-center home__featured-card-content-link gradient-bg-color"
                                                            >
                                                                {i18n.resolvedLanguage ==
                                                                "en" ? (
                                                                    <BiSolidRightArrowAlt />
                                                                ) : (
                                                                    <BiSolidLeftArrowAlt />
                                                                )}
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                ) : (
                                    <p className="text-center">
                                        {t("buyer_pages.home.no_featured")}!
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-2">
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="col-8">
                            <h3 className="m-0 home__sections-title fw-bolder">
                                {t("buyer_pages.home.best_sell")}
                            </h3>
                        </div>
                        <div className="col-4 d-flex justify-content-end">
                            <Link
                                to="/products"
                                className="d-flex align-items-center justify-content-center gap-1 home__sections-link"
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
                        <div className="col-12 p-0 p-md-2">
                            {bestSupplier && bestSupplier.length > 0 ? (
                                <Slider
                                    {...settings}
                                    slidesToShow={
                                        bestSupplier.length < 4
                                            ? bestSupplier.length
                                            : 4
                                    }
                                >
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
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="col-8">
                            <h3 className="m-0 home__sections-title fw-bolder">
                                {t("buyer_pages.home.by_brand")}
                            </h3>
                        </div>
                        <div className="col-4 d-flex justify-content-end">
                            <Link
                                to="brands"
                                className="d-flex align-items-center justify-content-center gap-1 home__sections-link"
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
                    <div className="row py-4 ">
                        {brands && brands.length > 0 ? (
                            brands.map((brand) => {
                                return (
                                    <Link
                                        to={`/products?brand=${brand.slug}`}
                                        className="col-6 col-md-2 my-2"
                                        key={brand.id}
                                    >
                                        <div className="card shadow d-flex align-items-center justify-content-center home__brand-card">
                                            <img
                                                src={
                                                    import.meta.env
                                                        .VITE_BACKEND_URL +
                                                    brand.image
                                                }
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
            </section>
            <section className="py-2">
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="col-8">
                            <h3 className="m-0 home__sections-title fw-bolder">
                                {t("buyer_pages.home.recent")}
                            </h3>
                        </div>
                        <div className="col-4 d-flex justify-content-end">
                            <Link
                                to="/products"
                                className="d-flex align-items-center justify-content-center gap-1 home__sections-link"
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
                        <div className="col-12 p-0 p-md-2">
                            {recent && recent.length > 0 ? (
                                <Slider
                                    {...settings}
                                    slidesToShow={
                                        recent.length < 4 ? recent.length : 4
                                    }
                                >
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
                <div className="container">
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
                                className="d-flex align-items-center justify-content-center gap-1 home__sections-link"
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
                        <div className="col-12 p-0 p-md-2">
                            {sale && sale.length > 0 ? (
                                <Slider
                                    {...settings}
                                    slidesToShow={
                                        sale.length < 4 ? sale.length : 4
                                    }
                                >
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
