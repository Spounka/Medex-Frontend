import { TbDatabasePlus } from "react-icons/tb";

import useMultiStepForm from "../../hooks/useMultiStepForm";

import ProductDetailsForm from "../../components/Supplier/Forms/ProductDetailsForm";
import ProductCategoriesForm from "../../components/Supplier/Forms/ProductCategoriesForm";
import ProductImagesForm from "../../components/Supplier/Forms/ProductImagesForm";
import { useRef, useState } from "react";

import useAxios from "../../utils/useAxios";

import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const INITIAL_DATA = {
    name: "",
    description: "",
    price: 0.0,
    salePrice: 0.0,
    priceRangeMin: 0.0,
    priceRangeMax: 0.0,
    stockQuantity: 0,
    isAvailable: false,
    category: "",
    categoryImage: {},
    subCategory: "",
    subCategoryImage: {},
    brand: "",
    brandImage: {},
    thumbnail: {},
    otherImages: [],
};

const CreateProduct = () => {
    const { t } = useTranslation();

    const api = useAxios();

    const [productFormData, setProductFormData] = useState(INITIAL_DATA);

    const fileRef = useRef(null);
    const multiFileRef = useRef([]);

    const updateFieldsState = (fields) => {
        setProductFormData((prev) => {
            return { ...prev, ...fields };
        });
    };

    const handleReset = () => {
        if (fileRef.current) {
            fileRef.current.value = "";
            fileRef.current.type = "text";
            fileRef.current.type = "file";
        }
    };

    const handleResetMultiple = () => {
        if (multiFileRef.current) {
            multiFileRef.current.value = [];
            multiFileRef.current.type = "text";
            multiFileRef.current.type = "file";
        }
    };

    const {
        currentStepIndex,
        step,
        next,
        previous,
        isFirstStep,
        isLastStep,
        goTo,
    } = useMultiStepForm([
        {
            form: (
                <ProductDetailsForm
                    {...productFormData}
                    updateFieldsState={updateFieldsState}
                />
            ),
            title: t("supplier_pages.update_product.det"),
        },
        {
            form: (
                <ProductCategoriesForm
                    {...productFormData}
                    updateFieldsState={updateFieldsState}
                />
            ),
            title: t("supplier_pages.update_product.cat"),
        },
        {
            form: (
                <ProductImagesForm
                    {...productFormData}
                    updateFieldsState={updateFieldsState}
                    fileRef={fileRef}
                    multiFileRef={multiFileRef}
                />
            ),
            title: t("supplier_pages.update_product.img"),
        },
    ]);

    const handleStepsFormSubmit = async (e) => {
        e.preventDefault();

        if (currentStepIndex == 0) {
            if (productFormData.price > 0) {
                if (
                    productFormData.priceRangeMin !== 0 ||
                    productFormData.priceRangeMax !== 0
                ) {
                    toast.error(
                        `${t("supplier_pages.update_product.both_err")}!`
                    );
                    return false;
                }
            } else if (productFormData.price === 0) {
                if (
                    productFormData.priceRangeMin === 0 &&
                    productFormData.priceRangeMax === 0
                ) {
                    toast.error(
                        `${t("supplier_pages.update_product.no_err")}!`
                    );
                    return false;
                } else if (
                    productFormData.priceRangeMin <= 0 ||
                    productFormData.priceRangeMax <= 0 ||
                    productFormData.priceRangeMin >
                        productFormData.priceRangeMax
                ) {
                    toast.error(
                        `${t("supplier_pages.update_product.mm_err")}!`
                    );
                    return false;
                }
            }

            if (productFormData.description == "") {
                toast.error(`${t("supplier_pages.update_product.desc_err")}!`);
                return false;
            }
        } else if (currentStepIndex == 2) {
            if (productFormData.otherImages.length > 4) {
                toast.error(
                    `${t("supplier_pages.create_product.max_images_err")}!`
                );
            }
        }

        if (!isLastStep) return next();

        await api
            .post(
                import.meta.env.VITE_BACKEND_URL + "/api/product/product/",
                productFormData
            )
            .then(() => {
                toast.success(`${t("supplier_pages.create_product.success")}!`);
                setProductFormData(INITIAL_DATA);
                handleReset();
                handleResetMultiple();
                goTo(0);
            });
    };

    return (
        <main className="container">
            <section className="px-0 px-md-3">
                <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                    <TbDatabasePlus size="2.5rem" />
                    {t("supplier_sidebar.create_product")}
                </h2>
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="card p-4 p-md-5 shadow">
                            <div className="steps">
                                <progress
                                    id="progress"
                                    value={
                                        currentStepIndex == 0
                                            ? 0
                                            : currentStepIndex == 1
                                            ? 50
                                            : 100
                                    }
                                    max={100}
                                ></progress>
                                <div className="step-item">
                                    <button
                                        className={`step-button text-center ${
                                            currentStepIndex >= 0 && "done"
                                        }`}
                                        type="button"
                                    >
                                        1
                                    </button>
                                </div>
                                <div className="step-item">
                                    <button
                                        className={`step-button text-center ${
                                            currentStepIndex >= 1 && "done"
                                        }`}
                                        type="button"
                                    >
                                        2
                                    </button>
                                </div>
                                <div className="step-item">
                                    <button
                                        className={`step-button text-center ${
                                            currentStepIndex >= 2 && "done"
                                        }`}
                                        type="button"
                                    >
                                        3
                                    </button>
                                </div>
                            </div>
                            <h5 className="mt-4 dashboard__title">
                                {currentStepIndex + 1}. &nbsp;
                                {step.title}
                            </h5>
                            <form
                                method="post"
                                className="mt-4"
                                onSubmit={handleStepsFormSubmit}
                            >
                                {step.form}

                                <div className="mt-4 d-flex justify-content-end align-items-center gap-2">
                                    {!isFirstStep && (
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary"
                                            onClick={previous}
                                        >
                                            {t("previous")}
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        {isLastStep
                                            ? t(
                                                  "supplier_sidebar.create_product"
                                              )
                                            : t("next")}
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

export default CreateProduct;
