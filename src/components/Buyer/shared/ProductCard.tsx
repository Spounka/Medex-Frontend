import { useContext, useEffect, useState } from "react";
import {
    IoHeart as HeartIcon,
    IoHeartOutline as HeartEmpty,
    IoCartOutline as CartEmpty,
    IoCart as CartIcon,
} from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";

import useWishlistHandler from "../../../utils/useWishlistHandler";

import { useTranslation } from "react-i18next";
import { Product } from "@domain/product.ts";
import { ThreadUser } from "@domain/thread.ts";
import axios, { AxiosError } from "axios";
import clsx from "clsx";
import { CartContext } from "../../../context/CartContext.tsx";

const ProductCard = (props: {
    product: Product;
    cart: boolean;
    addToCart: any;
    isBestSelling?: boolean;
    wish?: any;
    key?: string;
}) => {
    const { t } = useTranslation();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleWishlist = useWishlistHandler();

    const { product, cart, wish } = props;
    const { addToCart, removeFromCart } = useContext(CartContext);

    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    const [supplier, setSupplier] = useState<ThreadUser | null>(null);

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
        if (product.supplier) {
            (async () => {
                return await axios
                    .get<ThreadUser>(
                        `${
                            import.meta.env.VITE_BACKEND_URL
                        }/api/account/profile/${product.supplier}`,
                    )
                    .then((r) => {
                        setSupplier(r.data);
                    })
                    .catch((e: AxiosError) => {
                        console.error(e.response?.data);
                        setSupplier(null);
                    });
            })();
        }
    }, [product.supplier]);

    useEffect(() => {
        let wishlistArray = [];

        if (localStorage.getItem("wishlist")) {
            wishlistArray = JSON.parse(localStorage.getItem("wishlist") ?? "[]");
        }

        setIsInWishlist(wishlistArray.includes(product.sku));
    }, [product.sku]);

    const checkCart = () => {
        let cartItems: Product[] = JSON.parse(localStorage.getItem("cartItems") ?? "[]");
        setIsInCart(cartItems.some((item) => item.sku === product.sku));
    };
    useEffect(() => {
        checkCart();
    }, [isInCart, product.sku]);

    return (
        <div
            className="cardd card home__card tw-flex tw-w-full tw-flex-col tw-gap-3 tw-pb-2"
            style={{ borderRadius: "8px" }}
        >
            <Link
                to={`/products/${product.sku}`}
                state={{ product: product }}
                className="card-link tw-relative tw-border-b tw-border-gray-200 tw-pb-1"
                onMouseMoveCapture={(e) => {}}
            >
                <img
                    src={
                        user
                            ? user.role == "buyer"
                                ? product.thumbnail
                                : import.meta.env.VITE_BACKEND_URL + product.thumbnail
                            : product.thumbnail
                    }
                    className="tw-min-h-[200px] tw-object-cover tw-object-center"
                    width="100%"
                    alt="product"
                />
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleWishButtonClick();
                    }}
                    className={
                        "tw-absolute tw-right-4 tw-top-4 tw-z-10 tw-h-10 tw-w-auto tw-p-2"
                    }
                >
                    {isInWishlist ? (
                        <HeartIcon
                            className={clsx(
                                `tw-h-full tw-w-full tw-rounded-full tw-fill-purple`,
                            )}
                        />
                    ) : (
                        <HeartEmpty
                            className={clsx(`tw-h-full tw-w-full tw-stroke-purple`)}
                        />
                    )}
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product, 1);
                        setIsInCart((v) => !v);
                        checkCart();
                    }}
                    className={
                        "tw-absolute tw-bottom-4 tw-right-4 tw-z-10 tw-h-10 tw-w-auto tw-rounded-full tw-bg-[#754f9d23] tw-p-2"
                    }
                >
                    {isInCart ? (
                        <CartIcon className={`tw-h-full tw-w-full tw-fill-purple`} />
                    ) : (
                        <CartEmpty className={`tw-h-full tw-w-full tw-stroke-purple`} />
                    )}
                </button>
            </Link>
            <div className="tw-flex tw-cursor-pointer tw-items-center tw-justify-between tw-px-2 tw-text-center tw-align-middle hover:tw-text-black">
                <div className="card-title tw-m-0 tw-flex tw-flex-col tw-gap-1.5 tw-text-center tw-align-middle">
                    <h6
                        className={
                            "tw-text-start tw-font-algreya tw-font-medium tw-text-gray-400"
                        }
                    >
                        {supplier?.full_name}
                    </h6>
                    <h5 className="home__card-title text-dark text-hover">
                        {product.name}
                    </h5>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center tw-w-full tw-px-2 tw-text-left">
                <span
                    className="fw-bold home__card-price d-flex tw-flex tw-flex-1 tw-flex-col tw-items-start tw-text-left"
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
                        <span className="d-block tw-text-red-600">
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
                {props.isBestSelling ? (
                    <div className="tw-rounded-full tw-bg-purple tw-px-2 tw-text-center tw-text-sm tw-text-white lg:tw-text-lg xl:tw-text-sm">
                        Best Selling
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ProductCard;
