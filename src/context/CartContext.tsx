import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";

import { useTranslation } from "react-i18next";

const CartContext = React.createContext();

const CartProvider = ({ children }) => {
    const { t } = useTranslation();

    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, newQty = 1) => {
        let buttons = document.querySelectorAll(
            `#item-cart-button-${product.sku}`
        );

        const exist = cartItems.find((x) => x.sku === product.sku);

        if (exist) {
            if (exist.qty >= product.stock_quantity - 1) {
                buttons.forEach((btn) => {
                    btn.classList.add("disabled");
                    btn.setAttribute("disabled", true);
                });
            } else {
                buttons.forEach((btn) => {
                    btn.classList.remove("disabled");
                });
            }

            const newCartItems = cartItems.map((x) =>
                x.sku === product.sku
                    ? newQty === 1
                        ? { ...exist, qty: exist.qty + newQty }
                        : { ...exist, qty: exist.qty + (newQty - exist.qty) }
                    : x
            );

            setCartItems(newCartItems);
            localStorage.setItem("cartItems", JSON.stringify(newCartItems));
        } else {
            const newCartItems = [...cartItems, { ...product, qty: 1 }];
            setCartItems(newCartItems);
            localStorage.setItem("cartItems", JSON.stringify(newCartItems));

            if (product.stock_quantity === 1) {
                buttons.forEach((btn) => {
                    btn.classList.add("disabled");
                    btn.setAttribute("disabled", true);
                });
            } else {
                buttons.forEach((btn) => {
                    btn.classList.remove("disabled");
                });
            }

            toast.success(`${t("cart_context.add_success")}!`);
        }
    };

    const removeFromCart = (product, newQty = 1) => {
        const exist = cartItems.find((x) => x.sku === product.sku);

        if (exist.qty === 1) {
            const newCartItems = cartItems.filter((x) => x.sku !== product.sku);
            setCartItems(newCartItems);
            localStorage.setItem("cartItems", JSON.stringify(newCartItems));
        } else {
            const newCartItems = cartItems.map((x) =>
                x.sku === product.sku
                    ? newQty === 1
                        ? { ...exist, qty: exist.qty - newQty }
                        : { ...exist, qty: exist.qty + (newQty - exist.qty) }
                    : x
            );
            setCartItems(newCartItems);
            localStorage.setItem("cartItems", JSON.stringify(newCartItems));
        }
    };

    useEffect(() => {
        let cart = localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [];

        setCartItems(cart);
    }, []);

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, setCartItems }}
        >
            {children}
        </CartContext.Provider>
    );
};

export { CartProvider, CartContext };
