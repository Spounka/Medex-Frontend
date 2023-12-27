import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import "react-toastify/dist/ReactToastify.css";

import WebsiteLoader from "./components/shared/WebsiteLoader";

import BuyerRoutes from "./routes/BuyerRoutes";
import SupplierRoutes from "./routes/SupplierRoutes";
import NotFound from "./pages/shared/NotFound";

import { useTranslation } from "react-i18next";

function App() {
    const { i18n } = useTranslation();

    const rootClassName = i18n.resolvedLanguage === "ar" ? "arabic" : "english";

    return (
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <WebsiteLoader />
                    <div className={`${rootClassName}`}>
                        <Routes>
                            <Route path="/*" element={<BuyerRoutes />} />
                            <Route
                                path="/supplier/*"
                                element={<SupplierRoutes />}
                            />
                            <Route path="/not-found" element={<NotFound />} />
                        </Routes>
                    </div>
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
