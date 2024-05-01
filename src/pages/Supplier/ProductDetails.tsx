import { useLocation, useNavigate, useParams } from "react-router-dom";

import { PiMoney } from "react-icons/pi";
import { IoTicketOutline } from "react-icons/io5";
import { BiCategoryAlt, BiSolidCategoryAlt } from "react-icons/bi";
import { BsShare } from "react-icons/bs";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { LuWarehouse } from "react-icons/lu";
import { TbTruckReturn } from "react-icons/tb";

import { toast } from "react-toastify";

import parse from "html-react-parser";

import useAxios from "../../utils/useAxios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ProductDetails = () => {
    const { t } = useTranslation();

    const location = useLocation();

    const [product, setProduct] = useState({});

    const params = useParams();

    const navigate = useNavigate();

    const api = useAxios();

    const getProduct = async () => {
        let productState = location?.state?.product;

        if (productState) {
            setProduct(location?.state?.product);
        } else {
            const productID = params?.product_sku;

            try {
                const response = await api.get(
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

            elem.onmouseenter = () => {
                const size = elem.getBoundingClientRect();

                x = size.x;
                y = size.y;
                width = size.width;
                height = size.height;
            };

            elem.onmousemove = (e) => {
                let horizontal = ((e.clientX - x) / width) * 100;
                let vertical = ((e.clientY - y) / height) * 100;

                elem.style.setProperty("--x", horizontal + "%");
                elem.style.setProperty("--y", vertical + "%");
            };
        });
    });

    return (
        <main className="px-0 px-md-3">
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="details__image-container shadow">
                                <img
                                    src={product.thumbnail}
                                    alt="Product"
                                />
                            </div>

                            <div className="detail__other-images">
                                {product.image1 && (
                                    <div className="shadow mt-3">
                                        <img
                                            onClick={exchangeImage}
                                            src={product.image1}
                                            alt="Image"
                                            className="img-fluid"
                                        />
                                    </div>
                                )}
                                {product.image2 && (
                                    <div className="shadow mt-3">
                                        <img
                                            src={product.image2}
                                            alt="Image"
                                            className="img-fluid"
                                            onClick={exchangeImage}
                                        />
                                    </div>
                                )}
                                {product.image3 && (
                                    <div className="shadow mt-3">
                                        <img
                                            src={product.image3}
                                            alt="Image"
                                            className="img-fluid"
                                            onClick={exchangeImage}
                                        />
                                    </div>
                                )}
                                {product.image4 && (
                                    <div className="shadow mt-3">
                                        <img
                                            src={product.image4}
                                            alt="Image"
                                            className="img-fluid"
                                            onClick={exchangeImage}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="col-12 col-md-6 mt-4 mt-md-0">
                            <div className="card">
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
                                                {t("buyer_pages.product_details.was")}:
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
                                            {t("buyer_pages.product_details.now")}:
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
                                            {t("buyer_pages.product_details.incl")}
                                        </span>
                                    </p>

                                    <span className="text-muted fw-normal d-flex align-items-center gap-2">
                                        <LuWarehouse size="1.3rem" />
                                        {t("buyer_pages.product_details.avail")}:{" "}
                                        {product?.is_available &&
                                        product?.stock_quantity > 0 ? (
                                            <>
                                                {t("buyer_pages.product_details.in")} (
                                                {product?.stock_quantity} left)
                                            </>
                                        ) : (
                                            <span>
                                                {t(
                                                    "buyer_pages.product_details.unavailable",
                                                )}
                                            </span>
                                        )}
                                    </span>

                                    <span className="text-muted fw-normal mt-3 d-flex align-items-center gap-2">
                                        <TbTruckReturn size="1.3rem" />
                                        {t("product_form.returnable")}:
                                        {product?.is_returnable ? (
                                            <span>
                                                {t(
                                                    "buyer_pages.product_details.return_valid",
                                                    {
                                                        days: product?.return_deadline,
                                                    },
                                                )}
                                            </span>
                                        ) : (
                                            <span>
                                                {t(
                                                    "buyer_pages.product_details.unreturnable",
                                                )}
                                            </span>
                                        )}
                                    </span>

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
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="fw-bold product__description">
                                {t("product_form.description")}
                            </h3>
                            <div>{parse(String(product?.description))}</div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

const shareProduct = (t) => {
    const link = window.location.href;

    navigator.clipboard.writeText(link);

    toast.success(`${t("buyer_pages.product_details.share_success")}!`);
};

const exchangeImage = (e) => {
    let currentImage = document.querySelector(".details__image-container>img");

    let currentImageSrc = document.querySelector(".details__image-container>img").src;

    let newImageSrc = e.target.src;

    currentImage.src = newImageSrc;
    e.target.src = currentImageSrc;
};

export default ProductDetails;
