import React from "react";

const PermissionDenied = () => {
    return (
        <main>
            <section className="container py-5">
                <h3 className="fw-bold text-center">
                    You don't have permissions to access this page
                </h3>
            </section>
        </main>
    );
};

export default PermissionDenied;
