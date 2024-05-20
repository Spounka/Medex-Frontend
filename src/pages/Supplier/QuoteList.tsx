import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
    MdOutlinePostAdd,
    MdOutlineGrid3X3,
    MdLocationCity,
    MdOutlineLocationOn,
} from "react-icons/md";
import { CiTimer } from "react-icons/ci";
import { CgMenuMotion } from "react-icons/cg";
import {
    AiOutlineFileText,
    AiOutlineSafetyCertificate,
    AiOutlineCreditCard,
    AiOutlineFolderView,
} from "react-icons/ai";
import { BiMoneyWithdraw } from "react-icons/bi";
import { GrMoney, GrNote } from "react-icons/gr";
import { RiSendPlaneLine } from "react-icons/ri";
import {
    BsCalendarDate,
    BsGlobeEuropeAfrica,
    BsSignpost2,
    BsCalendar2Date,
} from "react-icons/bs";
import { TfiLocationArrow } from "react-icons/tfi";

import {
    CitySelect,
    CountrySelect,
    StateSelect,
    GetState,
    GetCity,
} from "react-country-state-city";

import "react-country-state-city/dist/react-country-state-city.css";

import CreatableSelect from "react-select/creatable";

import userImage from "../../assets/images/user.png";

import useAxios from "../../utils/useAxios";

import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Quote } from "@domain/quote.ts";

const QuoteList = () => {
    const { t } = useTranslation();

    const api = useAxios();

    const [brands, setBrands] = useState([]);

    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [selectedQuote, setSelectedQuote] = useState("");

    const [brand, setBrand] = useState([]);
    const [notes, setNotes] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [productPrice, setProductPrice] = useState(0.0);
    const [totalPrice, setTotalPrice] = useState(0.0);
    const [country, setCountry] = useState({});
    const [state, setState] = useState({});
    const [city, setCity] = useState({});
    const [postalCode, setPostalCode] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [tax, setTax] = useState(0.0);
    const [deliveryDate, setDeliveryDate] = useState([]);
    const [paymentType, setPaymentType] = useState([]);

    const [showDownloadBtn, setShowDownloadBtn] = useState(false);
    const [offerInvoice, setOfferInvoice] = useState({});

    const handleReset = () => {
        setBrand([]);
        setNotes("");
        setQuantity(0);
        setProductPrice(0.0);
        setTax(0.0);
        setTotalPrice(0.0);
        setCountry({});
        setState({});
        setCity({});
        setPostalCode("");
        setAddress1("");
        setAddress2("");
        setDeliveryDate([]);
        setPaymentType("");
    };

    const fetchBrands = async () => {
        const response = await api.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/product/brand`,
        );
        const brandOptions = response.data.map((brand) => ({
            value: brand.slug,
            label: brand.name,
        }));
        setBrands(brandOptions);
    };

    const getQuotes = async () => {
        await api
            .get<Quote[]>(import.meta.env.VITE_BACKEND_URL + "/api/quote/")
            .then((res) => {
                setQuotes(res.data);
            });
    };

    useEffect(() => {
        getQuotes();
        fetchBrands();
    }, []);

    const handleSubmit = async (e, quote) => {
        e.preventDefault();

        const delivery_address = {
            country: country.name,
            state: state?.name || "",
            city: city?.name || "",
            postal_code: postalCode,
            address_1: address1,
            address_2: address2,
        };

        const formData = new FormData();
        formData.append("quote", quote);
        formData.append("delivery_address", JSON.stringify(delivery_address));
        formData.append("brand", brand);
        formData.append("quantity", quantity);
        formData.append("product_price", parseFloat(productPrice).toFixed(2));
        formData.append("total_price", parseFloat(totalPrice).toFixed(2));
        formData.append("tax", parseFloat(tax).toFixed(2));
        formData.append("delivery_date", deliveryDate);
        formData.append("payment_type", paymentType);
        formData.append("notes", notes);

        await api
            .post(import.meta.env.VITE_BACKEND_URL + "/api/quote/offer/", formData)
            .then((res) => {
                setShowDownloadBtn(() => !showDownloadBtn);

                setOfferInvoice(res.data);

                handleReset();

                toast.success(`${t("supplier_pages.quote_list.success")}!`);
            })
            .catch(() => {
                toast.error(`${t("supplier_pages.quote_list.err")}!`);
            });
    };

    const brandStyles = {
        option: (styles) => {
            return {
                ...styles,
                backgroundColor: "white",
                color: "#131341",
                ":active": {
                    backgroundColor: "#6842ef",
                    color: "white",
                },
            };
        },
    };

    useEffect(() => {
        const total = productPrice * (1 + tax / 100);
        setTotalPrice(total);
    }, [productPrice, tax]);

    return (
        <main className="px-0 px-md-3">
            <section>
                <div className="container">
                    <div className="row">
                        <h2 className="fw-bold dashboard__title">
                            {t("supplier_pages.quote_list.title")}
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
                                                    window.innerWidth < 768 ? "" : "list"
                                                }
                                                to={
                                                    window.innerWidth < 768
                                                        ? `/supplier/quotes/${quote.id}`
                                                        : `#list-${quote.id}`
                                                }
                                                state={{ quote: quote }}
                                                role={
                                                    window.innerWidth < 768 ? "" : "tab"
                                                }
                                                aria-controls={
                                                    window.innerWidth < 768
                                                        ? ""
                                                        : `list-${quote.id}`
                                                }
                                                key={quote.id}
                                                onClick={() => setSelectedQuote(quote)}
                                            >
                                                <div
                                                    className={`card mb-2 shadow p-2 ${
                                                        selectedQuote.id == quote.id
                                                            ? "tw-bg-black tw-text-white"
                                                            : ""
                                                    }`}
                                                >
                                                    <div className="row">
                                                        <div className="col-2 col-md-1 my-auto">
                                                            <img
                                                                src={
                                                                    quote.user.profile
                                                                        .profile_picture
                                                                        ? import.meta.env
                                                                              .VITE_BACKEND_URL +
                                                                          quote.user
                                                                              .profile
                                                                              .profile_picture
                                                                        : userImage
                                                                }
                                                                alt="User"
                                                                className="object-fit-contain rounded-circle border"
                                                                width={50}
                                                                height={50}
                                                            />
                                                        </div>
                                                        <div className="col-9 col-md-10 mx-2">
                                                            <div className="card-body">
                                                                <h6 className="card-title dashboard__quote-title">
                                                                    {quote.product_name}
                                                                </h6>
                                                                <span className="card-text dashboard__quote-text">
                                                                    {quote?.requirements?.substring(
                                                                        0,
                                                                        30,
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
                                                            {quote.created_since}{" "}
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
                                                        selectedQuote.id == quote.id
                                                            ? "active show"
                                                            : ""
                                                    }`}
                                                    id={`list-${quote.id}`}
                                                    role="tabpanel"
                                                    aria-labelledby={`list-${quote.id}-list`}
                                                    key={quote.id}
                                                >
                                                    <div className="card p-3 shadow tw-flex tw-flex-col tw-gap-4">
                                                        <div className="d-flex align-items-center gap-4">
                                                            <img
                                                                src={
                                                                    quote.user.profile
                                                                        .profile_picture
                                                                        ? import.meta.env
                                                                              .VITE_BACKEND_URL +
                                                                          quote.user
                                                                              .profile
                                                                              .profile_picture
                                                                        : userImage
                                                                }
                                                                alt="User"
                                                                className="object-fit-contain rounded-circle border"
                                                                width={80}
                                                                height={80}
                                                            />

                                                            <div className="d-flex flex-column gap-2">
                                                                <h4 className="m-0">
                                                                    {quote.user.full_name}
                                                                </h4>
                                                                <p className="m-0">
                                                                    {quote.user.email}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="tw-flex tw-flex-col tw-gap-2">
                                                            <h5 className="fw-bold mb-3">
                                                                {t(
                                                                    "buyer_pages.quote_requests.det",
                                                                )}
                                                            </h5>
                                                            <ul className="list-group">
                                                                <li className="list-group-item d-flex align-items-center gap-2">
                                                                    <CgMenuMotion />
                                                                    {t(
                                                                        "buyer_pages.cart.qty",
                                                                    )}
                                                                    : &nbsp;
                                                                    {quote.quantity}{" "}
                                                                    {quote.unit_display}
                                                                </li>
                                                                <li className="list-group-item d-flex align-items-center gap-2">
                                                                    <CiTimer />
                                                                    {t(
                                                                        "buyer_pages.quote_requests.added",
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
                                                                        "shared.rfq.due_date",
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
                                                                    ?.length > 0 &&
                                                                    quote.attachments?.map(
                                                                        (
                                                                            attachment,
                                                                            index,
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
                                                                                            "buyer_pages.quote_requests.att",
                                                                                        )}{" "}
                                                                                        {index +
                                                                                            1}
                                                                                    </Link>
                                                                                </li>
                                                                            );
                                                                        },
                                                                    )}
                                                            </ul>
                                                        </div>
                                                        <hr />
                                                        <div className="tw-flex tw-flex-col tw-gap-2">
                                                            <h5 className="fw-bold">
                                                                {t(
                                                                    "supplier_pages.quote_list.offer",
                                                                )}
                                                            </h5>
                                                            <button
                                                                type="button"
                                                                className="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-rounded-md tw-bg-black tw-px-4 tw-py-2 tw-text-white"
                                                                data-bs-toggle="modal"
                                                                data-bs-target={`#offerModal-${quote.id}`}
                                                                onClick={() =>
                                                                    document
                                                                        .querySelector(
                                                                            "#country .stdropdown-input>input",
                                                                        )
                                                                        .setAttribute(
                                                                            "required",
                                                                            true,
                                                                        )
                                                                }
                                                            >
                                                                {t(
                                                                    "supplier_pages.quote_list.submit",
                                                                )}
                                                                <MdOutlinePostAdd size="1.2rem" />
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="modal fade"
                                                            id={`offerModal-${quote.id}`}
                                                            tabIndex="-1"
                                                            aria-labelledby={`offerModalLabel${quote.id}`}
                                                            aria-hidden="true"
                                                        >
                                                            <div className="modal-dialog">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h1
                                                                            className="modal-title fs-5"
                                                                            id={`offerModalLabel${quote.id}`}
                                                                        >
                                                                            {t(
                                                                                "supplier_pages.quote_list.submit",
                                                                            )}
                                                                        </h1>
                                                                        <button
                                                                            type="button"
                                                                            className="btn-close"
                                                                            data-bs-dismiss="modal"
                                                                            aria-label="Close"
                                                                        ></button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <form
                                                                            onSubmit={(
                                                                                e,
                                                                            ) =>
                                                                                handleSubmit(
                                                                                    e,
                                                                                    quote.id,
                                                                                )
                                                                            }
                                                                        >
                                                                            <div className="mb-3">
                                                                                <label
                                                                                    htmlFor="quantity"
                                                                                    className="form-label d-flex align-items-center gap-2"
                                                                                >
                                                                                    <MdOutlineGrid3X3 size="1.4rem" />
                                                                                    {t(
                                                                                        "supplier_pages.quote_list.qty",
                                                                                    )}
                                                                                    *
                                                                                </label>
                                                                                <input
                                                                                    type="number"
                                                                                    id="quantity"
                                                                                    className="form-control"
                                                                                    placeholder={`${t(
                                                                                        "supplier_pages.quote_list.qty_plc",
                                                                                    )}...`}
                                                                                    required
                                                                                    min={
                                                                                        0
                                                                                    }
                                                                                    value={
                                                                                        quantity
                                                                                    }
                                                                                    onChange={(
                                                                                        e,
                                                                                    ) =>
                                                                                        setQuantity(
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <label
                                                                                    htmlFor="brand"
                                                                                    className="form-label d-flex align-items-center gap-2"
                                                                                >
                                                                                    <AiOutlineSafetyCertificate size="1.4rem" />
                                                                                    {t(
                                                                                        "supplier_pages.quote_list.brand",
                                                                                    )}
                                                                                    *
                                                                                </label>
                                                                                <CreatableSelect
                                                                                    required
                                                                                    isClearable={
                                                                                        true
                                                                                    }
                                                                                    placeholder={`${t(
                                                                                        "supplier_pages.quote_list.sel_brand",
                                                                                    )}...`}
                                                                                    isSearchable={
                                                                                        true
                                                                                    }
                                                                                    name="brand"
                                                                                    options={
                                                                                        brands
                                                                                    }
                                                                                    styles={
                                                                                        brandStyles
                                                                                    }
                                                                                    defaultValue={
                                                                                        brand
                                                                                    }
                                                                                    onChange={(
                                                                                        e,
                                                                                    ) => {
                                                                                        setBrand(
                                                                                            e?.value ||
                                                                                                "",
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <label
                                                                                    htmlFor="product_price"
                                                                                    className="form-label d-flex align-items-center gap-2"
                                                                                >
                                                                                    <BiMoneyWithdraw size="1.4rem" />
                                                                                    {t(
                                                                                        "supplier_pages.quote_list.price_one",
                                                                                    )}
                                                                                    *
                                                                                </label>
                                                                                <input
                                                                                    type="number"
                                                                                    id="product_price"
                                                                                    className="form-control"
                                                                                    placeholder={`${t(
                                                                                        "supplier_pages.quote_list.price_one_plc",
                                                                                    )}...`}
                                                                                    required
                                                                                    min={
                                                                                        0
                                                                                    }
                                                                                    value={
                                                                                        productPrice
                                                                                    }
                                                                                    onChange={(
                                                                                        e,
                                                                                    ) =>
                                                                                        setProductPrice(
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </div>

                                                                            <div className="mb-3">
                                                                                <label
                                                                                    htmlFor="tax"
                                                                                    className="form-label d-flex align-items-center gap-2"
                                                                                >
                                                                                    <GrMoney size="1.4rem" />
                                                                                    {t(
                                                                                        "supplier_pages.quote_list.tax",
                                                                                    )}
                                                                                    % *
                                                                                </label>
                                                                                <input
                                                                                    type="number"
                                                                                    id="tax"
                                                                                    className="form-control"
                                                                                    placeholder={`${t(
                                                                                        "supplier_pages.quote_list.tax_plc",
                                                                                    )}...`}
                                                                                    required
                                                                                    min={
                                                                                        0
                                                                                    }
                                                                                    max={
                                                                                        100
                                                                                    }
                                                                                    value={
                                                                                        tax
                                                                                    }
                                                                                    onChange={(
                                                                                        e,
                                                                                    ) =>
                                                                                        setTax(
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </div>

                                                                            <div className="mb-3">
                                                                                <label
                                                                                    htmlFor="product_total_price"
                                                                                    className="form-label d-flex align-items-center gap-2"
                                                                                >
                                                                                    <GrMoney size="1.4rem" />
                                                                                    {t(
                                                                                        "supplier_pages.quote_list.price_tot",
                                                                                    )}
                                                                                    *
                                                                                </label>
                                                                                <input
                                                                                    type="tex"
                                                                                    readOnly
                                                                                    disabled
                                                                                    id="product_total_price"
                                                                                    className="form-control"
                                                                                    placeholder={`${t(
                                                                                        "supplier_pages.quote_list.price_tot_plc",
                                                                                    )}...`}
                                                                                    required
                                                                                    value={
                                                                                        totalPrice
                                                                                    }
                                                                                    onChange={(
                                                                                        e,
                                                                                    ) =>
                                                                                        setTotalPrice(
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </div>

                                                                            <div
                                                                                className="mb-3"
                                                                                id="country"
                                                                            >
                                                                                <label
                                                                                    htmlFor="country"
                                                                                    className="form-label d-flex align-items-center gap-2"
                                                                                >
                                                                                    <BsGlobeEuropeAfrica size="1.4rem" />
                                                                                    {t(
                                                                                        "country",
                                                                                    )}
                                                                                    *
                                                                                </label>
                                                                                <CountrySelect
                                                                                    onChange={(
                                                                                        e,
                                                                                    ) => {
                                                                                        setCountry(
                                                                                            e,
                                                                                        );
                                                                                        handleCountryChange(
                                                                                            e,
                                                                                        );
                                                                                    }}
                                                                                    placeHolder={`${t(
                                                                                        "select_country",
                                                                                    )}...`}
                                                                                />
                                                                            </div>
                                                                            <div
                                                                                className="mb-3"
                                                                                id="state"
                                                                            >
                                                                                <label
                                                                                    htmlFor="state"
                                                                                    className="form-label d-flex align-items-center gap-2"
                                                                                >
                                                                                    <TfiLocationArrow size="1.4rem" />
                                                                                    {t(
                                                                                        "state",
                                                                                    )}
                                                                                    *
                                                                                </label>
                                                                                <StateSelect
                                                                                    countryid={
                                                                                        country?.id
                                                                                    }
                                                                                    onChange={(
                                                                                        e,
                                                                                    ) => {
                                                                                        setState(
                                                                                            e,
                                                                                        );
                                                                                        handleStateChange(
                                                                                            country?.id,
                                                                                            e,
                                                                                        );
                                                                                    }}
                                                                                    placeHolder={`${t(
                                                                                        "select_state",
                                                                                    )}...`}
                                                                                />
                                                                            </div>
                                                                            <div
                                                                                className="mb-3"
                                                                                id="city"
                                                                            >
                                                                                <label
                                                                                    htmlFor="city"
                                                                                    className="form-label d-flex align-items-center gap-2"
                                                                                >
                                                                                    <MdLocationCity size="1.4rem" />
                                                                                    {t(
                                                                                        "city",
                                                                                    )}
                                                                                    *
                                                                                </label>
                                                                                <CitySelect
                                                                                    countryid={
                                                                                        country.id
                                                                                    }
                                                                                    stateid={
                                                                                        state.id
                                                                                    }
                                                                                    onChange={(
                                                                                        e,
                                                                                    ) => {
                                                                                        setCity(
                                                                                            e,
                                                                                        );
                                                                                    }}
                                                                                    placeHolder={`${t(
                                                                                        "select_city",
                                                                                    )}...`}
                                                                                />
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <label
                                                                                    htmlFor="postalCode"
                                                                                    className="form-label d-flex align-items-center gap-2"
                                                                                >
                                                                                    <BsSignpost2 size="1.4rem" />
                                                                                    {t(
                                                                                        "postal",
                                                                                    )}
                                                                                    *
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    name="postalCode"
                                                                                    className="form-control"
                                                                                    placeholder={`${t(
                                                                                        "postal",
                                                                                    )}...`}
                                                                                    required
                                                                                    value={
                                                                                        postalCode
                                                                                    }
                                                                                    onChange={(
                                                                                        e,
                                                                                    ) =>
                                                                                        setPostalCode(
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <label
                                                                                    htmlFor="address1"
                                                                                    className="form-label d-flex align-items-center gap-2"
                                                                                >
                                                                                    <MdOutlineLocationOn size="1.4rem" />
                                                                                    {t(
                                                                                        "address1",
                                                                                    )}
                                                                                    *
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    name="address1"
                                                                                    className="form-control"
                                                                                    placeholder={`${t(
                                                                                        "address1",
                                                                                    )}...`}
                                                                                    required
                                                                                    value={
                                                                                        address1
                                                                                    }
                                                                                    onChange={(
                                                                                        e,
                                                                                    ) =>
                                                                                        setAddress1(
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <label
                                                                                    htmlFor="address2"
                                                                                    className="form-label d-flex align-items-center gap-2"
                                                                                >
                                                                                    <MdOutlineLocationOn size="1.4rem" />
                                                                                    {t(
                                                                                        "address2",
                                                                                    )}
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    name="address2"
                                                                                    className="form-control"
                                                                                    placeholder={`${t(
                                                                                        "address1",
                                                                                    )}...`}
                                                                                    value={
                                                                                        address2
                                                                                    }
                                                                                    onChange={(
                                                                                        e,
                                                                                    ) =>
                                                                                        setAddress2(
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <label
                                                                                    htmlFor="Delivery Date"
                                                                                    className="form-label d-flex align-items-center gap-2"
                                                                                >
                                                                                    <BsCalendarDate size="1.4rem" />
                                                                                    {t(
                                                                                        "supplier_pages.quote_list.date",
                                                                                    )}
                                                                                    *
                                                                                </label>
                                                                                <input
                                                                                    type="date"
                                                                                    id="Delivery Date"
                                                                                    className="form-control"
                                                                                    placeholder={`${t(
                                                                                        "supplier_pages.quote_list.date_plc",
                                                                                    )}...`}
                                                                                    required
                                                                                    value={
                                                                                        deliveryDate
                                                                                    }
                                                                                    onChange={(
                                                                                        e,
                                                                                    ) =>
                                                                                        setDeliveryDate(
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <label
                                                                                    htmlFor="payment_type"
                                                                                    className="form-label d-flex align-items-center gap-2"
                                                                                >
                                                                                    <AiOutlineCreditCard size="1.4rem" />
                                                                                    {t(
                                                                                        "supplier_pages.quote_list.pay",
                                                                                    )}
                                                                                    *
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    id="payment_type"
                                                                                    className="form-control"
                                                                                    placeholder={`${t(
                                                                                        "supplier_pages.quote_list.pay_plc",
                                                                                    )}...`}
                                                                                    required
                                                                                    value={
                                                                                        paymentType
                                                                                    }
                                                                                    onChange={(
                                                                                        e,
                                                                                    ) =>
                                                                                        setPaymentType(
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <label
                                                                                    htmlFor="notes"
                                                                                    className="form-label d-flex align-items-center gap-2"
                                                                                >
                                                                                    <GrNote size="1.1rem" />
                                                                                    {t(
                                                                                        "supplier_pages.quote_list.note",
                                                                                    )}
                                                                                </label>
                                                                                <textarea
                                                                                    id="notes"
                                                                                    className="form-control"
                                                                                    placeholder={`${t(
                                                                                        "supplier_pages.quote_list.note_plc",
                                                                                    )}...`}
                                                                                    value={
                                                                                        notes
                                                                                    }
                                                                                    onChange={(
                                                                                        e,
                                                                                    ) =>
                                                                                        setNotes(
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                        )
                                                                                    }
                                                                                    rows={
                                                                                        3
                                                                                    }
                                                                                ></textarea>
                                                                            </div>

                                                                            <div className="mb-3">
                                                                                <button
                                                                                    type="submit"
                                                                                    className="tw-flex tw-w-full tw-items-center tw-justify-center tw-gap-2 tw-rounded-md tw-bg-black tw-px-4 tw-py-2 tw-text-white"
                                                                                >
                                                                                    {t(
                                                                                        "supplier_pages.quote_list.send",
                                                                                    )}
                                                                                    <RiSendPlaneLine size="1.2rem" />
                                                                                </button>
                                                                            </div>

                                                                            <div className="mb-3">
                                                                                <Link
                                                                                    to={`/supplier/offer/invoice/${offerInvoice.id}`}
                                                                                    state={{
                                                                                        offer: offerInvoice,
                                                                                    }}
                                                                                    className={`tw-items-center tw-justify-center tw-gap-2 tw-rounded-md tw-bg-purple tw-px-4 tw-py-2 tw-text-white ${
                                                                                        showDownloadBtn
                                                                                            ? "tw-flex"
                                                                                            : "tw-hidden"
                                                                                    }`}
                                                                                >
                                                                                    {t(
                                                                                        "supplier_pages.quote_list.view_pdf",
                                                                                    )}
                                                                                    <AiOutlineFolderView size="1.2rem" />
                                                                                </Link>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
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

const handleCountryChange = (e) => {
    GetState(e.id).then((result) => {
        let stateSelect = document.querySelector("#state .stdropdown-input>input");
        if (result.length > 0) {
            stateSelect.setAttribute("required", true);
            stateSelect.removeAttribute("disabled");
        } else {
            stateSelect.setAttribute("disabled", true);
            document
                .querySelector("#city .stdropdown-input>input")
                .setAttribute("disabled", true);
        }
    });
};

const handleStateChange = (countryId, e) => {
    GetCity(countryId, e.id).then((result) => {
        let citySelect = document.querySelector("#city .stdropdown-input>input");
        if (result.length > 0) {
            citySelect.setAttribute("required", true);
            citySelect.removeAttribute("disabled");
        } else {
            citySelect.setAttribute("disabled", true);
        }
    });
};

export default QuoteList;
