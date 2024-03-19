import { TbDatabaseEdit } from "react-icons/tb";

import useMultiStepForm from "../../hooks/useMultiStepForm";

import ProductDetailsForm from "../../components/Supplier/Forms/ProductDetailsForm";
import ProductCategoriesForm from "../../components/Supplier/Forms/ProductCategoriesForm";
import ProductImagesForm from "../../components/Supplier/Forms/ProductImagesForm";
import { useEffect, useState } from "react";

import useAxios from "../../utils/useAxios";

import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
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
    isReturnable: false,
    returnDeadline: 30,
    category: "",
    categoryImage: {},
    subCategory: "",
    subCategoryImage: {},
    brand: "",
    brandImage: {},
    thumbnail: {},
    otherImages: [],
    newThumbnail: {},
    newImage1: {},
    newImage2: {},
    newImage3: {},
    newImage4: {},
};

const UpdateProduct = () => {
    const { t } = useTranslation();

    const { product_sku } = useParams();

    const api = useAxios();

    const getProduct = async () => {
        await api
            .get(import.meta.env.VITE_BACKEND_URL + `/api/product/product/${product_sku}`)
            .then((res) => {
                let data = res.data;

                setProductFormData({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    salePrice: data.sale_price || 0,
                    priceRangeMin: data.price_range_min || 0,
                    priceRangeMax: data.price_range_max || 0,
                    stockQuantity: data.stock_quantity,
                    isAvailable: data.is_available,
                    isReturnable: data.is_returnable,
                    returnDeadline: data.return_deadline,
                    category: {
                        label: data.category.parent_name,
                        value: data.category.parent_slug,
                    },
                    categoryImage: {},
                    subCategory: {
                        label: data.category.name,
                        value: data.category.slug,
                    },
                    subCategoryImage: {},
                    brand: {
                        label: data.brand.name,
                        value: data.brand.slug,
                    },
                    brandImage: {},
                    thumbnail: data.thumbnail,
                    otherImages: [
                        data.image1 || "",
                        data.image2 || "",
                        data.image3 || "",
                        data.image4 || "",
                    ],
                    newThumbnail: {},
                    newImage1: {},
                    newImage2: {},
                    newImage3: {},
                    newImage4: {},
                });
            });
    };

    useEffect(() => {
        getProduct();
    }, [product_sku]);

    const [productFormData, setProductFormData] = useState(INITIAL_DATA);

    const updateFieldsState = (fields) => {
        setProductFormData((prev) => {
            return { ...prev, ...fields };
        });
    };

    const { currentStepIndex, step, next, previous, isFirstStep, isLastStep } =
        useMultiStepForm([
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
                        update={true}
                    />
                ),
                title: t("supplier_pages.update_product.img"),
            },
        ]);

    const handleStepsFormSubmit = async (e) => {
        e.preventDefault();

        if (currentStepIndex == 0) {
            if (productFormData.price > 0.0) {
                if (
                    parseFloat(productFormData.priceRangeMin) !== 0.0 ||
                    parseFloat(productFormData.priceRangeMax) !== 0.0
                ) {
                    toast.error(`${t("supplier_pages.update_product.both_err")}!`);
                    return false;
                }
            } else if (productFormData.price === 0.0) {
                if (
                    parseFloat(productFormData.priceRangeMin) === 0.0 &&
                    parseFloat(productFormData.priceRangeMax) === 0.0
                ) {
                    toast.error(`${t("supplier_pages.update_product.no_err")}!`);
                    return false;
                } else if (
                    parseFloat(productFormData.priceRangeMin) <= 0.0 ||
                    parseFloat(productFormData.priceRangeMax) <= 0.0 ||
                    parseFloat(productFormData.priceRangeMin) >
                        parseFloat(productFormData.priceRangeMax)
                ) {
                    toast.error(`${t("supplier_pages.update_product.mm_err")}!`);
                    return false;
                }
            }

            if (productFormData.description == "") {
                toast.error(`${t("supplier_pages.update_product.desc_err")}!`);
                return false;
            }
        }

        if (!isLastStep) return next();

        await api
            .patch(
                import.meta.env.VITE_BACKEND_URL + `/api/product/product/${product_sku}/`,
                productFormData,
            )
            .then(() => {
                toast.success(`${t("supplier_pages.update_product.success")}!`);
            });
    };

    return (
        <main className="px-0 px-md-3">
            <section>
                <div className="container">
                    <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                        <TbDatabaseEdit size="2.5rem" />
                        {t("supplier_pages.update_product.title")}
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
                                                ? `${t(
                                                      "supplier_pages.update_product.title",
                                                  )}`
                                                : `${t("next")}`}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default UpdateProduct;
