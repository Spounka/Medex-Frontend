import { useEffect, useState } from "react";

import BreadCrumb from "../../components/Buyer/shared/BreadCrumb";
import ProductCard from "../../components/Buyer/shared/ProductCard";
import useAxios from "../../utils/useAxios";
import { useTranslation } from "react-i18next";

const Wishlist = () => {
    const { t } = useTranslation();

    const [wishlistProducts, setWishlistProducts] = useState([]);

    const api = useAxios();

    const getWishlistProducts = async () => {
        await api
            .get(import.meta.env.VITE_BACKEND_URL + "/api/wishlist/")
            .then((res) => {
                setWishlistProducts(res.data);
            });
    };

    useEffect(() => {
        getWishlistProducts();
    }, []);

    return (
        <main>
            <section className="py-4">
                <div className="container">
                    <div className="row">
                        <BreadCrumb title={`${t("header.wishlist")}`} />
                    </div>
                    <div className="row">
                        {wishlistProducts.length > 0 ? (
                            wishlistProducts.map((wishlistProduct) => (
                                <div
                                    className="col-6 col-md-3 mt-4"
                                    key={wishlistProduct.product.sku}
                                    id={wishlistProduct.product.sku}
                                >
                                    <ProductCard
                                        product={wishlistProduct.product}
                                        cart={false}
                                        wish={true}
                                    />
                                </div>
                            ))
                        ) : (
                            <div
                                className="col-10 mx-auto alert text-center alert-primary fade show fw-bold mt-5 mt-md-4"
                                role="alert"
                            >
                                {t("wishlist_empty")}!
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Wishlist;
