import React from "react";
import Container from "../../components/ui/container";
import { AG_GRID_LOCALE_AR } from "../../utils/AG-Localization/ar";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { AG_GRID_LOCALE_EN } from "../../utils/AG-Localization/en";
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
} from "react-aria-components";
import Select from "react-select";
import { toast } from "react-toastify";

function RelatedOpportunities(props) {
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
            className="tw-flex tw-min-h-screen tw-w-full tw-gap-0 tw-pt-4"
        >
            <div className={"tw-flex tw-w-full tw-flex-col tw-items-start tw-gap-8"}>
                <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                    Invoices List
                </h2>

                <DialogTrigger>
                    <Button
                        className={
                            "tw-rounded-md tw-bg-purple tw-px-4 tw-py-2 tw-font-poppins tw-font-medium tw-text-white"
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
                                    className={
                                        "tw-flex tw-h-full tw-flex-col tw-gap-6 tw-pt-[15svh] lg:tw-pt-0"
                                    }
                                >
                                    <Heading>Create Opportunity</Heading>
                                    <TextField
                                        name={"name"}
                                        type={"text"}
                                        className={"tw-flex tw-flex-col tw-gap-1 tw-p-0"}
                                    >
                                        <Label>Opportunity Description</Label>
                                        <TextArea
                                            className={
                                                "tw-rounded-sm tw-bg-gray-100 tw-p-4 focus:tw-outline-purple"
                                            }
                                            placeholder={"Description..."}
                                        />
                                    </TextField>
                                    <Select
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
                                    <DatePicker
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
                                            className={
                                                "tw-rounded-md tw-bg-purple tw-px-4 tw-py-2 tw-font-poppins tw-font-medium tw-text-white"
                                            }
                                            onPress={() => {
                                                toast.success("Opportunity created!", {
                                                    closeOnClick: true,
                                                    autoClose: 1000,
                                                    position: "bottom-right",
                                                });
                                                close();
                                            }}
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

export default RelatedOpportunities;
