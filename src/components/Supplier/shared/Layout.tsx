import { useState } from "react";

import { Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
    const { i18n } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <main className="dashboard__main">
            <ToastContainer newestOnTop={true} />

            <section>
                <Header
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                />
                <Sidebar
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                />

                <div
                    className={`dashboard__main-container ${i18n.resolvedLanguage == "en" ? "" : "ar"}`}
                    onClick={() => menuOpen && setMenuOpen(false)}
                >
                    <Outlet />
                </div>
            </section>
        </main>
    );
};

export default Layout;
