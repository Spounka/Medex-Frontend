import { useEffect, useState } from "react";
import { BiSolidInfoCircle } from "react-icons/bi";
import useAxios from "../../utils/useAxios";

import { Link, useParams } from "react-router-dom";

import userImage from "../../assets/images/user.png";
import { useTranslation } from "react-i18next";

const OfferList = () => {
    const { t } = useTranslation();

    const api = useAxios();

    const params = useParams();

    const { id } = params;

    const [offers, setOffers] = useState([]);

    const getOffers = async () => {
        await api
            .get(import.meta.env.VITE_BACKEND_URL + `/api/quote/offer/?id=${id}`)
            .then((res) => {
                setOffers(res.data);
            });
    };

    useEffect(() => {
        getOffers();
    }, []);

    return (
        <main className="py-5 w-100">
            <section className="container">
                <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                    {t("buyer_pages.offers_list.list")}
                </h2>
                <div className="row">
                    {offers.length > 0 ? (
                        offers.map((offer) => {
                            return (
                                <div
                                    className="col-12 mt-4"
                                    key={offer.id}
                                >
                                    <Link
                                        to={`/account/dashboard/quotes/offers/${offer.id}/invoice`}
                                        className="w-100"
                                        state={{ offer: offer }}
                                    >
                                        <div className="card p-3 shadow">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-4">
                                                    <img
                                                        src={
                                                            offer.user.profile
                                                                .profile_picture
                                                                ? import.meta.env
                                                                      .VITE_BACKEND_URL +
                                                                  offer.user.profile
                                                                      .profile_picture
                                                                : userImage
                                                        }
                                                        alt="User"
                                                        className="object-fit-contain rounded-circle border"
                                                        width={60}
                                                        height={60}
                                                    />

                                                    <div className="d-flex flex-column gap-2">
                                                        <h4 className="m-0">
                                                            {offer.user.full_name}
                                                        </h4>
                                                        <p className="m-0">
                                                            {offer.quote_obj.product_name}{" "}
                                                            * {offer.quantity}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`badge p-2 fw-bold d-flex align-items-center gap-1 ${
                                                        offer.status === "P"
                                                            ? "bg-secondary"
                                                            : offer.status === "A"
                                                              ? "bg-success"
                                                              : "bg-danger"
                                                    }`}
                                                >
                                                    <BiSolidInfoCircle size="1rem" />
                                                    {t("buyer_pages.offers_list.status")}:
                                                    &nbsp; {offer.status_display}
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
