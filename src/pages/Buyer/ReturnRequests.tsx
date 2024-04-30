import { useTranslation } from "react-i18next";

import useAxios from "../../utils/useAxios";
import { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";

import { TbTruckReturn } from "react-icons/tb";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbChevronLeftPipe, TbChevronRightPipe } from "react-icons/tb";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import { AG_GRID_LOCALE_AR } from "../../utils/AG-Localization/ar.js";
import { AG_GRID_LOCALE_EN } from "../../utils/AG-Localization/en.js";

const ReturnRequests = () => {
    const { t, i18n } = useTranslation();

    const gridRef = useRef();

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const api = useAxios();

    const [rowData, setRowData] = useState([]);

    const columnDefs = [
        {
            field: "product.product.sku",
            headerName: "# " + t("buyer_pages.order_history.id"),
            cellRenderer: (params) => {
                return (
                    <Link
                        to={`/products/${params.data.product.product.sku}`}
                        state={{
                            product: params.data.product.product,
                        }}
                    >
                        {params.data.product.product.sku}
                    </Link>
                );
            },
            checkboxSelection: true,
            headerCheckboxSelection: true,
        },
        {
            field: "product.product.name",
            headerName: t("buyer_pages.cart.product"),
            cellRenderer: (params) => {
                const url = params.data.product.product.thumbnail;
                const productName = params.data.product.product.name;

                return (
                    <Link
                        to={`/products/${params.data.product.product.sku}`}
                        state={{
                            product: params.data.product.product,
                        }}
                    >
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
                    </Link>
                );
            },
        },
        {
            field: "product.quantity",
            headerName: t("buyer_pages.cart.qty"),
            filter: "agNumberColumnFilter",
        },
        {
            field: "product.total_price",
            headerName: t("buyer_pages.cart.total"),
            filter: "agNumberColumnFilter",
            valueFormatter: (params) => `${params.data.product.total_price} ${t("sar")}`,
        },
        {
            field: "product.created_date",
            headerName: t("buyer_pages.order_history.date"),
            valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
            filter: "agDateColumnFilter",
        },
        {
            field: "created_date",
            headerName: t("buyer_pages.return_request.date"),
            valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
            filter: "agDateColumnFilter",
        },
        {
            field: "details",
            headerName: t("buyer_pages.return_request.details"),
            cellRenderer: (params) => {
                return (
                    <Link
                        className="btn btn-primary"
                        to={`${params.data.id}`}
                        state={params.data}
                        style={{ fontSize: ".63rem" }}
                    >
                        {t("buyer_pages.return_request.details")}
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

    const getReturnRequests = async () => {
        await api
            .get(import.meta.env.VITE_BACKEND_URL + "/api/order/return/list/")
            .then((res) => {
                setTotalPages(Math.ceil(res.data.count / 10));
                setRowData(res.data.results);
            });
    };

    useEffect(() => {
        getReturnRequests();
    }, [currentPage]);

    return (
        <main className="container">
            <section className="py-3">
                <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                    {t("buyer_sidebar.return")}
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
                            i18n.language === "ar" ? AG_GRID_LOCALE_AR : AG_GRID_LOCALE_EN
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
                                    currentPage === 1 && "dashboard__pagination-disabled"
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
            </section>
        </main>
    );
};

export default ReturnRequests;
