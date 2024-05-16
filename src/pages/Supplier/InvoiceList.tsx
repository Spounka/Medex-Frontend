import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { AG_GRID_LOCALE_AR } from "../../utils/AG-Localization/ar";
import { AG_GRID_LOCALE_EN } from "../../utils/AG-Localization/en";
import Container from "../../components/ui/container";
import axios from "axios";
import { Invoice } from "@domain/invoice.ts";
import useAuthToken from "../../hooks/useAuthToken.tsx";
import { useQuery } from "@tanstack/react-query";
import { ColDef } from "ag-grid-community";

async function getInvoices(access: string) {
    const result = await axios.get<Invoice[]>(
        `${import.meta.env.VITE_BACKEND_URL}/api/quote/invoices/`,
        {
            headers: {
                Authorization: `Bearer ${access}`,
            },
        },
    );
    return result.data;
}

function InvoiceList(props) {
    const { t, i18n } = useTranslation();
    const { authTokens } = useAuthToken();
    const invoicesQuery = useQuery({
        queryFn: async () => getInvoices(authTokens.access),
        queryKey: ["invoices"],
        enabled: !!authTokens.access,
    });

    const columnDefs: ColDef[] = [
        {
            field: "invoice_id",
            headerName: "Invoice",
            minWidth: 110,
        },
        {
            field: "user",
            headerName: "Supplier",
            minWidth: 120,
            cellRenderer: (params) => {
                return <p>{params.data.user.full_name}</p>;
            },
        },
        {
            field: "user",
            headerName: "Email",
            minWidth: 120,
            cellRenderer: (params) => {
                return <p>{params.data.user.email}</p>;
            },
        },
        {
            field: "created",
            headerName: "Date",
            minWidth: 120,
            flex: 1,
            cellRenderer: (params) => {
                return <p>{new Date(params.data.created).toLocaleDateString()}</p>;
            },
        },
        {
            field: "delivery_date",
            headerName: "Delivery Date",
            minWidth: 120,
            flex: 1,
            cellRenderer: (params) => {
                return <p>{new Date(params.data.delivery_date).toLocaleDateString()}</p>;
            },
        },
        {
            field: "payment_type",
            headerName: "Payment Type",
            minWidth: 120,
            flex: 1,
            cellRenderer: (params) => {
                return <p>{params.data.payment_type}</p>;
            },
        },
        {
            field: "total",
            headerName: "Total",
            resizable: true,
            minWidth: 150,
            flex: 1,
            cellRenderer: (params) => {
                return <p>1000 {t("sar")}</p>;
            },
        },
        {
            field: "status",
            headerName: "Status",
            cellRenderer: (params) => {
                return (
                    <p className={"tw-flex tw-items-center tw-gap-1 tw-text-start "}>
                        {params.data.status === "A" && (
                            <span className="tw-h-2 tw-w-2 tw-rounded-full tw-bg-green"></span>
                        )}
                        {params.data.status === "P" && (
                            <span className="tw-h-2 tw-w-2 tw-rounded-full tw-bg-orange-400"></span>
                        )}
                        {params.data.status === "D" && (
                            <span className="tw-h-2 tw-w-2 tw-rounded-full tw-bg-red-700"></span>
                        )}
                        {params.data.status_display}
                    </p>
                );
            },
        },
        {
            flex: 0,
            maxWidth: 180,
            field: "actions",
            cellRenderer: (params) => {
                return (
                    <Link
                        className={
                            "tw-max-h-fit tw-w-full tw-bg-white tw-px-2 tw-py-0 tw-text-center tw-text-black"
                        }
                        to={`/account/dashboard/invoices/${params.data.id}`}
                    >
                        View Details
                    </Link>
                );
            },
        },
    ];
    return (
        <Container
            node={"section"}
            className="tw-flex tw-min-h-screen tw-gap-0 tw-pt-32"
        >
            <div className="tw-flex-[0_0_0%] md:tw-flex-[0_0_30%] lg:tw-flex-[0_0_22%] xl:tw-flex-[0_1_14%]"></div>
            <div className={"tw-flex-1"}>
                <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                    Invoices List
                </h2>

                <div
                    className="ag-theme-material mt-3 mb-5"
                    style={{ height: 500 }}
                >
                    <AgGridReact
                        rowData={invoicesQuery.data}
                        columnDefs={columnDefs}
                        localeText={
                            i18n.language === "ar" ? AG_GRID_LOCALE_AR : AG_GRID_LOCALE_EN
                        }
                        enableRtl={i18n.language === "ar" ? true : false}
                        pagination={true}
                        paginationPageSize={10}
                        suppressPaginationPanel={true}
                        tooltipShowDelay={100}
                    />
                </div>
            </div>
        </Container>
    );
}

export default InvoiceList;
