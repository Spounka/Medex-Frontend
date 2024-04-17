import { useContext, useEffect, useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import useWishlistHandler from "../../../utils/useWishlistHandler";

import { useTranslation } from "react-i18next";
import { Product } from "@domain/product.ts";

const ProductCard = (props: {
    product: Product;
    wish: any;
    cart: boolean;
    key: string;
    addToCart: any;
}) => {
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
        let cartItems: Product[] = JSON.parse(localStorage.getItem("cartItems") ?? "[]");

        cartItems.forEach((item) => {
            let buttons = document.querySelectorAll(`#item-cart-button-${item.sku}`);

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
        <div
            className="cardd card home__card tw-flex tw-min-h-[300px] tw-flex-col tw-gap-1"
            style={{ borderRadius: "5px" }}
        >
            <Link
                to={`/products/${product.sku}`}
                state={{ product: product }}
                className="card-link"
            >
                <img
                    src={
                        user
                            ? user.role == "buyer"
                                ? product.thumbnail
                                : import.meta.env.VITE_BACKEND_URL + product.thumbnail
                            : product.thumbnail
                    }
                    className="card-img-top home__card-img tw-min-h-[200px] tw-object-cover tw-object-center"
                    width="100%"
                    alt="product"
                />
                <div className="tw-flex tw-items-center tw-justify-between tw-px-2 tw-text-center tw-align-middle">
                    <div className="card-title tw-m-0 tw-text-center tw-align-middle">
                        <h5 className="home__card-title text-dark text-hover">
                            {product.name}
                        </h5>
                    </div>
                    {user ? (
                        user.role == "buyer" ? (
                            <button
                                role="button"
                                className="border-0 bg-transparent tw-items-center"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleWishButtonClick();
                                }}
                            >
                                <div className="home__card-button-fav">
                                    {isInWishlist ? (
                                        <MdFavorite
                                            className="home__card-button-fav-icon"
                                            style={{ color: "red" }}
                                        />
                                    ) : (
                                        <MdFavoriteBorder className="home__card-button-fav-icon" />
                                    )}
                                </div>
                            </button>
                        ) : (
                            <br />
                        )
                    ) : (
                        <button
                            role="button"
                            className="border-0 bg-transparent tw-items-center tw-align-middle"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleWishButtonClick();
                            }}
                        >
                            <div className="home__card-button-fav tw-items-center">
                                {isInWishlist ? (
                                    <MdFavorite
                                        className="home__card-button-fav-icon"
                                        style={{ color: "red" }}
                                    />
                                ) : (
                                    <MdFavoriteBorder className="home__card-button-fav-icon" />
                                )}
                            </div>
                        </button>
                    )}
                </div>
            </Link>

            <div className="d-flex flex-column justify-content-between align-items-center tw-w-full tw-px-2 tw-text-left">
                <span
                    className="fw-bold home__card-price d-flex tw-flex tw-flex-col tw-items-start tw-text-left"
                    style={{ width: "100%" }}
                >
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
            {user ? (
                user.group_names.indexOf("Buyer Admin") > -1 ||
                user.group_names.indexOf("Buyer Product Manager") > -1 ? (
                    <div className="d-flex flex-column justify-content-center align-items-center tw-px-2 tw-pb-2">
                        {product.price > 0 && cart && (
                            <button
                                className={`bttn text-nowrap tw-rounded-[4px] tw-bg-purple tw-transition-colors tw-duration-200 
                                hover:tw-border hover:tw-border-purple hover:tw-bg-white hover:tw-text-purple`}
                                style={{
                                    width: "100%",
                                }}
                                id={`item-cart-button-${product.sku}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    addToCart(product, 1);
                                }}
                            >
                                {t("buyer_pages.product_details.add")}
                            </button>
                        )}
                    </div>
                ) : (
                    <br />
                )
            ) : (
                <div className="d-flex flex-column justify-content-center align-items-center tw-px-2 tw-pb-2">
                    {product.price > 0 && cart && (
                        <Link
                            to="/account/login"
                            className={`btn bttn text-nowrap tw-w-full tw-rounded-[4px] 
                            tw-bg-purple tw-transition-colors tw-duration-200 
                            hover:tw-border hover:tw-border-purple hover:tw-bg-white hover:tw-text-purple`}
                            style={{}}
                            id={`item-cart-button-${product.sku}`}
                        >
                            {t("buyer_pages.product_details.add")}
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductCard;
