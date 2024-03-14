import { useState, useContext, useEffect, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

import { PiUserCircle } from "react-icons/pi";
import {
    BsPhoneVibrate,
    BsGlobeEuropeAfrica,
    BsSignpost2,
} from "react-icons/bs";
import { TbUserSquareRounded } from "react-icons/tb";
import { MdLocationCity, MdOutlineLocationOn } from "react-icons/md";
import { TfiEmail, TfiLocationArrow } from "react-icons/tfi";
import { RiLockPasswordLine, RiUserAddLine } from "react-icons/ri";

import {
    CitySelect,
    CountrySelect,
    StateSelect,
    GetState,
    GetCity,
} from "react-country-state-city";

import "react-country-state-city/dist/react-country-state-city.css";

import PhoneInput from "react-phone-input-2";
// import ar from "react-phone-input-2/lang/ar.json";
import "react-phone-input-2/lib/material.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BreadCrumb from "../../components/Buyer/shared/BreadCrumb";

import registerVideo from "../../assets/videos/register.mp4";
import { useTranslation } from "react-i18next";

const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const PHONE_REGEX =
    /^\+?[0-9]{1,3}\s?[-.()]?\s?[0-9]{1,5}\s?[-.]?\s?[0-9]{1,5}\s?[-.]?\s?[0-9]{1,9}$/;

const Register = () => {
    const { t } = useTranslation();

    const { user, registerBuyer } = useContext(AuthContext);

    const navigate = useNavigate();

    const pictureRef = useRef(null);

    useEffect(() => {
        if (user) {
            if (user.role == "buyer") {
                navigate("/");
            } else {
                navigate("/supplier/dashboard");
            }
        }
    });

    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [country, setCountry] = useState({});
    const [state, setState] = useState({});
    const [city, setCity] = useState({});
    const [postalCode, setPostalCode] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [phone, setPhone] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        document
            .querySelector("#country .stdropdown-input>input")
            .setAttribute("required", true);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const validateEmail = EMAIL_REGEX.test(email);
        const validatePassword = PASSWORD_REGEX.test(password);
        const validatePhone = PHONE_REGEX.test(phone);

        if (!validateEmail) {
            toast.error(`${t("buyer_pages.profile.email_err")}.`);
            return;
        }

        if (!validatePassword) {
            toast.error(`${t("buyer_pages.register.pass")}.`);
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

        if (password !== confirmPassword) {
            toast.error(`${t("buyer_pages.register.pass_conf")}.`);
            return;
        }

        const shipping_address = {
            country: country.id,
            state: state?.id || "",
            city: city?.id || "",
            postal_code: postalCode,
            address_1: address1,
            address_2: address2,
        };

        registerBuyer({
            email,
            phone,
            shipping_address,
            password,
            setEmail,
            setFullName,
            setPhone,
            setPostalCode,
            setAddress1,
            setAddress2,
            pictureRef,
            setPassword,
            setConfirmPassword,
            full_name: fullName,
            profile_picture: profilePicture,
        });
    };

    return (
        <main>
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <BreadCrumb
                            title={`${t("buyer_pages.register.title")}`}
                        />
                    </div>
                    <div className="row mt-5">
                        <div className="col-12 col-md-5">
                            <video
                                className="login__video"
                                autoPlay
                                muted
                                preload="auto"
                                loop
                                playsInline
                            >
                                <source src={registerVideo} type="video/mp4" />
                            </video>
                        </div>
                        <div className="col-12 col-md-7">
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="card login__card shadow rounded-3">
                                    <div className="card-body">
                                        <h3 className="card-title login__title">
                                            {t("buyer_pages.register.title")}
                                        </h3>
                                        <div className="mt-4">
                                            <form
                                                method="post"
                                                onSubmit={handleSubmit}
                                                encType="multipart/form-data"
                                            >
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="full_name"
                                                        className="form-label d-flex align-items-center gap-2 login__form-label"
                                                    >
                                                        <PiUserCircle size="1.4rem" />
                                                        {t("full_name")} *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="full_name"
                                                        className="form-control"
                                                        placeholder={`${t(
                                                            "full_name",
                                                        )}...`}
                                                        required
                                                        value={fullName}
                                                        onChange={(e) =>
                                                            setFullName(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="email"
                                                        className="form-label d-flex align-items-center gap-2 login__form-label"
                                                    >
                                                        <TfiEmail size="1.4rem" />
                                                        {t("email")} *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        className="form-control"
                                                        placeholder={`${t(
                                                            "email",
                                                        )}...`}
                                                        required
                                                        value={email}
                                                        onChange={(e) =>
                                                            setEmail(
                                                                e.target.value,
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
                                                        className="form-label d-flex align-items-center gap-2 login__form-label"
                                                    >
                                                        <BsGlobeEuropeAfrica size="1.4rem" />
                                                        {t("country")} *
                                                    </label>
                                                    <CountrySelect
                                                        onChange={(e) => {
                                                            setCountry(e);
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
                                                        className="form-label d-flex align-items-center gap-2 login__form-label"
                                                    >
                                                        <TfiLocationArrow size="1.4rem" />
                                                        {t("state")} *
                                                    </label>
                                                    <StateSelect
                                                        countryid={country?.id}
                                                        onChange={(e) => {
                                                            setState(e);
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
                                                <div className="mb-3" id="city">
                                                    <label
                                                        htmlFor="city"
                                                        className="form-label d-flex align-items-center gap-2 login__form-label"
                                                    >
                                                        <MdLocationCity size="1.4rem" />
                                                        {t("city")} *
                                                    </label>
                                                    <CitySelect
                                                        countryid={country.id}
                                                        stateid={state.id}
                                                        onChange={(e) => {
                                                            setCity(e);
                                                        }}
                                                        placeHolder={`${t(
                                                            "select_city",
                                                        )}...`}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="postalCode"
                                                        className="form-label d-flex align-items-center gap-2 login__form-label"
                                                    >
                                                        <BsSignpost2 size="1.4rem" />
                                                        {t("postal")} *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="postalCode"
                                                        className="form-control"
                                                        placeholder={`${t(
                                                            "postal",
                                                        )}...`}
                                                        required
                                                        value={postalCode}
                                                        onChange={(e) =>
                                                            setPostalCode(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="address1"
                                                        className="form-label d-flex align-items-center gap-2 login__form-label"
                                                    >
                                                        <MdOutlineLocationOn size="1.4rem" />
                                                        {t("address1")} *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="address1"
                                                        className="form-control"
                                                        placeholder={`${t(
                                                            "address1",
                                                        )}...`}
                                                        required
                                                        value={address1}
                                                        onChange={(e) =>
                                                            setAddress1(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="address2"
                                                        className="form-label d-flex align-items-center gap-2 login__form-label"
                                                    >
                                                        <MdOutlineLocationOn size="1.4rem" />
                                                        {t("address2")}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="address2"
                                                        className="form-control"
                                                        placeholder={`${t(
                                                            "address2",
                                                        )}...`}
                                                        value={address2}
                                                        onChange={(e) =>
                                                            setAddress2(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="phone"
                                                        className="form-label d-flex align-items-center gap-2 login__form-label"
                                                    >
                                                        <BsPhoneVibrate size="1.4rem" />
                                                        {t("phone")} *
                                                    </label>
                                                    <PhoneInput
                                                        country={
                                                            country?.iso2?.toLowerCase()
                                                                ? country?.iso2?.toLowerCase()
                                                                : "sa"
                                                        }
                                                        // localization={ar}
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
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="profile_picture"
                                                        className="form-label d-flex align-items-center gap-2 login__form-label"
                                                    >
                                                        <TbUserSquareRounded size="1.4rem" />
                                                        {t("profile_pic")}
                                                    </label>
                                                    <input
                                                        type="file"
                                                        name="profile_picture"
                                                        className="form-control"
                                                        ref={pictureRef}
                                                        onChange={(e) =>
                                                            setProfilePicture(
                                                                e.target
                                                                    .files[0],
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="password"
                                                        className="form-label d-flex align-items-center gap-2 login__form-label"
                                                    >
                                                        <RiLockPasswordLine size="1.4rem" />
                                                        {t("password")} *
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        className="form-control"
                                                        placeholder="••••••••••••"
                                                        required
                                                        value={password}
                                                        onChange={(e) =>
                                                            setPassword(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="confirm-password"
                                                        className="form-label d-flex align-items-center gap-2 login__form-label"
                                                    >
                                                        <RiLockPasswordLine size="1.4rem" />
                                                        {t("password2")} *
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="confirm-password"
                                                        className="form-control"
                                                        placeholder="••••••••••••"
                                                        required
                                                        value={confirmPassword}
                                                        onChange={(e) =>
                                                            setConfirmPassword(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>

                                                <div className="my-4">
                                                    <button
                                                        type="submit"
                                                        className="gradient-bg-color w-100 py-2 text-white rounded shadow fw-bold login__btn d-flex align-items-center gap-2 justify-content-center"
                                                    >
                                                        {t("register")}
                                                        <RiUserAddLine size="1.4rem" />
                                                    </button>
                                                </div>
                                                <div className="text-center d-flex align-items-center gap-1">
                                                    {t(
                                                        "buyer_pages.register.already",
                                                    )}{" "}
                                                    ?{t("login")}
                                                    <Link to="/account/login">
                                                        {t("here")}
                                                    </Link>
                                                </div>
                                                <div className="text-center d-flex align-items-center gap-1">
                                                    {t(
                                                        "buyer_pages.register.not",
                                                    )}{" "}
                                                    ?{" "}
                                                    {t(
                                                        "buyer_pages.register.as",
                                                    )}
                                                    <Link to="/supplier/account/register">
                                                        {t("supplier")}
                                                    </Link>
                                                </div>
                                            </form>
                                        </div>
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
    GetState(e.id).then((result) => {
        let stateSelect = document.querySelector(
            "#state .stdropdown-input>input",
        );
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
        let citySelect = document.querySelector(
            "#city .stdropdown-input>input",
        );
        if (result.length > 0) {
            citySelect.setAttribute("required", true);
            citySelect.removeAttribute("disabled");
        } else {
            citySelect.setAttribute("disabled", true);
        }
    });
};

export default Register;
