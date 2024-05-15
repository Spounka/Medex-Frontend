import BreadCrumb from "../../components/Buyer/shared/BreadCrumb";

import { IoChevronDown } from "react-icons/io5";
import { BiFilterAlt } from "react-icons/bi";
import { TbZoomMoney, TbCurrencyDollarOff } from "react-icons/tb";
import { AiOutlineCloseCircle, AiOutlineSafetyCertificate } from "react-icons/ai";

import Slider from "react-slider";

import axios from "axios";

import Select from "react-select";
import { useState, useEffect } from "react";

import ProductCart from "../../components/Buyer/shared/ProductCard";

import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Brand, Category, Product } from "@domain/product.ts";
import Container from "../../components/ui/container";
import { Radio, RadioGroup } from "react-aria-components";
import clsx from "clsx";

const MIN = 0;
const MAX = 100000;

const OurStore = (props) => {
    const { t } = useTranslation();

    const { addToCart } = props;

    const [queryParameters, setQueryParameters] = useSearchParams();

    const [productsList, setProductsList] = useState<Product[]>([]);

    const [query, setQuery] = useState("name");

    const [keywordFilter, setKeywordFilter] = useState(
        queryParameters.get("keyword") ? queryParameters.get("keyword") : "",
    );
    const [onSaleFilter, setOnSaleFilter] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState(
        queryParameters.get("category") ? queryParameters.get("category") : "",
    );
    const [subCategoryFilter, setSubCategoryFilter] = useState(
        queryParameters.get("sub-category") ? queryParameters.get("sub-category") : "",
    );
    const [brandFilter, setBrandFilter] = useState(
        queryParameters.get("brand") ? queryParameters.get("brand") : "",
    );
    const [priceValues, setPriceValues] = useState([MIN, MAX]);

    const [brands, setBrands] = useState<{ value: string; label: string }[]>([]);
    const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
    const [subCategories, setSubCategories] = useState<
        { value: string; label: string }[]
    >([]);

    const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState(false);
    const [isSubCategoriesMenuOpen, setIsSubCategoriesMenuOpen] = useState(false);

    const fetchBrands = async () => {
        const response = await axios.get<Brand[]>(
            `${import.meta.env.VITE_BACKEND_URL}/api/product/brand`,
        );
        const brandOptions = response.data.map((brand) => ({
            value: brand.slug,
            label: brand.name,
        }));
        setBrands(brandOptions);
    };

    const fetchCategories = async () => {
        const response = await axios.get<Category[]>(
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
            .get<
                Category[]
            >(`${import.meta.env.VITE_BACKEND_URL}/api/product/category?level=1&parent=${catName}`)
            .then((res) => {
                const categoryOptions = res.data.map((category) => ({
                    value: category.slug,
                    label: category.name,
                }));
                setSubCategories(categoryOptions);
            });
    };

    const fetchFilteredProducts = async (catLoad: string | null = null) => {
        const url = `${
            import.meta.env.VITE_BACKEND_URL
        }/api/product/product?name=${keywordFilter}&on_sale=${onSaleFilter}&category=${
            catLoad ? catLoad : categoryFilter
        }&sub_category=${subCategoryFilter}&brand=${brandFilter}&price_value_min=${
            priceValues[0]
        }&price_value_max=${priceValues[1]}&ordering=${query}`;

        await axios
            .get<{ random_categories_products: any; products: Product[] }>(url)
            .then((res) => {
                setProductsList(res.data.products);
            });
    };

    useEffect(() => {
        fetchBrands();
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = () => {
            if (queryParameters.get("category")) {
                fetchFilteredProducts(queryParameters.get("category"));
            } else {
                fetchFilteredProducts();
            }
        };

        fetchProducts();
    }, [
        keywordFilter,
        categoryFilter,
        subCategoryFilter,
        priceValues,
        brandFilter,
        onSaleFilter,
        query,
        queryParameters,
    ]);

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

    console.log(categories);
    console.log(subCategories);
    console.log(queryParameters);

    return (
        <main>
            <Container
                node={"section"}
                className="py-4"
            >
                <div className="row mb-3">
                    <BreadCrumb title={`${t("all_products")}`} />
                </div>
                <div className="tw-flex tw-w-fit tw-flex-col tw-gap-8 md:tw-flex-row lg:tw-w-full">
                    <div className="md:tw-flex-[0_0_100%]">
                        <div className="md:tw-hidden">
                            <button
                                onClick={showFilterMenu}
                                className="w-75 mx-auto py-1 mb-1 fw-bold text-center d-flex justify-content-center align-items-center gap-2"
                                style={{
                                    backgroundColor: "white",
                                    border: "1px solid var(--theme-color-primary)",
                                    color: "var(--theme-color-primary)",
                                    borderRadius: "5px",
                                }}
                            >
                                <BiFilterAlt size="1.2rem" />
                                {t("buyer_pages.products_list.filter")}
                            </button>
                        </div>
                        <div
                            className="store__filter-card mb-3 store__filter-menu tw-flex tw-flex-col tw-gap-1.5"
                            style={{
                                boxShadow: "none",
                                border: "none",
                            }}
                        >
                            <div className="row mt-3 d-block d-md-none">
                                <div className="col-12 text-end">
                                    <AiOutlineCloseCircle
                                        onClick={closeFilterMenu}
                                        size="1.5rem"
                                        color="black"
                                    />
                                </div>
                            </div>

                            <input
                                type="text"
                                name="keyword"
                                className="form-control"
                                style={{ borderRight: "1px solid #bbbbbb" }}
                                placeholder={`${t("buyer_pages.products_list.type")}...`}
                                onInput={(e) => {
                                    queryParameters.delete("keyword");
                                    setQueryParameters(queryParameters);
                                    setKeywordFilter(e.target.value ?? "");
                                }}
                            />
                            <hr className="my-2" />

                            <details
                                open={isCategoriesMenuOpen}
                                onClick={() => setIsCategoriesMenuOpen((v) => !v)}
                                className={
                                    "tw-outline-none tw-transition tw-duration-300 focus:tw-outline-none"
                                }
                            >
                                <summary
                                    className={
                                        "tw-flex tw-items-center tw-justify-between marker:tw-content-['']"
                                    }
                                >
                                    {t("buyer_pages.products_list.cat")}
                                    <IoChevronDown
                                        className={clsx(
                                            "tw-stroke-black tw-transition-transform tw-duration-300",
                                            isCategoriesMenuOpen ? "" : "tw-rotate-180",
                                        )}
                                    />
                                </summary>
                                <RadioGroup
                                    aria-label={t("buyer_pages.products_list.cat")}
                                    className={"tw-flex tw-flex-col"}
                                    onChange={(e) => {
                                        queryParameters.delete("category");
                                        queryParameters.delete("sub-category");
                                        setQueryParameters(queryParameters);
                                        setSubCategoryFilter("");
                                        setCategoryFilter(e);
                                        fetchSubCategories(e);
                                    }}
                                >
                                    {categories.map((category) => {
                                        return (
                                            <Radio
                                                key={category.value}
                                                value={category.value}
                                            >
                                                {category.label}
                                            </Radio>
                                        );
                                    })}
                                </RadioGroup>
                            </details>
                            <hr className="my-2" />

                            <details
                                open={isSubCategoriesMenuOpen}
                                onClick={() => setIsSubCategoriesMenuOpen((v) => !v)}
                                className={
                                    "tw-outline-none tw-transition tw-duration-300 focus:tw-outline-none"
                                }
                            >
                                <summary
                                    className={
                                        "tw-flex tw-items-center tw-justify-between marker:tw-content-['']"
                                    }
                                >
                                    {t("buyer_pages.products_list.subcategory")}
                                    <IoChevronDown
                                        className={clsx(
                                            "tw-stroke-black tw-transition-transform tw-duration-300",
                                            isSubCategoriesMenuOpen
                                                ? ""
                                                : "tw-rotate-180",
                                        )}
                                    />
                                </summary>
                                <RadioGroup
                                    aria-label={t(
                                        "buyer_pages.products_list.subcategory",
                                    )}
                                    className={"tw-flex tw-flex-col"}
                                    onChange={(e) => {
                                        setSubCategoryFilter(e ?? "");
                                    }}
                                >
                                    {subCategories.map((category) => {
                                        return (
                                            <Radio
                                                key={category.value}
                                                value={category.value}
                                            >
                                                {category.label}
                                            </Radio>
                                        );
                                    })}
                                </RadioGroup>
                            </details>
                            <hr className="my-2" />

                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isClearable={true}
                                placeholder={`${t(
                                    "buyer_pages.products_list.select_brand",
                                )}`}
                                isSearchable={true}
                                name="brand"
                                options={brands}
                                styles={categoryStyles}
                                onChange={(e) => {
                                    queryParameters.delete("brand");
                                    setQueryParameters(queryParameters);
                                    setBrandFilter(e?.value || "");
                                }}
                            />
                            <hr className="my-2" />
                            <p className="store__filter-title d-flex align-items-center gap-1 tw-font-normal">
                                {/*<TbZoomMoney size="1.6rem" />*/}
                                {t("buyer_pages.products_list.range")}
                            </p>
                            <div className="position-relative">
                                <Slider
                                    className={"slider"}
                                    value={priceValues}
                                    min={MIN}
                                    max={MAX}
                                    onChange={(e) => {
                                        setPriceValues(e);
                                    }}
                                />
                                <div className="store__price-filter-min">
                                    {priceValues[0]} {t("sar")}
                                </div>
                                <div className="store__price-filter-max">
                                    {priceValues[1]} {t("sar")}
                                </div>
                            </div>
                            <hr className="mt-5 mb-4" />
                            {/*<p className="store__filter-title d-flex align-items-center gap-1">*/}
                            {/*    /!*<TbCurrencyDollarOff size="1.6rem" />*!/*/}
                            {/*    {t("buyer_pages.products_list.sale")}*/}
                            {/*</p>*/}
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="sale"
                                    id="sale"
                                    checked={onSaleFilter}
                                    onChange={(e) => {
                                        setOnSaleFilter(e.target.checked);
                                    }}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="sale"
                                >
                                    {t("buyer_pages.products_list.product_sale")}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-8">
                        <div
                            className="store__sorting-menu py-2 tw-px-0"
                            style={{ border: "none" }}
                        >
                            <div className="d-flex align-items-center tw-gap-4">
                                <p className="mb-0 d-flex align-items-center gap-2 tw-text-nowrap">
                                    {/*<BsSortUpAlt size="1.25rem" />*/}
                                    {t("buyer_pages.products_list.sort")}
                                </p>
                                <select
                                    name="sort"
                                    className="form-control form-select store__sorting-select"
                                    defaultValue="alphabet_ascending"
                                    style={{
                                        borderRight: "1px solid #bbbbbb",
                                        borderRadius: "6px",
                                    }}
                                    onChange={(e) => setQuery(e.target.value)}
                                >
                                    <option value="name">
                                        {t("buyer_pages.products_list.al_az")}
                                    </option>
                                    <option value="-name">
                                        {t("buyer_pages.products_list.al_za")}
                                    </option>
                                    <option value="blended_price">
                                        {t("buyer_pages.products_list.pr_a")}
                                    </option>
                                    <option value="-blended_price">
                                        {t("buyer_pages.products_list.pr_d")}
                                    </option>
                                    <option value="created">
                                        {t("buyer_pages.products_list.da_a")}
                                    </option>
                                    <option value="-created">
                                        {t("buyer_pages.products_list.da_d")}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="tw-grid tw-grid-cols-2 tw-justify-start tw-gap-2 sm:tw-grid-cols-2 md:tw-grid-cols-3 xl:tw-grid-cols-4">
                            {productsList.length > 0 ? (
                                productsList.map((product) => {
                                    return (
                                        <ProductCart
                                            key={product.sku}
                                            product={product}
                                            cart={true}
                                            addToCart={addToCart}
                                            className={"tw-max-w-max"}
                                        />
                                    );
                                })
                            ) : (
                                <div className="col-12 py-5">
                                    <p className="text-center">
                                        {t("buyer_pages.home.none")}!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
};

const showFilterMenu = () => {
    const menu = document.querySelector(".store__filter-menu")! as HTMLElement;
    menu.style.display = "block";
};

const closeFilterMenu = () => {
    const menu = document.querySelector(".store__filter-menu")! as HTMLElement;
    menu.style.display = "none";
};

export default OurStore;
