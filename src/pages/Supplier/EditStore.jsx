import { useState, useEffect } from "react";
import useAxios from "../../utils/useAxios";

import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EditStore = () => {
    const api = useAxios();

    const { t } = useTranslation();

    const [categories, setCategories] = useState([]);

    const [products, setProducts] = useState([]);

    const [selectedCat, setSelectedCat] = useState("");
    const [isLoading, setLoading] = useState(false);

    const getUserCategories = async () => {
        await api
            .get(
                import.meta.env.VITE_BACKEND_URL +
                    "/api/product/private-categories/"
            )
            .then((res) => {
                if (res?.data?.private_categories) {
                    setCategories(res?.data?.private_categories);
                }
                if (res?.data?.products) {
                    setProducts(res?.data?.products);
                }
            });
    };

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        getUserCategories();
    }, []);

    return (
        <main className="px-0 px-md-3">
            <section>
                <div className="container-xxl">
                    <div className="main-body">
                        <div className="row pb-5">
                            <h2 className="d-flex align-items-center gap-2 dashboard__title mt-2">
                                {t("supplier_pages.edit_store.title")}
                            </h2>
                            <div className="col-lg-12 mt-3">
                                <div className="card border shadow">
                                    <div
                                        id="tab"
                                        className="card-body d-flex flex-column"
                                    >
                                        <div className="gap-3 d-flex flex-wrap justify-content-center">
                                            <button className="btn btn-primary">
                                                <Link
                                                    style={{ color: "white" }}
                                                    to="#createC"
                                                    data-bs-toggle="collapse"
                                                >
                                                    {t(
                                                        "supplier_pages.edit_store.add_cat"
                                                    )}
                                                </Link>
                                            </button>
                                            <button className="btn btn-primary">
                                                <Link
                                                    style={{ color: "white" }}
                                                    to="#addP"
                                                    data-bs-toggle="collapse"
                                                >
                                                    {t(
                                                        "supplier_pages.edit_store.manage_products"
                                                    )}
                                                </Link>
                                            </button>
                                            <button className="btn btn-danger">
                                                <Link
                                                    style={{ color: "white" }}
                                                    to="#removeC"
                                                    data-bs-toggle="collapse"
                                                >
                                                    {t(
                                                        "supplier_pages.edit_store.del_cat"
                                                    )}
                                                </Link>
                                            </button>
                                        </div>

                                        <div
                                            className="collapse"
                                            id="addP"
                                            data-bs-parent="#tab"
                                        >
                                            <form>
                                                <label
                                                    htmlFor="sel"
                                                    className="label-form mt-4"
                                                >
                                                    {t(
                                                        "supplier_pages.edit_store.select_cat"
                                                    )}
                                                </label>
                                                <select
                                                    id="sel"
                                                    className="form-select mt-3"
                                                    style={{
                                                        maxWidth: "700px",
                                                    }}
                                                    defaultValue={selectedCat}
                                                    onChange={(event) =>
                                                        setSelectedCat(
                                                            event.currentTarget
                                                                .value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        {t(
                                                            "supplier_pages.edit_store.select_cat"
                                                        )}
                                                    </option>
                                                    {categories.map((cat) => (
                                                        <option
                                                            key={cat.id}
                                                            value={cat.id}
                                                        >
                                                            {cat.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </form>
                                            {selectedCat !== "" && (
                                                <table className="table table-bordered mt-3">
                                                    <tbody>
                                                        {products.map(
                                                            (prod, index) => {
                                                                const selectedCategory =
                                                                    categories.find(
                                                                        (
                                                                            category
                                                                        ) => {
                                                                            return (
                                                                                parseInt(
                                                                                    category.id
                                                                                ) ===
                                                                                parseInt(
                                                                                    selectedCat
                                                                                )
                                                                            );
                                                                        }
                                                                    );

                                                                const isProductExisting =
                                                                    selectedCategory &&
                                                                    selectedCategory.products.some(
                                                                        (
                                                                            product
                                                                        ) =>
                                                                            product.sku ===
                                                                            prod.sku
                                                                    );

                                                                return (
                                                                    <tr
                                                                        className="d-flex justify-content-between"
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <td
                                                                            style={{
                                                                                borderLeft:
                                                                                    "none",
                                                                                borderRight:
                                                                                    "none",
                                                                            }}
                                                                        >
                                                                            {
                                                                                prod.name
                                                                            }
                                                                        </td>
                                                                        <td
                                                                            style={{
                                                                                borderLeft:
                                                                                    "none",
                                                                                borderRight:
                                                                                    "none",
                                                                            }}
                                                                        >
                                                                            <button
                                                                                className={`btn ${
                                                                                    isProductExisting
                                                                                        ? "btn-outline-danger"
                                                                                        : "btn-outline-primary"
                                                                                }`}
                                                                                disabled={
                                                                                    isLoading
                                                                                }
                                                                                id={
                                                                                    prod.sku
                                                                                }
                                                                                onClick={async (
                                                                                    e
                                                                                ) => {
                                                                                    setLoading(
                                                                                        true
                                                                                    );
                                                                                    await api
                                                                                        .post(
                                                                                            import.meta
                                                                                                .env
                                                                                                .VITE_BACKEND_URL +
                                                                                                "/api/product/private-categories/",
                                                                                            {
                                                                                                category_id:
                                                                                                    selectedCat,
                                                                                                product_id:
                                                                                                    e
                                                                                                        .target
                                                                                                        .id,
                                                                                                add: !isProductExisting,
                                                                                            }
                                                                                        )
                                                                                        .then(
                                                                                            () => {
                                                                                                toast.success(
                                                                                                    t(
                                                                                                        isProductExisting
                                                                                                            ? "supplier_pages.edit_store.product_delete_success"
                                                                                                            : "supplier_pages.edit_store.product_create_success"
                                                                                                    )
                                                                                                );
                                                                                                setLoading(
                                                                                                    false
                                                                                                );
                                                                                                getUserCategories();
                                                                                            }
                                                                                        )
                                                                                        .catch(
                                                                                            (
                                                                                                err
                                                                                            ) => {
                                                                                                toast.error(
                                                                                                    err
                                                                                                        ?.response
                                                                                                        ?.data
                                                                                                        ?.error
                                                                                                );
                                                                                                setLoading(
                                                                                                    false
                                                                                                );
                                                                                            }
                                                                                        );
                                                                                }}
                                                                            >
                                                                                {isProductExisting
                                                                                    ? t(
                                                                                          "supplier_pages.edit_store.rem_pro"
                                                                                      )
                                                                                    : t(
                                                                                          "supplier_pages.edit_store.add_pro"
                                                                                      )}
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            }
                                                        )}
                                                    </tbody>
                                                </table>
                                            )}
                                        </div>

                                        <div
                                            className="collapse"
                                            id="createC"
                                            data-bs-parent="#tab"
                                        >
                                            <form
                                                method="post"
                                                className="mt-3"
                                                onSubmit={handleSubmit(
                                                    async (data) => {
                                                        setLoading(true);
                                                        await api
                                                            .post(
                                                                import.meta.env
                                                                    .VITE_BACKEND_URL +
                                                                    "/api/product/private-categories/",
                                                                {
                                                                    categoryName:
                                                                        data.name,
                                                                }
                                                            )
                                                            .then(() => {
                                                                toast.success(
                                                                    t(
                                                                        "supplier_pages.edit_store.category_create_success"
                                                                    )
                                                                );

                                                                reset();
                                                                setLoading(
                                                                    false
                                                                );
                                                                getUserCategories();
                                                            })
                                                            .catch((err) => {
                                                                toast.error(
                                                                    err
                                                                        ?.response
                                                                        ?.data
                                                                        ?.error
                                                                );
                                                                setLoading(
                                                                    false
                                                                );
                                                            });
                                                    }
                                                )}
                                            >
                                                <label
                                                    className="form-label"
                                                    htmlFor="in"
                                                >
                                                    {t(
                                                        "supplier_pages.edit_store.add_cat"
                                                    )}
                                                </label>
                                                <input
                                                    {...register("name")}
                                                    id="in"
                                                    className="form-control"
                                                    placeholder={t(
                                                        "supplier_pages.edit_store.cat_placeholder"
                                                    )}
                                                    type="text"
                                                    style={{
                                                        borderRight:
                                                            "1px solid #cccccc",
                                                    }}
                                                />
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary mt-2"
                                                    disabled={isLoading}
                                                >
                                                    {isLoading
                                                        ? t(
                                                              "supplier_pages.edit_store.loading"
                                                          ) + " ..."
                                                        : t(
                                                              "supplier_pages.edit_store.add_cat"
                                                          )}
                                                </button>
                                            </form>
                                        </div>

                                        <div
                                            className="collapse"
                                            id="removeC"
                                            data-bs-parent="#tab"
                                        >
                                            <table className="table table-bordered mt-3">
                                                <tbody>
                                                    {categories.map(
                                                        (cat, index) => (
                                                            <tr
                                                                className="d-flex justify-content-between"
                                                                key={index}
                                                            >
                                                                <td
                                                                    style={{
                                                                        borderLeft:
                                                                            "none",
                                                                        borderRight:
                                                                            "none",
                                                                    }}
                                                                >
                                                                    {cat.name}
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        borderLeft:
                                                                            "none",
                                                                        borderRight:
                                                                            "none",
                                                                    }}
                                                                >
                                                                    <button
                                                                        className="btn btn-outline-danger"
                                                                        disabled={
                                                                            isLoading
                                                                        }
                                                                        id={
                                                                            cat.id
                                                                        }
                                                                        onClick={async (
                                                                            e
                                                                        ) => {
                                                                            setLoading(
                                                                                true
                                                                            );
                                                                            const categoryID =
                                                                                e
                                                                                    ?.target
                                                                                    ?.id;

                                                                            await api
                                                                                .delete(
                                                                                    import.meta
                                                                                        .env
                                                                                        .VITE_BACKEND_URL +
                                                                                        `/api/product/private-categories/`,
                                                                                    {
                                                                                        data: {
                                                                                            categoryID,
                                                                                        },
                                                                                    }
                                                                                )
                                                                                .then(
                                                                                    () => {
                                                                                        toast.success(
                                                                                            t(
                                                                                                "supplier_pages.edit_store.category_delete_success"
                                                                                            )
                                                                                        );
                                                                                        setLoading(
                                                                                            false
                                                                                        );

                                                                                        getUserCategories();
                                                                                    }
                                                                                )
                                                                                .catch(
                                                                                    (
                                                                                        err
                                                                                    ) => {
                                                                                        toast.error(
                                                                                            err
                                                                                                ?.response
                                                                                                ?.data
                                                                                                ?.error
                                                                                        );
                                                                                        setLoading(
                                                                                            false
                                                                                        );
                                                                                    }
                                                                                );
                                                                        }}
                                                                    >
                                                                        {t(
                                                                            "supplier_pages.edit_store.rem_cat"
                                                                        )}
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default EditStore;
