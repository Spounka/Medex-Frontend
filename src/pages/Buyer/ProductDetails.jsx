import { useEffect, useState } from "react";

import { useLocation, Link, useParams, useNavigate } from "react-router-dom";

import BreadCrumb from "../../components/Buyer/shared/BreadCrumb";

import { PiMoney } from "react-icons/pi";
import { IoTicketOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { BiCategoryAlt, BiSolidCategoryAlt } from "react-icons/bi";
import { BsCart3, BsShare } from "react-icons/bs";
import {
    MdFavoriteBorder,
    MdFavorite,
    MdOutlineContactMail,
} from "react-icons/md";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { LuWarehouse } from "react-icons/lu";

import { toast } from "react-toastify";

import parse from "html-react-parser";

import userImage from "../../assets/images/user.png";

import useWishlistHandler from "../../utils/useWishlistHandler";
import axios from "axios";
import { useTranslation } from "react-i18next";

const ProductDetails = (props) => {
    const { t } = useTranslation();

    const { addToCart } = props;

    const location = useLocation();
    const navigate = useNavigate();

    const [product, setProduct] = useState({});

    const params = useParams();

    const getProduct = async () => {
        let productState = location?.state?.product;

        if (productState) {
            setProduct(location?.state?.product);
        } else {
            const productID = params?.product_sku;

            try {
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_BACKEND_URL
                    }/api/product/product/${productID}`
                );
                setProduct(response.data);
            } catch (err) {
                navigate("/not-found/");
            }
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    useEffect(() => {
        document
            .querySelectorAll(".details__image-container")
            .forEach((elem) => {
                let x, y, width, height;

                elem.addEventListener("mouseenter", () => {
                    const size = elem.getBoundingClientRect();

                    x = size.x;
                    y = size.y;
                    width = size.width;
                    height = size.height;
                });

                elem.addEventListener("mousemove", (e) => {
                    let horizontal = ((e.clientX - x) / width) * 100;
                    let vertical = ((e.clientY - y) / height) * 100;

                    elem.style.setProperty("--x", horizontal + "%");
                    elem.style.setProperty("--y", vertical + "%");
                });
            });
    }, []);

    const [isInWishlist, setIsInWishlist] = useState(false);

    const handleWishlist = useWishlistHandler();

    const handleWishButtonClick = () => {
        handleWishlist(product?.sku);
        setIsInWishlist(!isInWishlist);
    };

    useEffect(() => {
        const wishlistArray =
            JSON.parse(localStorage.getItem("wishlist")) || [];

        setIsInWishlist(wishlistArray.includes(product?.sku));
    }, [product?.sku]);

    return (
        <main>
            <section className="py-5">
                <div className="container">
                    <div className="row mb-5">
                        <BreadCrumb title={product?.name} />
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="details__image-container shadow">
                                <img src={product?.thumbnail} alt="Product" />
                            </div>

                            <div className="detail__other-images">
                                {product?.image1 && (
                                    <div className="shadow mt-3">
                                        <img
                                            onClick={exchangeImage}
                                            src={product?.image1}
                                            alt="Image"
                                            className="img-fluid"
                                        />
                                    </div>
                                )}
                                {product?.image2 && (
                                    <div className="shadow mt-3">
                                        <img
                                            src={product?.image2}
                                            alt="Image"
                                            className="img-fluid"
                                            onClick={exchangeImage}
                                        />
                                    </div>
                                )}
                                {product?.image3 && (
                                    <div className="shadow mt-3">
                                        <img
                                            src={product?.image3}
                                            alt="Image"
                                            className="img-fluid"
                                            onClick={exchangeImage}
                                        />
                                    </div>
                                )}
                                {product?.image4 && (
                                    <div className="shadow mt-3">
                                        <img
                                            src={product?.image4}
                                            alt="Image"
                                            className="img-fluid"
                                            onClick={exchangeImage}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-12 col-md-6 mt-4 mt-md-0">
                            <div className="card shadow">
                                <div className="card-body">
                                    <p className="text-muted d-flex align-items-center gap-2">
                                        <AiOutlineSafetyCertificate size="1.1rem" />
                                        {product?.brand?.name}
                                    </p>
                                    <div className="text-muted w-100 d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center gap-2">
                                            <BiCategoryAlt size="1.1rem" />
                                            {product?.category?.parent_name}
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <BiSolidCategoryAlt size="1.1rem" />
                                            {product?.category?.name}
                                        </div>
                                    </div>
                                    <hr />
                                    <h4 className="detail__title m-0 py-2">
                                        {product?.name}
                                    </h4>
                                    <hr />
                                    <p className="text-muted text-xs d-flex align-items-center gap-2">
                                        <IoTicketOutline size=".9rem" />
                                        SKU: {product?.sku}
                                    </p>
                                    {product?.sale_price > 0 && (
                                        <p className="fw-bold d-flex align-items-center gap-2">
                                            <span className="text-muted fw-normal d-flex align-items-center gap-2">
                                                <PiMoney size="1.4rem" />
                                                {t(
                                                    "buyer_pages.product_details.was"
                                                )}
                                                :
                                            </span>

                                            <span className="text-decoration-line-through">
                                                {product?.price}
                                                &nbsp; {t("sar")}
                                            </span>
                                        </p>
                                    )}

                                    <p className="fw-bold d-flex align-items-center gap-2">
                                        <span className="text-muted fw-normal d-flex align-items-center gap-2">
                                            <PiMoney size="1.4rem" />
                                            {t(
                                                "buyer_pages.product_details.now"
                                            )}
                                            :
                                        </span>
                                        {product?.price > 0 && (
                                            <span className="detail__title">
                                                {product?.sale_price > 0
                                                    ? product?.sale_price
                                                    : product?.price}
                                                &nbsp; {t("sar")}
                                            </span>
                                        )}
                                        {product?.price_range_max > 0 && (
                                            <span className="detail__title">
                                                {product?.price_range_min}-
                                                {product?.price_range_max}
                                                &nbsp; {t("sar")}
                                            </span>
                                        )}
                                        <span className="text-muted fw-normal">
                                            {t(
                                                "buyer_pages.product_details.incl"
                                            )}
                                        </span>
                                    </p>

                                    <span className="text-muted fw-normal d-flex align-items-center gap-2">
                                        <LuWarehouse size="1.3rem" />
                                        {t("buyer_pages.product_details.avail")}
                                        :{" "}
                                        {product?.is_available &&
                                        product?.stock_quantity > 0 ? (
                                            <>
                                                {t(
                                                    "buyer_pages.product_details.in"
                                                )}{" "}
                                                ({product?.stock_quantity} left)
                                            </>
                                        ) : (
                                            <span>
                                                {t(
                                                    "buyer_pages.product_details.unavailable"
                                                )}
                                            </span>
                                        )}
                                    </span>

                                    <div className="mt-4 row text-muted">
                                        <div className="col-12 col-md-6">
                                            {product?.price > 0 ? (
                                                <button
                                                    className={`gradient-bg-color w-100 py-2 text-white rounded border-0 d-flex align-items-center gap-2 justify-content-center ${
                                                        product?.is_available &&
                                                        product?.stock_quantity >
                                                            0
                                                            ? ""
                                                            : "disabled"
                                                    }`}
                                                    onClick={() =>
                                                        addToCart(product)
                                                    }
                                                    disabled={
                                                        !product?.is_available ||
                                                        !product?.stock_quantity
                                                    }
                                                    id={`item-cart-button-${product?.sku}`}
                                                >
                                                    {t(
                                                        "buyer_pages.product_details.add"
                                                    )}
                                                    <BsCart3
                                                        style={{
                                                            fontSize: "1.5rem",
                                                        }}
                                                    />
                                                </button>
                                            ) : (
                                                <Link
                                                    to={`/chat/${product?.supplier}`}
                                                    className="gradient-bg-color w-100 py-2 text-white rounded border-0 d-flex align-items-center gap-2 justify-content-center"
                                                >
                                                    {t(
                                                        "buyer_pages.product_details.contact"
                                                    )}
                                                    <MdOutlineContactMail
                                                        style={{
                                                            fontSize: "1.5rem",
                                                        }}
                                                    />
                                                </Link>
                                            )}
                                        </div>
                                        <div className="col-12 col-md-6">
                                            {!isInWishlist ? (
                                                <button
                                                    className="btn detail__wish border d-flex align-items-center py-2 gap-2 w-100 mt-3 mt-md-0 justify-content-center"
                                                    onClick={
                                                        handleWishButtonClick
                                                    }
                                                >
                                                    <MdFavoriteBorder
                                                        size="1.5rem"
                                                        className="home__card-button-fav-icon"
                                                    />
                                                    {t(
                                                        "buyer_pages.product_details.wish"
                                                    )}
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={
                                                        handleWishButtonClick
                                                    }
                                                    className="btn detail__wish border d-flex align-items-center py-2 gap-2 justify-content-center"
                                                >
                                                    <MdFavorite
                                                        size="1.5rem"
                                                        className="detail__wish-fav"
                                                    />
                                                    {t(
                                                        "buyer_pages.product_details.unwish"
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={shareProduct}
                                        className="btn shadow mt-4 detail__wish border d-flex align-items-center py-2 gap-2 justify-content-center"
                                    >
                                        <BsShare size="1.3rem" />
                                        {t("buyer_pages.product_details.share")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="fw-bold product__description">
                                {t("supplier")}
                            </h3>
                            <div className="row mt-4">
                                <Link
                                    to={`/supplier/profile/${product?.supplier?.id}`}
                                    className="card shadow border col-12 col-md-3"
                                    state={{ supplier: product?.supplier }}
                                >
                                    <div className="card-body py-2 px-1 d-flex align-items-center justify-content-between gap-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <img
                                                src={
                                                    product?.supplier?.profile
                                                        ?.profile_picture
                                                        ? product?.supplier
                                                              ?.profile
                                                              ?.profile_picture
                                                        : userImage
                                                }
                                                alt="Supplier"
                                                className="img-fluid rounded-circle"
                                                width={50}
                                            />
                                            {product?.supplier?.full_name}
                                        </div>
                                        <div>
                                            <IoIosArrowForward size="1.5rem" />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="fw-bold product__description">
                                {t("product_form.description")}
                            </h3>
                            <div>{parse(product?.description || "")}</div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

const shareProduct = () => {
    const link = window.location.href;

    navigator.clipboard.writeText(link);

    toast.success(`${t("buyer_pages.product_details.share_success")}!`);
};

const exchangeImage = (e) => {
    let currentImage = document.querySelector(".details__image-container>img");

    let currentImageSrc = document.querySelector(
        ".details__image-container>img"
    ).src;

    let newImageSrc = e.target.src;

    currentImage.src = newImageSrc;
    e.target.src = currentImageSrc;
};

export default ProductDetails;
