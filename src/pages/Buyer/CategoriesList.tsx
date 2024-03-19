import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiCategoryAlt, BiCategory } from "react-icons/bi";
import axios from "axios";

import { useTranslation } from "react-i18next";

const CategoriesList = () => {
    const { t } = useTranslation();

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({});

    const getCategories = async () => {
        const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/product/category?level=0`,
        );
        setCategories(res.data);
        setSelectedCategory(res.data[0]);
    };

    const getSubCategories = async () => {
        const res = await axios.get(
            `${
                import.meta.env.VITE_BACKEND_URL
            }/api/product/category?level=1&parent=${selectedCategory.slug}`,
        );
        setSubCategories(res.data);
    };

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        getSubCategories();
    }, [selectedCategory]);

    return (
        <main>
            <section className="py-4 d-none d-md-block">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-4">
                            <h3 className="home__sections-title fw-bolder d-flex align-items-center gap-2 text-dark">
                                <BiCategoryAlt size="2rem" />
                                {t("buyer_pages.categories_list.all")}
                            </h3>
                            <hr />
                            <div
                                className="list-group"
                                id="list-tab"
                                role="tablist"
                            >
                                {categories.length > 0 ? (
                                    categories.map((cat) => (
                                        <Link
                                            className={`list-group-item list-group-item-action category__sections-link ${
                                                selectedCategory.slug == cat.slug
                                                    ? "active"
                                                    : ""
                                            }`}
                                            id={`list-${cat.slug}-list`}
                                            data-bs-toggle="list"
                                            to={`#list-${cat.slug}`}
                                            role="tab"
                                            aria-controls={`list-${cat.slug}`}
                                            key={cat.slug}
                                            onClick={() => setSelectedCategory(cat)}
                                        >
                                            {cat.name}
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-center">
                                        {t("buyer_pages.categories_list.none")}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="col-8">
                            <h3 className="home__sections-title fw-bolder d-flex align-items-center gap-2  text-dark">
                                <BiCategory size="2rem" />
                                All &ldquo;
                                {selectedCategory.name?.toLocaleUpperCase()}
                                &rdquo; {t("buyer_pages.categories_list.subcategories")}
                            </h3>
                            <hr />
                            <div
                                className="tab-content"
                                id="nav-tabContent"
                            >
                                {categories.length > 0 &&
                                    categories.map((cat) => (
                                        <div
                                            className={`tab-pane fade ${
                                                selectedCategory.slug == cat.slug
                                                    ? "active show"
                                                    : ""
                                            }`}
                                            id={`list-${cat.slug}`}
                                            role="tabpanel"
                                            aria-labelledby={`list-${cat.slug}-list`}
                                            key={cat.slug}
                                        >
                                            {subCategories.length > 0 &&
                                                subCategories.map((subCat) => (
                                                    <Link
                                                        to={`/products?category=${selectedCategory.slug}&sub-category=${subCat.slug}`}
                                                        className="col-6 col-md-3 my-2"
                                                        key={subCat.id}
                                                    >
                                                        <div className="card shadow d-flex flex-column gap-3 align-items-center justify-content-center categories__card py-3">
                                                            <img
                                                                src={
                                                                    import.meta.env
                                                                        .VITE_BACKEND_URL +
                                                                    subCat.image
                                                                }
                                                                alt="subCategory"
                                                                className="img-fluid px-3"
                                                            />
                                                            {subCat.name}
                                                        </div>
                                                    </Link>
                                                ))}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {categories.length > 0 && (
                <section className="py-4 d-block d-md-none">
                    <div className="container-xxl">
                        <div className="row d-flex align-items-end">
                            <div className="col-5">
                                <h6 className="category__sections-title fw-bolder d-flex align-items-center gap-2">
                                    <BiCategoryAlt size="1rem" />
                                    {t("buyer_pages.categories_list.all")}
                                </h6>
                                <hr />
                            </div>
                            <div className="col-7">
                                <h6 className="category__sections-title fw-bolder d-flex align-items-center gap-2">
                                    <BiCategory size="1rem" />
                                    All &ldquo;
                                    {selectedCategory.name?.toLocaleUpperCase()}
                                    &rdquo;{" "}
                                    {t("buyer_pages.categories_list.subcategories")}
                                </h6>
                                <hr />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5">
                                <div
                                    className="list-group"
                                    id="list-tab"
                                    role="tablist"
                                >
                                    {categories.length > 0 ? (
                                        categories.map((cat) => (
                                            <Link
                                                className={`list-group-item list-group-item-action category__sections-text category__sections-link ${
                                                    selectedCategory.slug == cat.slug
                                                        ? "active"
                                                        : ""
                                                }`}
                                                id={`list-${cat.slug}-list`}
                                                data-bs-toggle="list"
                                                to={`#list-${cat.slug}`}
                                                role="tab"
                                                aria-controls={`list-${cat.slug}`}
                                                key={cat.slug}
                                                onClick={() => setSelectedCategory(cat)}
                                            >
                                                {cat.name}
                                            </Link>
                                        ))
                                    ) : (
                                        <p className="text-center">
                                            {t("buyer_pages.categories_list.none")}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="col-7">
                                <div
                                    className="tab-content"
                                    id="nav-tabContent"
                                >
                                    {categories.length > 0 &&
                                        categories.map((cat) => (
                                            <div
                                                className={`tab-pane fade ${
                                                    selectedCategory.slug == cat.slug
                                                        ? "active show"
                                                        : ""
                                                }`}
                                                id={`list-${cat.slug}`}
                                                role="tabpanel"
                                                aria-labelledby={`list-${cat.slug}-list`}
                                                key={cat.slug}
                                            >
                                                {subCategories.length > 0 &&
                                                    subCategories.map((subCat) => (
                                                        <Link
                                                            to={`/products?category=${selectedCategory.slug}&sub-category=${subCat.slug}`}
                                                            className="col-4 col-md-3 my-2 category__sections-text"
                                                            key={subCat.id}
                                                        >
                                                            <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                                                                <img
                                                                    src={
                                                                        import.meta.env
                                                                            .VITE_BACKEND_URL +
                                                                        subCat.image
                                                                    }
                                                                    alt="subCategory"
                                                                    className="category__sections-img rounded shadow-sm"
                                                                />
                                                                {subCat.name}
                                                            </div>
                                                        </Link>
                                                    ))}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
};

export default CategoriesList;
