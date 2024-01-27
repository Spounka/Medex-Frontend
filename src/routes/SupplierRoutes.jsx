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

import SupplierProfile from "../pages/Buyer/SupplierProfile";

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
import ViewStore from "../pages/Supplier/ViewStore";
import EditStore from "../pages/Supplier/EditStore";
import UpdatePassword from "../pages/shared/UpdatePassword";
import Settings from "../pages/Supplier/Settings";
import PersonalSettings from "../pages/Supplier/PersonalSettings";
import CompanySettings from "../pages/Supplier/CompanySettings";
import ComingSoon from "../pages/Supplier/ComingSoon";

const SupplierRoutes = () => {
    return (
        <Routes>
            <Route path="account/register" element={<Register />} />
            <Route path="profile/:id" element={<SupplierProfile />} />

            <Route path="/" element={<Layout />}>
                <Route path="/" element={<SupplierProtectedRoutes />}>
                    <Route path="dashboard" element={<Dashboard />} />

                    <Route
                        path="/request-for-quote"
                        element={<RequestForQuotes />}
                    />
                    <Route path="/quotes" element={<QuoteList />} />
                    <Route path="/quotes/:id" element={<QuoteDetails />} />
                    <Route
                        path="/offer/invoice/:id"
                        element={<OfferInvoice />}
                    />
                    <Route path="/quotes/offers" element={<OfferList />} />

                    <Route
                        path="account/profile"
                        element={<PersonalSettings />}
                    />
                    <Route
                        path="settings/company"
                        element={<CompanySettings />}
                    />
                    <Route path="settings/soon" element={<ComingSoon />} />

                    <Route path="chat" element={<Chat />} />
                    <Route path="chat/:id" element={<ChatMessagesList />} />

                    <Route path="products/create" element={<CreateProduct />} />
                    <Route
                        path="products/excel-create"
                        element={<CreateProductExcel />}
                    />

                    <Route
                        path="products/list"
                        element={
                            <ProductList
                                buttonLink={`/supplier/products/`}
                                buttonText={"View Details"}
                                buttonIcon={<TbListDetails />}
                            />
                        }
                    />
                    <Route
                        path="products/update"
                        element={
                            <ProductList
                                buttonLink={`/supplier/products/update/`}
                                buttonText={"Update Product"}
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

                    <Route path="sales" element={<SalesList />} />
                    <Route path="sales/:id" element={<SalesDetails />} />

                    <Route path="tracking" element={<TrackingList />} />
                    <Route path="tracking/:id" element={<TrackingDetails />} />

                    <Route
                        path="return-requests"
                        element={<ReturnRequests />}
                    />
                    <Route
                        path="return-requests/:id"
                        element={<ReturnDetails />}
                    />

                    <Route path="statistics" element={<Statistics />} />
                    <Route path="store/view" element={<ViewStore />} />
                    <Route path="store/edit" element={<EditStore />} />
                    <Route path="settings" element={<Settings />} />
                    <Route
                        path="account/password/update"
                        element={<UpdatePassword />}
                    />
                </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default SupplierRoutes;
