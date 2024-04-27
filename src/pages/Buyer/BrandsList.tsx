import { useState, useEffect, HTMLProps } from "react";

import { Link } from "react-router-dom";

import { AiOutlineSafetyCertificate } from "react-icons/ai";

import axios from "axios";

import { useTranslation } from "react-i18next";
import { Brand } from "@domain/product.ts";
import clsx from "clsx";

type BrandsListProps = {
    brand: Brand;
} & HTMLProps<HTMLDivElement>;

export function BrandCard({ brand, className }: BrandsListProps) {
    return (
        <Link
            to={`/products?brand=${brand.slug}`}
            className={clsx(
                "tw-flex tw-flex-1 tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-overflow-hidden tw-rounded-xl tw-border tw-border-gray-200 tw-pb-2.5",
                className,
            )}
        >
            <div className="tw-w-full tw-border-b tw-border-gray-200">
                <img
                    src={brand.image}
                    alt="Brand"
                    className="tw-h-auto tw-max-h-[120px] tw-w-full tw-object-cover tw-px-2"
                />
            </div>
            <p className="tw-font-tajawal tw-text-4xl tw-font-semibold tw-text-black">
                {brand.name.toLowerCase()}
            </p>
        </Link>
    );
}

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
                    <div className="row gap-2 tw-flex tw-flex-wrap">
                        {brands.length > 0 ? (
                            brands.map((brand) => {
                                return (
                                    <BrandCard
                                        key={brand.id}
                                        brand={brand}
                                    />
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
