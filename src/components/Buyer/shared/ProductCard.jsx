import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import useWishlistHandler from "../../../utils/useWishlistHandler";
import AuthContext from "../../../context/AuthContext";

import { useTranslation } from "react-i18next";

const ProductCard = (props) => {
    const { t } = useTranslation();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleWishlist = useWishlistHandler();

    const { product, cart, wish, addToCart } = props;

    const [isInWishlist, setIsInWishlist] = useState(false);

    const handleWishButtonClick = () => {
        if (user) {
            try {
                handleWishlist(product.sku, wish);
            } catch {
                return;
            }

            setIsInWishlist(!isInWishlist);
        } else {
            navigate("/account/login");
        }
    };

    useEffect(() => {
        let wishlistArray = [];

        if (localStorage.getItem("wishlist")) {
            wishlistArray = JSON.parse(localStorage.getItem("wishlist"));
        }

        setIsInWishlist(wishlistArray.includes(product.sku));
    }, [product.sku]);

    useEffect(() => {
        let cartItems = localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [];

        cartItems.forEach((item) => {
            let buttons = document.querySelectorAll(
                `#item-cart-button-${item.sku}`
            );

            if (item.qty < item.stock_quantity) {
                buttons.forEach((btn) => {
                    btn.classList.remove("disabled");
                });
            } else {
                buttons.forEach((btn) => {
                    btn.classList.add("disabled");
                    btn.setAttribute("disabled", true);
                });
            }
        });
    }, []);

    return (
        <div className="card rounded-3 shadow position-relative home__card">
            <Link
                to={`/products/${product.sku}`}
                state={{ product: product }}
                className="card-link"
            >
                <img
                    src={product.thumbnail}
                    className="card-img-top home__card-img"
                    width="100%"
                    alt="product"
                />
                <div className="card-title pt-3 px-3">
                    <h5 className="home__card-title text-dark text-hover">
                        {product.name}
                    </h5>
                </div>
            </Link>
            <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                    <span className="fw-bold home__card-price">
                        {product.price > 0 && (
                            <span
                                className={
                                    product.sale_price > 0
                                        ? "text-decoration-line-through"
                                        : ""
                                }
                            >
                                {product.price}&nbsp; {t("sar")}
                            </span>
                        )}
                        {product.sale_price > 0 && (
                            <span className="d-block">
                                {product.sale_price}&nbsp; {t("sar")}
                            </span>
                        )}

                        {product.price_range_min > 0 && (
                            <span>
                                {product.price_range_min}&nbsp; {t("sar")} -
                                <br />
                                {product.price_range_max}&nbsp; {t("sar")}
                            </span>
                        )}
                    </span>
                </div>
                <div className="d-flex gap-2 justify-content-center align-items-center">
                    <button
                        role="button"
                        className="border-0 bg-transparent"
                        onClick={handleWishButtonClick}
                    >
                        <div className="home__card-button-fav">
                            {isInWishlist ? (
                                <MdFavorite className="home__card-button-fav-icon" />
                            ) : (
                                <MdFavoriteBorder className="home__card-button-fav-icon" />
                            )}
                        </div>
                    </button>

                    {product.price > 0 && cart !== false && (
                        <button
                            className="gradient-bg-color home__card-button-cart"
                            id={`item-cart-button-${product.sku}`}
                            onClick={() => addToCart(product, 1)}
                        >
                            <IoMdCart className="home__card-button-cart-icon" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
