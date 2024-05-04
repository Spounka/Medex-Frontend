import React, { useContext, useEffect, useState, useMemo, useRef } from "react";

import { Link } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

import useAxios from "../../utils/useAxios";

import { useTranslation } from "react-i18next";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbChevronLeftPipe, TbChevronRightPipe } from "react-icons/tb";
import { MdOutlineCancel } from "react-icons/md";
import { BiCheckDouble } from "react-icons/bi";

import { toast } from "react-toastify";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import { AG_GRID_LOCALE_AR } from "../../utils/AG-Localization/ar.ts";
import { AG_GRID_LOCALE_EN } from "../../utils/AG-Localization/en.ts";

const deleteProductHideOverlay = () => {
    const overlay = document.getElementById("dialog-container");
    overlay.classList.remove("d-flex");
    overlay.classList.add("d-none");
};

const ProductList: React.FC = () => {
    const { t, i18n } = useTranslation();

    const api = useAxios();

    const { user } = useContext(AuthContext);

    const gridRef = useRef();

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedProductSku, setSelectedProductSku] = useState("");

    const [rowData, setRowData] = useState([]);

    const deleteProductSubmit = async () => {
        await api
            .delete(import.meta.env.VITE_BACKEND_URL + "/api/product/delete", {
                data: {
                    user: user.user_id,
                    sku: selectedProductSku,
                },
            })
            .then(() => {
                toast.success(`${t("supplier_pages.product_details.del_ok")}!`);
                setSelectedProductSku("");
                deleteProductHideOverlay();
                getProducts();
            })
            .catch((err) => {
                toast.error(`${t("supplier_pages.product_details.del_err")}!`);
            });
    };

    const deleteProductShowOverlay = (sku: null) => {
        const overlay = document.getElementById("dialog-container");
        overlay.classList.add("d-flex");
        overlay.classList.remove("d-none");
        setSelectedProductSku(sku);
    };

    const columnDefs = [
        {
            field: "sku",
            headerName: "# " + t("buyer_pages.order_history.id"),
        },
        {
            field: "name",
            headerName: t("buyer_pages.cart.product"),
            cellRenderer: (params) => {
                const url = params.data.thumbnail;
                const productName = params.data.name;

                return (
                    <div className="d-flex align-items-center">
                        <img
                            src={url}
                            alt="Product Picture"
                            width={30}
                            height={30}
                            className={`rounded-circle object-contain ${i18n.language === "ar" ? "ms-2" : "me-2"}`}
                        />
                        <span className="text-truncate">{productName}</span>
                    </div>
                );
            },
        },
        {
            field: "category.name",
            headerName: t("product_form.category"),
        },
        {
            field: "brand.name",
            headerName: t("product_form.brand"),
        },
        {
            field: "price",
            headerName: t("product_form.price"),
            filter: "agNumberColumnFilter",
            valueGetter: (params) => parseFloat(params.data.price),
            cellRenderer: (params) => {
                const formattedPrice = `${params.value.toFixed(2)} ${t("sar")}`;
                return formattedPrice;
            },
            floatingFilter: true,
        },
        {
            field: "stock_quantity",
            headerName: t("product_form.stock"),
        },
        {
            field: "details",
            headerName: t("details"),
            cellRenderer: (params) => {
                return (
                    <Link
                        className="btn btn-primary"
                        to={`/supplier/products/${params.data.sku}`}
                        state={params.data}
                        style={{ fontSize: ".63rem" }}
                    >
                        {t("details")}
                    </Link>
                );
            },
        },
        {
            field: "actions",
            headerName: t("actions"),
            filter: null,
            minWidth: 250,
            cellRenderer: (params) => {
                return (
                    <div className="d-inline-flex gap-2 align-items-center h-100 fl">
                        <div>
                            <Link
                                className="btn btn-outline-primary"
                                to={`/supplier/products/update/${params.data.sku}`}
                                state={params.data}
                                style={{ fontSize: ".63rem" }}
                            >
                                {t("supplier_sidebar.update_product")}
                            </Link>
                        </div>
                        <div>
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => deleteProductShowOverlay(params.data.sku)}
                                style={{ fontSize: ".63rem" }}
                            >
                                {t("supplier_pages.product_details.del")}
                            </button>
                        </div>
                    </div>
                );
            },
        },
    ];

    const defaultColDef = useMemo(() => {
        return {
            filter: "agTextColumnFilter",
            floatingFilter: true,
            minWidth: 155,
            flex: 1,
        };
    }, []);

    const getProducts = async () => {
        await api
            .get(
                import.meta.env.VITE_BACKEND_URL +
                    `/api/product/product/?supplier=${
                        user?.parent ? user?.parent : user.user_id
                    }&pagination=${true}`,
            )
            .then((res) => {
                setTotalPages(Math.ceil(res.data.count / 10));
                setRowData(res.data.results.results);
            });
    };

    useEffect(() => {
        getProducts();
    }, [currentPage]);

    return (
        <main className="px-0 px-md-3">
            <section>
                <div className="container-fluid">
                    <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                        {t("supplier_pages.product_list.title")}
                    </h2>

                    <div className="my-5">
                        <div className="btn-group">
                            <button
                                type="button"
                                className="btn btn-primary btn-sm dropdown-toggle px-2"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {t("supplier_sidebar.create_product")}
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to="/supplier/products/create"
                                    >
                                        <small>
                                            {t("supplier_sidebar.create_product_form")}
                                        </small>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to="/supplier/products/excel-create"
                                    >
                                        <small>
                                            {t("supplier_sidebar.create_product_excel")}
                                        </small>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div
                        className="ag-theme-material mt-3 mb-5"
                        style={{ height: 500 }}
                    >
                        <AgGridReact
                            ref={gridRef}
                            rowData={rowData}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                            rowSelection="multiple"
                            suppressRowClickSelection={true}
                            localeText={
                                i18n.language === "ar"
                                    ? AG_GRID_LOCALE_AR
                                    : AG_GRID_LOCALE_EN
                            }
                            enableRtl={i18n.language === "ar" ? true : false}
                            pagination={true}
                            paginationPageSize={10}
                            suppressPaginationPanel={true}
                            tooltipShowDelay={100}
                        />
                        <div className="d-flex align-items-center justify-content-end py-2">
                            <div className="d-flex align-items-center justify-content-center gap-2">
                                <button
                                    className={`btn`}
                                    onClick={() => setCurrentPage(1)}
                                >
                                    <TbChevronLeftPipe size=".9rem" />
                                </button>
                                <button
                                    className={`btn ${
                                        currentPage === 1 &&
                                        "dashboard__pagination-disabled"
                                    }`}
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(() => currentPage - 1)}
                                >
                                    <IoIosArrowBack size=".9rem" />
                                </button>
                                <span className="text-muted">
                                    {t("buyer_pages.order_history.pagination", {
                                        c: currentPage,
                                        m: totalPages,
                                    })}
                                </span>
                                <button
                                    className={`btn ${
                                        currentPage === totalPages &&
                                        "dashboard__pagination-disabled"
                                    }`}
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(() => currentPage + 1)}
                                >
                                    <IoIosArrowForward size=".9rem" />
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => setCurrentPage(totalPages)}
                                >
                                    <TbChevronRightPipe size=".9rem" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className="overlay d-none justify-content-center align-items-center"
                        id="dialog-container"
                    >
                        <div className="popup">
                            <p>{t("supplier_pages.product_details.del_msg")}?</p>
                            <div className="d-flex justify-content-center gap-5 align-items-center mt-5">
                                <button
                                    className="btn btn-outline-primary px-5 d-flex align-items-center gap-2"
                                    id="cancel"
                                    onClick={deleteProductHideOverlay}
                                >
                                    {t("buyer_pages.profile.cancel")}
                                    <MdOutlineCancel size="1.4rem" />
                                </button>
                                <button
                                    className="btn btn-danger px-5 d-flex align-items-center gap-2"
                                    id="confirm"
                                    onClick={deleteProductSubmit}
                                >
                                    {t("buyer_pages.profile.del")}
                                    <BiCheckDouble size="1.4rem" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProductList;
