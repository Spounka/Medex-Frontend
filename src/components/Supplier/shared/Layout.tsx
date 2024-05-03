import { useState } from "react";

import { Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Container from "../../ui/container";

const Layout = () => {
    const { i18n } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <Container
            node={"main"}
            className="[&&]:tw-p-0"
        >
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
        </Container>
    );
};

export default Layout;
