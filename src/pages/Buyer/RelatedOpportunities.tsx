import React, { FormEvent, useContext, useRef } from "react";
import Container from "../../components/ui/container";
import { AG_GRID_LOCALE_AR } from "../../utils/AG-Localization/ar";
import { useTranslation } from "react-i18next";
import { AgGridReact } from "ag-grid-react";
import { AG_GRID_LOCALE_EN } from "../../utils/AG-Localization/en";
import { ColDef } from "ag-grid-community";
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
    Input,
    Label,
    Modal,
    Popover,
    TextArea,
    TextField,
    Tooltip,
    TooltipTrigger,
} from "react-aria-components";
import Select from "react-select";
import { toast } from "react-toastify";
import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { PaginatedResult } from "@domain/paginatedResult.ts";
import { OpportunityCreate, OpportunityDisplay } from "@domain/opportunity.ts";
import { ThreadUser } from "@domain/thread.ts";
import AuthContext from "../../context/AuthContext.tsx";

async function getOpportunities(access: string | null, page: string) {
    const url = page ? page : `${import.meta.env.VITE_BACKEND_URL}/api/opportunity/?l=50`;
    const response = await axios.get<PaginatedResult<OpportunityDisplay>>(url, {
        headers: access ? { Authorization: `Bearer ${access}` } : {},
    });
    return response.data;
}

async function createOpportunity(opportunity: OpportunityCreate, access: string) {
    const json = JSON.stringify(opportunity);
    console.info(json);
    return await axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/opportunity/create/`, json, {
            headers: {
                Authorization: `Bearer ${access}`,
            },
        })
        .catch((e) => console.error(e));
}

function RelatedOpportunities(props) {
    const { t, i18n } = useTranslation();
    const { user, authTokens } = useContext(AuthContext);
    const nextPage = useRef<string>("");
    const prevPage = useRef<string>("");
    const currentPage = useRef<string>("");

    const getUser = async () => {
        return await axios.get<ThreadUser>(
            `${import.meta.env.VITE_BACKEND_URL}/api/account/profile/`,
            {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                },
            },
        );
    };
    const userQuery = useQuery({
        queryFn: async () => getUser(),
        queryKey: ["users", user?.user_id],
    });

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
    const opportunityMutation = useMutation({
        mutationFn: (opportunity: OpportunityCreate) =>
            createOpportunity(opportunity, authTokens.access),
        mutationKey: ["opportunity", "create"],
    });

    const fetchNextPage = async () => {
        await opportunityQuery.fetchNextPage();
        currentPage.current = nextPage.current;
    };
    const fetchPreviousPage = async () => {
        await opportunityQuery.fetchPreviousPage();
        currentPage.current = prevPage.current;
    };
    const queryClient = useQueryClient();

    function createOpportunityEvent(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const opportunity: OpportunityCreate = {};
        opportunity.opportunity_value = "VS";
        opportunity.title = formData.get("title")?.toString() ?? "";
        opportunity.tags = formData.get("tags")?.toString().split(",") ?? [];
        opportunity.target_suppliers = [];
        opportunity.delivery_date = formData.get("delivery_date")?.toString() ?? "";
        opportunity.payment_days = formData.get("payment_days")?.toString() ?? "";
        opportunity.payment_method = "DIV";
        opportunity.user = userQuery.data?.data;
        opportunity.delivery_address = userQuery.data?.data?.shipping_address;
        opportunityMutation.mutate(opportunity);
        queryClient.invalidateQueries(["opportunities"]);
    }

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
        {
            flex: 0,
            maxWidth: 180,
            field: "actions",
            cellStyle: {
                display: "flex",
                alignItems: "center",
                padding: "2.0rem 1.5rem",
            },
            cellRenderer: (params) => {
                return (
                    <DialogTrigger>
                        <Button
                            className={
                                "tw-h-fit tw-w-fit tw-rounded-md tw-bg-black tw-px-2 tw-py-0 tw-text-center tw-text-white"
                            }
                        >
                            View Details
                        </Button>
                        <Modal>
                            <Dialog
                                className={
                                    "tw-min-w-screen tw-absolute tw-left-1/2 tw-top-1/2 tw-m-4 tw-flex tw-h-fit tw-max-h-screen tw-w-full -tw-translate-x-1/2 -tw-translate-y-1/2 tw-flex-col tw-gap-4 tw-rounded-md tw-bg-white tw-p-4 tw-outline-none lg:tw-max-h-[50dvh] lg:tw-max-w-[25dvw]"
                                }
                            >
                                {({ close }) => {
                                    return (
                                        <>
                                            <p>{params.data.title}</p>
                                            <div className="tw-flex tw-flex-col tw-gap-3">
                                                <p>Suppliers: </p>

                                                <div className="tw-flex tw-gap-2 tw-font-light tw-text-purple">
                                                    {params.data.suppliers.map(
                                                        (supplier: ThreadUser) => {
                                                            return (
                                                                <p key={supplier.id}>
                                                                    {supplier.full_name}
                                                                </p>
                                                            );
                                                        },
                                                    )}
                                                </div>
                                            </div>
                                            <p>
                                                {`Date Created: ${new Date(params.data.created).toDateString()}`}
                                            </p>
                                            <Button
                                                className={
                                                    "tw-w-fit tw-self-end tw-rounded-md tw-bg-none tw-px-4 tw-py-1 tw-outline tw-outline-1 tw-outline-black"
                                                }
                                                onPress={close}
                                            >
                                                Close
                                            </Button>
                                        </>
                                    );
                                }}
                            </Dialog>
                        </Modal>
                    </DialogTrigger>
                );
            },
        },
    ];
    if (!opportunityQuery.data) {
        return <>Loading</>;
    }
    return (
        <Container
            node={"section"}
            className="tw-flex tw-min-h-screen tw-w-full tw-gap-0 tw-pt-4"
        >
            <div className={"tw-flex tw-w-full tw-flex-col tw-items-start tw-gap-8"}>
                <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                    Invoices List
                </h2>

                <DialogTrigger>
                    <Button
                        className={
                            "tw-rounded-md tw-bg-black tw-px-4 tw-py-2 tw-font-poppins tw-font-normal tw-text-white"
                        }
                    >
                        New opportunity
                    </Button>
                    <Modal>
                        <Dialog
                            role="alertdialog"
                            className={
                                "react-aria-Dialog tw-top-[50%] tw-h-dvh tw-w-screen lg:tw-top-[50%] lg:tw-h-max lg:tw-min-h-[25svh] lg:tw-w-[25svw]"
                            }
                        >
                            {({ close }) => (
                                <form
                                    onSubmit={createOpportunityEvent}
                                    className={
                                        "tw-flex tw-h-full tw-flex-col tw-gap-6 tw-pt-[15svh] lg:tw-pt-0"
                                    }
                                >
                                    <Heading>Create Opportunity</Heading>
                                    <TextField
                                        name={"title"}
                                        type={"text"}
                                        className={"tw-flex tw-flex-col tw-gap-1 tw-p-0"}
                                    >
                                        <Label>Opportunity Title</Label>
                                        <TextArea
                                            className={
                                                "tw-rounded-sm tw-bg-gray-100 tw-p-4 focus:tw-outline-purple"
                                            }
                                            placeholder={"Title..."}
                                        />
                                    </TextField>
                                    <Select
                                        name={"target_suppliers"}
                                        placeholder={"Select visibility option"}
                                        options={[
                                            { value: "all", label: "Public Opportunity" },
                                            {
                                                value: "sup",
                                                label: "Supplier",
                                            },
                                            {
                                                value: "t",
                                                label: "t",
                                            },
                                        ]}
                                    />
                                    <TextField
                                        name={"payment_days"}
                                        type={"text"}
                                        className={"tw-flex tw-flex-col tw-gap-1 tw-p-0"}
                                    >
                                        <Label>Payment Days</Label>
                                        <Input
                                            className={
                                                "tw-rounded-sm tw-bg-gray-100 tw-p-4 focus:tw-outline-purple"
                                            }
                                            placeholder={"1-5"}
                                        />
                                    </TextField>
                                    <DatePicker
                                        name={"delivery_date"}
                                        className={"tw-flex tw-flex-col tw-gap-2"}
                                    >
                                        <Label
                                            className={
                                                "tw-font-sm tw-font-poppins tw-font-light tw-text-gray-400"
                                            }
                                        >
                                            Date
                                        </Label>
                                        <Group
                                            className={
                                                "tw-flex tw-w-full tw-gap-4 tw-rounded-md tw-border tw-border-purple tw-px-2 lg:tw-w-fit"
                                            }
                                        >
                                            <DateInput className={"tw-flex tw-flex-1"}>
                                                {(segment) => (
                                                    <DateSegment segment={segment} />
                                                )}
                                            </DateInput>
                                            <Button className={"tw-text-purple"}>
                                                ▼
                                            </Button>
                                        </Group>
                                        <Popover>
                                            <Dialog
                                                className={
                                                    "tw-w-full tw-min-w-[65svw] tw-rounded-md tw-bg-white tw-px-4 tw-py-2 tw-shadow-sm lg:tw-min-w-[20svw]"
                                                }
                                            >
                                                <Calendar
                                                    className={
                                                        "tw-flex tw-w-full tw-flex-col tw-gap-4"
                                                    }
                                                >
                                                    <header
                                                        className={
                                                            "tw-flex tw-items-center tw-justify-between tw-gap-4 tw-align-middle"
                                                        }
                                                    >
                                                        <Button slot="previous">
                                                            ◀
                                                        </Button>
                                                        <Heading
                                                            className={
                                                                "react-aria-Heading tw-font-algreya tw-text-lg"
                                                            }
                                                        />
                                                        <Button slot="next">▶</Button>
                                                    </header>
                                                    <CalendarGrid className={"tw-w-full"}>
                                                        {(date) => (
                                                            <CalendarCell date={date} />
                                                        )}
                                                    </CalendarGrid>
                                                </Calendar>
                                            </Dialog>
                                        </Popover>
                                    </DatePicker>

                                    <div
                                        className={
                                            "tw-flex tw-w-full tw-justify-end tw-gap-2"
                                        }
                                    >
                                        <Button
                                            type={"submit"}
                                            className={
                                                "tw-rounded-md tw-bg-purple tw-px-4 tw-py-2 tw-font-poppins tw-font-medium tw-text-white"
                                            }
                                            // onPress={() => {
                                            //     toast.success("Opportunity created!", {
                                            //         closeOnClick: true,
                                            //         autoClose: 1000,
                                            //         position: "bottom-right",
                                            //     });
                                            //     close();
                                            // }}
                                        >
                                            Submit
                                        </Button>
                                        <Button
                                            className={
                                                "tw-rounded-md tw-bg-gray-200 tw-px-4 tw-py-2 tw-font-poppins tw-font-medium tw-text-black"
                                            }
                                            onPress={close}
                                        >
                                            Close
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </Dialog>
                    </Modal>
                </DialogTrigger>

                <div
                    className="ag-theme-material mt-3 mb-5 tw-w-full tw-flex-1"
                    style={{ height: 500 }}
                >
                    <AgGridReact
                        rowHeight={65}
                        rowData={
                            opportunityQuery.data.pages[
                                opportunityQuery.data.pages.length - 1
                            ].results
                        }
                        columnDefs={columnDefs}
                        localeText={
                            i18n.language === "ar" ? AG_GRID_LOCALE_AR : AG_GRID_LOCALE_EN
                        }
                        enableRtl={i18n.language === "ar"}
                        pagination={true}
                        paginationPageSize={50}
                        suppressPaginationPanel={true}
                        tooltipShowDelay={100}
                    />
                </div>
                <div className="tw-flex tw-w-full tw-justify-end tw-gap-4">
                    <Button
                        className={
                            "rac-disabled:tw-bg-gray-300 rac-disabled:tw-text-gray-400 rac-disabled:tw-outline-white tw-w-fit tw-self-end tw-rounded-md tw-px-2 tw-py-1 tw-outline tw-outline-1 tw-outline-black"
                        }
                        isDisabled={
                            !opportunityQuery.hasPreviousPage ||
                            opportunityQuery.isFetchingPreviousPage
                        }
                        onPress={fetchPreviousPage}
                    >
                        Previous
                    </Button>
                    <Button
                        className={
                            "tw-w-fit tw-self-end tw-rounded-md tw-px-2 tw-py-1 tw-outline tw-outline-1 tw-outline-black"
                        }
                        isDisabled={
                            !opportunityQuery.hasNextPage ||
                            opportunityQuery.isFetchingNextPage
                        }
                        onPress={fetchNextPage}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </Container>
    );
}

export default RelatedOpportunities;
