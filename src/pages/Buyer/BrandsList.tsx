import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { AiOutlineSafetyCertificate } from "react-icons/ai";

import axios from "axios";

import { useTranslation } from "react-i18next";
import { Brand } from "@domain/product.ts";

const BrandsList = () => {
    const { t } = useTranslation();

    const [brands, setBrands] = useState<Brand[]>([]);

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
                    <div className="row mt-3 d-flex flex-wrap gap-2">
                        {brands.length > 0 ? (
                            brands.map((brand) => {
                                return (
                                    <Link
                                        to={`/products?brand=${brand.slug}`}
                                        className="tw-flex-[0_1_45%] md:tw-flex-[0_1_32%] lg:tw-flex-[0_1_18%]"
                                        style={{ width: "fit-content" }}
                                        key={brand.id}
                                    >
                                        <div className="card d-flex align-items-center justify-content-center home__brand-card tw-h-full">
                                            <img
                                                src={brand.image}
                                                alt="Brand"
                                                className="img-fluid px-4 tw-h-full"
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
