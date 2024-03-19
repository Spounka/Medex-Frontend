import { useState, useEffect } from "react";

import BreadCrumb from "../../components/Buyer/shared/BreadCrumb";

import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { BsGlobeEuropeAfrica, BsSignpost2 } from "react-icons/bs";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdLocationCity, MdOutlineLocationOn } from "react-icons/md";
import { TfiLocationArrow } from "react-icons/tfi";

import {
    CitySelect,
    CountrySelect,
    StateSelect,
    GetState,
    GetCity,
} from "react-country-state-city";

import "react-country-state-city/dist/react-country-state-city.css";

import { toast } from "react-toastify";

import useAxios from "../../utils/useAxios";
import { useTranslation } from "react-i18next";

const Checkout = (props) => {
    const { t } = useTranslation();

    const { cartItems, setCartItems } = props;

    const api = useAxios();

    const navigate = useNavigate();

    const [country, setCountry] = useState({});
    const [state, setState] = useState({});
    const [city, setCity] = useState({});
    const [postalCode, setPostalCode] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [cashPayment, setCashPayment] = useState(true);

    const [sameAddress, setSameAddress] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("cartItems").length === 0) {
            navigate("/");
        }
    }, [cartItems]);

    useEffect(() => {
        if (sameAddress === false) {
            document
                .querySelector("#country .stdropdown-input>input")
                .setAttribute("required", true);
        } else {
            document
                .querySelector("#country .stdropdown-input>input")
                .removeAttribute("required");
        }
    }, [sameAddress]);

    const handleCountryChange = (e) => {
        GetState(e.id).then((result) => {
            let stateSelect = document.querySelector("#state .stdropdown-input>input");
            if (result.length > 0) {
                if (sameAddress !== true) {
                    stateSelect.setAttribute("required", true);
                    stateSelect.removeAttribute("disabled");
                }
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
                if (sameAddress !== true) {
                    citySelect.setAttribute("required", true);
                    citySelect.removeAttribute("disabled");
                }
            } else {
                citySelect.setAttribute("disabled", true);
            }
        });
    };

    const handleCheckout = async (e) => {
        e.preventDefault();

        const billing_address = {
            country: country?.id || "",
            state: state?.id || "",
            city: city?.id || "",
            postal_code: postalCode,
            address_1: address1,
            address_2: address2,
        };

        await api
            .post(
                import.meta.env.VITE_BACKEND_URL + "/api/order/checkout/",
                sameAddress
                    ? {
                          sameAddress,
                          cashPayment,
                          cartItems: JSON.stringify(cartItems),
                      }
                    : {
                          billing_address: JSON.stringify(billing_address),
                          cashPayment,
                          cartItems: JSON.stringify(cartItems),
                      },
            )
            .then(() => {
                toast.success(`${t("buyer_pages.checkout.success")}.`);
                setCartItems([]);
                localStorage.setItem("cartItems", []);
            });
    };

    return (
        <main>
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <BreadCrumb title={`${t("buyer_pages.checkout.checkout")}`} />
                    </div>

                    <div className="row mt-5">
                        <div className="col-md-4 order-md-3 mb-4">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span>{t("buyer_pages.checkout.your_cart")}</span>
                                <span className="badge bg-primary badge-pill">
                                    {cartItems.length}
                                </span>
                            </h4>
                            <ul className="list-group mb-3 sticky-top">
                                {cartItems.map((item) => {
                                    return (
                                        <li
                                            key={item.sku}
                                            className="list-group-item d-flex justify-content-between align-items-center lh-lg"
                                        >
                                            <div>
                                                <h6 className="my-0">{item.name}</h6>
                                                <small className="text-muted d-flex align-items-center gap-1">
                                                    <AiOutlineClose size="0.6rem" />
                                                    {item.qty}
                                                </small>
                                            </div>
                                            <span className="text-muted">
                                                {(
                                                    (item.sale_price > 0
                                                        ? item.sale_price
                                                        : item.price) * item.qty
                                                ).toFixed(2)}
                                                &nbsp; {t("sar")}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="col-md-1 order-md-2 d-none d-md-block"></div>
                        <div className="col-md-7 order-md-1">
                            <h4 className="mb-3">
                                {t("buyer_pages.checkout.bill_address")}
                            </h4>
                            <form
                                onSubmit={handleCheckout}
                                id="checkoutForm"
                            >
                                <div
                                    className="mb-3"
                                    id="country"
                                >
                                    <label
                                        htmlFor="country"
                                        className="form-label d-flex align-items-center gap-2 "
                                    >
                                        <BsGlobeEuropeAfrica size="1.4rem" />
                                        {t("country")}
                                    </label>
                                    <CountrySelect
                                        onChange={(e) => {
                                            setCountry(e);
                                            handleCountryChange(e);
                                        }}
                                        placeHolder={`${t("select_country")}...`}
                                    />
                                </div>
                                <div
                                    className="mb-3"
                                    id="state"
                                >
                                    <label
                                        htmlFor="state"
                                        className="form-label d-flex align-items-center gap-2 "
                                    >
                                        <TfiLocationArrow size="1.4rem" />
                                        {t("state")}
                                    </label>
                                    <StateSelect
                                        countryid={country?.id}
                                        onChange={(e) => {
                                            setState(e);
                                            handleStateChange(country?.id, e);
                                        }}
                                        placeHolder={`${t("select_state")}...`}
                                    />
                                </div>
                                <div
                                    className="mb-3"
                                    id="city"
                                >
                                    <label
                                        htmlFor="city"
                                        className="form-label d-flex align-items-center gap-2 "
                                    >
                                        <MdLocationCity size="1.4rem" />
                                        {t("city")}
                                    </label>
                                    <CitySelect
                                        countryid={country.id}
                                        stateid={state.id}
                                        onChange={(e) => {
                                            setCity(e);
                                        }}
                                        placeHolder={`${t("select_city")}...`}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="postalCode"
                                        className="form-label d-flex align-items-center gap-2 "
                                    >
                                        <BsSignpost2 size="1.4rem" />
                                        {t("postal")}
                                    </label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        className="form-control"
                                        placeholder={`${t("postal")}...`}
                                        required={!sameAddress}
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="address1"
                                        className="form-label d-flex align-items-center gap-2 "
                                    >
                                        <MdOutlineLocationOn size="1.4rem" />
                                        {t("address1")}
                                    </label>
                                    <input
                                        type="text"
                                        name="address1"
                                        className="form-control"
                                        placeholder={`${t("address1")}...`}
                                        required={!sameAddress}
                                        value={address1}
                                        onChange={(e) => setAddress1(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="address2"
                                        className="form-label d-flex align-items-center gap-2 "
                                    >
                                        <MdOutlineLocationOn size="1.4rem" />
                                        {t("address2")}
                                    </label>
                                    <input
                                        type="text"
                                        name="address2"
                                        className="form-control"
                                        placeholder={`${t("address2")}...`}
                                        value={address2}
                                        onChange={(e) => setAddress2(e.target.value)}
                                    />
                                </div>

                                <hr className="mb-4" />
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={sameAddress}
                                        value={sameAddress}
                                        onChange={() =>
                                            setSameAddress(() => !sameAddress)
                                        }
                                        id="sameAddress"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="sameAddress"
                                    >
                                        {t("buyer_pages.checkout.same")}
                                    </label>
                                </div>
                                <hr className="mb-4" />
                                <h4 className="mb-3">
                                    {t("buyer_pages.checkout.payment")}
                                </h4>
                                <div className="form-check mb-5">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        id="cash"
                                        value={cashPayment}
                                        checked={cashPayment}
                                        onChange={() => setCashPayment(!cashPayment)}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="cash"
                                    >
                                        {t("buyer_pages.checkout.cash")}
                                    </label>
                                </div>
                                <button
                                    className="btn btn-primary btn-lg d-flex align-items-center gap-3 px-5"
                                    type="submit"
                                >
                                    <IoBagCheckOutline size="1.4rem" />
                                    {t("buyer_pages.checkout.finish")}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Checkout;
