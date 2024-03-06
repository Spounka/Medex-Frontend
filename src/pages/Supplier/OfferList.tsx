import { useEffect, useState } from "react";
import { BiSolidOffer, BiSolidInfoCircle } from "react-icons/bi";
import useAxios from "../../utils/useAxios";

import { Link } from "react-router-dom";

import userImage from "../../assets/images/user.png";
import { useTranslation } from "react-i18next";

const OfferList = () => {
    const { t } = useTranslation();

    const api = useAxios();

    const [offers, setOffers] = useState([]);

    const getOffers = async () => {
        await api
            .get(import.meta.env.VITE_BACKEND_URL + "/api/quote/offer/")
            .then((res) => {
                setOffers(res.data);
            });
    };

    useEffect(() => {
        getOffers();
    }, []);

    return (
        <main className="px-0 px-md-3">
            <section className="container">
                <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                    <BiSolidOffer size="2.5rem" />
                    {t("supplier_sidebar.offers_list")}
                </h2>
                <div className="row">
                    {offers.length > 0 ? (
                        offers.map((offer) => {
                            return (
                                <div className="col-12 mt-4" key={offer.id}>
                                    <Link
                                        to={`/supplier/offer/invoice/${offer.id}`}
                                        className="w-100"
                                    >
                                        <div className="card p-3 shadow">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-4">
                                                    <img
                                                        src={
                                                            offer.quote_obj.user
                                                                .profile
                                                                .profilePicture
                                                                ? import.meta
                                                                      .env
                                                                      .VITE_BACKEND_URL +
                                                                  offer
                                                                      .quote_obj
                                                                      .user
                                                                      .profile
                                                                      .profilePicture
                                                                : userImage
                                                        }
                                                        alt="User"
                                                        className=" rounded-circle border"
                                                        width={60}
                                                        height={60}
                                                    />

                                                    <div className="d-flex flex-column gap-2">
                                                        <h4 className="m-0">
                                                            {
                                                                offer.quote_obj
                                                                    .user
                                                                    .full_name
                                                            }
                                                        </h4>
                                                        <p className="m-0">
                                                            {
                                                                offer.quote_obj
                                                                    .product_name
                                                            }{" "}
                                                            * {offer.quantity}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`badge p-2 fw-bold d-flex align-items-center gap-1 ${
                                                        offer.status === "P"
                                                            ? "bg-secondary"
                                                            : offer.status ===
                                                              "A"
                                                            ? "bg-success"
                                                            : "bg-danger"
                                                    }`}
                                                >
                                                    <BiSolidInfoCircle size="1rem" />
                                                    {t(
                                                        "buyer_pages.offers_list.status"
                                                    )}
                                                    : &nbsp;{" "}
                                                    {offer.status_display}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })
                    ) : (
                        <p className="mt-3 text-center">
                            {t("buyer_pages.offers_list.none")}!
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
};

export default OfferList;
