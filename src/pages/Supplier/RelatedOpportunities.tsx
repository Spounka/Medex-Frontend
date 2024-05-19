import { useTranslation } from "react-i18next";
import { ColDef } from "ag-grid-community";
import {
    Button,
    Tab,
    TabList,
    TabPanel,
    Tabs,
    Tooltip,
    TooltipTrigger,
} from "react-aria-components";
import Container from "../../components/ui/container";
import { AgGridReact } from "ag-grid-react";
import { AG_GRID_LOCALE_AR } from "../../utils/AG-Localization/ar.ts";
import { AG_GRID_LOCALE_EN } from "../../utils/AG-Localization/en.ts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PaginatedResult } from "@domain/paginatedResult.ts";
import { OpportunityDisplay } from "@domain/opportunity.ts";
import axios from "axios";
import { useContext, useRef } from "react";
import AuthContext from "../../context/AuthContext.tsx";

async function getOpportunities(access: string | null, page: string) {
    const url = page ? page : `${import.meta.env.VITE_BACKEND_URL}/api/opportunity/?l=50`;
    const response = await axios.get<PaginatedResult<OpportunityDisplay>>(url, {
        headers: access ? { Authorization: `Bearer ${access}` } : {},
    });
    return response.data;
}

function RelatedOpportunities() {
    const { i18n } = useTranslation();
    const { user, authTokens } = useContext(AuthContext);
    const nextPage = useRef<string>("");
    const prevPage = useRef<string>("");
    const currentPage = useRef<string>("");

    const opportunityQuery = useInfiniteQuery({
        queryFn: async () => getOpportunities(authTokens.access, currentPage.current),
        queryKey: ["opportunities", "page", currentPage.current],
        enabled: authTokens.access !== "",
        initialPageParam: "",
        getNextPageParam: (next, page) => {
            nextPage.current = next.next ?? "";
            return next.next;
        },
        getPreviousPageParam: (previous, page) => {
            prevPage.current = previous.previous ?? "";
            return previous.previous;
        },
    });
    console.log(user?.user_id);

    const columnDefs: ColDef[] = [
        {
            field: "id",
            headerName: "ID",
            minWidth: 80,
            flex: -1,
        },
        {
            field: "title",
            headerName: "Title",
            minWidth: 110,
            cellRenderer: (params) => {
                return (
                    <TooltipTrigger
                        delay={1}
                        closeDelay={1}
                    >
                        <Button className={"tw-max-w-[15ch]"}>{params.data.title}</Button>
                        <Tooltip
                            placement={"bottom"}
                            className={"tw-max-w-[35ch] tw-rounded-md tw-bg-white tw-p-1"}
                        >
                            {params.data.title}
                        </Tooltip>
                    </TooltipTrigger>
                );
            },
        },
        {
            field: "user",
            headerName: "Client",
            minWidth: 90,
            cellRenderer: (params) => {
                return <p>{params.data.user.full_name}</p>;
            },
        },
        {
            field: "delivery_date_display",
            headerName: "Delivery Date",
            minWidth: 120,
            flex: 1,
        },
        {
            field: "payment_days",
            headerName: "Payment Days",
            minWidth: 110,
        },
        {
            field: "payment_method_display",
            headerName: "Payment Method",
            minWidth: 110,
        },
        {
            field: "value_display",
            headerName: "Value",
            minWidth: 110,
        },
        // {
        //     flex: 0,
        //     maxWidth: 180,
        //     field: "actions",
        //     cellStyle: {
        //         display: "flex",
        //         alignItems: "center",
        //         padding: "2.0rem 1.5rem",
        //     },
        //     cellRenderer: (params) => {
        //         return (
        //             <DialogTrigger>
        //                 <Button
        //                     className={
        //                         "tw-h-fit tw-w-fit tw-rounded-md tw-bg-black tw-px-2 tw-py-0 tw-text-center tw-text-white"
        //                     }
        //                 >
        //                     View Details
        //                 </Button>
        //                 <Modal>
        //                     <Dialog
        //                         className={
        //                             "tw-min-w-screen tw-absolute tw-left-1/2 tw-top-1/2 tw-m-4 tw-flex tw-h-fit tw-max-h-screen tw-w-full -tw-translate-x-1/2 -tw-translate-y-1/2 tw-flex-col tw-gap-4 tw-rounded-md tw-bg-white tw-p-4 tw-outline-none lg:tw-max-h-[50dvh] lg:tw-max-w-[25dvw]"
        //                         }
        //                     >
        //                         {({ close }) => {
        //                             return (
        //                                 <>
        //                                     <p>{params.data.title}</p>
        //                                     <div className="tw-flex tw-flex-col tw-gap-3">
        //                                         <p>Suppliers: </p>
        //
        //                                         <div className="tw-flex tw-gap-2 tw-font-light tw-text-purple">
        //                                             {params.data.suppliers.map(
        //                                                 (supplier: ThreadUser) => {
        //                                                     return (
        //                                                         <p key={supplier.id}>
        //                                                             {supplier.full_name}
        //                                                         </p>
        //                                                     );
        //                                                 },
        //                                             )}
        //                                         </div>
        //                                     </div>
        //                                     <p>
        //                                         {`Date Created: ${new Date(params.data.created).toDateString()}`}
        //                                     </p>
        //                                     <Button
        //                                         className={
        //                                             "tw-w-fit tw-self-end tw-rounded-md tw-bg-none tw-px-4 tw-py-1 tw-outline tw-outline-1 tw-outline-black"
        //                                         }
        //                                         onPress={close}
        //                                     >
        //                                         Close
        //                                     </Button>
        //                                 </>
        //                             );
        //                         }}
        //                     </Dialog>
        //                 </Modal>
        //             </DialogTrigger>
        //         );
        //     },
        // },
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
                        <Tab
                            className={"react-aria-Tab tw-cursor-pointer tw-outline-none"}
                            id={"all"}
                        >
                            All Opportunities
                        </Tab>
                        <Tab
                            className={"react-aria-Tab tw-cursor-pointer tw-outline-none"}
                            id={"for-me"}
                        >
                            For Me
                        </Tab>
                    </TabList>
                    <TabPanel id={"all"}>
                        <div
                            className="ag-theme-material mt-3 mb-5 tw-w-full tw-flex-1"
                            style={{ height: 500 }}
                        >
                            <AgGridReact
                                rowData={
                                    opportunityQuery.data?.pages[
                                        opportunityQuery.data.pages.length - 1
                                    ]?.results
                                }
                                columnDefs={columnDefs}
                                localeText={
                                    i18n.language === "ar"
                                        ? AG_GRID_LOCALE_AR
                                        : AG_GRID_LOCALE_EN
                                }
                                enableRtl={i18n.language === "ar"}
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
                                rowData={opportunityQuery.data?.pages[
                                    opportunityQuery.data.pages.length - 1
                                ]?.results.filter((opportunity) => {
                                    return opportunity.suppliers?.some(
                                        (supplier) => supplier.id === user?.user_id,
                                    );
                                })}
                                columnDefs={columnDefs}
                                localeText={
                                    i18n.language === "ar"
                                        ? AG_GRID_LOCALE_AR
                                        : AG_GRID_LOCALE_EN
                                }
                                enableRtl={i18n.language === "ar"}
                                pagination={true}
                                paginationPageSize={50}
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
