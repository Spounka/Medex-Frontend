import { useContext, useEffect, useState } from "react";

import { useLocation, Link, useParams, useNavigate } from "react-router-dom";

import BreadCrumb from "../../components/Buyer/shared/BreadCrumb";

import {
    IoCartOutline as CartIcon,
    IoHeartOutline as HeartIcon,
    IoRepeat as RepeatIcon,
} from "react-icons/io5";

import { toast } from "react-toastify";

import parse from "html-react-parser";

import userImage from "../../assets/images/user.png";

import useWishlistHandler from "../../utils/useWishlistHandler";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Container from "../../components/ui/container";
import { Product } from "@domain/product.ts";
import Cart from "./Cart.tsx";
import ProductCard from "../../components/Buyer/shared/ProductCard.tsx";
import { CartContext } from "../../context/CartContext.tsx";

function ProductThumbnail(props: { url: string }) {
    return (
        <div className={""}>
            <img
                src={props.url}
                alt="Product Image"
                className="tw-h-auto tw-w-full tw-max-w-32 tw-cursor-pointer tw-border"
            />
        </div>
    );
}

const ProductDetails = (props) => {
    const { t } = useTranslation();
    const { addToCart } = useContext(CartContext);

    const [currentCount, setCurrentCount] = useState(1);

    const location = useLocation();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product>();
    const [bestSupplier, setBestSupplier] = useState<Product[]>([]);

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
                    }/api/product/product/${productID}`,
                );
                setProduct(response.data);
            } catch (err) {
                navigate("/not-found/");
            }
        }
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
        getProduct();

        const fetchBestSellingProducts = async () => {
            const products = await fetchProductsByQuery("best_selling");
            if (products?.products) {
                setBestSupplier(products?.products);
            }
        };
        fetchBestSellingProducts();
    }, []);

    useEffect(() => {
        document.querySelectorAll(".details__image-container").forEach((elem) => {
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
        const wishlistArray = JSON.parse(localStorage.getItem("wishlist")) || [];

        setIsInWishlist(wishlistArray.includes(product?.sku));
    }, [product?.sku]);

    if (!product) {
        return null;
    }

    return (
        <Container
            node={"main"}
            className={"tw-flex tw-flex-col tw-gap-16 tw-py-6"}
        >
            <BreadCrumb title={product?.name} />
            <div className="tw-flex tw-flex-col tw-justify-between tw-gap-8 tw-py-4 lg:tw-flex-row lg:tw-gap-12">
                <div className="tw-flex tw-flex-col-reverse tw-gap-3 lg:tw-max-w-[calc(10rem*4)] lg:tw-flex-row">
                    <div className="tw-flex tw-max-w-64 tw-flex-row tw-gap-1.5 lg:tw-max-w-none lg:tw-flex-col lg:tw-gap-4">
                        <ProductThumbnail url={product.thumbnail} />
                        {product.image1 !== null ? (
                            <ProductThumbnail url={product.image1} />
                        ) : null}
                        {product.image2 !== null ? (
                            <ProductThumbnail url={product.image2} />
                        ) : null}
                        {product.image3 !== null ? (
                            <ProductThumbnail url={product.image3} />
                        ) : null}
                        {product.image4 !== null ? (
                            <ProductThumbnail url={product.image4} />
                        ) : null}
                    </div>
                    <div className="details__image-container tw-w-full tw-flex-1 tw-border">
                        <img
                            src={product.thumbnail}
                            alt="Product Thumbnail"
                            className="tw-h-auto tw-w-full"
                        />
                    </div>
                </div>
                <div className="tw-flex tw-h-auto tw-w-full tw-flex-1 tw-flex-col tw-gap-6">
                    <div className={"tw-flex tw-flex-col tw-gap-2"}>
                        <h1 className="tw-font-algreya tw-text-xl tw-font-bold lg:tw-text-4xl">
                            {product.name}
                        </h1>
                        {product.is_available ? (
                            <h4 className="tw-font-poppins tw-text-lg tw-text-green-400">
                                {t("buyer_pages.product_details.in")}
                            </h4>
                        ) : null}
                    </div>
                    <div className="tw-flex tw-w-fit tw-items-center tw-justify-between tw-gap-6 tw-align-middle">
                        <h3 className="tw-font-poppins tw-text-lg tw-font-normal lg:tw-text-xl">
                            {`${product.price} S.A.R`}
                        </h3>
                    </div>
                    <p className="tw-font-poppins tw-text-lg tw-font-normal tw-text-black">
                        {product.description}
                    </p>
                    <div
                        className={"tw-w-full tw-border-b-2 tw-border-b-gray-500 tw-py-4"}
                    />

                    <div className="tw-flex tw-w-fit tw-flex-wrap tw-gap-4 lg:tw-w-full">
                        <div className="tw-flex tw-w-full tw-overflow-hidden tw-rounded-md tw-border tw-border-gray-600 lg:tw-w-fit">
                            <button
                                onClick={() => {
                                    setCurrentCount((v) => (v > 1 ? v - 1 : 1));
                                }}
                                className={
                                    "tw-border-r tw-border-r-gray-400 tw-bg-none tw-px-4 tw-py-1.5"
                                }
                            >
                                -
                            </button>
                            <p className="tw-h-full tw-w-full tw-content-center tw-px-8 tw-text-center tw-font-poppins tw-text-lg lg:tw-w-fit">
                                {currentCount}
                            </p>
                            <button
                                onClick={() => {
                                    setCurrentCount((v) => v + 1);
                                }}
                                className={
                                    "tw-border-l tw-border-l-gray-400 tw-bg-purple tw-px-4 tw-py-1.5 tw-text-white"
                                }
                            >
                                +
                            </button>
                        </div>
                        <button
                            className={
                                "tw-flex-[0_0_50%] tw-rounded-md tw-border tw-border-purple tw-bg-none tw-px-8 tw-py-1.5 tw-font-poppins tw-text-purple lg:tw-basis-auto"
                            }
                        >
                            Request For Quotation
                        </button>
                        <button
                            className={
                                "tw-rounded-md tw-bg-purple tw-px-8 tw-py-1.5 tw-font-poppins tw-text-white"
                            }
                        >
                            Buy Now
                        </button>
                        <button
                            className={
                                "tw-rounded-md tw-border tw-border-purple tw-bg-none tw-stroke-purple tw-px-2 tw-py-1.5 tw-font-poppins tw-text-white"
                            }
                        >
                            <CartIcon className={"tw-h-auto tw-w-8 tw-stroke-inherit"} />
                        </button>
                        <button
                            className={
                                "tw-rounded-md tw-border tw-border-purple tw-bg-none tw-stroke-purple tw-px-2 tw-py-1.5 tw-font-poppins tw-text-white"
                            }
                        >
                            <HeartIcon className={"tw-h-auto tw-w-8 tw-stroke-inherit"} />
                        </button>
                    </div>
                    <div className="tw-flex tw-w-fit tw-flex-col tw-rounded-md tw-border tw-border-gray-600 tw-p-4">
                        {!product.is_returnable ? (
                            <div className="tw-flex tw-items-center tw-justify-center tw-gap-3">
                                <RepeatIcon
                                    className={"tw-h-auto tw-w-8 tw-stroke-black"}
                                />
                                <div className="tw-h-full tw-border-r tw-border-r-gray-600" />
                                <div className="tw-flex tw-flex-col tw-gap-2.5">
                                    <p
                                        className={
                                            "tw-font-poppins tw-text-xl tw-font-normal tw-text-black"
                                        }
                                    >
                                        Returnable product!
                                    </p>
                                    <p
                                        className={
                                            "tw-font-poppins tw-text-sm tw-font-normal tw-text-grey-storm tw-underline"
                                        }
                                    >
                                        Link policy for returning products
                                    </p>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            <div className="tw-flex tw-flex-col tw-gap-8 tw-py-8">
                <div className="tw-flex tw-items-center tw-justify-start tw-gap-4">
                    <span className="tw-aspect-[9/16] tw-rounded-md tw-bg-purple tw-p-3 " />
                    <h3 className="tw-font-algreya tw-text-2xl tw-font-medium tw-text-purple">
                        Related Items
                    </h3>
                </div>
                <div className="tw-flex tw-flex-wrap tw-gap-4">
                    {bestSupplier?.slice(0, 4).map((product) => (
                        <ProductCard
                            product={product}
                            cart={true}
                            key={product.sku}
                            addToCart={addToCart}
                            isBestSelling
                        />
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default ProductDetails;
