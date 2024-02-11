import React, { useContext, useEffect } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";

import DashboardLayout from "../components/Buyer/shared/DashboardLayout";
import Layout from "../components/Buyer/shared/Layout";

import NotFound from "../pages/shared/NotFound";

import ActivateBuyer from "../pages/Buyer/ActivateBuyer";
import BrandsList from "../pages/Buyer/BrandsList";
import Cart from "../pages/Buyer/Cart";
import CategoriesList from "../pages/Buyer/CategoriesList";
import Checkout from "../pages/Buyer/Checkout";
import Contact from "../pages/Buyer/Contact";
import Home from "../pages/Buyer/Home";
import Login from "../pages/Buyer/Login";
import OfferInvoice from "../pages/Buyer/OfferInvoice";
import OfferList from "../pages/Buyer/OfferList";
import ProductDetails from "../pages/Buyer/ProductDetails";
import ProductList from "../pages/Buyer/ProductList";
import Profile from "../pages/Buyer/Profile";
import QuoteList from "../pages/Buyer/QuoteList";
import Register from "../pages/Buyer/Register";
import Wishlist from "../pages/Buyer/Wishlist";
import Chat from "../pages/shared/Chat";
import ChatMessagesList from "../pages/shared/ChatMessagesList";
import ForgotPassword from "../pages/shared/ForgotPassword";
import RequestForQuotes from "../pages/shared/RequestForQuotes";
import ResetPassword from "../pages/shared/ResetPassword";
import ViewStore from "../pages/shared/ViewStore";

import { CartContext } from "../context/CartContext";

import BuyerProtectedRoutes from "../utils/BuyerProtectedRoutes";

import AuthContext from "../context/AuthContext";
import OrderHistory from "../pages/Buyer/OrderHistory";
import RequestRefund from "../pages/Buyer/RequestRefund";
import Statistics from "../pages/Buyer/Statistics";
import TrackingList from "../pages/Buyer/TrackingList";
import ReturnRequests from "../pages/Buyer/ReturnRequests";
import UpdatePassword from "../pages/shared/UpdatePassword";
import BuyerSettings from "../pages/Buyer/BuyerSettings";
import ComingSoon from "../pages/Supplier/ComingSoon";

const BuyerRoutes = () => {
    const { addToCart, cartItems, removeFromCart, setCartItems } =
        useContext(CartContext);

    const { user } = useContext(AuthContext);

    const nav = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.role === "supplier") {
                nav("/supplier/dashboard");
            }
        }
    });

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home addToCart={addToCart} />} />

                <Route path="brands" element={<BrandsList />} />

                <Route
                    path="products"
                    element={<ProductList addToCart={addToCart} />}
                />
                <Route
                    path="products/:product_sku"
                    element={<ProductDetails addToCart={addToCart} />}
                />

                <Route path="contact-us" element={<Contact />} />

                <Route path="categories/" element={<CategoriesList />} />

                <Route path="account/login" element={<Login />} />
                <Route path="account/register" element={<Register />} />
                <Route
                    path="account/password/reset"
                    element={<ForgotPassword />}
                />
                <Route
                    path="account/password/reset/confirm"
                    element={<ResetPassword />}
                />
                <Route
                    path="account/buyer/activate"
                    element={<ActivateBuyer />}
                />

                <Route
                    path="company/:id"
                    element={<ViewStore addToCart={addToCart} />}
                />

                <Route
                    path="/"
                    element={<BuyerProtectedRoutes checkPermission={false} />}
                >
                    <Route path="wishlist" element={<Wishlist />} />
                </Route>

                {/* Buyer Product Manager */}
                <Route
                    path="/"
                    element={
                        <BuyerProtectedRoutes
                            requiredGroups={[
                                "Buyer Product Manager",
                                "Buyer Admin",
                            ]}
                        />
                    }
                >
                    <Route
                        path="cart"
                        element={
                            <Cart
                                cartItems={cartItems}
                                setCartItems={setCartItems}
                                addToCart={addToCart}
                                removeFromCart={removeFromCart}
                            />
                        }
                    />

                    <Route
                        path="checkout"
                        element={
                            <Checkout
                                cartItems={cartItems}
                                setCartItems={setCartItems}
                            />
                        }
                    />
                </Route>

                {/* Buyer Chat */}
                <Route
                    path="/"
                    element={
                        <BuyerProtectedRoutes
                            requiredGroups={["Buyer Chat", "Buyer Admin"]}
                        />
                    }
                >
                    <Route path="chat" element={<Chat />} />
                    <Route path="chat/:id" element={<ChatMessagesList />} />

                    <Route
                        path="account/dashboard"
                        element={<DashboardLayout />}
                    >
                        <Route path="chat" element={<Chat />} />
                    </Route>
                </Route>

                {/* Buyer Order Manager */}
                <Route
                    path="/"
                    element={
                        <BuyerProtectedRoutes
                            requiredGroups={[
                                "Buyer Order Manager",
                                "Buyer Admin",
                            ]}
                        />
                    }
                >
                    <Route
                        path="account/dashboard"
                        element={<DashboardLayout />}
                    >
                        <Route
                            path="order-history"
                            element={<OrderHistory />}
                        />
                        <Route
                            path="order-tracking"
                            element={<TrackingList />}
                        />
                        <Route
                            path="return-requests"
                            element={<ReturnRequests />}
                        />

                        <Route path="return/:id" element={<RequestRefund />} />
                    </Route>
                </Route>

                {/* Buyer Quote Manager */}
                <Route
                    path="/"
                    element={
                        <BuyerProtectedRoutes
                            requiredGroups={["Buyer Admin"]}
                        />
                    }
                >
                    <Route
                        path="account/dashboard"
                        element={<DashboardLayout />}
                    >
                        <Route path="quotes" element={<QuoteList />} />
                        <Route
                            path="request-for-quote"
                            element={<RequestForQuotes />}
                        />
                    </Route>
                </Route>

                {/* Buyer Admin */}
                <Route
                    path="/"
                    element={
                        <BuyerProtectedRoutes
                            requiredGroups={["Buyer Admin"]}
                        />
                    }
                >
                    <Route
                        path="account/dashboard"
                        element={<DashboardLayout />}
                    >
                        <Route path="statistics" element={<Statistics />} />

                        <Route path="quotes/:id" element={<OfferList />} />
                        <Route
                            path="quotes/offers/:id/invoice"
                            element={<OfferInvoice />}
                        />

                        <Route path="settings" element={<BuyerSettings />} />
                        <Route path="settings/profile" element={<Profile />} />

                        <Route
                            path="settings/password/update"
                            element={<UpdatePassword />}
                        />
                        <Route path="settings/soon" element={<ComingSoon />} />
                    </Route>
                </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default BuyerRoutes;
