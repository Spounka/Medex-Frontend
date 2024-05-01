import React, { useContext, useEffect, useState, useMemo, useRef } from "react";

import { Link } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

import useAxios from "../../utils/useAxios";

import { useTranslation } from "react-i18next";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbChevronLeftPipe, TbChevronRightPipe } from "react-icons/tb";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import { AG_GRID_LOCALE_AR } from "../../utils/AG-Localization/ar.js";
import { AG_GRID_LOCALE_EN } from "../../utils/AG-Localization/en.js";

const ProductList: React.FC = (props) => {
    const { t, i18n } = useTranslation();

    const api = useAxios();

    const { user } = useContext(AuthContext);

    const gridRef = useRef();

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [rowData, setRowData] = useState([]);

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
    ];

    const defaultColDef = useMemo(() => {
        return {
            filter: "agTextColumnFilter",
            floatingFilter: true,
            minWidth: 135,
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
                console.log(res.data);

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
                </div>
            </section>
        </main>
    );
};

export default ProductList;
