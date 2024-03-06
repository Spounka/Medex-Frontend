import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar";
import SidebarToggle from "../SidebarToggle";

const DashboardLayout = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <SidebarToggle menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

            <div className="d-flex">
                <Sidebar menuOpen={menuOpen} />
                <Outlet />
            </div>
        </>
    );
};

export default DashboardLayout;
