import { useContext, useEffect, useRef, useState } from "react";
import BreadCrumb from "../../components/Buyer/shared/BreadCrumb";

import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import { RiMailSendLine } from "react-icons/ri";
import { MdOutlineClear, MdOutlineRequestQuote } from "react-icons/md";

import useAxios from "../../utils/useAxios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import AuthContext from "../../context/AuthContext";

const TEXT_MAX = 8000;

const RequestForQuotes = () => {
    const { t } = useTranslation();

    const api = useAxios();

    const { authTokens } = useContext(AuthContext);

    const [productNameOptions, setProductNameOptions] = useState([]);
    const [supplierNameOptions, setSupplierNameOptions] = useState([]);

    const [selectedProduct, setSelectedProduct] = useState("");
    const [selectedSupplier, setSelectedSupplier] = useState("");

    const fileRef = useRef(null);
    const creatableSelectInputRef = useRef(null);
    const selectInputRef = useRef(null);

    const getProducts = async () => {
        await api
            .get(import.meta.env.VITE_BACKEND_URL + "/api/product/product")
            .then((res) => {
                const nameOptions = res.data.map((product) => ({
                    value: product.slug,
                    label: product.name,
                }));

                setProductNameOptions(nameOptions);
            });
    };

    const getSuppliers = async () => {
        await api
            .get(
                import.meta.env.VITE_BACKEND_URL + "/api/account/supplier/list/"
            )
            .then((res) => {
                const nameOptions = res.data.map((supplier) => ({
                    value: supplier.id,
                    label: supplier.full_name,
                }));

                setSupplierNameOptions(nameOptions);
            });
    };

    useEffect(() => {
        document.getElementById("count_message").innerHTML = "0 / " + TEXT_MAX;

        getProducts();
        getSuppliers();
    }, []);

    const handleReset = () => {
        if (fileRef.current) {
            fileRef.current.value = "";
            fileRef.current.type = "text";
            fileRef.current.type = "file";
        }
    };

    const onClear = () => {
        selectInputRef.current.clearValue();
        creatableSelectInputRef.current.clearValue();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("product", e.target.product.value);
        formData.append("supplier", e.target.supplier.value);
        formData.append("quantity", e.target.quantity.value);
        formData.append("unit", e.target.unit.value);
        formData.append("due_date", e.target.due_date.value);
        formData.append("requirements", e.target.requirements.value);
        const fileInput = e.target.attachments;
        for (let i = 0; i < fileInput.files.length; i++) {
            formData.append("attachments", fileInput.files[i]);
        }

        await api
            .post(import.meta.env.VITE_BACKEND_URL + "/api/quote/", formData)

            .then(() => {
                toast.success(`${t("shared.rfq.success")}!`);

                setSelectedProduct("");
                setSelectedSupplier("");

                e.target.unit.value = "piece";
                e.target.quantity.value = "";
                e.target.requirements.value = "";
                e.target.due_date.value = "";
                e.target.agree.checked = false;
                handleReset();
                onClear();
            })
            .catch(() => {
                toast.error(`${t("shared.rfq.err")}!`);
            });
    };

    return (
        <main className="w-100">
            <section
                className={`${
                    window.location.href.indexOf("supplier") === -1 && "py-5"
                }`}
            >
                <div className="container">
                    {window.location.href.indexOf("supplier") > -1 ||
                    window.location.href.indexOf("dashboard") > -1 ? (
                        <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                            <MdOutlineRequestQuote size="2.5rem" />
                            {t("rfq")}
                        </h2>
                    ) : (
                        <div className="row">
                            <BreadCrumb title={`${t("rfq")}`} />
                        </div>
                    )}

                    <div className="row">
                        <div
                            className={`mt-5 col-12 px-4 ${
                                window.location.href.indexOf("supplier") ===
                                    -1 &&
                                window.location.href.indexOf("dashboard") === -1
                                    ? "mx-auto"
                                    : "mt-4"
                            }`}
                        >
                            <form
                                method="post"
                                encType="multipart/form-data"
                                onSubmit={handleSubmit}
                            >
                                <div className="mb-4">
                                    <label
                                        htmlFor="name"
                                        className="form-label"
                                    >
                                        {t("product_form.name")} *
                                    </label>
                                    <CreatableSelect
                                        isClearable
                                        options={productNameOptions}
                                        required
                                        name="product"
                                        defaultValue={selectedProduct}
                                        onChange={(e) => {
                                            setSelectedProduct(e?.value);
                                        }}
                                        ref={creatableSelectInputRef}
                                    />
                                    <div className="form-text">
                                        {t("shared.rfq.hint")}.
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="supplier"
                                        className="form-label"
                                    >
                                        {t("shared.rfq.supplier")}
                                    </label>
                                    <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        isClearable={true}
                                        placeholder={`${t(
                                            "shared.rfq.supplier"
                                        )}`}
                                        isSearchable={true}
                                        name="supplier"
                                        options={supplierNameOptions}
                                        defaultValue={selectedSupplier}
                                        onChange={(e) => {
                                            setSelectedSupplier(e?.value);
                                        }}
                                        ref={selectInputRef}
                                    />
                                    <div className="form-text">
                                        {t("shared.rfq.supplier_hint")}.
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="qty"
                                        className="d-block form-label"
                                    >
                                        {t("shared.rfq.qty")} *
                                    </label>

                                    <div className="input-group w-100">
                                        <input
                                            type="number"
                                            className="form-control w-50"
                                            placeholder="Please enter..."
                                            aria-label="QTY"
                                            name="quantity"
                                        />
                                        <div className="input-group-append w-50">
                                            <select
                                                className="form-select quote__select"
                                                aria-label="QTY UNIT"
                                                defaultValue="piece"
                                                name="unit"
                                                required
                                            >
                                                <option value="bag">
                                                    {t("shared.rfq.bag")}
                                                </option>
                                                <option value="barrel">
                                                    {t("shared.rfq.bar")}
                                                </option>
                                                <option value="bushel">
                                                    {t("shared.rfq.bus")}
                                                </option>
                                                <option value="cubic">
                                                    {t("shared.rfq.cub")}
                                                </option>
                                                <option value="dozen">
                                                    {t("shared.rfq.doz")}
                                                </option>
                                                <option value="gallon">
                                                    {t("shared.rfq.gal")}
                                                </option>
                                                <option value="gram">
                                                    {t("shared.rfq.gra")}
                                                </option>
                                                <option value="kilogram">
                                                    {t("shared.rfq.kg")}
                                                </option>
                                                <option value="kilometer">
                                                    {t("shared.rfq.km")}
                                                </option>
                                                <option value="long">
                                                    {t("shared.rfq.lt")}
                                                </option>
                                                <option value="meter">
                                                    {t("shared.rfq.mt")}
                                                </option>
                                                <option value="metric">
                                                    {t("shared.rfq.mt_t")}
                                                </option>
                                                <option value="ounce">
                                                    {t("shared.rfq.ou")}
                                                </option>
                                                <option value="pair">
                                                    {t("shared.rfq.pair")}
                                                </option>
                                                <option value="pack">
                                                    {t("shared.rfq.pack")}
                                                </option>
                                                <option value="piece">
                                                    {t("shared.rfq.pc")}
                                                </option>
                                                <option value="pound">
                                                    {t("shared.rfq.pd")}
                                                </option>
                                                <option value="set">
                                                    {t("shared.rfq.set")}
                                                </option>
                                                <option value="short">
                                                    {t("shared.rfq.st")}
                                                </option>
                                                <option value="square">
                                                    {t("shared.rfq.sm")}
                                                </option>
                                                <option value="ton">
                                                    {t("shared.rfq.ton")}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4 position-relative">
                                    <label
                                        htmlFor="requirements"
                                        className="form-label"
                                    >
                                        {t("shared.rfq.d_req")} *
                                    </label>
                                    <textarea
                                        name="requirements"
                                        rows="12"
                                        className="form-control"
                                        placeholder={`${t("shared.rfq.look")}`}
                                        maxLength={TEXT_MAX}
                                        onChange={countLetters}
                                        required
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
                                <div className="mb-4 position-relative">
                                    <label
                                        htmlFor="due_date"
                                        className="form-label"
                                    >
                                        {t("shared.rfq.due_date")} *
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="due_date"
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="attachments"
                                        className="form-label text-muted"
                                    >
                                        {t("shared.rfq.att")}
                                    </label>
                                    <input
                                        type="file"
                                        name="attachments"
                                        className="form-control"
                                        multiple
                                        ref={fileRef}
                                    />
                                    <div className="form-text">
                                        {t("shared.rfq.att_hint")}.
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="agree"
                                            name="agree"
                                            required
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="agree"
                                        >
                                            {t("shared.rfq.consent")}.
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <button
                                        type="submit"
                                        className="gradient-bg-color w-100 py-2 text-white rounded shadow fw-bold login__btn d-flex align-items-center gap-2 justify-content-center"
                                    >
                                        {t("shared.rfq.submit")}
                                        <RiMailSendLine size="1.4rem" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

const clearInput = () => {
    document.querySelector("textarea[name=requirements]").value = "";
};

const countLetters = () => {
    let text_length = document.querySelector("textarea[name=requirements]")
        .value.length;

    document.getElementById("count_message").innerHTML =
        text_length + " / " + TEXT_MAX;
};

export default RequestForQuotes;
