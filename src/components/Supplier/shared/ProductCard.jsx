import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

const ProductCard = (props) => {
    const { t } = useTranslation();

    const { product, buttonLink, buttonIcon, buttonText } = props;

    return (
        <div className="card rounded-3 position-relative ">
            <Link
                to={`/supplier/products/${product.sku}`}
                state={{ product: product }}
                className="card-link"
            >
                <img
                    src={product.thumbnail}
                    className="card-img-top home__card-img"
                    width="100%"
                    alt="product"
                />
                <div className="card-title pt-3 px-3">
                    <h5 className="home__card-title">{product.name}</h5>
                </div>
            </Link>
            <div className="card-body">
                <div className="fw-bold home__card-price">
                    {product.price > 0 && (
                        <span
                            className={
                                product.sale_price > 0
                                    ? "text-decoration-line-through"
                                    : ""
                            }
                        >
                            {product.price}&nbsp; {t("sar")}
                        </span>
                    )}
                    {product.sale_price > 0 && (
                        <span className="d-block">
                            {product.sale_price}&nbsp; {t("sar")}
                        </span>
                    )}

                    {product.price_range_min > 0 && (
                        <span>
                            {product.price_range_min}&nbsp; {t("sar")} -
                            <br />
                            {product.price_range_max}&nbsp; {t("sar")}
                        </span>
                    )}
                </div>

                <Link
                    className="btn btn-primary d-flex gap-2 justify-content-center align-items-center mt-3"
                    to={buttonLink}
                    state={{ product }}
                >
                    {buttonIcon}
                    {buttonText}
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
