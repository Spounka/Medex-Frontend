import { useEffect, useRef, useState } from "react";
import "../../Invoice.css";

import { useLocation, useParams } from "react-router-dom";

import useAxios from "../../utils/useAxios";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { BiCloudDownload } from "react-icons/bi";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { CgCloseR } from "react-icons/cg";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const OfferInvoice = () => {
    const { t } = useTranslation();

    const location = useLocation();

    const api = useAxios();

    const params = useParams();

    const pdfRef = useRef();

    const { id } = params;

    const [offer, setOffer] = useState(null);

    const getOffer = async () => {
        await api
            .get(import.meta.env.VITE_BACKEND_URL + `/api/quote/offer/${id}/`)
            .then((res) => {
                setOffer(res.data);
            });
    };

    const approveOffer = async () => {
        await api
            .post(
                import.meta.env.VITE_BACKEND_URL + `/api/quote/offer/${id}/`,
                {
                    type: "approve",
                }
            )
            .then(() => {
                toast.success(
                    `${t("buyer_pages.offers_invoice.approve_success")}!`
                );
            })
            .catch(() => {
                toast.error(
                    `${t("buyer_pages.offers_invoice.approve_error")}!`
                );
            });
    };

    const declineOffer = async () => {
        await api
            .post(
                import.meta.env.VITE_BACKEND_URL + `/api/quote/offer/${id}/`,
                {
                    type: "decline",
                }
            )
            .then(() => {
                toast.success(
                    `${t("buyer_pages.offers_invoice.decline_success")}!`
                );
            })
            .catch(() => {
                toast.error(
                    `${t("buyer_pages.offers_invoice.decline_error")}!`
                );
            });
    };

    useEffect(() => {
        const modalOverlay = document.querySelector(".modal-backdrop");

        if (modalOverlay) {
            modalOverlay.remove();
        }

        let o = location?.state?.offer;

        if (!o) {
            getOffer();
        } else {
            setOffer(o);
        }
    }, []);

    const downloadPDF = () => {
        const input = pdfRef.current;

        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF("p", "mm", "a4", true);

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;

            pdf.addImage(
                imgData,
                "PNG",
                imgX,
                imgY,
                imgWidth * ratio,
                imgHeight * ratio
            );

            pdf.save(`${offer?.invoice_id}.pdf`);
        });
    };

    return (
        <main className="py-5 container">
            <div className="row mb-5">
                <div className="col-4 mx-auto">
                    <button
                        type="button"
                        className="btn btn-primary w-75 d-flex gap-3 align-items-center justify-content-center"
                        onClick={downloadPDF}
                    >
                        <BiCloudDownload size="1.5rem" />
                        {t("buyer_pages.offers_invoice.download")}
                    </button>
                </div>
                <div className="col-4 mx-auto">
                    <button
                        type="button"
                        className="btn btn-success w-75 d-flex gap-3 align-items-center justify-content-center"
                        onClick={approveOffer}
                    >
                        <BsClipboard2CheckFill size="1.5rem" />
                        {t("buyer_pages.offers_invoice.approve")}
                    </button>
                </div>
                <div className="col-4 mx-auto">
                    <button
                        type="button"
                        className="btn btn-danger w-75 d-flex gap-3 align-items-center justify-content-center"
                        onClick={declineOffer}
                    >
                        <CgCloseR size="1.5rem" />
                        {t("buyer_pages.offers_invoice.decline")}
                    </button>
                </div>
            </div>

            <div className="invoice" ref={pdfRef}>
                <div className="top_line"></div>
                <div className="header">
                    <div className="i_row">
                        <div className="i_logo">
                            <p>Medex</p>
                        </div>
                        <div className="i_title">
                            <h2>{t("buyer_pages.offers_invoice.invoice")}</h2>
                            <p className="p_title text_right">
                                {new Date(offer?.created).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <div className="i_row">
                        <div className="i_number">
                            <p className="p_title">NO: {offer?.invoice_id}</p>
                        </div>
                        <div className="i_address text_right">
                            <p>{t("buyer_pages.offers_invoice.to")}</p>
                            <p className="p_title">
                                {offer?.quote_obj?.user?.full_name}
                            </p>
                            <p>
                                {offer?.quote_obj?.user?.shipping_address
                                    ?.address_1 &&
                                    offer?.quote_obj?.user?.shipping_address
                                        ?.address_1 + ", "}
                                {offer?.quote_obj?.user?.shipping_address
                                    ?.address_2 &&
                                    offer?.quote_obj?.user?.shipping_address
                                        ?.address_2 + ", "}
                                {offer?.quote_obj?.user?.shipping_address
                                    ?.state &&
                                    offer?.quote_obj?.user?.shipping_address
                                        ?.state + ", "}
                                {offer?.quote_obj?.user?.shipping_address
                                    ?.city &&
                                    offer?.quote_obj?.user?.shipping_address
                                        ?.city + ", "}
                                {offer?.quote_obj?.user?.shipping_address
                                    ?.postal_code &&
                                    offer?.quote_obj?.user?.shipping_address
                                        ?.postal_code}
                            </p>
                            <p>
                                {
                                    offer?.quote_obj?.user?.shipping_address
                                        ?.country
                                }
                            </p>
                        </div>
                    </div>
                </div>
                <div className="body">
                    <div className="i_table">
                        <div className="i_table_head">
                            <div className="i_row">
                                <div className="i_col w_15">
                                    <p className="p_title">
                                        {t("buyer_pages.offers_invoice.qty")}
                                    </p>
                                </div>
                                <div className="i_col w_55">
                                    <p className="p_title">
                                        {t("buyer_pages.offers_invoice.desc")}
                                    </p>
                                </div>
                                <div className="i_col w_15">
                                    <p className="p_title">
                                        {t("buyer_pages.offers_invoice.price")}
                                    </p>
                                </div>
                                <div className="i_col w_15">
                                    <p className="p_title">
                                        {t("buyer_pages.offers_invoice.tax")} %
                                    </p>
                                </div>
                                <div className="i_col w_15">
                                    <p className="p_title">
                                        {t("buyer_pages.offers_invoice.total")}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="i_table_body">
                            <div className="i_row">
                                <div className="i_col w_15">
                                    <p>{offer?.quantity}</p>
                                </div>
                                <div className="i_col w_55">
                                    <p>{offer?.quote_obj?.product_name}</p>
                                </div>
                                <div className="i_col w_15">
                                    <p>
                                        {offer?.product_price} {t("sar")}
                                    </p>
                                </div>
                                <div className="i_col w_15">
                                    <p>{offer?.tax} %</p>
                                </div>
                                <div className="i_col w_15">
                                    <p>
                                        {offer?.product_price *
                                            offer?.quantity +
                                            (offer?.product_price *
                                                offer?.quantity *
                                                offer?.tax) /
                                                100}{" "}
                                        {t("sar")}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="i_table_foot">
                            <div className="i_row">
                                <div className="i_col w_15">
                                    <p></p>
                                </div>
                                <div className="i_col w_55">
                                    <p></p>
                                </div>
                                <div className="i_col w_15">
                                    <p>{t("buyer_pages.cart.subtotal")}</p>
                                    <p>
                                        {t("buyer_pages.offers_invoice.tax")}{" "}
                                        {offer?.tax} %
                                    </p>
                                </div>
                                <div className="i_col w_15">
                                    <p>
                                        {offer?.product_price * offer?.quantity}{" "}
                                        {t("sar")}
                                    </p>
                                    <p>
                                        {(offer?.product_price *
                                            offer?.quantity *
                                            offer?.tax) /
                                            100}{" "}
                                        {t("sar")}
                                    </p>
                                </div>
                            </div>
                            <div className="i_row grand_total_wrap">
                                <div className="i_col w_50"></div>
                                <div className="i_col w_50 grand_total">
                                    <p>
                                        <span>
                                            {t(
                                                "buyer_pages.offers_invoice.total"
                                            )}
                                            :
                                        </span>
                                        <span>
                                            {offer?.product_price *
                                                offer?.quantity +
                                                (offer?.product_price *
                                                    offer?.quantity *
                                                    offer?.tax) /
                                                    100}{" "}
                                            {t("sar")}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <div className="i_row">
                        <div className="col-3">
                            <p className="p_title">
                                {t("buyer_pages.offers_invoice.method")}
                            </p>
                            <p>{offer?.payment_type}</p>
                        </div>
                        {offer?.notes && (
                            <div className="col-6">
                                <p className="p_title">
                                    {t("buyer_pages.offers_invoice.notes")}
                                </p>
                                <p>{offer?.notes}</p>
                            </div>
                        )}
                        <div className="col-3">
                            <p className="p_title">
                                {t("buyer_pages.offers_invoice.status")}
                            </p>
                            <p>{offer?.status_display}</p>
                        </div>
                    </div>
                </div>
                <div className="bottom_line"></div>
            </div>
        </main>
    );
};

export default OfferInvoice;
