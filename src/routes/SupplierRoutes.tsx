import React from "react";

import { Routes, Route } from "react-router-dom";

import Layout from "../components/Supplier/shared/Layout";
import NotFound from "../pages/shared/NotFound";

import Dashboard from "../pages/Supplier/Dashboard";

import Register from "../pages/Supplier/Register";

import RequestForQuotes from "../pages/shared/RequestForQuotes";
import QuoteList from "../pages/Supplier/QuoteList";

import CreateProduct from "../pages/Supplier/CreateProduct";
import CreateProductExcel from "../pages/Supplier/CreateProductExcel";
import ProductList from "../pages/Supplier/ProductList";
import ProductDetails from "../pages/Supplier/ProductDetails";
import UpdateProduct from "../pages/Supplier/UpdateProduct";

import Chat from "../pages/shared/Chat";
import ChatMessagesList from "../pages/shared/ChatMessagesList";

import SalesList from "../pages/Supplier/SalesList";

import SupplierProtectedRoutes from "../utils/SupplierProtectedRoutes";

import { TbListDetails, TbEdit } from "react-icons/tb";
import QuoteDetails from "../pages/Supplier/QuoteDetails";
import OfferInvoice from "../pages/Supplier/OfferInvoice";
import OfferList from "../pages/Supplier/OfferList";
import SalesDetails from "../pages/Supplier/SalesDetails";
import TrackingList from "../pages/Supplier/TrackingList";
import TrackingDetails from "../pages/Supplier/TrackingDetails";
import ReturnRequests from "../pages/Supplier/ReturnRequests";
import ReturnDetails from "../pages/Supplier/ReturnDetails";
import Statistics from "../pages/Supplier/Statistics";
import ViewStore from "../pages/shared/ViewStore";
import EditStore from "../pages/Supplier/EditStore";
import UpdatePassword from "../pages/shared/UpdatePassword";
import SupplierSettings from "../pages/Supplier/SupplierSettings";
import PersonalSettings from "../pages/Supplier/PersonalSettings";
import ComingSoon from "../pages/shared/ComingSoon";
import { useTranslation } from "react-i18next";
import Store from "../pages/Supplier/Store";
import Permissions from "../pages/Supplier/Permissions";
import Wallet from "../pages/shared/Wallet";
import InvoiceList from "../pages/Supplier/InvoiceList.tsx";
import InvoiceDetails from "../pages/Supplier/InvoiceDetails.tsx";

const SupplierRoutes = () => {
    const { t } = useTranslation();

    return (
        <Routes>
            <Route
                path="account/register"
                element={<Register />}
            />

            <Route
                path="/"
                element={<Layout />}
            >
                <Route
                    path="store/view"
                    element={<ViewStore />}
                />

                {/* Product Manager */}
                <Route
                    path="/"
                    element={
                        <SupplierProtectedRoutes
                            requiredGroups={[
                                "Supplier Product Manager",
                                "Supplier Admin",
                            ]}
                        />
                    }
                >
                    <Route
                        path="products/create"
                        element={<CreateProduct />}
                    />
                    <Route
                        path="products/excel-create"
                        element={<CreateProductExcel />}
                    />
                    <Route
                        path="products/list"
                        element={
                            <ProductList
                                buttonLink={`/supplier/products/`}
                                buttonText={t("supplier_pages.product_details.view")}
                                buttonIcon={<TbListDetails />}
                            />
                        }
                        requiredGroups={["Supplier Product Manager"]}
                    />
                    <Route
                        path="products/update"
                        element={
                            <ProductList
                                buttonLink={`/supplier/products/update/`}
                                buttonText={t("supplier_pages.product_details.update")}
                                buttonIcon={<TbEdit />}
                            />
                        }
                    />
                    <Route
                        path="products/update/:product_sku"
                        element={<UpdateProduct />}
                    />
                    <Route
                        path="products/:product_sku"
                        element={<ProductDetails />}
                    />
                </Route>

                {/* Quote Manager */}
                <Route
                    path="/"
                    element={
                        <SupplierProtectedRoutes
                            requiredGroups={["Supplier Quote Manager", "Supplier Admin"]}
                        />
                    }
                >
                    <Route
                        path="/request-for-quote"
                        element={<RequestForQuotes />}
                    />
                    <Route
                        path="/quotes"
                        element={<QuoteList />}
                    />
                    <Route
                        path="/quotes/:id"
                        element={<QuoteDetails />}
                    />
                    <Route
                        path="/offer/invoice/:id"
                        element={<OfferInvoice />}
                    />
                    <Route
                        path="/quotes/offers"
                        element={<OfferList />}
                    />
                    <Route
                        path="/invoices/list"
                        element={<InvoiceList />}
                    />
                    <Route
                        path="/invoices/:id"
                        element={<InvoiceDetails />}
                    />
                </Route>

                {/* Sale Manager */}
                <Route
                    path="/"
                    element={
                        <SupplierProtectedRoutes
                            requiredGroups={["Supplier Sale Manager", "Supplier Admin"]}
                        />
                    }
                >
                    <Route
                        path="sales"
                        element={<SalesList />}
                    />
                    <Route
                        path="sales/:id"
                        element={<SalesDetails />}
                    />

                    <Route
                        path="tracking"
                        element={<TrackingList />}
                    />
                    <Route
                        path="tracking/:id"
                        element={<TrackingDetails />}
                    />

                    <Route
                        path="return-requests"
                        element={<ReturnRequests />}
                    />
                    <Route
                        path="return-requests/:id"
                        element={<ReturnDetails />}
                    />
                </Route>

                {/* Chat */}
                <Route
                    path="/"
                    element={
                        <SupplierProtectedRoutes
                            requiredGroups={["Supplier Chat", "Supplier Admin"]}
                        />
                    }
                >
                    <Route
                        path="chat"
                        element={<Chat />}
                    />
                    <Route
                        path="chat/:id"
                        element={<ChatMessagesList />}
                    />
                </Route>

                {/* Supplier Admin */}
                <Route
                    path="/"
                    element={
                        <SupplierProtectedRoutes requiredGroups={["Supplier Admin"]} />
                    }
                >
                    <Route
                        path="dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="statistics"
                        element={<Statistics />}
                    />

                    <Route
                        path="store/edit"
                        element={<EditStore />}
                    />

                    <Route
                        path="wallet"
                        element={<Wallet />}
                    />

                    <Route path="settings">
                        <Route
                            index
                            element={<SupplierSettings />}
                        />
                        <Route
                            path="profile"
                            element={<PersonalSettings />}
                        />
                        <Route
                            path="permissions"
                            element={<Permissions />}
                        />

                        <Route
                            path="password/update"
                            element={<UpdatePassword />}
                        />
                        <Route
                            path="store"
                            element={<Store />}
                        />
                        <Route
                            path="soon"
                            element={<ComingSoon />}
                        />
                    </Route>
                </Route>
            </Route>

            <Route
                path="*"
                element={<NotFound />}
            />
        </Routes>
    );
};

export default SupplierRoutes;
