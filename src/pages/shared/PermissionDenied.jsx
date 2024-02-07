import Sidebar from "../../components/Buyer/Sidebar";

const PermissionDenied = () => {
    return (
        <main>
            {window.location.href.indexOf("supplier") === -1 ? (
                <section className="">
                    <div className="d-flex py-3">
                        <Sidebar />

                        <h3 className="fw-bold text-center py-3">
                            You don't have permissions to access this page
                        </h3>
                    </div>
                </section>
            ) : (
                <section className="container py-5">
                    <h3 className="fw-bold text-center">
                        You don't have permissions to access this page
                    </h3>
                </section>
            )}
        </main>
    );
};

export default PermissionDenied;
