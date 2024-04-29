import { useEffect, useState } from "react";

import { useLocation, Link, useParams, useNavigate } from "react-router-dom";

import BreadCrumb from "../../components/Buyer/shared/BreadCrumb";

import { PiMoney } from "react-icons/pi";
import { IoTicketOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { BiCategoryAlt, BiSolidCategoryAlt } from "react-icons/bi";
import { BsCart3, BsShare } from "react-icons/bs";
import { MdFavoriteBorder, MdFavorite, MdOutlineContactMail } from "react-icons/md";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { LuWarehouse } from "react-icons/lu";
import { TbTruckReturn } from "react-icons/tb";

import { toast } from "react-toastify";

import parse from "html-react-parser";

import userImage from "../../assets/images/user.png";

import useWishlistHandler from "../../utils/useWishlistHandler";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Container from "../../components/ui/container";
import { Product } from "@domain/product.ts";

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

    const { addToCart } = props;

    const location = useLocation();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product>();

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

    useEffect(() => {
        getProduct();
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
            className={"tw-py-6"}
        >
            <BreadCrumb title={product?.name} />
            <div className="tw-flex tw-flex-col tw-justify-between tw-gap-4 tw-py-4 lg:tw-flex-row">
                <div className="tw-flex tw-flex-1 tw-flex-col-reverse tw-gap-3 lg:tw-flex-row">
                    <div className="tw-flex tw-max-w-32 tw-flex-row tw-gap-1.5 lg:tw-max-w-none lg:tw-flex-col lg:tw-gap-4">
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
                    <div className="details__image-container tw-flex-1 tw-border lg:tw-max-w-[25dvw]">
                        <img
                            src={product.thumbnail}
                            alt="Product Thumbnail"
                            className="tw-h-auto tw-w-full"
                        />
                    </div>
                </div>
                <div className="tw-h-auto tw-w-full tw-flex-1"></div>
            </div>
        </Container>
    );
};

export default ProductDetails;
