import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { AG_GRID_LOCALE_AR } from "../../utils/AG-Localization/ar";
import { AG_GRID_LOCALE_EN } from "../../utils/AG-Localization/en";
import Container from "../../components/ui/container";

function InvoiceList(props) {
    const { t, i18n } = useTranslation();
    const rowData = [
        // generate invoice data
        {
            id: 1,
            client: "Client 01",
            code: "INV-0001",
            date: "12/12/2021",
            total: 250,
            status: "Paid",
        },
        {
            id: 2,
            client: "Client 01",
            code: "INV-0002",
            date: "03/12/2021",
            total: 250,
            status: "Pending",
        },
        {
            id: 3,
            client: "Client 01",
            code: "INV-0003",
            date: "08/12/2021",
            total: 250,
            status: "Pending",
        },
        {
            id: 4,
            client: "Client 01",
            code: "INV-0004",
            date: "05/10/2021",
            total: 250,
            status: "Pending",
        },
        {
            id: 5,
            client: "Client 01",
            code: "INV-0005",
            date: "01/12/2022",
            total: 250,
            status: "Pending",
        },
        {
            id: 6,
            client: "Client 01",
            code: "INV-0006",
            date: "11/12/2023",
            total: 250,
            status: "Pending",
        },
        {
            id: 7,
            client: "Client 01",
            code: "INV-0007",
            date: "12/12/2023",
            total: 250,
            status: "Pending",
        },
        {
            id: 8,
            client: "Client 01",
            code: "INV-0008",
            date: "12/12/2024",
            total: 250,
            status: "Cancelled",
        },
    ];
    const columnDefs = [
        {
            field: "code",
            headerName: "Code",
            minWidth: 110,
        },
        {
            field: "client",
            headerName: "Client",
            minWidth: 120,
        },
        {
            field: "date",
            headerName: "Date",
            minWidth: 120,
            flex: 1,
        },
        {
            field: "total",
            headerName: "Total",
            resizable: true,
            minWidth: 150,
            flex: 1,
        },
        {
            field: "status",
            headerName: "Status",
            cellRenderer: (params) => {
                return (
                    <p className={"tw-flex tw-items-center tw-gap-1 tw-text-start "}>
                        {params.data.status === "Paid" && (
                            <span className="tw-h-2 tw-w-2 tw-rounded-full tw-bg-green"></span>
                        )}
                        {params.data.status === "Pending" && (
                            <span className="tw-h-2 tw-w-2 tw-rounded-full tw-bg-orange-400"></span>
                        )}
                        {params.data.status === "Cancelled" && (
                            <span className="tw-h-2 tw-w-2 tw-rounded-full tw-bg-red-700"></span>
                        )}
                        {params.data.status}
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
                        to={`/supplier/invoices/${params.data.id}`}
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
                        rowData={rowData}
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
