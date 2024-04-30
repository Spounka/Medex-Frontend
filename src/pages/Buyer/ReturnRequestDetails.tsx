import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";

import useAxios from "../../utils/useAxios";

import { FcInfo } from "react-icons/fc";
import { RiFileImageLine } from "react-icons/ri";

import userImage from "../../assets/images/user.png";

const ReturnRequestDetails: React.FC = () => {
    const { t } = useTranslation();

    const api = useAxios();

    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    const [request, setRequest] = useState({});

    const getRequest = async () => {
        let requestState = location?.state;

        if (requestState) {
            setRequest(location?.state);
        } else {
            const requestID = params?.id;

            try {
                const response = await api.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/order/return/${requestID}`,
                );
                setRequest(response.data);
            } catch (err) {
                navigate("/not-found/");
            }
        }

        console.log(request);
    };

    useEffect(() => {
        getRequest();
    }, []);

    return (
        <main className="container">
            <section className="py-3">
                <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                    {t("buyer_pages.return_request_details.title")}
                </h2>

                <div className="row mt-3 mb-5">
                    <div className="col-12 col-md-8">
                        <div className="card shadow-sm rounded-lg">
                            <div className="card-body">
                                <div className="d-flex align-items-center gap-3">
                                    <div>
                                        <img
                                            src={
                                                request?.user?.profile?.profile_picture
                                                    ? import.meta.env.VITE_BACKEND_URL +
                                                      request?.user?.profile
                                                          ?.profile_picture
                                                    : userImage
                                            }
                                            alt="Picture"
                                            id="userProfilePicture"
                                            className="rounded-circle shadow-sm border-2 object-fit-contain"
                                            style={{ height: "90px" }}
                                            width={90}
                                        />
                                    </div>
                                    <div className="d-flex flex-column gap-2">
                                        <h6 className="fw-bold">
                                            {request?.user?.full_name}
                                        </h6>
                                        <small>
                                            <a
                                                href={`mailto:${request?.user?.email}`}
                                                className="text-primary"
                                            >
                                                {request?.user?.email}
                                            </a>
                                        </small>
                                        <small>
                                            {t(
                                                "buyer_pages.return_request_details.customer_join",
                                                { date: request?.user?.created_date },
                                            )}
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="card-body mt-1">
                                <div className="d-flex flex-column gap-3">
                                    <h6 className="fw-bold">
                                        {t("buyer_pages.return_request_details.comment")}
                                    </h6>
                                    <small>{request?.description}</small>
                                </div>
                            </div>
                        </div>

                        <div className="card shadow-sm rounded-lg mt-3">
                            <div className="card-body">
                                <div className="d-flex align-items-center gap-2">
                                    <FcInfo size="1.5rem" />
                                    <h6 className="fw-bold">
                                        {t(
                                            "buyer_pages.return_request_details.return_requested",
                                        )}
                                    </h6>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mt-3">
                                    <div className="d-flex align-items-center gap-2">
                                        <div>
                                            <img
                                                src={request?.product?.product?.thumbnail}
                                                alt="Product"
                                                className="rounded object-fit-contain"
                                                style={{ height: "90px" }}
                                                width={90}
                                            />
                                        </div>
                                        <div className="d-flex flex-column gap-2">
                                            <h6 className="fw-bold">
                                                {request?.product?.product?.name}
                                            </h6>
                                            <small>
                                                {t(
                                                    "buyer_pages.return_request_details.reason",
                                                )}
                                                :{" "}
                                                {request?.reason == "POO" &&
                                                    t("buyer_pages.return_request.poor")}
                                                {request?.reason == "WRO" &&
                                                    t("buyer_pages.return_request.wrong")}
                                                {request?.reason == "ADD" &&
                                                    t(
                                                        "buyer_pages.return_request.address",
                                                    )}
                                            </small>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center gap-3">
                                        <div className="d-flex flex-column gap-1 text-center">
                                            <small className="text-muted">
                                                {t("buyer_pages.cart.qty")}
                                            </small>
                                            <small>{request?.product?.quantity}</small>
                                        </div>
                                        <div className="d-flex flex-column gap-1 text-center">
                                            <small className="text-muted">
                                                {t("buyer_pages.cart.total")}
                                            </small>
                                            <small>
                                                {request?.product?.total_price} {t("sar")}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="card-body mt-1">
                                <div className="d-flex flex-column gap-3">
                                    <h6 className="fw-bold">
                                        {t("buyer_pages.return_request.evidence")}
                                    </h6>
                                    <div className="d-flex align-items-center gap-1">
                                        {request?.evidence_files?.map((file) => {
                                            return (
                                                <Link
                                                    to={
                                                        import.meta.env.VITE_BACKEND_URL +
                                                        file.evidence_file
                                                    }
                                                    target="_blank"
                                                    key={file.evidence_files}
                                                >
                                                    <RiFileImageLine size="1.5rem" />
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mt-3 mt-md-0">
                        <div className="card shadow-sm rounded-lg">
                            <div className="card-body">
                                <h6 className="fw-bold">
                                    {t("buyer_pages.return_request_details.summary")}
                                </h6>
                                <div className="d-flex flex-column gap-2 mt-3">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <small className="text-muted">
                                            {t("shared.wallet.status")}
                                        </small>
                                        <small>
                                            {request?.status == "APP" &&
                                                t(
                                                    "buyer_pages.return_request_details.app",
                                                )}
                                            {request?.status == "APR" &&
                                                t(
                                                    "buyer_pages.return_request_details.apr",
                                                )}
                                            {request?.status == "DEC" &&
                                                t(
                                                    "buyer_pages.return_request_details.dec",
                                                )}
                                            {request?.status == "OTW" &&
                                                t("buyer_pages.order_details.otw")}
                                            {request?.status == "CMP" &&
                                                t(
                                                    "buyer_pages.return_request_details.cmp",
                                                )}
                                        </small>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <small className="text-muted">
                                            {t(
                                                "buyer_pages.return_request_details.order",
                                            )}
                                        </small>
                                        <small># {request?.product?.id}</small>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="d-flex align-items-center justify-content-between">
                                        <small className="fw-bold">
                                            {t("buyer_pages.cart.total")}
                                        </small>
                                        <small>
                                            {request?.product?.total_price} {t("sar")}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ReturnRequestDetails;
