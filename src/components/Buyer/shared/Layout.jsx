import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import MobileNavigation from "./MobileNavigation";

import { ToastContainer } from "react-toastify";
import ChatFixedIcon from "../../shared/ChatFixedIcon";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <MobileNavigation />
            <ToastContainer newestOnTop={true} />
            <ChatFixedIcon />
        </>
    );
};

export default Layout;
