import { Editor } from "@tinymce/tinymce-react";

import {
    MdOutlineManageSearch,
    MdOutlineDescription,
    MdAttachMoney,
    MdMoneyOff,
    MdOutlinePriceChange,
    MdOutlineWarehouse,
    MdAssignmentReturn,
} from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";
import { LuWarehouse } from "react-icons/lu";

import { useTranslation } from "react-i18next";

const ProductDetailsForm = ({
    name,
    description,
    price,
    salePrice,
    priceRangeMin,
    priceRangeMax,
    stockQuantity,
    isAvailable,
    isReturnable,
    returnDeadline,
    updateFieldsState,
}) => {
    const { t } = useTranslation();

    return (
        <>
            <div className="mb-5">
                <label
                    htmlFor="name"
                    className="form-label d-flex align-items-center gap-2"
                >
                    <MdOutlineManageSearch size="1.5rem" />
                    {t("product_form.name")} *
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={name}
                    onChange={(e) =>
                        updateFieldsState({ name: e.target.value })
                    }
                />
            </div>
            <div className="row mb-5">
                <div className="col-12 col-md-5">
                    <div className="mb-3">
                        <label
                            htmlFor="price"
                            className="form-label d-flex align-items-center gap-2"
                        >
                            <MdAttachMoney size="1.5rem" />
                            {t("product_form.price")} *
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            min={0}
                            id="price"
                            required
                            value={price}
                            onChange={(e) => {
                                updateFieldsState({ price: e.target.value });
                            }}
                            onBlur={(e) => {
                                if (e.target.value === "") {
                                    updateFieldsState({ price: 0 });
                                }
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="salePrice"
                            className="form-label d-flex align-items-center gap-2 text-muted"
                        >
                            <MdMoneyOff size="1.5rem" />
                            {t("product_form.sale_price")}
                        </label>
                        <input
                            type="number"
                            min={0}
                            className="form-control"
                            id="salePrice"
                            value={salePrice}
                            onChange={(e) =>
                                updateFieldsState({ salePrice: e.target.value })
                            }
                            onBlur={(e) => {
                                if (e.target.value === "") {
                                    updateFieldsState({ salePrice: 0 });
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="col-2 d-none d-md-block position-relative py-3">
                    <div className="or__line mx-auto"></div>
                    <span className="position-absolute or__word">
                        {t("product_form.or")}
                    </span>
                </div>
                <div className="col-12 col-md-5">
                    <div className="mb-3">
                        <label
                            htmlFor="priceRangeMin"
                            className="form-label d-flex align-items-center gap-2 text-muted"
                        >
                            <MdOutlinePriceChange size="1.5rem" />
                            {t("product_form.min_price")}
                        </label>
                        <input
                            type="number"
                            min={0}
                            className="form-control"
                            id="priceRangeMin"
                            value={priceRangeMin}
                            onChange={(e) =>
                                updateFieldsState({
                                    priceRangeMin: e.target.value,
                                })
                            }
                            onBlur={(e) => {
                                if (e.target.value === "") {
                                    updateFieldsState({ priceRangeMin: 0 });
                                }
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="priceRangeMax"
                            className="form-label d-flex align-items-center gap-2 text-muted"
                        >
                            <MdOutlinePriceChange size="1.5rem" />
                            {t("product_form.max_price")}
                        </label>
                        <input
                            type="number"
                            min={0}
                            className="form-control"
                            id="priceRangeMax"
                            value={priceRangeMax}
                            onChange={(e) =>
                                updateFieldsState({
                                    priceRangeMax: e.target.value,
                                })
                            }
                            onBlur={(e) => {
                                if (e.target.value === "") {
                                    updateFieldsState({ priceRangeMax: 0 });
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-12 col-md-5 d-flex flex-column justify-content-center">
                    <p className="form-label d-flex align-items-center gap-2">
                        <MdOutlineWarehouse size="1.5rem" />
                        {t("product_form.available")}
                    </p>
                    <div className="form-check mt-1">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="isAvailable"
                            id="isAvailable"
                            value={isAvailable}
                            checked={isAvailable}
                            onChange={(e) =>
                                updateFieldsState({
                                    isAvailable: e.target.checked,
                                })
                            }
                        />
                        <label
                            className="form-check-label"
                            htmlFor="isAvailable"
                        >
                            {t("product_form.available_question")} ?
                        </label>
                    </div>
                </div>
                <div className="col-2 d-none d-md-block"></div>
                <div className="col-12 col-md-5">
                    <label
                        htmlFor="stockQuantity"
                        className="form-label d-flex align-items-center gap-2"
                    >
                        <LuWarehouse size="1.5rem" />
                        {t("product_form.stock")} *
                    </label>
                    <input
                        type="number"
                        min={0}
                        className="form-control"
                        id="stockQuantity"
                        required
                        value={stockQuantity}
                        onChange={(e) =>
                            updateFieldsState({ stockQuantity: e.target.value })
                        }
                    />
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-12 col-md-5 d-flex flex-column justify-content-center">
                    <p className="form-label d-flex align-items-center gap-2">
                        <TbTruckReturn size="1.5rem" />
                        {t("product_form.returnable")}
                    </p>
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="isReturnable"
                            value={isReturnable}
                            checked={isReturnable}
                            onChange={(e) => {
                                updateFieldsState({
                                    isReturnable: e.target.checked,
                                });
                            }}
                        />
                        <label class="form-check-label" for="isReturnable">
                            {t("product_form.returnable_question")}
                        </label>
                    </div>
                </div>
                <div className="col-2 d-none d-md-block"></div>
                <div className="col-12 col-md-5">
                    <label
                        htmlFor="returnDeadline"
                        className="form-label d-flex align-items-center gap-2"
                    >
                        <MdAssignmentReturn size="1.5rem" />
                        {t("product_form.returnable_dl")}
                    </label>
                    <input
                        type="number"
                        min={0}
                        className="form-control"
                        id="returnDeadline"
                        value={returnDeadline}
                        onChange={(e) =>
                            updateFieldsState({
                                returnDeadline: e.target.value,
                            })
                        }
                        disabled={isReturnable !== true}
                    />
                </div>
            </div>
            <div className="mb-5">
                <label
                    htmlFor="description"
                    className="form-label d-flex align-items-center gap-2"
                >
                    <MdOutlineDescription size="1.5rem" />
                    {t("product_form.description")} *
                </label>

                <Editor
                    tinymceScriptSrc={"/tinymce/tinymce.min.js"}
                    initialValue={description}
                    onEditorChange={(newValue, editor) => {
                        updateFieldsState({
                            description: editor.getContent(),
                        });
                    }}
                    init={{
                        height: 500,
                        plugins: [
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "charmap",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "table",
                            "preview",
                            "help",
                            "wordcount",
                        ],
                        toolbar:
                            "undo redo | blocks | " +
                            "bold italic forecolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                        content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                />
            </div>
        </>
    );
};

export default ProductDetailsForm;
