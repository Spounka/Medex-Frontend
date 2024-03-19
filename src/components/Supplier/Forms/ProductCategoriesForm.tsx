import { useState, useEffect } from "react";

import { BiCategoryAlt, BiCategory } from "react-icons/bi";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { LuImagePlus } from "react-icons/lu";

import CreatableSelect from "react-select/creatable";

import axios from "axios";

import { useTranslation } from "react-i18next";

const ProductCategoriesForm = ({ category, subCategory, brand, updateFieldsState }) => {
    const { t } = useTranslation();

    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    const [newCategory, setNewCategory] = useState(false);
    const [newSubCategory, setNewSubCategory] = useState(false);
    const [newBrand, setNewBrand] = useState(false);

    const fetchBrands = async () => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/product/brand`,
        );
        const brandOptions = response.data.map((brand) => ({
            value: brand.slug,
            label: brand.name,
        }));
        setBrands(brandOptions);
    };

    const fetchCategories = async () => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/product/category?level=0`,
        );
        const categoryOptions = response.data.map((category) => ({
            value: category.slug,
            label: category.name,
        }));
        setCategories(categoryOptions);
    };

    const fetchSubCategories = async (catName) => {
        await axios
            .get(
                `${
                    import.meta.env.VITE_BACKEND_URL
                }/api/product/category?level=1&parent=${catName}`,
            )
            .then((res) => {
                const categoryOptions = res.data.map((category) => ({
                    value: category.slug,
                    label: category.name,
                }));
                setSubCategories(categoryOptions);
            });
    };

    const categoryStyles = {
        option: (styles) => {
            return {
                ...styles,
                backgroundColor: "white",
                color: "#131341",
                ":active": {
                    backgroundColor: "#6842ef",
                    color: "white",
                },
            };
        },
    };

    useEffect(() => {
        fetchBrands();
        fetchCategories();

        if (category?.value) {
            fetchSubCategories(category.value);
        }
    }, []);

    const checkIfNew = (type, value) => {
        if (type === "category") {
            if (value && value?.__isNew__) {
                setNewCategory(true);
            } else {
                setNewCategory(false);
            }
        } else if (type === "subCategory") {
            if (value && value?.__isNew__) {
                setNewSubCategory(true);
            } else {
                setNewSubCategory(false);
            }
        } else {
            if (value && value?.__isNew__) {
                setNewBrand(true);
            } else {
                setNewBrand(false);
            }
        }
    };

    return (
        <>
            <div className="row mb-5">
                <div className="col-12 col-md-6">
                    <label
                        htmlFor="category"
                        className="form-label d-flex align-items-center gap-2 mb-3"
                    >
                        <BiCategoryAlt size="1.5rem" />
                        {t("product_form.category")} *
                    </label>
                    <CreatableSelect
                        isClearable
                        isSearchable
                        required
                        name="category"
                        defaultValue={category}
                        options={categories}
                        styles={categoryStyles}
                        onChange={(e) => {
                            fetchSubCategories(e?.value);
                            checkIfNew("category", e);
                            updateFieldsState({ category: e });
                        }}
                    />
                </div>
                <div className="col-12 col-md-6 mt-3 mt-md-0">
                    <label
                        htmlFor="categoryImage"
                        className="form-label d-flex align-items-center gap-2 mb-3 text-muted"
                    >
                        <LuImagePlus size="1.5rem" />
                        {t("product_form.new_category")}
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        required={newCategory}
                        onChange={(e) =>
                            updateFieldsState({
                                categoryImage: e.target.files[0],
                            })
                        }
                    />
                </div>
            </div>

            <div className="row mb-5">
                <div className="col-12 col-md-6">
                    <label
                        htmlFor="subCategory"
                        className="form-label d-flex align-items-center gap-2 mb-3"
                    >
                        <BiCategory size="1.5rem" />
                        {t("product_form.subcategory")} *
                    </label>
                    <CreatableSelect
                        isClearable
                        isSearchable
                        required
                        name="subCategory"
                        defaultValue={subCategory}
                        options={subCategories}
                        styles={categoryStyles}
                        onChange={(e) => {
                            checkIfNew("subCategory", e);
                            updateFieldsState({ subCategory: e });
                        }}
                    />
                </div>
                <div className="col-12 col-md-6 mt-3 mt-md-0">
                    <label
                        htmlFor="subCategoryImage"
                        className="form-label d-flex align-items-center gap-2 mb-3 text-muted"
                    >
                        <LuImagePlus size="1.5rem" />
                        {t("product_form.new_subcategory")}
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        required={newSubCategory}
                        onChange={(e) =>
                            updateFieldsState({
                                subCategoryImage: e.target.files[0],
                            })
                        }
                    />
                </div>
            </div>

            <div className="row mb-5">
                <div className="col-12 col-md-6">
                    <label
                        htmlFor="brand"
                        className="form-label d-flex align-items-center gap-2 mb-3"
                    >
                        <AiOutlineSafetyCertificate size="1.5rem" />
                        {t("product_form.brand")} *
                    </label>
                    <CreatableSelect
                        isClearable
                        isSearchable
                        required
                        name="brand"
                        defaultValue={brand}
                        options={brands}
                        styles={categoryStyles}
                        onChange={(e) => {
                            checkIfNew("brand", e);
                            updateFieldsState({ brand: e });
                        }}
                    />
                </div>
                <div className="col-12 col-md-6 mt-3 mt-md-0">
                    <label
                        htmlFor="brandImage"
                        className="form-label d-flex align-items-center gap-2 mb-3 text-muted"
                    >
                        <LuImagePlus size="1.5rem" />
                        {t("product_form.new_brand")}
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        required={newBrand}
                        onChange={(e) =>
                            updateFieldsState({ brandImage: e.target.files[0] })
                        }
                    />
                </div>
            </div>
        </>
    );
};

export default ProductCategoriesForm;
