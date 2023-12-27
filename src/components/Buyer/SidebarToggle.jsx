import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";

const SidebarToggle = (props) => {
    const { menuOpen, setMenuOpen } = props;

    return (
        <div
            onClick={() => setMenuOpen(!menuOpen)}
            className={`btn btn-primary btn-sm shadow ${
                menuOpen
                    ? "buyer__dashboard-sidebar-toggle-visible"
                    : "buyer__dashboard-sidebar-toggle"
            }`}
        >
            {menuOpen ? (
                <RiMenuFoldFill size="1.3rem" />
            ) : (
                <RiMenuUnfoldFill size="1.3rem" />
            )}
        </div>
    );
};

export default SidebarToggle;
