import { useContext, useEffect, useRef } from "react";

import {
    CitySelect,
    CountrySelect,
    StateSelect,
    GetState,
    GetCity,
    GetCountries,
} from "react-country-state-city";

import "react-country-state-city/dist/react-country-state-city.css";

import PhoneInput from "react-phone-input-2";
// import ar from "react-phone-input-2/lang/ar.json";
import "react-phone-input-2/lib/material.css";

import {
    MdDeleteOutline,
    MdOutlineRequestQuote,
    MdLocationCity,
    MdOutlineLocationOn,
    MdOutlineFolderDelete,
    MdOutlineCancel,
} from "react-icons/md";
import { PiUserCircle } from "react-icons/pi";
import { TfiEmail, TfiLocationArrow, TfiSave } from "react-icons/tfi";
import {
    BsPhoneVibrate,
    BsGlobeEuropeAfrica,
    BsSignpost2,
} from "react-icons/bs";

import { BiEditAlt, BiCheckDouble } from "react-icons/bi";
import { TbPhotoEdit } from "react-icons/tb";

import userImage from "../../assets/images/user.png";
import { useState } from "react";

import useAxios from "../../utils/useAxios";

import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PHONE_REGEX =
    /^\+?[0-9]{1,3}\s?[-.()]?\s?[0-9]{1,5}\s?[-.]?\s?[0-9]{1,5}\s?[-.]?\s?[0-9]{1,9}$/;

const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "svg"];

const Profile = () => {
    const { t } = useTranslation();

    const { user, authTokens, logoutUser, setUser } = useContext(AuthContext);

    const api = useAxios();

    const [userId, setUserId] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [postal, setPostal] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");

    const fileRef = useRef();

    const handleFileChange = (e) => {
        const selectedFile = Array.from(e.target.files);
        const { isValid } = validateFileExtensions(
            selectedFile,
            ALLOWED_EXTENSIONS
        );
        if (!isValid) {
            toast.error(t("buyer_pages.profile.file_type_err"));
            fileRef.current.value = null;
        } else {
            setProfilePicture(selectedFile[0]);

            reRenderPicture(e.target.files[0]);
        }
    };

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

        const shipping_address = {
            country: country.id,
            state: state?.id,
            city: city?.id,
            postal_code: postal,
            address_1: address1,
            address_2: address2,
        };

        let formData = new FormData();
        formData.append("email", email);
        formData.append("full_name", fullName);
        formData.append("phone", phone);
        formData.append("shipping_address", JSON.stringify(shipping_address));

        const existingUser = { ...user };

        const updatedUser = { ...existingUser, full_name: fullName };

        updatedUser.full_name = fullName;

        setUser(updatedUser);

        await api
            .patch(
                import.meta.env.VITE_BACKEND_URL + "/api/account/profile/",
                formData
            )
            .then(() => {
                toast.success(`${t("buyer_pages.profile.updated")}!`);
            });
    };

    const getUserData = async () => {
        await api
            .get(import.meta.env.VITE_BACKEND_URL + "/api/account/profile/")
            .then((res) => {
                const data = res.data;

                if (user.user_id == data.id) {
                    setCategories(res?.data?.private_categories);
                    setProducts(res?.data?.products);

                    GetCountries()
                        .then((res) => {
                            let c = res.find(
                                (x) =>
                                    x.id ==
                                    parseInt(data.shipping_address.country)
                            );
                            setCountry(c);
                            handleCountryChange(c);
                        })
                        .then(() => {
                            return GetState(
                                parseInt(data.shipping_address.country)
                            ).then((res) => {
                                if (res.length > 0) {
                                    let s = res.find(
                                        (x) =>
                                            x.id ==
                                            parseInt(
                                                data.shipping_address.state
                                            )
                                    );
                                    setState(s);
                                    handleStateChange(
                                        data.shipping_address.country,
                                        s
                                    );
                                }
                            });
                        })
                        .then(() => {
                            return GetCity(
                                parseInt(data.shipping_address.country),
                                parseInt(data.shipping_address.state)
                            ).then((res) => {
                                if (res.length > 0) {
                                    let c = res.find(
                                        (x) =>
                                            x.id ==
                                            parseInt(data.shipping_address.city)
                                    );
                                    setCity(c);
                                }
                            });
                        });
                } else {
                    GetCountries()
                        .then((res) => {
                            let c = res.find(
                                (x) =>
                                    x.id ==
                                    parseInt(data.shipping_address.country)
                            );
                            console.log(c);
                            setCountry(c.name);
                        })
                        .then(() => {
                            return GetState(
                                parseInt(data.shipping_address.country)
                            ).then((res) => {
                                if (res.length > 0) {
                                    let s = res.find(
                                        (x) =>
                                            x.id ==
                                            parseInt(
                                                data.shipping_address.state
                                            )
                                    );
                                    setState(s.name);
                                }
                            });
                        })
                        .then(() => {
                            return GetCity(
                                parseInt(data.shipping_address.country),
                                parseInt(data.shipping_address.state)
                            ).then((res) => {
                                if (res.length > 0) {
                                    let c = res.find(
                                        (x) =>
                                            x.id ==
                                            parseInt(data.shipping_address.city)
                                    );
                                    setCity(c.name);
                                }
                            });
                        });
                }

                setUserId(data?.id);
                setAddress1(data?.shipping_address.address_1);
                setAddress2(data?.shipping_address?.address_2 || "");
                setPostal(data?.shipping_address.postal_code);
                setFullName(data?.full_name);
                setEmail(data?.email);
                setPhone(data?.phone);
                setProfilePicture(data?.profile.profile_picture || "");
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

    const changeProfilePicture = async (e) => {
        e.preventDefault();

        if (!e.target.profilePicture.files[0]) {
            return;
        }

        let formData = new FormData();
        formData.append("profile_picture", e.target.profilePicture.files[0]);

        await api
            .post(
                import.meta.env.VITE_BACKEND_URL + "/api/account/profile/",
                formData,
                {
                    "Content-Type": "multipart/form-data",
                }
            )
            .then(() => {
                toast.success(`${t("buyer_pages.profile.pic_updated")}!`);
            })
            .catch((err) => {
                toast.error(err.data);
            });
    };

    const removeProfilePicture = async () => {
        document
            .getElementById("userProfilePicture")
            .setAttribute("src", userImage);

        await api
            .post(import.meta.env.VITE_BACKEND_URL + "/api/account/profile/", {
                delete_profile_picture: true,
            })
            .then(() => {
                toast.success(`${t("buyer_pages.profile.pic_removed")}!`);
            });
    };

    const deleteProfileSubmit = async () => {
        await api
            .delete(
                import.meta.env.VITE_BACKEND_URL + "/api/account/profile/",
                {
                    Authorization: `Bearer ${authTokens.access}`,
                    data: {
                        id: user.user_id,
                    },
                }
            )
            .then(() => {
                logoutUser();
                toast.success(`${t("buyer_pages.profile.del_success")}!`);
            })
            .catch(() => {
                toast.error(`${t("buyer_pages.profile.del_fail")}.`);
            });
    };

    const [categories, setCategories] = useState([]);

    const [products, setProducts] = useState([]);

    const [selectedCat, setSelectedCat] = useState("");

    const validData = selectedCat
        ? products.filter((e) => e.category === selectedCat)
        : [];

    const onDelete = (id) => {
        setProducts(products.filter((e) => e.id !== id));
    };

    const { register, handleSubmit } = useForm();

    return (
        <main className="px-0 px-md-3">
            <section>
                <div className="container-xxl">
                    <div className="main-body">
                        <div className="row">
                            <div className="col-lg-5">
                                <div className="card shadow border">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <img
                                                src={
                                                    profilePicture
                                                        ? import.meta.env
                                                              .VITE_BACKEND_URL +
                                                          profilePicture
                                                        : userImage
                                                }
                                                alt="Picture"
                                                id="userProfilePicture"
                                                className="rounded-circle shadow border-2 object-fit-cover"
                                                width={150}
                                                height={150}
                                            />
                                            <div className="mt-3">
                                                <h4>{fullName}</h4>

                                                {userId == user.user_id && (
                                                    <form
                                                        encType="multipart/form-data"
                                                        onSubmit={
                                                            changeProfilePicture
                                                        }
                                                    >
                                                        <div className="mt-5 d-flex justify-content-between gap-5 align-items-center">
                                                            <button
                                                                type="button"
                                                                onClick={
                                                                    removeProfilePicture
                                                                }
                                                                className="btn btn-outline-danger d-flex gap-2 align-items-center"
                                                            >
                                                                {t(
                                                                    "buyer_pages.profile.rem_pic"
                                                                )}
                                                                <MdOutlineFolderDelete size="1.4rem" />
                                                            </button>
                                                            <input
                                                                id="profilePicture"
                                                                name="profilePicture"
                                                                type="file"
                                                                className="d-none"
                                                                ref={fileRef}
                                                                onChange={
                                                                    handleFileChange
                                                                }
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={
                                                                    handleFileUpload
                                                                }
                                                                className="btn btn-outline-primary d-flex gap-2 align-items-center"
                                                            >
                                                                {t(
                                                                    "buyer_pages.profile.update_pic"
                                                                )}
                                                                <TbPhotoEdit size="1.4rem" />
                                                            </button>
                                                        </div>

                                                        <div className="d-block mt-4">
                                                            <button
                                                                type="submit"
                                                                className="gradient-bg-color text-white border-0 w-100 justify-content-center py-2 d-flex gap-2 align-items-center"
                                                                style={{
                                                                    borderRadius:
                                                                        "5px",
                                                                }}
                                                            >
                                                                {t(
                                                                    "buyer_pages.profile.save"
                                                                )}
                                                                <TfiSave size="1.4rem" />
                                                            </button>
                                                        </div>
                                                    </form>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {userId == user.user_id && (
                                    <div className="card shadow border mt-5">
                                        <div className="card-body">
                                            <div className="d-flex flex-column align-items-center text-center">
                                                <h3>
                                                    {t(
                                                        "buyer_pages.profile.opt"
                                                    )}
                                                </h3>

                                                <div
                                                    className="overlay d-none justify-content-center align-items-center"
                                                    id="dialog-container"
                                                >
                                                    <div className="popup">
                                                        <p>
                                                            {t(
                                                                "buyer_pages.profile.conf"
                                                            )}
                                                            ?
                                                        </p>
                                                        <div className="d-flex justify-content-center gap-5 align-items-center">
                                                            <button
                                                                className="btn btn-outline-primary px-5 d-flex align-items-center gap-2"
                                                                id="cancel"
                                                                onClick={
                                                                    deleteProfileHideOverlay
                                                                }
                                                            >
                                                                {t(
                                                                    "buyer_pages.profile.cancel"
                                                                )}
                                                                <MdOutlineCancel size="1.4rem" />
                                                            </button>
                                                            <button
                                                                className="btn btn-danger px-5 d-flex align-items-center gap-2"
                                                                id="confirm"
                                                                onClick={
                                                                    deleteProfileSubmit
                                                                }
                                                            >
                                                                {t(
                                                                    "buyer_pages.profile.del"
                                                                )}
                                                                <BiCheckDouble size="1.4rem" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex mt-5 justify-content-between gap-5 align-items-center">
                                                    <Link
                                                        to="/api/account/request-for-quote"
                                                        className="btn btn-outline-primary d-flex gap-2 align-items-center"
                                                    >
                                                        {t("rfq")}
                                                        <MdOutlineRequestQuote size="1.4rem" />
                                                    </Link>
                                                    <button
                                                        onClick={
                                                            deleteProfileShowOverlay
                                                        }
                                                        className="btn btn-outline-danger d-flex gap-2 align-items-center"
                                                    >
                                                        {t(
                                                            "buyer_pages.profile.del_btn"
                                                        )}
                                                        <MdDeleteOutline size="1.4rem" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="col-lg-7 mt-5 mt-md-0">
                                <div className="card shadow border">
                                    <div className="card-title p-4 pb-0 profile__title">
                                        <h3>{t("buyer_pages.profile.det")}</h3>
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
                                                            <PiUserCircle size="1.5rem" />
                                                            {t("full_name")}
                                                        </h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={fullName}
                                                            onChange={(e) =>
                                                                setFullName(
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
                                                            <TfiEmail size="1.4rem" />
                                                            {t("email")}
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
                                                            placeHolder={`
                                                                ${t(
                                                                    "select_state"
                                                                )}
                                                            `}
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
                                                            {t("phone")}
                                                        </h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        <PhoneInput
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
                                                                "buyer_pages.profile.edit"
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
                            <div className="col-lg-12 mt-3">
                                <div className="card border shadow">
                                    <div
                                        id="tab"
                                        className="card-body d-flex flex-column"
                                    >
                                        <div className="gap-2 d-flex flex-wrap justify-content-center">
                                            <button className="btn btn-primary">
                                                <Link
                                                    style={{ color: "white" }}
                                                    to="#addP"
                                                    data-bs-toggle="collapse"
                                                >
                                                    Add product to category
                                                </Link>
                                            </button>
                                            <button className="btn btn-primary">
                                                <Link
                                                    style={{ color: "white" }}
                                                    to="#createC"
                                                    data-bs-toggle="collapse"
                                                >
                                                    Create category
                                                </Link>
                                            </button>
                                            <button className="btn btn-danger">
                                                <Link
                                                    style={{ color: "white" }}
                                                    to="#removeP"
                                                    data-bs-toggle="collapse"
                                                >
                                                    Remove product from category
                                                </Link>
                                            </button>
                                            <button className="btn btn-danger">
                                                <Link
                                                    style={{ color: "white" }}
                                                    to="#removeC"
                                                    data-bs-toggle="collapse"
                                                >
                                                    Delete category
                                                </Link>
                                            </button>
                                        </div>
                                        <div
                                            className="collapse"
                                            id="removeP"
                                            data-bs-parent="#tab"
                                        >
                                            <form>
                                                <select
                                                    className="form-select mt-3"
                                                    style={{
                                                        maxWidth: "700px",
                                                    }}
                                                    defaultValue=""
                                                    onChange={(event) =>
                                                        setSelectedCat(
                                                            event.currentTarget
                                                                .value
                                                        )
                                                    }
                                                >
                                                    <option value="" disabled>
                                                        Select category
                                                    </option>
                                                    {categories.map((cat) => (
                                                        <option
                                                            key={cat}
                                                            value={cat}
                                                        >
                                                            {cat}
                                                        </option>
                                                    ))}
                                                </select>
                                            </form>
                                            <table className="table table-bordered mt-3">
                                                <tbody>
                                                    {validData.map(
                                                        (prod, index) => (
                                                            <tr
                                                                className="d-flex justify-content-between"
                                                                key={index}
                                                            >
                                                                <td
                                                                    style={{
                                                                        borderLeft:
                                                                            "none",
                                                                        borderRight:
                                                                            "none",
                                                                    }}
                                                                >
                                                                    {prod.name}
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        borderLeft:
                                                                            "none",
                                                                        borderRight:
                                                                            "none",
                                                                    }}
                                                                >
                                                                    <button
                                                                        onClick={() =>
                                                                            onDelete(
                                                                                prod.id
                                                                            )
                                                                        }
                                                                        className="btn btn-outline-danger"
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div
                                            className="collapse"
                                            id="addP"
                                            data-bs-parent="#tab"
                                        >
                                            <form>
                                                <select
                                                    className="form-select mt-3"
                                                    style={{
                                                        maxWidth: "700px",
                                                    }}
                                                    defaultValue=""
                                                    onChange={(event) =>
                                                        setSelectedCat(
                                                            event.currentTarget
                                                                .value
                                                        )
                                                    }
                                                    onSubmit={() =>
                                                        console.log()
                                                    }
                                                >
                                                    <option value="" disabled>
                                                        Select category
                                                    </option>
                                                    {categories.map((cat) => (
                                                        <option
                                                            key={cat}
                                                            value={cat}
                                                        >
                                                            {cat}
                                                        </option>
                                                    ))}
                                                </select>
                                            </form>
                                            <table className="table table-bordered mt-3">
                                                <tbody>
                                                    {products.map(
                                                        (prod, index) => (
                                                            <tr
                                                                className="d-flex justify-content-between"
                                                                key={index}
                                                            >
                                                                <td
                                                                    style={{
                                                                        borderLeft:
                                                                            "none",
                                                                        borderRight:
                                                                            "none",
                                                                    }}
                                                                >
                                                                    {prod.name}
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        borderLeft:
                                                                            "none",
                                                                        borderRight:
                                                                            "none",
                                                                    }}
                                                                >
                                                                    <button
                                                                        className="btn btn-outline-primary"
                                                                        onClick={() =>
                                                                            console.log(
                                                                                {
                                                                                    id: prod.id,
                                                                                    category:
                                                                                        selectedCat,
                                                                                }
                                                                            )
                                                                        }
                                                                    >
                                                                        Add
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div
                                            className="collapse"
                                            id="createC"
                                            data-bs-parent="#tab"
                                        >
                                            <form
                                                className="mt-3"
                                                onSubmit={handleSubmit((data) =>
                                                    console.log(data)
                                                )}
                                            >
                                                <label
                                                    className="form-label"
                                                    htmlFor="in"
                                                >
                                                    Create Category
                                                </label>
                                                <input
                                                    {...register("category")}
                                                    id="in"
                                                    className="form-control"
                                                    type="text"
                                                    style={{
                                                        borderRight:
                                                            "1px solid #cccccc",
                                                    }}
                                                />
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary mt-2"
                                                >
                                                    Add
                                                </button>
                                            </form>
                                        </div>
                                        <div
                                            className="collapse"
                                            id="removeC"
                                            data-bs-parent="#tab"
                                        >
                                            <table className="table table-bordered mt-3">
                                                <tbody>
                                                    {categories.map(
                                                        (cat, index) => (
                                                            <tr
                                                                className="d-flex justify-content-between"
                                                                key={index}
                                                            >
                                                                <td
                                                                    style={{
                                                                        borderLeft:
                                                                            "none",
                                                                        borderRight:
                                                                            "none",
                                                                    }}
                                                                >
                                                                    {cat}
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        borderLeft:
                                                                            "none",
                                                                        borderRight:
                                                                            "none",
                                                                    }}
                                                                >
                                                                    <button
                                                                        className="btn btn-outline-danger"
                                                                        onClick={() =>
                                                                            setCategories(
                                                                                categories.filter(
                                                                                    (
                                                                                        e
                                                                                    ) =>
                                                                                        e !==
                                                                                        cat
                                                                                )
                                                                            )
                                                                        }
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
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

const handleFileUpload = () => {
    let input = document.getElementById("profilePicture");
    input.click();
};

const reRenderPicture = (picture) => {
    let reader = new FileReader();

    reader.onload = (event) => {
        document
            .getElementById("userProfilePicture")
            .setAttribute("src", event.target.result);
        userImage;
    };

    reader.readAsDataURL(picture);
};

const deleteProfileShowOverlay = () => {
    const overlay = document.getElementById("dialog-container");
    overlay.classList.add("d-flex");
    overlay.classList.remove("d-none");
};

const deleteProfileHideOverlay = () => {
    const overlay = document.getElementById("dialog-container");
    overlay.classList.remove("d-flex");
    overlay.classList.add("d-none");
};

export default Profile;
