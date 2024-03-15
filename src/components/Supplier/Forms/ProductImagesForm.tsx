import { useRef } from "react";

import { BsImage, BsImages } from "react-icons/bs";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { validateFileExtensions } from "../../../utils/ValidateFiles";

import { toast } from "react-toastify";

const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "svg"];

const ProductImagesForm = ({
    updateFieldsState,
    update,
    thumbnail,
    otherImages,
    fileRef,
    multiFileRef,
}) => {
    const { t } = useTranslation();

    if (!fileRef) {
        fileRef = useRef();
    }

    const img1Ref = useRef();
    const img2Ref = useRef();
    const img3Ref = useRef();
    const img4Ref = useRef();

    const handleFileChange = (e) => {
        const selectedFile = Array.from(e.target.files);
        const { isValid } = validateFileExtensions(selectedFile, ALLOWED_EXTENSIONS);
        if (!isValid) {
            toast.error(t("buyer_pages.profile.file_type_err"));
            if (window.location.href.indexOf("update") === -1) {
                if (e.target.id === "thumbnail") {
                    fileRef.current.value = null;
                } else {
                    multiFileRef.current.value = null;
                }
            } else {
                if (e.target.id === "img1") {
                    img1Ref.current.value = null;
                } else if (e.target.id === "img2") {
                    img2Ref.current.value = null;
                } else if (e.target.id === "img3") {
                    img3Ref.current.value = null;
                } else if (e.target.id === "img4") {
                    img4Ref.current.value = null;
                }
            }
        } else {
            if (window.location.href.indexOf("update") === -1) {
                if (e.target.id === "thumbnail") {
                    updateFieldsState({ newThumbnail: e.target.files[0] });
                } else {
                    updateFieldsState({
                        otherImages: e.target.files,
                    });
                }
            } else {
                if (e.target.id === "img1") {
                    updateFieldsState({
                        newImage1: e.target.files[0],
                    });
                } else if (e.target.id === "img2") {
                    updateFieldsState({
                        newImage2: e.target.files[0],
                    });
                } else if (e.target.id === "img3") {
                    updateFieldsState({
                        newImage3: e.target.files[0],
                    });
                } else if (e.target.id === "img4") {
                    updateFieldsState({
                        newImage4: e.target.files[0],
                    });
                }
            }
        }
    };

    return (
        <>
            <div className="mb-5">
                <label
                    htmlFor="thumbnail"
                    className="form-label d-flex align-items-center gap-2"
                >
                    <BsImage size="1.5rem" />
                    {update ? (
                        <span>{t("product_form.update_thumbnail")}</span>
                    ) : (
                        <span>{t("product_form.product_thumbnail")} *</span>
                    )}
                </label>
                <input
                    type="file"
                    id="thumbnail"
                    onChange={handleFileChange}
                    className="form-control mt-3"
                    required={!update}
                    ref={fileRef}
                />
                {update && (
                    <div className="mt-3 px-2 update__link">
                        <span>{t("currently")}: &nbsp;</span>
                        <Link
                            to={thumbnail}
                            target="_blank"
                        >
                            {thumbnail}
                        </Link>
                    </div>
                )}
            </div>
            {update ? (
                <>
                    <div className="mb-5">
                        <label
                            htmlFor="newImage1"
                            className="form-label d-flex align-items-center gap-2"
                        >
                            <BsImages size="1.5rem" />
                            {t("product_form.other_image")} 1
                        </label>
                        <input
                            type="file"
                            ref={img1Ref}
                            id="img1"
                            onChange={handleFileChange}
                            className="form-control my-3"
                        />
                        {otherImages[0] != "" && (
                            <>
                                <span>Currently: &nbsp;</span>
                                <Link
                                    to={otherImages[0]}
                                    target="_blank"
                                >
                                    {otherImages[0]}
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="newImage2"
                            className="form-label d-flex align-items-center gap-2"
                        >
                            <BsImages size="1.5rem" />
                            {t("product_form.other_image")} 2
                        </label>
                        <input
                            type="file"
                            ref={img2Ref}
                            id="img2"
                            onChange={handleFileChange}
                            className="form-control my-3"
                        />
                        {otherImages[1] != "" && (
                            <>
                                <span>Currently: &nbsp;</span>
                                <Link
                                    to={otherImages[1]}
                                    target="_blank"
                                >
                                    {otherImages[1]}
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="newImage3"
                            className="form-label d-flex align-items-center gap-2"
                        >
                            <BsImages size="1.5rem" />
                            {t("product_form.other_image")} 3
                        </label>
                        <input
                            type="file"
                            id="img3"
                            ref={img3Ref}
                            onChange={handleFileChange}
                            className="form-control my-3"
                        />
                        {otherImages[2] != "" && (
                            <>
                                <span>Currently: &nbsp;</span>
                                <Link
                                    to={otherImages[2]}
                                    target="_blank"
                                >
                                    {otherImages[2]}
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="newImage4"
                            className="form-label d-flex align-items-center gap-2"
                        >
                            <BsImages size="1.5rem" />
                            {t("product_form.other_image")} 4
                        </label>
                        <input
                            type="file"
                            id="img4"
                            ref={img4Ref}
                            onChange={handleFileChange}
                            className="form-control my-3"
                        />
                        {otherImages[3] != "" && (
                            <>
                                <span>Currently: &nbsp;</span>
                                <Link
                                    to={otherImages[3]}
                                    target="_blank"
                                >
                                    {otherImages[3]}
                                </Link>
                            </>
                        )}
                    </div>
                    <span className="form-text">
                        {t("product_form.other_image_tip")} .
                    </span>
                </>
            ) : (
                <div className="mb-5">
                    <label
                        htmlFor="otherImages"
                        className="form-label d-flex align-items-center gap-2"
                    >
                        <BsImages size="1.5rem" />
                        {t("product_form.other_images")}
                    </label>
                    <input
                        type="file"
                        multiple={!update}
                        onChange={handleFileChange}
                        className="form-control my-3"
                        ref={multiFileRef}
                    />
                </div>
            )}
        </>
    );
};

export default ProductImagesForm;
