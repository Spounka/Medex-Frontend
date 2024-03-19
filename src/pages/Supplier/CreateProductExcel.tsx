import { useRef, useState } from "react";

import { FaRegFileExcel } from "react-icons/fa";
import { MdOutlineFilePresent } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import { useTranslation } from "react-i18next";

import useAxios from "../../utils/useAxios";
import { toast } from "react-toastify";

import { validateFileExtensions } from "../../utils/ValidateFiles";

import ExcelGuideImage from "../../assets/images/MEDEX_Excel_Guide.png";

const ALLOWED_EXTENSIONS = ["xlsx"];

const CreateProductExcel = () => {
    const { t } = useTranslation();

    const api = useAxios();

    const [excelFile, setExcelFile] = useState("");
    const fileRef = useRef();

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const { isValid } = validateFileExtensions(selectedFiles, ALLOWED_EXTENSIONS);
        if (!isValid) {
            toast.error(t("supplier_pages.create_product_excel.file_type_err"));
            fileRef.current.value = null;
        } else {
            setExcelFile(selectedFiles[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await api
            .post(import.meta.env.VITE_BACKEND_URL + "/api/product/excel-create/", {
                excelFile: excelFile,
            })
            .then(() => {
                fileRef.current.value = null;
                toast.success(t("supplier_pages.create_product_excel.success"));
            })
            .catch(() => {
                toast.error(t("supplier_pages.create_product_excel.fail"));
            });
    };

    return (
        <main className="container">
            <section className="px-0 px-md-3">
                <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                    <FaRegFileExcel size="2.5rem" />
                    {t("supplier_sidebar.create_product_excel")}
                </h2>
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="card p-4 p-md-5 shadow">
                            <form
                                method="post"
                                encType="multipart/form-data"
                                onSubmit={handleSubmit}
                            >
                                <div className="mb-5">
                                    <label
                                        htmlFor="file"
                                        className="form-label d-flex align-items-center gap-2"
                                    >
                                        <MdOutlineFilePresent size="1.8rem" />
                                        {t(
                                            "supplier_pages.create_product_excel.file_label",
                                        )}
                                    </label>
                                    <input
                                        type="file"
                                        name="file"
                                        id="file"
                                        className="form-control my-3"
                                        ref={fileRef}
                                        onChange={handleFileChange}
                                    />

                                    <div className="form-text">
                                        <div className="d-flex align-items-center gap-2 mb-1">
                                            <AiOutlineExclamationCircle size="1.2rem" />
                                            {t("supplier_pages.create_product_excel.tip")}
                                        </div>
                                        <ol>
                                            <li className="mt-3">
                                                {t(
                                                    "supplier_pages.create_product_excel.tip1",
                                                )}
                                                .
                                            </li>
                                            <li className="mt-3">
                                                {t(
                                                    "supplier_pages.create_product_excel.tip2",
                                                )}
                                                :
                                                <br />
                                                <a
                                                    href={ExcelGuideImage}
                                                    target="_blank"
                                                    download={true}
                                                >
                                                    {t(
                                                        "supplier_pages.create_product_excel.tip2_image",
                                                    )}
                                                </a>
                                                .
                                            </li>
                                            <li className="mt-3">
                                                {t(
                                                    "supplier_pages.create_product_excel.tip3",
                                                )}
                                                :
                                                <ul>
                                                    <li className="mt-2">
                                                        {t(
                                                            "supplier_pages.create_product_excel.tip3_1",
                                                        )}
                                                    </li>
                                                    <li className="mt-2">
                                                        {t(
                                                            "supplier_pages.create_product_excel.tip3_2",
                                                        )}
                                                    </li>
                                                    <li className="mt-2">
                                                        {t(
                                                            "supplier_pages.create_product_excel.tip3_3",
                                                        )}
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="mt-3">
                                                {t(
                                                    "supplier_pages.create_product_excel.tip4",
                                                )}
                                            </li>
                                            <li className="mt-3">
                                                {t(
                                                    "supplier_pages.create_product_excel.tip5",
                                                )}
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary px-5 d-flex align-items-center gap-3"
                                >
                                    <IoCloudUploadOutline size="1.3rem" />
                                    {t("supplier_pages.create_product_excel.submit")}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CreateProductExcel;
