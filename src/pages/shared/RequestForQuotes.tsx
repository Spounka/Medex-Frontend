import BreadCrumb from "../../components/Buyer/shared/BreadCrumb";

import { useTranslation } from "react-i18next";

import React, {
    FormEvent,
    useMemo,
    useState,
    useRef,
    useCallback,
    useEffect,
    RefObject,
} from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";

import { RiMailSendLine } from "react-icons/ri";

import useAxios from "../../utils/useAxios";
import { AxiosResponse } from "axios";
import { ThreadUser } from "@domain/thread";

import CustomNoRows from "../../components/shared/RFQ/CustomNoRows";
import { toast } from "react-toastify";
import Select from "react-select";

let newCount = 1;

const createNewRowData = () => {
    const newData = {
        name: "",
        quantity: null,
        unit: "Bag / Bags",
        notes: "",
    };
    newCount++;
    return newData;
};

const handleReset = (ref: RefObject<HTMLInputElement>) => {
    if (ref.current) {
        ref.current.value = "";
        ref.current.type = "text";
        ref.current.type = "file";
    }
};

const onClear = (ref: RefObject<any>) => {
    ref.current.clearValue();
};

const RequestForQuotes: React.FC = () => {
    const { t } = useTranslation();
    const api = useAxios();

    const gridRef = useRef<AgGridReact>(null);
    const fileRef = useRef<HTMLInputElement | null>(null);
    const formRef = useRef<HTMLFormElement>("");
    const selectInputRef = useRef<any>(null);

    const [supplierNameOptions, setSupplierNameOptions] = useState<any>([]);
    const [formData, setFormData] = useState<any>({
        supplier: "",
        products: [],
        due_date: null,
    });

    const [rowData, setRowData] = useState<any>([]);

    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        {
            field: "name",
            headerName: t("product_form.name"),
            cellDataType: "text",
            headerCheckboxSelection: true,
            checkboxSelection: true,
        },
        {
            field: "quantity",
            headerName: t("buyer_pages.cart.qty"),
            cellDataType: "number",
        },
        {
            field: "unit",
            headerName: t("shared.rfq.unit"),
            cellDataType: "text",
            cellEditor: "agSelectCellEditor",
            cellEditorParams: {
                values: [
                    t("shared.rfq.bag"),
                    t("shared.rfq.bar"),
                    t("shared.rfq.bus"),
                    t("shared.rfq.cub"),
                    t("shared.rfq.doz"),
                    t("shared.rfq.gal"),
                    t("shared.rfq.gra"),
                    t("shared.rfq.kg"),
                    t("shared.rfq.km"),
                    t("shared.rfq.lt"),
                    t("shared.rfq.mt"),
                    t("shared.rfq.mt_t"),
                    t("shared.rfq.ou"),
                    t("shared.rfq.pair"),
                    t("shared.rfq.pack"),
                    t("shared.rfq.pc"),
                    t("shared.rfq.pd"),
                    t("shared.rfq.set"),
                    t("shared.rfq.st"),
                    t("shared.rfq.sm"),
                    t("shared.rfq.ton"),
                ],
            },
        },
        {
            field: "note",
            headerName: t("buyer_pages.offers_invoice.notes"),
            cellDataType: "text",
        },
    ]);

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            editable: true,
        };
    }, []);

    const getRowData = useCallback(() => {
        return new Promise((resolve) => {
            const rowData: any[] = [];

            var empty = true;

            gridRef.current!.api.forEachNode(function (node) {
                empty = false;

                if (
                    node.data.name === "" ||
                    node.data.quantity === 0 ||
                    node.data.unit === ""
                ) {
                    toast.error(t("shared.rfq.missing"));

                    throw new Error("Products must be set correctly!");
                } else {
                    rowData.push(node.data);
                }
            });

            if (empty === true) {
                toast.error(t("shared.rfq.no_products"));

                throw new Error("Products must be set correctly!");
            } else {
                resolve(rowData.length > 0 ? rowData : null);
            }
        });
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let fd = new FormData();

        const rowData = await getRowData();

        if (rowData) {
            fd.append("products", JSON.stringify(rowData));

            for (const key in formData) {
                if (formData.hasOwnProperty(key)) {
                    fd.append(key, formData[key]);
                }
            }

            const fileInput = fileRef.current;

            if (fileInput?.files) {
                for (let i = 0; i < fileInput.files.length; i++) {
                    fd.append("attachments", fileInput.files[i]);
                }
            }

            await api
                .post(import.meta.env.VITE_BACKEND_URL + "/api/quote/", fd)

                .then(() => {
                    toast.success(`${t("shared.rfq.success")}!`);

                    selectInputRef.current.value = "";

                    onClear(selectInputRef);
                    handleReset(fileRef);
                    formRef.current.reset();
                    clearData();
                })
                .catch((err) => {
                    toast.error(`${t("shared.rfq.err")}!`);
                    console.log(err);
                });
        }
    };

    const addRow = useCallback(() => {
        const newItems = [createNewRowData()];
        gridRef.current!.api.applyTransaction({
            add: newItems,
        });
    }, []);

    const removeRow = useCallback(() => {
        const selectedData = gridRef.current!.api.getSelectedRows();
        gridRef.current!.api.applyTransaction({ remove: selectedData });
    }, []);

    const clearData = useCallback(() => {
        const rowData: any[] = [];
        gridRef.current!.api.forEachNode(function (node) {
            rowData.push(node.data);
        });
        gridRef.current!.api.applyTransaction({
            remove: rowData,
        })!;
    }, []);

    const getSuppliers = async () => {
        await api
            .get(import.meta.env.VITE_BACKEND_URL + "/api/account/supplier/list/")
            .then((res: AxiosResponse<ThreadUser[]>) => {
                const nameOptions = res.data.map((supplier) => ({
                    value: supplier.id,
                    label: supplier.full_name,
                }));

                setSupplierNameOptions(nameOptions);
            });
    };

    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll(
            '[data-bs-toggle="tooltip"]',
        );
        const tooltipList = [...tooltipTriggerList].map(
            (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl),
        );
        getSuppliers();
    }, []);

    return (
        <main className="w-100">
            <section
                className={`${window.location.href.indexOf("supplier") === -1 && "py-5"}`}
            >
                <div className="container">
                    {window.location.href.indexOf("supplier") > -1 ||
                    window.location.href.indexOf("dashboard") > -1 ? (
                        <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                            {t("rfq")}
                        </h2>
                    ) : (
                        <div className="row">
                            <BreadCrumb title={`${t("rfq")}`} />
                        </div>
                    )}

                    <form
                        method="post"
                        encType="multipart/form-data"
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className={"tw-flex tw-flex-col tw-gap-2"}
                    >
                        <div className="row d-flex align-items-center mt-4">
                            <div className="col-12 col-md-6">
                                <div className="row d-flex align-items-center">
                                    <div className="col-12 col-md-3">
                                        <label
                                            htmlFor="supplier"
                                            className="w-100"
                                        >
                                            {t("shared.rfq.supplier")}
                                        </label>
                                    </div>
                                    <div className="col-12 col-md-8 d-flex align-items-center gap-2">
                                        <Select
                                            className="basic-single w-100"
                                            classNamePrefix="select"
                                            isClearable={true}
                                            placeholder={`${t("shared.rfq.supplier")}`}
                                            isSearchable={true}
                                            name="supplier"
                                            options={supplierNameOptions}
                                            defaultValue={formData.supplier}
                                            onChange={(e) => {
                                                if (e)
                                                    setFormData((prevState: any) => ({
                                                        ...prevState,
                                                        supplier: e.value,
                                                    }));
                                            }}
                                            ref={selectInputRef}
                                        />
                                        <button
                                            type="button"
                                            className="rfq__tooltip"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            data-bs-title={t("shared.rfq.supplier_hint")}
                                        >
                                            ?
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mt-4 mt-md-0">
                                <div className="row d-flex align-items-center">
                                    <div className="col-12 col-md-4">
                                        <label htmlFor="due_date">
                                            {t("shared.rfq.due_date")} *
                                        </label>
                                    </div>
                                    <div className="col-12 col-md-7">
                                        <input
                                            type="datetime-local"
                                            name="due_date"
                                            className="form-control"
                                            required
                                            onChange={(e) => {
                                                setFormData((prevState: any) => ({
                                                    ...prevState,
                                                    due_date: e.target.value,
                                                }));
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex align-items-center mt-4">
                            <div className="col-12 col-md-6">
                                <div className="row d-flex align-items-center">
                                    <div className="col-12 col-md-3">
                                        <label htmlFor="attachments">
                                            {t("shared.rfq.att")}
                                        </label>
                                    </div>
                                    <div className="col-12 col-md-8 d-flex align-items-center gap-2">
                                        <input
                                            type="file"
                                            name="attachments"
                                            className="form-control"
                                            multiple
                                            ref={fileRef}
                                        />
                                        <button
                                            type="button"
                                            className="rfq__tooltip"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            data-bs-title={t("shared.rfq.att_hint")}
                                        >
                                            ?
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="ag-theme-alpine mt-3"
                            style={{ height: 200 }}
                        >
                            <AgGridReact
                                rowData={rowData}
                                ref={gridRef}
                                columnDefs={columnDefs}
                                defaultColDef={defaultColDef}
                                reactiveCustomComponents={true}
                                noRowsOverlayComponent={CustomNoRows}
                                rowSelection={"multiple"}
                                singleClickEdit={true}
                            />
                        </div>
                        <div className="gap-3 tw-flex tw-items-center">
                            <button
                                className="tw-h-fit tw-rounded-md tw-bg-black tw-px-4 tw-py-2 tw-text-white"
                                onClick={addRow}
                                type="button"
                            >
                                {t("shared.rfq.add")}
                            </button>
                            <button
                                className="tw-h-fit tw-rounded-md tw-px-4 tw-py-2 tw-text-red-400 tw-outline tw-outline-1 tw-outline-red-400"
                                onClick={removeRow}
                                type="button"
                            >
                                {t("shared.rfq.remove")}
                            </button>
                        </div>
                        <div className="form-check form-switch mt-5">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="agree"
                                name="agree"
                                required
                            />
                            <label
                                className="form-check-label"
                                htmlFor="agree"
                            >
                                {t("shared.rfq.consent")}.
                            </label>
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="align-items-center gap-3 justify-content-center tw-flex tw-items-center tw-rounded-md tw-bg-purple tw-px-4 tw-py-2 tw-text-white"
                            >
                                {t("shared.rfq.submit")}
                                <RiMailSendLine size="1.2rem" />
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default RequestForQuotes;
