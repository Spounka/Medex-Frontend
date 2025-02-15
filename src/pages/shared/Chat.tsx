import { Link } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import useAxios from "../../utils/useAxios";

import userImage from "../../assets/images/user.png";
import AuthContext from "../../context/AuthContext";

import { useTranslation } from "react-i18next";
import { IoSearchSharp } from "react-icons/io5";

import { Thread } from "@domain/thread";

const Chat = () => {
    const { t } = useTranslation();

    const api = useAxios();

    const { user } = useContext(AuthContext);

    const [threadsList, setThreadsList] = useState<Thread[]>([]);

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredThreads, setFilteredThreads] = useState<Thread[]>([]);

    const getInboxThreads = async () => {
        await api.get(import.meta.env.VITE_BACKEND_URL + "/api/chat/").then((res) => {
            setThreadsList(res.data);
        });
    };
    if (!user) return null;

    const filterThreads = () => {
        const filtered = threadsList.filter((thread) => {
            let displayName;

            if (user.parent !== null) {
                displayName =
                    user.parent === thread.first.id
                        ? thread.second.full_name
                        : thread.first.full_name;
            } else {
                displayName =
                    user.user_id === thread.first.id
                        ? thread.second.full_name
                        : thread.first.full_name;
            }
            return displayName.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setFilteredThreads(filtered);
    };

    useEffect(() => {
        getInboxThreads();
    }, []);

    useEffect(() => {
        filterThreads();
    }, [searchQuery, threadsList]);

    return (
        <main className="w-100">
            <section
                className={`${window.location.href.indexOf("supplier") === -1 && "py-5"}`}
            >
                <div className="container">
                    <div className="row justify-content-center h-100 px-md-3">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 col-md-8 mx-auto">
                                    <div className="position-relative">
                                        <IoSearchSharp
                                            className="chat__search-icon"
                                            size="1.6rem"
                                        />
                                        <input
                                            type="text"
                                            className="form-control chat__search-input"
                                            placeholder={`${t("shared.chat.search")}...`}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                {filteredThreads.length > 0 ? (
                                    filteredThreads.map((thread) => (
                                        <div
                                            className="col-12 col-md-10 mx-auto"
                                            key={thread.id}
                                        >
                                            <Link
                                                to={
                                                    window.location.href.indexOf(
                                                        "supplier",
                                                    ) === -1
                                                        ? user.parent !== null
                                                            ? user.parent ===
                                                              thread.first.id
                                                                ? `/chat/${thread.second.id}`
                                                                : `/chat/${thread.first.id}`
                                                            : user.user_id ===
                                                                thread.first.id
                                                              ? `/chat/${thread.second.id}`
                                                              : `/chat/${thread.first.id}`
                                                        : user.parent !== null
                                                          ? user.parent ===
                                                            thread.first.id
                                                              ? `/supplier/chat/${thread.second.id}`
                                                              : `/supplier/chat/${thread.first.id}`
                                                          : user.user_id ===
                                                              thread.first.id
                                                            ? `/supplier/chat/${thread.second.id}`
                                                            : `/supplier/chat/${thread.first.id}`
                                                }
                                                className="text-decoration-none w-100"
                                            >
                                                <div className="card rounded-0 border-0 border-bottom py-2">
                                                    <div className="row p-2 g-0">
                                                        <div className="col-1 my-auto">
                                                            <img
                                                                className="object-fit-contain shadow rounded-circle border p-1 border-primary"
                                                                src={
                                                                    user.parent !== null
                                                                        ? user.parent ===
                                                                          thread.first.id
                                                                            ? thread
                                                                                  ?.second
                                                                                  ?.profile
                                                                                  ?.profile_picture
                                                                                ? import.meta
                                                                                      .env
                                                                                      .VITE_BACKEND_URL +
                                                                                  thread
                                                                                      ?.second
                                                                                      ?.profile
                                                                                      ?.profile_picture
                                                                                : userImage
                                                                            : thread
                                                                                    ?.first
                                                                                    ?.profile
                                                                                    ?.profile_picture
                                                                              ? import.meta
                                                                                    .env
                                                                                    .VITE_BACKEND_URL +
                                                                                thread
                                                                                    ?.first
                                                                                    ?.profile
                                                                                    ?.profile_picture
                                                                              : userImage
                                                                        : user.user_id ===
                                                                            thread.first
                                                                                .id
                                                                          ? thread?.second
                                                                                ?.profile
                                                                                ?.profile_picture
                                                                              ? import.meta
                                                                                    .env
                                                                                    .VITE_BACKEND_URL +
                                                                                thread
                                                                                    ?.second
                                                                                    ?.profile
                                                                                    ?.profile_picture
                                                                              : userImage
                                                                          : thread?.first
                                                                                  ?.profile
                                                                                  ?.profile_picture
                                                                            ? import.meta
                                                                                  .env
                                                                                  .VITE_BACKEND_URL +
                                                                              thread
                                                                                  ?.first
                                                                                  ?.profile
                                                                                  ?.profile_picture
                                                                            : userImage
                                                                }
                                                                alt="User Logo"
                                                                width={55}
                                                                height={55}
                                                            />
                                                        </div>
                                                        <div className="col-6 col-md-8 px-2 px-md-0">
                                                            <h3 className="text-capitalize fw-bold m-0 chat__user-name">
                                                                {user.parent !== null
                                                                    ? user.parent ===
                                                                      thread.first.id
                                                                        ? thread.second
                                                                              .full_name
                                                                        : thread.first
                                                                              .full_name
                                                                    : user.user_id ===
                                                                        thread.first.id
                                                                      ? thread.second
                                                                            .full_name
                                                                      : thread.first
                                                                            .full_name}
                                                            </h3>
                                                            <p className="text-muted m-0 px-0 px-md-1 chat__user-message pt-2">
                                                                {
                                                                    thread?.last_message
                                                                        ?.message
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="col-5 col-md-3 my-auto text-end px-0 px-md-3">
                                                            <small className="m-0 p-0 text-xs">
                                                                {
                                                                    thread?.last_message
                                                                        ?.created
                                                                }{" "}
                                                                {t("ago")}
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-12">
                                        <p className="text-center">
                                            {t("shared.chat.none")}!
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Chat;
