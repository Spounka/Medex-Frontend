import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { AiOutlineSafetyCertificate } from "react-icons/ai";

import axios from "axios";

import { useTranslation } from "react-i18next";

const BrandsList = () => {
    const { t } = useTranslation();

    const [brands, setBrands] = useState([]);

    const getBrands = async () => {
        await axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/product/brand")
            .then((res) => {
                setBrands(res.data);
            });
    };

    useEffect(() => {
        getBrands();
    }, []);

    return (
        <main>
            <section className="py-5">
                <div className="container-xxl">
                    <h3 className="home__sections-title fw-bolder d-flex align-items-center gap-2">
                        <AiOutlineSafetyCertificate size="2rem" />
                        {t("buyer_pages.brands_list.all")}
                    </h3>
                    <div className="row mt-3">
                        {brands.length > 0 ? (
                            brands.map((brand) => {
                                return (
                                    <Link
                                        to={`/products?brand=${brand.slug}`}
                                        className="col-6 col-md-2 my-2"
                                        key={brand.id}
                                    >
                                        <div className="card shadow d-flex align-items-center justify-content-center home__brand-card">
                                            <img
                                                src={brand.image}
                                                alt="Brand"
                                                className="img-fluid px-4"
                                            />
                                        </div>
                                    </Link>
                                );
                            })
                        ) : (
                            <p className="text-center">
                                {t("buyer_pages.brands_list.none")}!
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default BrandsList;
