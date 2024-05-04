import { useState, useEffect, useRef, useMemo } from "react";

import { Link } from "react-router-dom";

import useAxios from "../../utils/useAxios";

import userImage from "../../assets/images/user.png";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbChevronLeftPipe, TbChevronRightPipe } from "react-icons/tb";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import { AG_GRID_LOCALE_AR } from "../../utils/AG-Localization/ar.ts";
import { AG_GRID_LOCALE_EN } from "../../utils/AG-Localization/en.ts";

import { useTranslation } from "react-i18next";

const OrderList = () => {
    const { t, i18n } = useTranslation();

    const gridRef = useRef();

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [rowData, setRowData] = useState([]);

    const columnDefs = [
        {
            field: "id",
            headerName: "# " + t("shared.wallet.id"),
        },
        {
            headerName: t("supplier_pages.update_product.buyer"),
            cellRenderer: (params) => {
                const url = params.data.user.profile.profile_picture
                    ? import.meta.env.VITE_BACKEND_URL +
                      params.data.user.profile.profile_picture
                    : userImage;
                const userName = params.data.user.full_name;

                return (
                    <div className="d-flex align-items-center">
                        <img
                            src={url}
                            alt="User Picture"
                            width={30}
                            height={30}
                            className={`rounded-circle object-contain ${i18n.language === "ar" ? "ms-2" : "me-2"}`}
                        />
                        <span className="text-truncate">{userName}</span>
                    </div>
                );
            },
        },
        {
            field: "product.name",
            headerName: t("buyer_pages.cart.product"),
            cellRenderer: (params) => {
                const url = params.data.product.thumbnail;
                const productName = params.data.product.name;

                return (
                    <Link
                        to={`/products/${params.data.product.sku}`}
                        state={{
                            product: params.data.product,
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
            field: "quantity",
            headerName: t("buyer_pages.cart.qty"),
            filter: "agNumberColumnFilter",
        },
        {
            field: "total_price",
            headerName: t("buyer_pages.cart.total"),
            filter: "agNumberColumnFilter",
            valueGetter: (params) => parseFloat(params.data.total_price),
            cellRenderer: (params) => {
                const formattedPrice = `${params.value.toFixed(2)} ${t("sar")}`;
                return formattedPrice;
            },
            floatingFilter: true,
        },
        {
            field: "shipping_status",
            headerName: t("supplier_pages.order_details.status"),
            cellRenderer: (params) => {
                const choices = {
                    OR: t("supplier_pages.order_details.ordered"),
                    P: t("supplier_pages.order_details.p"),
                    OTW: t("supplier_pages.order_details.otw"),
                    DE: t("supplier_pages.order_details.de"),
                };
                return (
                    <div className="h-100 d-flex align-items-center">
                        <div
                            className={`badge ${params.data.shipping_status !== "DE" ? "table__badge-pending" : "table__badge-success"}`}
                            style={{ fontSize: ".63rem" }}
                        >
                            {choices[params.data.shipping_status]}
                        </div>
                    </div>
                );
            },
        },
        {
            field: "created_date",
            headerName: t("buyer_pages.order_history.date"),
            valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
            filter: "agDateColumnFilter",
        },
        {
            field: "created_time",
            headerName: t("buyer_pages.order_history.time"),
            valueFormatter: (params) => {
                return params.value.substr(0, 5);
            },
            filter: null,
        },
        {
            field: "details",
            headerName: t("details"),
            cellRenderer: (params) => {
                return (
                    <Link
                        className="btn btn-primary"
                        to={`/supplier/sales/${params.data.id}`}
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

    const api = useAxios();

    const getOrderItems = async () => {
        await api
            .get(
                import.meta.env.VITE_BACKEND_URL +
                    `/api/order/orders/?p=${currentPage}&l=10`,
            )
            .then((res) => {
                setRowData(res.data.results.results);
                setTotalPages(Math.ceil(res.data.count / 10));
            });
    };

    useEffect(() => {
        getOrderItems();
    }, [currentPage]);

    return (
        <main className="px-0 px-md-3">
            <section>
                <div className="container-fluid">
                    <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                        {t("supplier_pages.sales_list.title")}
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

export default OrderList;
