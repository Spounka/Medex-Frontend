import { Message, ThreadUser } from "@domain/thread";
import axios, { AxiosResponse } from "axios";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdSend } from "react-icons/md";
import { useParams } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import userImage from "../../assets/images/user.png";
import ChatMessage from "../../components/shared/ChatMessage";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../utils/useAxios";

const ChatMessagesList = () => {
    const { t } = useTranslation();
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const api = useAxios();

    const [inputValue, setInputValue] = useState("");
    const [chatMessages, setChatMessages] = useState<Message[]>([]);
    const [otherUser, setOtherUser] = useState<ThreadUser | null>(null);
    const [client, setClient] = useState<W3CWebSocket | null>(null);
    const [latestReceivedMessage, setLatestReceivedMessage] = useState(null);
    const [rows, setRows] = useState(1);

    const getChatMessages = async () => {
        await api
            .get(import.meta.env.VITE_BACKEND_URL + `/api/chat/${id}/`)
            .then((res) => {
                setChatMessages(res.data);
            });

        await axios
            .get(import.meta.env.VITE_BACKEND_URL + `/api/account/profile/${id}/`)
            .then((res: AxiosResponse<ThreadUser>) => {
                setOtherUser(res.data);
            });
    };

    const handleWebSocketMessage = (message: any) => {
        setLatestReceivedMessage(message.data);
        getChatMessages();
    };

    useEffect(() => {
        getChatMessages();
    }, [latestReceivedMessage]);

    useEffect(() => {
        if (!user) return;
        if (!id) return;

        let newClient: W3CWebSocket;
        if (user.role === "supplier") {
            if (user.parent !== null) {
                newClient = new W3CWebSocket(
                    import.meta.env.VITE_BACKEND_WEBSOCKET_URL +
                        `/ws/chat/${id}/${user.parent}/`,
                );
            } else {
                newClient = new W3CWebSocket(
                    import.meta.env.VITE_BACKEND_WEBSOCKET_URL +
                        `/ws/chat/${id}/${user.user_id}/`,
                );
            }
        } else {
            if (user.parent !== null) {
                newClient = new W3CWebSocket(
                    import.meta.env.VITE_BACKEND_WEBSOCKET_URL +
                        `/ws/chat/${id}/${user.parent}/`,
                );
            } else {
                newClient = new W3CWebSocket(
                    import.meta.env.VITE_BACKEND_WEBSOCKET_URL +
                        `/ws/chat/${id}/${user.user_id}/`,
                );
            }
        }
        newClient.onmessage = handleWebSocketMessage;
        setClient(newClient);

        () => {
            newClient.close();
        };
    }, [id]);

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);

        const textareaLineHeight = 24;
        const minRows = 1;
        const maxRows = 5;
        const previousRows = e.target.rows;
        e.target.rows = minRows;

        const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);

        if (currentRows === previousRows) {
            e.target.rows = currentRows;
        }

        if (currentRows >= maxRows) {
            e.target.rows = maxRows;
            e.target.scrollTop = e.target.scrollHeight;
        }

        setRows(currentRows < maxRows ? currentRows : maxRows);
    };

    const handleSendMessage = () => {
        if (inputValue.length === 0) {
            return;
        }

        if (client) {
            client.send(JSON.stringify({ message: inputValue }));
        }

        setInputValue("");
    };

    // These should never be null
    // It's simply to tell typescript it won't happen in the UI
    if (!user) return;
    if (!otherUser) return;

    return (
        <main>
            <section
                className={`${window.location.href.indexOf("supplier") === -1 && "py-4"}`}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-2 col-md-1 d-flex align-items-center justify-content-end">
                            <img
                                className="rounded-circle border p-1 shadow border-primary object-fit-contain"
                                src={
                                    otherUser.profile.profile_picture
                                        ? import.meta.env.VITE_BACKEND_URL +
                                          otherUser.profile.profile_picture
                                        : userImage
                                }
                                alt="User Logo"
                                width={55}
                                height={55}
                            />
                        </div>
                        <div className="col-10 d-flex align-items-center justify-content-between">
                            <h3 className="text-capitalize fw-bold m-0">
                                {otherUser.full_name}
                            </h3>
                        </div>
                    </div>
                    <hr />
                    <div className="row mt-3">
                        <div className="col-12">
                            {chatMessages.length > 0 ? (
                                chatMessages.map((msg) => (
                                    <ChatMessage
                                        key={msg.id}
                                        text={msg.message}
                                        sent={
                                            user.parent
                                                ? msg.user.id === user.parent
                                                : msg.user.id === user.user_id
                                        }
                                        img={
                                            msg.user.profile?.profile_picture
                                                ? import.meta.env.VITE_BACKEND_URL +
                                                  msg.user.profile.profile_picture
                                                : userImage
                                        }
                                        created={msg.created}
                                    />
                                ))
                            ) : (
                                <p className="text-center">
                                    {t("shared.chat.no_messages")}!
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="input-group mb-3">
                            <textarea
                                rows={rows}
                                name="message"
                                className="form-control chat__send-input"
                                value={inputValue}
                                onChange={handleInputChange}
                                required
                            />
                            <button
                                className="btn btn-primary d-flex align-items-center justify-content-center"
                                type="button"
                                onClick={handleSendMessage}
                            >
                                <MdSend size="1.5rem" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ChatMessagesList;
