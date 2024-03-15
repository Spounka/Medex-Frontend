import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { GiReturnArrow } from "react-icons/gi";
import { BsImages, BsPatchQuestion } from "react-icons/bs";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { MdOutlineClear, MdOutlineTextSnippet } from "react-icons/md";
import { toast } from "react-toastify";

import useAxios from "../../utils/useAxios";
import { validateFileExtensions } from "../../utils/ValidateFiles";

const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "mp4", "avi", "wav"];
const MAX_FILE_COUNT = 20;
const TEXT_MAX = 2000;

const RequestRefund = () => {
    const params = useParams();
    const { id } = params;
    const { t } = useTranslation();
    const [reason, setReason] = useState("");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);
    const multiFileRef = useRef();

    const api = useAxios();

    useEffect(() => {
        document.getElementById("count_message").innerHTML = "0 / " + TEXT_MAX;
    }, []);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const { isValid } = validateFileExtensions(selectedFiles, ALLOWED_EXTENSIONS);
        if (selectedFiles.length > MAX_FILE_COUNT) {
            toast.error(
                `${t("buyer_pages.return_request.max_files_err", {
                    max_files: MAX_FILE_COUNT,
                })}.`,
            );
            multiFileRef.current.value = null;
            return;
        }

        if (!isValid) {
            toast.error(t("buyer_pages.return_request.file_type_err"));
            multiFileRef.current.value = null;
        } else {
            setFiles(selectedFiles);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await api
            .post(import.meta.env.VITE_BACKEND_URL + `/api/order/return/${id}/`, {
                reason: reason,
                description: "description",
                files: files,
            })
            .then(() => {
                setReason("");
                setDescription("");
                multiFileRef.current.value = null;

                toast.success(t("buyer_pages.return_request.success"));
            })
            .catch((err) => {
                if (err?.response?.data?.error == "exists") {
                    toast.error(t("buyer_pages.return_request.exists"));
                }
                console.log(err);
            });
    };

    return (
        <main className="container">
            <section className="py-3">
                <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                    <GiReturnArrow />
                    {t("buyer_pages.return_request.title")}
                </h2>
                <div className="row mt-5">
                    <form
                        method="post"
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                    >
                        <div className="mb-5">
                            <label
                                htmlFor="reason"
                                className="form-label d-flex align-items-center gap-2"
                            >
                                <BsPatchQuestion size="1.5rem" />
                                {t("buyer_pages.return_request.reason")} *
                            </label>
                            <select
                                className="form-select"
                                aria-label="reason"
                                required
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            >
                                <option value="">
                                    {t("buyer_pages.return_request.reason_placeholder")}
                                </option>
                                <option value="POO">
                                    {t("buyer_pages.return_request.poor")}
                                </option>
                                <option value="WRO">
                                    {t("buyer_pages.return_request.wrong")}
                                </option>
                                <option value="ADD">
                                    {t("buyer_pages.return_request.address")}
                                </option>
                            </select>
                        </div>
                        <div className="mb-5 position-relative">
                            <label
                                htmlFor="description"
                                className="form-label d-flex align-items-center gap-2"
                            >
                                <MdOutlineTextSnippet size="1.5rem" />
                                {t("buyer_pages.return_request.description")} *
                            </label>
                            <textarea
                                name="description"
                                rows="12"
                                className="form-control"
                                placeholder={`${t(
                                    "buyer_pages.return_request.description_placeholder",
                                )}...`}
                                maxLength={TEXT_MAX}
                                required
                                value={description}
                                onChange={(e) => {
                                    countLetters();
                                    setDescription(e.target.value);
                                }}
                            ></textarea>
                            <span
                                className="quote__requirements-clear shadow"
                                onClick={clearInput}
                            >
                                <MdOutlineClear />
                            </span>
                            <span
                                className="quote__requirements-count shadow"
                                id="count_message"
                            >
                                {TEXT_MAX}
                            </span>
                        </div>

                        <div className="mb-5">
                            <label
                                htmlFor="files"
                                className="form-label d-flex align-items-center gap-2"
                            >
                                <BsImages size="1.5rem" />
                                {t("buyer_pages.return_request.images")} *
                            </label>
                            <input
                                id="files"
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="form-control my-3"
                                ref={multiFileRef}
                                required
                            />
                            <div className="form-text">
                                <div className="d-flex align-items-center gap-2 mb-1">
                                    <AiOutlineExclamationCircle size="1.2rem" />
                                    {t("buyer_pages.return_request.images_tip")}
                                </div>
                                <ol>
                                    <li>
                                        {t("buyer_pages.return_request.images_tip_1")}
                                    </li>
                                    <li>
                                        {t("buyer_pages.return_request.images_tip_2")}
                                    </li>
                                    <li>
                                        {t("buyer_pages.return_request.images_tip_3")}
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="my-4">
                            <button
                                type="submit"
                                className="gradient-bg-color w-100 py-2 text-white rounded shadow fw-bold login__btn d-flex align-items-center gap-2 justify-content-center"
                            >
                                {t("buyer_pages.return_request.title")}
                                <GiReturnArrow size="1.4rem" />
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};

const clearInput = () => {
    document.querySelector("textarea[name=description]").value = "";
};

const countLetters = () => {
    let text_length = document.querySelector("textarea[name=description]").value.length;

    document.getElementById("count_message").innerHTML = text_length + " / " + TEXT_MAX;
};

export default RequestRefund;
