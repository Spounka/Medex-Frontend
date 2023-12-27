import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../context/AuthContext";

import useAxios from "../../utils/useAxios";

import { TbDatabaseSearch } from "react-icons/tb";

import ProductCard from "../../components/Supplier/shared/ProductCard";
import { useTranslation } from "react-i18next";

const ProductList = (props) => {
    const { t } = useTranslation();

    const { buttonLink, buttonText, buttonIcon } = props;

    const api = useAxios();

    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState({});

    const getProducts = async () => {
        await api
            .get(
                import.meta.env.VITE_BACKEND_URL +
                    `/api/product/product?supplier=${user.user_id}`
            )
            .then((res) => {
                setProducts(res.data);
            });
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <main className="px-0 px-md-3">
            <section>
                <div className="container-fluid">
                    <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                        <TbDatabaseSearch size="2.5rem" />
                        {t("supplier_pages.product_list.title")}
                    </h2>
                    <div className="row">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div
                                    className="col-6 col-md-3 mt-4"
                                    key={product.sku}
                                >
                                    <ProductCard
                                        product={product}
                                        buttonLink={buttonLink + product.sku}
                                        buttonText={buttonText}
                                        buttonIcon={buttonIcon}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-center">
                                {t("buyer_pages.home.none")}!
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProductList;
