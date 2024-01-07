import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { MdList } from "react-icons/md";
import { CiTimer } from "react-icons/ci";
import { CgMenuMotion } from "react-icons/cg";
import { AiOutlineFileText } from "react-icons/ai";
import { LuView } from "react-icons/lu";
import { BsCalendar2Date } from "react-icons/bs";

import userImage from "../../assets/images/user.png";

import useAxios from "../../utils/useAxios";
import { useTranslation } from "react-i18next";

const QuoteList = () => {
    const { t } = useTranslation();

    const api = useAxios();

    const [quotes, setQuotes] = useState({});
    const [selectedQuote, setSelectedQuote] = useState("");

    const getQuotes = async () => {
        await api
            .get(import.meta.env.VITE_BACKEND_URL + "/api/quote/")
            .then((res) => {
                setQuotes(res.data);
            });
    };

    useEffect(() => {
        getQuotes();
    }, []);

    return (
        <main className="py-5 w-100">
            <section>
                <div className="container">
                    <div className="row">
                        <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                            <MdList size="2.5rem" />
                            {t("buyer_pages.quote_requests.all")}
                        </h2>
                    </div>
                    <div className="row mt-3">
                        {quotes.length > 0 ? (
                            <>
                                <div
                                    className="col-12 col-md-5"
                                    id="list-tab"
                                    role="tablist"
                                >
                                    {quotes.map((quote) => {
                                        return (
                                            <Link
                                                className={`list-group-item list-group-item-action `}
                                                id={`list-${quote.id}-list`}
                                                data-bs-toggle={
                                                    window.innerWidth < 768
                                                        ? ""
                                                        : "list"
                                                }
                                                to={
                                                    window.innerWidth < 768
                                                        ? `/supplier/quotes/${quote.id}`
                                                        : `#list-${quote.id}`
                                                }
                                                state={{ quote: quote }}
                                                role={
                                                    window.innerWidth < 768
                                                        ? ""
                                                        : "tab"
                                                }
                                                aria-controls={
                                                    window.innerWidth < 768
                                                        ? ""
                                                        : `list-${quote.id}`
                                                }
                                                key={quote.id}
                                                onClick={() =>
                                                    setSelectedQuote(quote)
                                                }
                                            >
                                                <div
                                                    className={`card mb-2 shadow p-2 ${
                                                        selectedQuote.id ==
                                                        quote.id
                                                            ? "bg-primary text-white"
                                                            : ""
                                                    }`}
                                                >
                                                    <div className="row">
                                                        <div className="col-2 col-md-1 my-auto">
                                                            <img
                                                                src={
                                                                    quote.user
                                                                        .profile
                                                                        .profilePicture
                                                                        ? import.meta
                                                                              .env
                                                                              .VITE_BACKEND_URL +
                                                                          quote
                                                                              .user
                                                                              .profile
                                                                              .profilePicture
                                                                        : userImage
                                                                }
                                                                alt="User"
                                                                className=" rounded-circle border"
                                                                width={50}
                                                                height={50}
                                                            />
                                                        </div>
                                                        <div className="col-9 col-md-10 mx-2">
                                                            <div className="card-body">
                                                                <h6 className="card-title dashboard__quote-title">
                                                                    {
                                                                        quote.product_name
                                                                    }
                                                                </h6>
                                                                <span className="card-text dashboard__quote-text">
                                                                    {quote.requirements.substring(
                                                                        0,
                                                                        30
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <div className="d-flex align-items-center gap-2 dashboard__quote-info">
                                                            <CgMenuMotion size=".8rem" />
                                                            {quote.quantity}{" "}
                                                            {quote.unit_display}
                                                        </div>
                                                        <div className="d-flex align-items-center gap-2 dashboard__quote-info">
                                                            <CiTimer size=".8rem" />
                                                            {
                                                                quote.created_since
                                                            }{" "}
                                                            {t("ago")}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                                <div className="col-7 d-none d-md-block">
                                    <div
                                        className="tab-content mb-5"
                                        id="nav-tabContent"
                                    >
                                        {quotes.map((quote) => {
                                            return (
                                                <div
                                                    className={`tab-pane fade ${
                                                        selectedQuote.id ==
                                                        quote.id
                                                            ? "active show"
                                                            : ""
                                                    }`}
                                                    id={`list-${quote.id}`}
                                                    role="tabpanel"
                                                    aria-labelledby={`list-${quote.id}-list`}
                                                    key={quote.id}
                                                >
                                                    <div className="card p-3 shadow">
                                                        <div className="d-flex align-items-center gap-4 mb-3">
                                                            <img
                                                                src={
                                                                    quote.user
                                                                        .profile
                                                                        .profilePicture
                                                                        ? import.meta
                                                                              .env
                                                                              .VITE_BACKEND_URL +
                                                                          quote
                                                                              .user
                                                                              .profile
                                                                              .profilePicture
                                                                        : userImage
                                                                }
                                                                alt="User"
                                                                className=" rounded-circle border"
                                                                width={80}
                                                                height={80}
                                                            />

                                                            <div className="d-flex flex-column gap-2">
                                                                <h4 className="m-0">
                                                                    {
                                                                        quote
                                                                            .user
                                                                            .full_name
                                                                    }
                                                                </h4>
                                                                <p className="m-0">
                                                                    {
                                                                        quote
                                                                            .user
                                                                            .email
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <h5 className="mb-3">
                                                            {quote.product_name}
                                                        </h5>
                                                        <p className="mb-3">
                                                            {quote.requirements}
                                                        </p>
                                                        <h5 className="fw-bold mb-3">
                                                            {t(
                                                                "buyer_pages.quote_requests.det"
                                                            )}
                                                        </h5>
                                                        <ul className="list-group">
                                                            <li className="list-group-item d-flex align-items-center gap-2">
                                                                <CgMenuMotion />
                                                                {t(
                                                                    "buyer_pages.cart.qty"
                                                                )}
                                                                : &nbsp;
                                                                {
                                                                    quote.quantity
                                                                }{" "}
                                                                {
                                                                    quote.unit_display
                                                                }
                                                            </li>
                                                            <li className="list-group-item d-flex align-items-center gap-2">
                                                                <CiTimer />
                                                                {t(
                                                                    "buyer_pages.quote_requests.add"
                                                                )}
                                                                : &nbsp;
                                                                {
                                                                    quote.created_since
                                                                }{" "}
                                                                {t("ago")}
                                                            </li>
                                                            <li className="list-group-item d-flex align-items-center gap-2">
                                                                <BsCalendar2Date />
                                                                {t(
                                                                    "shared.rfq.due_date"
                                                                )}
                                                                : &nbsp;
                                                                {
                                                                    quote.due_date_display
                                                                }{" "}
                                                                -{" "}
                                                                {
                                                                    quote.due_time_display
                                                                }
                                                            </li>
                                                            {quote?.attachments
                                                                .length > 0 &&
                                                                quote.attachments.map(
                                                                    (
                                                                        attachment,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <li
                                                                                className="list-group-item"
                                                                                key={
                                                                                    index
                                                                                }
                                                                            >
                                                                                <Link
                                                                                    to={
                                                                                        import.meta
                                                                                            .env
                                                                                            .VITE_BACKEND_URL +
                                                                                        attachment.attachment
                                                                                    }
                                                                                    className=" d-flex align-items-center gap-2"
                                                                                >
                                                                                    <AiOutlineFileText />
                                                                                    {t(
                                                                                        "buyer_pages.quote_requests.att"
                                                                                    )}{" "}
                                                                                    {index +
                                                                                        1}
                                                                                </Link>
                                                                            </li>
                                                                        );
                                                                    }
                                                                )}
                                                        </ul>
                                                        <hr />
                                                        <h5 className="fw-bold mb-3">
                                                            {t(
                                                                "buyer_pages.quote_requests.income"
                                                            )}
                                                        </h5>
                                                        <Link
                                                            to={`/account/quotes/${selectedQuote.id}`}
                                                            className="btn btn-primary d-flex align-items-center gap-2 justify-content-center"
                                                        >
                                                            <LuView size="1.4rem" />
                                                            {t(
                                                                "buyer_pages.quote_requests.view_inc"
                                                            )}
                                                        </Link>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p className="text-center">
                                {t("buyer_pages.quote_requests.none")}!
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default QuoteList;
