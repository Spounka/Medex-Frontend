import { useEffect, useState } from "react";

import "../../Loader.css";

const WebsiteLoader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [loading]);
    return (
        loading && (
            <div className="website__loader-container">
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    );
};

export default WebsiteLoader;
