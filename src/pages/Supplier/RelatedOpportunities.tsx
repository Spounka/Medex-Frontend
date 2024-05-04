import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
    Button,
    Calendar,
    CalendarCell,
    CalendarGrid,
    DateInput,
    DatePicker,
    DateSegment,
    Dialog,
    DialogTrigger,
    Group,
    Heading,
    Label,
    Modal,
    Popover,
    Tab,
    TabList,
    TabPanel,
    Tabs,
    TextArea,
    TextField,
} from "react-aria-components";
import Container from "../../components/ui/container";
import Select from "react-select";
import { toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import { AG_GRID_LOCALE_AR } from "../../utils/AG-Localization/ar.ts";
import { AG_GRID_LOCALE_EN } from "../../utils/AG-Localization/en.ts";

function RelatedOpportunities() {
    const { t, i18n } = useTranslation();
    const rowData = [
        //generate dummy offer data
        {
            id: 1,
            code: "Opportunity-001",
            client: "John Doe",
            date: "2020-01-01",
            total: "$100",
        },
        {
            id: 1,
            code: "Opportunity-002",
            client: "John Doe",
            date: "2020-01-01",
            total: "$100",
        },
        {
            id: 1,
            code: "Opportunity-003",
            client: "John Doe",
            date: "2020-01-01",
            total: "$100",
        },
        {
            id: 1,
            code: "Opportunity-004",
            client: "John Doe",
            date: "2020-01-01",
            total: "$100",
        },
        {
            id: 1,
            code: "Opportunity-005",
            client: "John Doe",
            date: "2020-01-01",
            total: "$100",
        },
    ];
    const rowDataForMe = [
        //generate dummy offer data
        {
            id: 1,
            code: "Opportunity-001",
            client: "John Doe",
            date: "2020-01-01",
            total: "$100",
        },
        {
            id: 1,
            code: "Opportunity-002",
            client: "John Doe",
            date: "2020-01-01",
            total: "$100",
        },
        {
            id: 1,
            code: "Opportunity-003",
            client: "John Doe",
            date: "2020-01-01",
            total: "$100",
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
            flex: 0,
            maxWidth: 180,
            field: "actions",
            cellRenderer: (params) => {
                return (
                    <Link
                        className={
                            "tw-max-h-fit tw-w-full tw-bg-white tw-px-2 tw-py-0 tw-text-center tw-text-black"
                        }
                        to={`/account/dashboard/opportunities/${params.data.id}`}
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
            className="tw-flex tw-min-h-screen tw-w-full tw-gap-0 tw-pt-12 md:tw-pt-24 lg:tw-pt-32"
        >
            <div className="xl:tw-xl:flex-[0_0_20%] md:tw-flex-[0_0_17%] 2xl:tw-flex-[0_0_13%]"></div>
            <div className={"tw-flex tw-w-full tw-flex-col tw-items-start tw-gap-8"}>
                <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                    Invoices List
                </h2>

                <Tabs className={"tw-w-full"}>
                    <TabList
                        className={
                            "tw-flex tw-gap-4 tw-font-poppins tw-text-lg tw-font-light tw-text-gray-600"
                        }
                    >
                        <Tab className={"react-aria-Tab tw-outline-none tw-cursor-pointer"} id={"all"}>All Opportunities</Tab>
                        <Tab className={"react-aria-Tab tw-outline-none tw-cursor-pointer"} id={"for-me"}>For Me</Tab>
                    </TabList>
                    <TabPanel id={"all"}>
                        <div
                            className="ag-theme-material mt-3 mb-5 tw-w-full tw-flex-1"
                            style={{ height: 500 }}
                        >
                            <AgGridReact
                                rowData={rowData}
                                columnDefs={columnDefs}
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
                        </div>
                    </TabPanel>
                    <TabPanel id={"for-me"}>
                        <div
                            className="ag-theme-material mt-3 mb-5 tw-w-full tw-flex-1"
                            style={{ height: 500 }}
                        >
                            <AgGridReact
                                rowData={rowDataForMe}
                                columnDefs={columnDefs}
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
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </Container>
    );
}

export default RelatedOpportunities;
