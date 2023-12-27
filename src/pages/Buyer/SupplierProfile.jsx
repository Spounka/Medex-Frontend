import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";

import axios from "axios";

import Header from "../../components/Buyer/shared/Header";
import Footer from "../../components/Buyer/shared/Footer";

import userImage from "../../assets/images/user.png";

import {
    MdLocationCity,
    MdOutlineLocationOn,
    MdOutlineContactMail,
} from "react-icons/md";
import { TfiEmail, TfiLocationArrow } from "react-icons/tfi";
import {
    BsPhoneVibrate,
    BsGlobeEuropeAfrica,
    BsSignpost2,
} from "react-icons/bs";
import AuthContext from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const SupplierProfile = () => {
    const { t } = useTranslation();

    const { user } = useContext(AuthContext);

    const location = useLocation();
    const [supplier, setSupplier] = useState({});

    const navigate = useNavigate();

    const params = useParams();

    const getSupplier = async () => {
        const supplierID = params?.id;

        if (supplierID == user?.user_id) {
            navigate("/supplier/account/profile");
        }

        let supplier = location?.state?.supplier;

        if (supplier) {
            setSupplier(location?.state?.supplier);
        } else {
            try {
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_BACKEND_URL
                    }/api/account/profile/${supplierID}`
                );
                setSupplier(response.data);
                console.log(response);
            } catch (err) {
                navigate("/not-found/");
            }
        }
    };

    useEffect(() => {
        getSupplier();
    }, []);

    return (
        <>
            <Header />
            <main>
                <section className="container py-3">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="card shadow border">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img
                                            src={
                                                supplier?.profilePicture
                                                    ? import.meta.env
                                                          .VITE_BACKEND_URL +
                                                      supplier?.profilePicture
                                                    : userImage
                                            }
                                            alt="Picture"
                                            id="userProfilePicture"
                                            className="rounded-circle shadow border-2 object-fit-cover"
                                            width={150}
                                            height={150}
                                        />
                                        <div className="mt-3">
                                            <h4>{supplier?.full_name}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {user?.user_id !== supplier?.id && (
                                <Link
                                    to={`/chat/${supplier?.id}`}
                                    className="gradient-bg-color w-100 py-2 mt-5 text-white rounded border-0 d-flex align-items-center gap-2 justify-content-center"
                                >
                                    {t("buyer_pages.product_details.contact")}
                                    <MdOutlineContactMail
                                        style={{
                                            fontSize: "1.5rem",
                                        }}
                                    />
                                </Link>
                            )}
                        </div>
                        <div className="col-lg-7 mt-5 mt-md-0">
                            <div className="card shadow border">
                                <div className="card-title p-4 pb-0 profile__title">
                                    <h3>{t("buyer_pages.profile.det")}</h3>
                                </div>
                                <div className="card-body">
                                    <div>
                                        <div className="row mb-4 d-flex align-items-center">
                                            <div className="col-sm-4">
                                                <h6 className="mb-0 d-flex align-items-center gap-2">
                                                    <TfiEmail size="1.4rem" />
                                                    {t("email")}
                                                </h6>
                                            </div>
                                            <div className="col-sm-8 text-secondary">
                                                <p className="mb-0">
                                                    {supplier?.email}
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            className="row mb-4 d-flex align-items-center"
                                            id="country"
                                        >
                                            <div className="col-sm-4">
                                                <h6 className="mb-0 d-flex align-items-center gap-2">
                                                    <BsGlobeEuropeAfrica size="1.4rem" />
                                                    {t("country")}
                                                </h6>
                                            </div>
                                            <div className="col-sm-8 text-secondary">
                                                <p className="mb-0">
                                                    {
                                                        supplier
                                                            ?.shipping_address
                                                            ?.country
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        {supplier?.shipping_address?.state !=
                                            "" && (
                                            <div className="row mb-4 d-flex align-items-center">
                                                <div className="col-sm-4">
                                                    <h6 className="mb-0 d-flex align-items-center gap-2">
                                                        <TfiLocationArrow size="1.4rem" />
                                                        {t("state")}
                                                    </h6>
                                                </div>
                                                <div
                                                    className="col-sm-8 text-secondary"
                                                    id="state"
                                                >
                                                    <p className="mb-0">
                                                        {supplier?.state}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {supplier?.shipping_address?.city !=
                                            "" && (
                                            <div className="row mb-4 d-flex align-items-center">
                                                <div className="col-sm-4">
                                                    <h6 className="mb-0 d-flex align-items-center gap-2">
                                                        <MdLocationCity size="1.4rem" />
                                                        {t("city")}
                                                    </h6>
                                                </div>
                                                <div
                                                    className="col-sm-8 text-secondary"
                                                    id="city"
                                                >
                                                    <p className="mb-0">
                                                        {supplier?.city}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="row mb-4 d-flex align-items-center">
                                            <div className="col-sm-4">
                                                <h6 className="mb-0 d-flex align-items-center gap-2">
                                                    <BsSignpost2 size="1.4rem" />
                                                    {t("postal")}
                                                </h6>
                                            </div>
                                            <div className="col-sm-8 text-secondary">
                                                <p className="mb-0">
                                                    {
                                                        supplier
                                                            ?.shipping_address
                                                            ?.postal_code
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row mb-4 d-flex align-items-center">
                                            <div className="col-sm-4">
                                                <h6 className="mb-0 d-flex align-items-center gap-2">
                                                    <MdOutlineLocationOn size="1.4rem" />
                                                    {t("address1")}
                                                </h6>
                                            </div>
                                            <div className="col-sm-8 text-secondary">
                                                <p className="mb-0">
                                                    {
                                                        supplier
                                                            ?.shipping_address
                                                            ?.address_1
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        {supplier?.shipping_address
                                            ?.address_2 != "" && (
                                            <div className="row mb-4 d-flex align-items-center">
                                                <div className="col-sm-4">
                                                    <h6 className="mb-0 d-flex align-items-center gap-2">
                                                        <MdOutlineLocationOn size="1.4rem" />
                                                        {t("address2")}
                                                    </h6>
                                                </div>
                                                <div className="col-sm-8 text-secondary">
                                                    <p className="mb-0">
                                                        {
                                                            supplier
                                                                ?.shipping_address
                                                                ?.address2
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="row mb-4 d-flex align-items-center">
                                            <div className="col-sm-4">
                                                <h6 className="mb-0 d-flex align-items-center gap-2">
                                                    <BsPhoneVibrate size="1.4rem" />
                                                    {t("phone")}
                                                </h6>
                                            </div>
                                            <div className="col-sm-8 text-secondary">
                                                <p className="mb-0">
                                                    +{supplier?.phone}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default SupplierProfile;
