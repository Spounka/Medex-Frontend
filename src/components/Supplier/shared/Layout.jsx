import { useState } from "react";

import { Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <main className="dashboard__main">
            <ToastContainer newestOnTop={true} />

            <section>
                <div>
                    <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

                    <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

                    <div
                        className="dashboard__main-container"
                        onClick={() => menuOpen && setMenuOpen(false)}
                    >
                        <Outlet />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Layout;
