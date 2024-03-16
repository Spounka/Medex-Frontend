import React from "react";
import { useTranslation } from "react-i18next";

type ChatMessageProps = {
    text: string;
    sent: boolean;
    img: string;
    created: string;
};

const ChatMessage: React.FC<ChatMessageProps> = ({
    text,
    sent,
    img,
    created,
}): JSX.Element => {
    const { t } = useTranslation();
    return (
        <>
            <div
                className={`d-flex align-items-center gap-2 mt-4 ${
                    sent ? "flex-row-reverse" : "message__container-received"
                }`}
            >
                <img
                    className="object-fit-contain shadow p-1 rounded-circle border border-primary"
                    src={img}
                    alt="User Logo"
                    width={55}
                    height={55}
                />
                <div className="card shadow message__container">
                    <div className="card-body">
                        <span className="m-0">{text}</span>
                    </div>
                </div>
            </div>
            <div className={`${sent ? "text-end" : "text-start"}`}>
                <span className="text-muted message__container-date">
                    {created} {t("ago")}
                </span>
            </div>
        </>
    );
};
export default ChatMessage;
