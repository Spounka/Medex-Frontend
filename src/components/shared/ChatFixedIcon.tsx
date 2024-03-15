import { Link } from "react-router-dom";
import { PiChatsCircle } from "react-icons/pi";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../utils/useAxios";

const ChatFixedIcon = () => {
    const [messagesCount, setMessagesCount] = useState(null);

    const { user, authTokens } = useContext(AuthContext);

    const api = useAxios();

    const getMessagesCount = async () => {
        if (user) {
            if (!messagesCount) {
                await api
                    .get(
                        import.meta.env.VITE_BACKEND_URL +
                            `/api/chat/${user.user_id}/count/`,
                    )
                    .then((response) => {
                        setMessagesCount(response.data);
                    })
                    .catch(() => {
                        setMessagesCount(0);
                    });
            }
        }
    };

    useEffect(() => {
        getMessagesCount();
    }, [authTokens, user]);

    return (
        <div className="position-relative">
            <Link
                to="/chat"
                className={`chat__fixed-icon d-none d-md-block ${
                    messagesCount > 0 && "chat__fixed-icon-after"
                }`}
            >
                <PiChatsCircle
                    size="2.5rem"
                    color="white"
                />
            </Link>
        </div>
    );
};

export default ChatFixedIcon;
