import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import "react-toastify/dist/ReactToastify.css";

import WebsiteLoader from "./components/shared/WebsiteLoader";

import NotFound from "./pages/shared/NotFound";
import BuyerRoutes from "./routes/BuyerRoutes";
import SupplierRoutes from "./routes/SupplierRoutes";

import { useTranslation } from "react-i18next";
import PermissionDenied from "./pages/shared/PermissionDenied";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // 5 minutes before auto refetch
            staleTime: 1000 * 60 * 5,
        },
    },
});

function App() {
    const { i18n } = useTranslation();

    const rootClassName = i18n.resolvedLanguage === "ar" ? "arabic" : "english";

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>
                    <CartProvider>
                        <WebsiteLoader />
                        <div className={`${rootClassName}`}>
                            <Routes>
                                <Route
                                    path="/*"
                                    element={<BuyerRoutes />}
                                />
                                <Route
                                    path="/supplier/*"
                                    element={<SupplierRoutes />}
                                />
                                <Route
                                    path="/permission-denied"
                                    element={<PermissionDenied />}
                                />
                                <Route
                                    path="/not-found"
                                    element={<NotFound />}
                                />
                            </Routes>
                        </div>
                    </CartProvider>
                </AuthProvider>
            </BrowserRouter>
            <ReactQueryDevtools buttonPosition={"bottom-left"} />
        </QueryClientProvider>
    );
}

export default App;
