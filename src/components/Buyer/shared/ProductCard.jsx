import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import useWishlistHandler from "../../../utils/useWishlistHandler";
import AuthContext from "../../../context/AuthContext";

import { useTranslation } from "react-i18next";

const ProductCard = (props) => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleWishlist = useWishlistHandler();

  const { product, cart, wish, addToCart } = props;

  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleWishButtonClick = () => {
    if (user) {
      try {
        handleWishlist(product.sku, wish);
      } catch {
        return;
      }

      setIsInWishlist(!isInWishlist);
    } else {
      navigate("/account/login");
    }
  };

  useEffect(() => {
    let wishlistArray = [];

    if (localStorage.getItem("wishlist")) {
      wishlistArray = JSON.parse(localStorage.getItem("wishlist"));
    }

    setIsInWishlist(wishlistArray.includes(product.sku));
  }, [product.sku]);

  useEffect(() => {
    let cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    cartItems.forEach((item) => {
      let buttons = document.querySelectorAll(`#item-cart-button-${item.sku}`);

      if (item.qty < item.stock_quantity) {
        buttons.forEach((btn) => {
          btn.classList.remove("disabled");
        });
      } else {
        buttons.forEach((btn) => {
          btn.classList.add("disabled");
          btn.setAttribute("disabled", true);
        });
      }
    });
  }, []);
  return (
    <div className="cardd card home__card" style={{ borderRadius: "5px" }}>
      <Link
        to={`/products/${product.sku}`}
        state={{ product: product }}
        className="card-link"
      >
        <img
          src={user ? user.role == "buyer" ? product.thumbnail : import.meta.env.VITE_BACKEND_URL + product.thumbnail : product.thumbnail }
          className="card-img-top home__card-img"
          width="100%"
          alt="product"
        />
        <div className="card-title pt-3 px-3">
          <h5 className="home__card-title text-dark text-hover">
            {product.name}
          </h5>
        </div>
      </Link>
      <div className="d-flex flex-column justify-content-between align-items-center">
        <span
          className="fw-bold home__card-price d-flex align-items-center justify-content-around"
          style={{ width: "100%", gap: "10px" }}
        >
          {product.price > 0 && (
            <span
              className={
                product.sale_price > 0 ? "text-decoration-line-through" : ""
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
          {user ? (
            user.role == "buyer" ? (
              <button
                role="button"
                className="border-0 bg-transparent"
                onClick={handleWishButtonClick}
              >
                <div className="home__card-button-fav">
                  {isInWishlist ? (
                    <MdFavorite
                      className="home__card-button-fav-icon"
                      style={{ color: "red" }}
                    />
                  ) : (
                    <MdFavoriteBorder className="home__card-button-fav-icon" />
                  )}
                </div>
              </button>
            ) : (
              <br />
            )
          ) : (
            <button
              role="button"
              className="border-0 bg-transparent"
              onClick={handleWishButtonClick}
            >
              <div className="home__card-button-fav">
                {isInWishlist ? (
                  <MdFavorite
                    className="home__card-button-fav-icon"
                    style={{ color: "red" }}
                  />
                ) : (
                  <MdFavoriteBorder className="home__card-button-fav-icon" />
                )}
              </div>
            </button>
          )}
        </span>
      </div>
      {user ? (
        user.role == "buyer" ? (
          <div className="d-flex flex-column justify-content-center align-items-center py-2">
            {product.price > 0 && cart !== false && (
              <button
                className="bttn text-nowrap"
                style={{
                  backgroundColor: "#8e65c1",
                  border: "none",
                  borderRadius: "7px",
                }}
                id={`item-cart-button-${product.sku}`}
                onClick={() => addToCart(product, 1)}
              >
                Add to cart
              </button>
            )}
          </div>
        ) : (
          <br />
        )
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center py-2">
          {product.price > 0 && cart !== false && (
            <button
              className="bttn text-nowrap"
              style={{
                backgroundColor: "#8e65c1",
                border: "none",
                borderRadius: "7px",
              }}
              id={`item-cart-button-${product.sku}`}
              onClick={() => addToCart(product, 1)}
            >
              Add to cart
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
