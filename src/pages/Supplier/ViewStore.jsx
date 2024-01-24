import { useState, useContext, useEffect } from "react";

import { GetState, GetCity, GetCountries } from "react-country-state-city";

import userImage from "../../assets/images/user.png";
import coverImage from "../../assets/images/cover.jpg";

import useAxios from "../../utils/useAxios";

import AuthContext from "../../context/AuthContext";

import { useTranslation } from "react-i18next";

const ViewStore = () => {
    const { t } = useTranslation();

    const api = useAxios();

    const { user } = useContext(AuthContext);

    const [privateCategories, setPrivateCategories] = useState([]);

    const [companyProfilePicture, setCompanyProfilePicture] = useState(null);
    const [companyCoverPicture, setCompanyCoverPicture] = useState(null);

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

    const getUserData = async (user_id) => {
        await api
            .get(
                import.meta.env.VITE_BACKEND_URL +
                    `/api/company/${user_id}/?cat=${true}`
            )
            .then((res) => {
                const data = res.data;

                console.log(data);

                if (user_id == data.company.supplier) {
                    GetCountries()
                        .then((res) => {
                            let c = res.find(
                                (x) =>
                                    x.id ==
                                    parseInt(data?.company.address.country)
                            );
                            setCountry(c);
                        })
                        .then(() => {
                            return GetState(
                                parseInt(data?.company.address.country)
                            ).then((res) => {
                                if (res.length > 0) {
                                    let s = res.find(
                                        (x) =>
                                            x.id ==
                                            parseInt(
                                                data?.company.address.state
                                            )
                                    );
                                    setState(s);
                                }
                            });
                        })
                        .then(() => {
                            return GetCity(
                                parseInt(data?.company.address.country),
                                parseInt(data?.company.address.state)
                            ).then((res) => {
                                if (res.length > 0) {
                                    let c = res.find(
                                        (x) =>
                                            x.id ==
                                            parseInt(data?.company.address.city)
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
                                    parseInt(data?.company.address.country)
                            );
                            setCountry(c.name);
                        })
                        .then(() => {
                            return GetState(
                                parseInt(data?.company.address.country)
                            ).then((res) => {
                                if (res.length > 0) {
                                    let s = res.find(
                                        (x) =>
                                            x.id ==
                                            parseInt(
                                                data?.company.address.state
                                            )
                                    );
                                    setState(s.name);
                                }
                            });
                        })
                        .then(() => {
                            return GetCity(
                                parseInt(data?.company.address.country),
                                parseInt(data?.company.address.state)
                            ).then((res) => {
                                if (res.length > 0) {
                                    let c = res.find(
                                        (x) =>
                                            x.id ==
                                            parseInt(data?.company.address.city)
                                    );
                                    setCity(c.name);
                                }
                            });
                        });
                }

                setAddress1(data?.company?.address.address_1);
                setAddress2(data?.company?.address?.address_2 || "");
                setPostal(data?.company?.address.postal_code);
                setCompanyName(data?.company?.name);
                setEmail(data?.company?.email);
                setPhone(data?.company?.phone);
                setCompanyProfilePicture(
                    data?.company?.company_profile_picture || ""
                );
                setCompanyCoverPicture(
                    data?.company?.company_cover_picture || ""
                );
                setWebsite(data?.company?.website || "");

                setPrivateCategories(data?.products);
            });
    };

    useEffect(() => {
        if (user.role === "supplier") {
            getUserData(user.user_id);
        }
    }, []);

    return (
        <main className="px-0 px-md-3">
            <section>
                <div className="container-xxl">
                    <h1>Store</h1>
                </div>
            </section>
        </main>
    );
};

export default ViewStore;
