import { Link } from "react-router-dom";
import { PiChatsCircle } from "react-icons/pi";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../utils/useAxios";
import { UilComments } from "@iconscout/react-unicons";

const ChatFixedIcon = () => {
    const [messagesCount, setMessagesCount] = useState(0);

    const { user, authTokens } = useContext(AuthContext);

    const api = useAxios();

    const getMessagesCount = async () => {
        if (!user) throw new Error("No user connected");
        if (messagesCount) return;
        const result = await api.get(
            import.meta.env.VITE_BACKEND_URL + `/api/chat/${user.user_id}/count/`,
        );
        if (result.status !== 200) {
            setMessagesCount(0);
            return;
        }
        setMessagesCount(result.data);
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
                } tw-bg-purple`}
            >
                <UilComments
                    width={"2.5rem"}
                    height={"2.5rem"}
                    color={"white"}
                />
                {/*<PiChatsCircle*/}
                {/*    size="2.5rem"*/}
                {/*    color="white"*/}
                {/*/>*/}
            </Link>
        </div>
    );
};

export default ChatFixedIcon;
