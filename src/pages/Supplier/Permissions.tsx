import { Link } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { PiUserCircle } from "react-icons/pi";
import { TfiEmail } from "react-icons/tfi";
import { FaUserTie } from "react-icons/fa";
import { BsPhoneVibrate } from "react-icons/bs";
import { RiLockPasswordLine, RiUserAddLine } from "react-icons/ri";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import useAxios from "../../utils/useAxios";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { toast } from "react-toastify";
import userImage from "../../assets/images/user.png";

const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const PHONE_REGEX =
    /^\+?[0-9]{1,3}\s?[-.()]?\s?[0-9]{1,5}\s?[-.]?\s?[0-9]{1,5}\s?[-.]?\s?[0-9]{1,9}$/;

const animatedComponents = makeAnimated();

const Permissions = () => {
    const { t, i18n } = useTranslation();

    const api = useAxios();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [position, setPosition] = useState([]);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [employees, setEmployees] = useState([]);

    const positionOptions = [
        {
            value: "p_man",
            label: t("supplier_pages.permissions.p_man"),
        },
        {
            value: "q_man",
            label: t("supplier_pages.permissions.q_man"),
        },
        {
            value: "s_man",
            label: t("supplier_pages.permissions.s_man"),
        },
        {
            value: "c_man",
            label: t("supplier_pages.permissions.c_man"),
        },
    ];

    const handleSubmit = async (e) => {
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

        await api
            .post(
                import.meta.env.VITE_BACKEND_URL +
                    "/api/account/supplier/employee/",
                {
                    full_name: name,
                    email,
                    password,
                    position: JSON.stringify(position),
                    phone,
                }
            )
            .then(() => {
                setName("");
                setEmail("");
                setPhone("");
                setPosition([]);
                setPassword("");
                setConfirmPassword("");

                toast.success(t("supplier_pages.permissions.create_success"));
            })
            .catch((err) => {
                let errors = err.response.data;
                if (Object.keys(errors).indexOf("email") > -1) {
                    toast.error(
                        t("supplier_pages.permissions.create_fail_email")
                    );
                } else {
                    toast.error(
                        t("supplier_pages.permissions.create_fail_general")
                    );
                }
            });
    };

    const getEmployees = async () => {
        await api
            .get(
                import.meta.env.VITE_BACKEND_URL +
                    "/api/account/supplier/employee/"
            )
            .then((res) => {
                setEmployees(res.data);
            });
    };

    const handleDelete = async (employee_id) => {
        await api
            .delete(
                import.meta.env.VITE_BACKEND_URL +
                    "/api/account/supplier/employee/",
                {
                    data: { employee_id },
                }
            )
            .then(() => {
                toast.success(t("supplier_pages.permissions.success"));

                setEmployees((employees) => {
                    return employees.filter(
                        (employee) => employee.id !== employee_id
                    );
                });
            });
    };

    useEffect(() => {
        getEmployees();
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
                            <div className="col-12">
                                <h2 className="d-flex align-items-center gap-2 dashboard__title">
                                    {t("supplier_pages.permissions.title")}
                                </h2>
                                <div className="mt-5 px-5">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row mb-4">
                                            <div className="col-12 col-md-5">
                                                <label
                                                    htmlFor="name"
                                                    className="form-label d-flex align-items-center gap-2 login__form-label"
                                                >
                                                    <PiUserCircle size="1.4rem" />
                                                    {t("full_name")} *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder={`${t(
                                                        "full_name"
                                                    )}...`}
                                                    required
                                                    value={name}
                                                    onChange={(e) =>
                                                        setName(e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="col-0 col-md-2"></div>
                                            <div className="col-12 col-md-5">
                                                <label
                                                    htmlFor="position"
                                                    className="form-label d-flex align-items-center gap-2 login__form-label"
                                                >
                                                    <FaUserTie size="1.4rem" />
                                                    {t(
                                                        "supplier_pages.permissions.position"
                                                    )}{" "}
                                                    *
                                                </label>
                                                <Select
                                                    closeMenuOnSelect={false}
                                                    components={
                                                        animatedComponents
                                                    }
                                                    isMulti
                                                    onChange={(e) => {
                                                        setPosition(e);
                                                    }}
                                                    options={positionOptions}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-12 col-md-5 d-flex align-items-center">
                                                <div className="w-100">
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
                                                            "email"
                                                        )}...`}
                                                        required
                                                        value={email}
                                                        onChange={(e) =>
                                                            setEmail(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-0 col-md-2"></div>
                                            <div className="col-12 col-md-5">
                                                <label
                                                    htmlFor="phone"
                                                    className="form-label d-flex align-items-center gap-2 login__form-label"
                                                >
                                                    <BsPhoneVibrate size="1.4rem" />
                                                    {t("phone")} *
                                                </label>
                                                <PhoneInput
                                                    country={"sa"}
                                                    countryCodeEditable={false}
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
                                        <div className="row mt-4">
                                            <div className="col-12 col-md-5">
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
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="col-0 col-md-2"></div>
                                            <div className="col-12 col-md-5">
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
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-5">
                                            <button
                                                type="submit"
                                                className="gradient-bg-color w-100 py-2 text-white rounded shadow fw-bold login__btn d-flex align-items-center gap-2 justify-content-center"
                                            >
                                                {t(
                                                    "supplier_pages.permissions.submit"
                                                )}
                                                <RiUserAddLine size="1.4rem" />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="row pt-5 mt-5">
                            <div className="col-12">
                                <h2 className="d-flex align-items-center gap-2 dashboard__title">
                                    {t("supplier_pages.permissions.employees")}
                                </h2>
                                <div className="my-5 px-5">
                                    {employees.length > 0 ? (
                                        employees.map((employee) => {
                                            return (
                                                <div
                                                    key={employee.id}
                                                    className="card rounded-0 border-0 border-bottom py-2"
                                                >
                                                    <div className="row p-2 g-0">
                                                        <div className="col-1 my-auto">
                                                            <img
                                                                className="object-fit-contain shadow rounded-circle border p-1 border-primary"
                                                                src={userImage}
                                                                alt="User Logo"
                                                                width={55}
                                                                height={55}
                                                            />
                                                        </div>
                                                        <div className="col-6 col-md-8 px-2 px-md-0">
                                                            <h3 className="text-capitalize fw-bold m-0 chat__user-name">
                                                                {
                                                                    employee.full_name
                                                                }
                                                            </h3>
                                                            <p className="text-muted m-0 px-0 px-md-1 chat__user-message pt-2">
                                                                {employee
                                                                    ?.groups
                                                                    ?.length >
                                                                    0 &&
                                                                    employee.groups.map(
                                                                        (
                                                                            group,
                                                                            i
                                                                        ) => {
                                                                            const translationKey = `supplier_pages.permissions.${group}`;
                                                                            const translatedGroup =
                                                                                t(
                                                                                    translationKey
                                                                                );
                                                                            const isLastGroup =
                                                                                i ===
                                                                                employee
                                                                                    .groups
                                                                                    .length -
                                                                                    1;

                                                                            return isLastGroup
                                                                                ? translatedGroup
                                                                                : `${translatedGroup} - `;
                                                                        }
                                                                    )}
                                                            </p>
                                                        </div>
                                                        <div className="col-5 col-md-3 my-auto text-end px-0 px-md-3">
                                                            <button
                                                                className="btn btn-outline-danger"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        employee?.id
                                                                    )
                                                                }
                                                                type="button"
                                                            >
                                                                {t(
                                                                    "supplier_pages.edit_store.rem_pro"
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="text-center">
                                            {t(
                                                "supplier_pages.permissions.none"
                                            )}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Permissions;
