import React, { useContext, useRef } from "react";
import OfferInvoice from "../shared/OfferInvoice.tsx";
import AuthContext from "../../context/AuthContext.tsx";
import { useParams } from "react-router-dom";
import Container from "../../components/ui/container";
import { Offer } from "@domain/quote.ts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function InvoiceDetails(props) {
    const params = useParams();
    const pdfRef = useRef();
    const { id } = params;
    const invoice: Offer = {
        id: parseInt(id ?? "") ?? 0,

        user: {
            id: "000",
            email: "email",
            phone: "phone",
            billing_address: {
                address_1: "address_1",
                id: 0,
                city: "city",
                country: "country",
                state: "state",
                postal_code: "postal_code",
            },
            full_name: "full client name",
            groups: [],
            is_buyer: true,
            is_supplier: false,
            shipping_address: {
                address_1: "address_1",
                id: 0,
                city: "city",
                country: "country",
                state: "state",
                postal_code: "postal_code",
            },
            profile: {
                user: "alksdjf",
                id: 0,
                profile_picture: "laskdfj",
            },
        },
        quote_obj: {
            user: {
                shipping_address: {
                    address_1: "address_1",
                    id: 0,
                    city: "city",
                    country: "country",
                    state: "state",
                    postal_code: "postal_code",
                },
                id: "001",
                email: "email",
                phone: "phone",
                billing_address: {
                    address_1: "address_1",
                    id: 0,
                    city: "city",
                    country: "country",
                    state: "state",
                    postal_code: "postal_code",
                },
                full_name: "full client name",
                groups: [],
                is_buyer: true,
                is_supplier: false,
                profile: {
                    user: "alksdjf",
                    id: 0,
                    profile_picture: "laskdfj",
                },
            },
        },
        quote: "ladkfjklsadjf",

        created: "20202",
        created_since: "2020202",

        status: "Pending",
        status_display: "pending",

        notes: "Notes",
        brand: "Brand",
        quantity: 25,
        product_price: 150,
        total_price: 250,
        tax: 11,
        delivery_address: "alskdfj",
        delivery_date: "202020",
        payment_type: "paypal",
        invoice_id: "id-0",
    };
    const downloadPDF = () => {
        const input = pdfRef.current;

        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF("p", "mm", "a4", false);

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 10;

            pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);

            pdf.save(`Medex Invoice - ${id}.pdf`);
        });
    };
    return (
        <Container
            className={"tw-flex tw-h-full tw-min-h-24 tw-w-full tw-bg-[#fff] tw-py-32"}
            node={"div"}
        >
            <div className="tw-flex-[0_0_00%] md:tw-flex-[0_0_30%] lg:tw-flex-[0_0_22%] xl:tw-flex-[0_0_16%]"></div>
            <div className="tw-flex tw-flex-1 tw-flex-col tw-gap-16">
                <div className="tw-flex tw-justify-between tw-gap-2.5">
                    <button className="tw-rounded-md tw-bg-purple tw-px-4 tw-py-2 tw-font-poppins tw-font-medium tw-text-white">
                        Send by Email
                    </button>
                    <button
                        onClick={downloadPDF}
                        className="tw-rounded-md tw-bg-gray-200 tw-px-4 tw-py-2 tw-font-poppins tw-font-normal tw-text-black"
                    >
                        Print
                    </button>
                </div>
                <div
                    className="tw-h-full tw-w-full tw-border tw-border-gray-100 tw-p-0 tw-px-8 tw-py-8"
                    ref={pdfRef}
                >
                    <OfferInvoice quote={invoice} />
                </div>
            </div>
        </Container>
    );
}

export default InvoiceDetails;
