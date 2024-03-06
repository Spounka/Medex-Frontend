import { useContext, useEffect, useRef, useState } from "react";

import {
    CitySelect,
    CountrySelect,
    GetCity,
    GetCountries,
    GetState,
    StateSelect,
} from "react-country-state-city";

import "react-country-state-city/dist/react-country-state-city.css";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import {
    BsGlobeEuropeAfrica,
    BsPhoneVibrate,
    BsSignpost2,
} from "react-icons/bs";
import { CiLink } from "react-icons/ci";
import { FaRegBuilding } from "react-icons/fa";
import { MdLocationCity, MdOutlineLocationOn } from "react-icons/md";
import { TfiEmail, TfiLocationArrow } from "react-icons/tfi";

import useAxios from "../../utils/useAxios";

import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";

import { Link } from "react-router-dom";

const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PHONE_REGEX =
    /^\+?[0-9]{1,3}\s?[-.()]?\s?[0-9]{1,5}\s?[-.]?\s?[0-9]{1,5}\s?[-.]?\s?[0-9]{1,9}$/;

const CompanySettings = () => {
    const { t, i18n } = useTranslation();

    const { user } = useContext(AuthContext);

    const api = useAxios();

    const [userId, setUserId] = useState("");

    const [companyName, setCompanyName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");

    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [postal, setPostal] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");

    const fileRef = useRef();

    const handlesubmit = async (e) => {
        e.preventDefault();

        const validateEmail = EMAIL_REGEX.test(email);
        const validatePhone = PHONE_REGEX.test(phone);

        if (!validateEmail) {
            toast.error(`${t("buyer_pages.profile.email_err")}.`);
            return;
        }

        if (!validatePhone) {
            if (phone.length < 4) {
                toast.error(`${t("buyer_pages.profile.ph_length")}.`);
            } else {
                toast.error(`${t("buyer_pages.profile.ph_err")}.`);
            }
            return;
        }

        const address = {
            country: country.id,
            state: state?.id,
            city: city?.id,
            postal_code: postal,
            address_1: address1,
            address_2: address2,
        };

        let formData = new FormData();
        formData.append("email", email);
        formData.append("name", companyName);
        formData.append("phone", phone);
        formData.append("website", website);
        formData.append("address", JSON.stringify(address));

        await api
            .patch(
                import.meta.env.VITE_BACKEND_URL +
                    `/api/company/${user.user_id}/`,
                formData
            )
            .then(() => {
                toast.success(`${t("buyer_pages.profile.updated")}!`);
            });
    };

    const getUserData = async () => {
        await api
            .get(
                import.meta.env.VITE_BACKEND_URL +
                    `/api/company/${user.user_id}/`
            )
            .then((res) => {
                const data = res.data.company;

                if (user.user_id == data.supplier) {
                    GetCountries()
                        .then((res) => {
                            let c = res.find(
                                (x) => x.id == parseInt(data.address.country)
                            );
                            setCountry(c);
                            handleCountryChange(c);
                        })
                        .then(() => {
                            return GetState(
                                parseInt(data.address.country)
                            ).then((res) => {
                                if (res.length > 0) {
                                    let s = res.find(
                                        (x) =>
                                            x.id == parseInt(data.address.state)
                                    );
                                    setState(s);
                                    handleStateChange(data.address.country, s);
                                }
                            });
                        })
                        .then(() => {
                            return GetCity(
                                parseInt(data.address.country),
                                parseInt(data.address.state)
                            ).then((res) => {
                                if (res.length > 0) {
                                    let c = res.find(
                                        (x) =>
                                            x.id == parseInt(data.address.city)
                                    );
                                    setCity(c);
                                }
                            });
                        });
                } else {
                    GetCountries()
                        .then((res) => {
                            let c = res.find(
                                (x) => x.id == parseInt(data.address.country)
                            );
                            setCountry(c.name);
                        })
                        .then(() => {
                            return GetState(
                                parseInt(data.address.country)
                            ).then((res) => {
                                if (res.length > 0) {
                                    let s = res.find(
                                        (x) =>
                                            x.id == parseInt(data.address.state)
                                    );
                                    setState(s.name);
                                }
                            });
                        })
                        .then(() => {
                            return GetCity(
                                parseInt(data.address.country),
                                parseInt(data.address.state)
                            ).then((res) => {
                                if (res.length > 0) {
                                    let c = res.find(
                                        (x) =>
                                            x.id == parseInt(data.address.city)
                                    );
                                    setCity(c.name);
                                }
                            });
                        });
                }

                setUserId(data?.supplier);
                setAddress1(data?.address.address_1);
                setAddress2(data?.address?.address_2 || "");
                setPostal(data?.address.postal_code);
                setCompanyName(data?.name);
                setEmail(data?.email);
                setPhone(data?.phone);
                setWebsite(data?.website || "");
            });
    };

    useEffect(() => {
        getUserData();

        if (userId == user.user_id) {
            const countryInput = document.querySelector(
                "#country > div.col-sm-9 > div > div > div > input"
            );

            countryInput.setAttribute("required", true);
        }
    }, []);

    return (
        <main className="px-0 px-md-3">
            <section>
                <div className="container-xxl">
                    <Link
                        to="../../settings"
                        className="d-flex align-items-center"
                        style={{ color: "#8e65c1" }}
                    >
                        {i18n.resolvedLanguage == "en" ? (
                            <AiOutlineArrowLeft className="mb-2" />
                        ) : (
                            <AiOutlineArrowRight className="mb-2" />
                        )}{" "}
                        <h5 className="fw-normal">
                            {t("supplier_pages.settings.back")}
                        </h5>{" "}
                    </Link>
                    <div className="main-body">
                        <div className="row">
                            <div className="col-lg-12 mt-3">
                                <div
                                    className="card"
                                    style={{ border: "none" }}
                                >
                                    <div className="card-title p-4 pb-0 profile__title">
                                        <h3>
                                            {t("buyer_pages.profile.company")}
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        {userId == user.user_id && (
                                            <form
                                                method="post"
                                                onSubmit={handlesubmit}
                                            >
                                                <div className="row mb-3 d-flex align-items-center">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0 d-flex align-items-center gap-2">
                                                            <FaRegBuilding size="1.5rem" />
                                                            {t(
                                                                "supplier_pages.edit_company.name"
                                                            )}{" "}
                                                            *
                                                        </h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={companyName}
                                                            onChange={(e) =>
                                                                setCompanyName(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3 d-flex align-items-center">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0 d-flex align-items-center gap-2">
                                                            <CiLink size="1.8rem" />
                                                            {t(
                                                                "supplier_pages.edit_company.website"
                                                            )}
                                                        </h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <input
                                                            type="url"
                                                            className="form-control"
                                                            value={website}
                                                            placeholder={
                                                                t(
                                                                    "supplier_pages.edit_company.website"
                                                                ) + "..."
                                                            }
                                                            onChange={(e) =>
                                                                setWebsite(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3 d-flex align-items-center">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0 d-flex align-items-center gap-2">
                                                            <TfiEmail size="1.4rem" />
                                                            {t(
                                                                "supplier_pages.edit_company.email"
                                                            )}{" "}
                                                            *
                                                        </h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={email}
                                                            onChange={(e) =>
                                                                setEmail(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    className="row mb-3 d-flex align-items-center"
                                                    id="country"
                                                >
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0 d-flex align-items-center gap-2">
                                                            <BsGlobeEuropeAfrica size="1.4rem" />
                                                            {t("country")} *
                                                        </h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <CountrySelect
                                                            defaultValue={
                                                                country
                                                            }
                                                            onChange={(e) => {
                                                                setCountry(e);
                                                                handleCountryChange(
                                                                    e
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3 d-flex align-items-center">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0 d-flex align-items-center gap-2">
                                                            <TfiLocationArrow size="1.4rem" />
                                                            {t("state")} *
                                                        </h6>
                                                    </div>
                                                    <div
                                                        className="col-sm-9 text-secondary"
                                                        id="state"
                                                    >
                                                        <StateSelect
                                                            defaultValue={state}
                                                            countryid={
                                                                country.id
                                                            }
                                                            onChange={(e) => {
                                                                setState(e);
                                                                handleStateChange(
                                                                    country.id,
                                                                    e
                                                                );
                                                            }}
                                                            placeHolder={`${t(
                                                                "select_state"
                                                            )}`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3 d-flex align-items-center">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0 d-flex align-items-center gap-2">
                                                            <MdLocationCity size="1.4rem" />
                                                            {t("city")} *
                                                        </h6>
                                                    </div>
                                                    <div
                                                        className="col-sm-9 text-secondary"
                                                        id="city"
                                                    >
                                                        <CitySelect
                                                            countryid={
                                                                country.id
                                                            }
                                                            stateid={state.id}
                                                            defaultValue={city}
                                                            onChange={(e) => {
                                                                setCity(e);
                                                            }}
                                                            placeHolder={`${t(
                                                                "select_city"
                                                            )}`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3 d-flex align-items-center">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0 d-flex align-items-center gap-2">
                                                            <BsSignpost2 size="1.4rem" />
                                                            {t("postal")} *
                                                        </h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={postal}
                                                            onChange={(e) =>
                                                                setPostal(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3 d-flex align-items-center">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0 d-flex align-items-center gap-2">
                                                            <MdOutlineLocationOn size="1.4rem" />
                                                            {t("address1")} *
                                                        </h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={address1}
                                                            onChange={(e) =>
                                                                setAddress1(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3 d-flex align-items-center">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0 d-flex align-items-center gap-2">
                                                            <MdOutlineLocationOn size="1.4rem" />
                                                            {t("address2")}
                                                        </h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={address2}
                                                            onChange={(e) =>
                                                                setAddress2(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            placeholder={`${t(
                                                                "address2"
                                                            )}...`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3 d-flex align-items-center">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0 d-flex align-items-center gap-2">
                                                            <BsPhoneVibrate size="1.4rem" />
                                                            {t(
                                                                "supplier_pages.edit_company.phone"
                                                            )}{" "}
                                                            *
                                                        </h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <PhoneInput
                                                            countryCodeEditable={
                                                                false
                                                            }
                                                            name="phone"
                                                            specialLabel=""
                                                            required={true}
                                                            inputClass="w-100"
                                                            value={phone}
                                                            id="phone"
                                                            onChange={(e) =>
                                                                setPhone(e)
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row mt-5">
                                                    <div className="col-sm-3"></div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <button
                                                            type="submit"
                                                            className="p-2 gradient-bg-color text-white border-0 px-5 d-flex gap-2 align-items-center"
                                                            style={{
                                                                borderRadius:
                                                                    "5px",
                                                            }}
                                                        >
                                                            {t(
                                                                "supplier_pages.edit_company.edit"
                                                            )}

                                                            <BiEditAlt size="1.4rem" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        )}
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

const handleCountryChange = (e) => {
    GetState(parseInt(e.id)).then((result) => {
        let stateSelect = document.querySelector(
            "#state .stdropdown-input>input"
        );
        let citySelect = document.querySelector(
            "#city .stdropdown-input>input"
        );

        if (result.length > 0) {
            stateSelect.setAttribute("required", true);
            stateSelect.removeAttribute("disabled");
            citySelect.removeAttribute("disabled");
        } else {
            stateSelect.setAttribute("disabled", true);
            citySelect.setAttribute("disabled", true);
        }
    });
};

const handleStateChange = (countryId, e) => {
    GetCity(parseInt(countryId), parseInt(e.id)).then((result) => {
        let citySelect = document.querySelector(
            "#city .stdropdown-input>input"
        );

        if (result.length > 0) {
            citySelect.setAttribute("required", true);
            citySelect.removeAttribute("disabled");
        } else {
            citySelect.setAttribute("disabled", true);
        }
    });
};

export default CompanySettings;
