import BreadCrumb from "../../components/Buyer/shared/BreadCrumb";

import { Link } from "react-router-dom";

import { MdDelete, MdShoppingCartCheckout } from "react-icons/md";
import { TbShoppingCartPlus } from "react-icons/tb";

import "react-widgets/styles.css";
import NumberPicker from "react-widgets/NumberPicker";
import { useTranslation } from "react-i18next";
import Container from "../../components/ui/container";

const Cart = (props) => {
    const { t } = useTranslation();

    const { cartItems, setCartItems, addToCart, removeFromCart } = props;

    const subtotal = cartItems?.reduce(
        (a, c) => a + (c.sale_price > 0 ? c.sale_price : c.price) * c.qty,
        0,
    );

    const handleItemDelete = (product) => {
        const newCartItems = cartItems.filter((x) => x.sku !== product.sku);
        setCartItems(newCartItems);
        localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    };

    const handleQuantityChange = (e, product) => {
        let newQty = parseInt(e);

        if (newQty > product.stock_quantity) {
            newQty = product.stock_quantity;
        }

        let qty = product.qty;

        if (newQty > qty) {
            addToCart(product, newQty);
        } else {
            removeFromCart(product, newQty);
        }
    };

    return (
        <Container
            node={"main"}
            className={"tw-py-8"}
        >
            <div className="row">
                <BreadCrumb title={t("mobile.cart")} />
            </div>

            {cartItems.length > 0 ? (
                <>
                    <div className="row mt-5">
                        <div className="col-12">
                            <div className="cart__table-header py-3 d-flex justify-content-between align-items-center">
                                <h4 className="cart__table-title cart__table-col-1">
                                    {t("buyer_pages.cart.product")}
                                </h4>
                                <h4 className="cart__table-title cart__table-col-2">
                                    {t("buyer_pages.cart.price")}
                                </h4>
                                <h4 className="cart__table-title cart__table-col-3">
                                    {t("buyer_pages.cart.qty")}
                                </h4>
                                <h4 className="cart__table-title cart__table-col-4 text-center">
                                    {t("buyer_pages.cart.total")}
                                </h4>
                            </div>
                        </div>
                        <div className="col-12">
                            {cartItems.map((product) => {
                                return (
                                    <div
                                        className="cart__table-data py-3 d-flex justify-content-between align-items-center"
                                        key={product.sku}
                                    >
                                        <div className="cart__table-title gap-2 cart__table-col-1 d-flex align-items-center">
                                            <div className="w-25">
                                                <img
                                                    src={product.thumbnail}
                                                    alt="Product"
                                                    className="img-fluid rounded shadow cart__table-img"
                                                />
                                            </div>
                                            <div className="w-75">
                                                <Link
                                                    to={`/products/${product.sku}`}
                                                    state={{
                                                        product: product,
                                                    }}
                                                    className="cart__table-link"
                                                >
                                                    {product.name}
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="cart__table-col-2">
                                            <span className="cart__table-price">
                                                {product.sale_price > 0
                                                    ? product.sale_price
                                                    : product.price}
                                            </span>
                                        </div>
                                        <div className="cart__table-col-3 d-flex align-items-center gap-1 gap-md-3">
                                            <NumberPicker
                                                id={`qty-${product.sku}`}
                                                defaultValue={product.qty}
                                                min={0}
                                                max={product.stock_quantity}
                                                onChange={(e) => {
                                                    handleQuantityChange(e, product);
                                                }}
                                                className="w-75 w-md-50"
                                            />

                                            <MdDelete
                                                size="1.6rem"
                                                className="cart__delete-icon"
                                                onClick={() => handleItemDelete(product)}
                                            />
                                        </div>
                                        <div className="cart__table-col-4 text-center cart__table-price">
                                            {(
                                                (product.sale_price > 0
                                                    ? product.sale_price
                                                    : product.price) * product.qty
                                            ).toFixed(2)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="row mt-5 p-4 cart__table-data">
                        <h5 className="fw-bold mb-0">
                            {t("buyer_pages.cart.subtotal")}: {subtotal.toFixed(2)}{" "}
                            {t("sar")}
                        </h5>
                    </div>

                    <div className="row mt-5">
                        <div className="col-12 col-md-6">
                            <Link
                                to="/checkout"
                                className="gradient-bg-color w-75 mx-auto px-5 py-2 text-white rounded shadow fw-bold d-flex align-items-center gap-2 justify-content-center"
                            >
                                {t("buyer_pages.cart.proceed")}
                                <MdShoppingCartCheckout size="1.5rem" />
                            </Link>
                        </div>

                        <div className="col-12 col-md-6">
                            <Link
                                to="/products"
                                className="gradient-bg-color w-75 mx-auto mt-3 mt-md-0 px-5 py-2 text-white rounded shadow fw-bold d-flex align-items-center gap-2 justify-content-center"
                            >
                                {t("buyer_pages.cart.continue")}
                                <TbShoppingCartPlus size="1.5rem" />
                            </Link>
                        </div>
                    </div>
                </>
            ) : (
                <h3 className="text-center mt-5">{t("buyer_pages.cart.empty_cart")}!</h3>
            )}
        </Container>
    );
};

export default Cart;
