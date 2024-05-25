import { Offer } from "@domain/quote.ts";
import { ThreadUser } from "@domain/thread.ts";
import { ShippingAddress } from "@domain/user";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

function InvoiceBusinessInformation({
    address,
}: Readonly<{ address: ShippingAddress | null }>) {
    if (!address) return null;
    return (
        <div className={"tw-flex tw-justify-between tw-gap-4 tw-border-b tw-pb-4"}>
            <h2 className="tw-font-title tw-text-4xl tw-font-bold tw-text-arsenic">
                Medex
            </h2>
            <div className="tw-flex tw-flex-col tw-gap-1.5 tw-text-right">
                <p className={"tw-font-title tw-text-lg tw-font-medium tw-text-arsenic"}>
                    {address.address_1}
                </p>
                <p className={"tw-font-title tw-text-lg tw-font-medium tw-text-arsenic"}>
                    {address.address_2}
                </p>
                <p className={"tw-font-title tw-text-lg tw-font-medium tw-text-arsenic"}>
                    {address.postal_code} {address.city}
                </p>
                <p className={"tw-font-title tw-text-lg tw-font-medium tw-text-arsenic"}>
                    {address.state}
                </p>
                <p className={"tw-font-title tw-text-lg tw-font-medium tw-text-arsenic"}>
                    {address.country}
                </p>
            </div>
        </div>
    );
}

function InvoiceClientInformation({ client }: { client: ThreadUser }) {
    if (!client) return null;
    return (
        <div
            className={
                "tw-flex tw-w-full tw-flex-col tw-justify-end tw-pt-4 tw-text-right"
            }
        >
            <p className={"tw-font-title tw-text-lg tw-font-medium tw-text-arsenic"}>
                {client.shipping_address.address_1}
            </p>
            <p className={"tw-font-title tw-text-lg tw-font-medium tw-text-arsenic"}>
                {client.shipping_address.address_2}
            </p>
            <p className={"tw-font-title tw-text-lg tw-font-medium tw-text-arsenic"}>
                {client.shipping_address.postal_code} {client.shipping_address.city}
            </p>
            <p className={"tw-font-title tw-text-lg tw-font-medium tw-text-arsenic"}>
                {client.shipping_address.state}
            </p>
            <p className={"tw-font-title tw-text-lg tw-font-medium tw-text-arsenic"}>
                {client.shipping_address.country}
            </p>
        </div>
    );
}

function InvoiceMetaData({ offer }: Readonly<{ offer: Offer }>) {
    return (
        <div
            className={
                "tw-flex tw-flex-col tw-justify-start tw-gap-6 tw-border-b tw-pb-6"
            }
        >
            <h3 className="tw-font-title tw-text-4xl tw-font-medium tw-text-arsenic">
                Invoice {offer.invoice_id}
            </h3>
            <div className="tw-flex tw-justify-between">
                <div className="tw-flex tw-flex-1 tw-flex-col tw-gap-2">
                    <h4 className="tw-font-title tw-text-xl tw-font-bold">
                        Invoice Date:
                    </h4>
                    <p className="tw-font-title tw-text-lg tw-text-arsenic">
                        {new Date(offer.created).toLocaleDateString()}
                    </p>
                </div>
                <div className="tw-flex tw-flex-1 tw-flex-col tw-gap-2 tw-text-right">
                    <h4 className="tw-font-title tw-text-xl tw-font-bold">Due Date:</h4>
                    <p className="tw-font-title tw-text-lg tw-text-arsenic">
                        {new Date(offer.delivery_date).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
}

function InvoiceBodyRow({
    alternate,
    bold = false,
    description,
    qtt,
    unitPrice,
    tax,
    amount,
}: Readonly<{
    bold?: boolean;
    alternate?: boolean;
    description: string;
    qtt: number | string;
    unitPrice: number | string;
    tax: number | string;
    amount: number | string;
}>) {
    const { t } = useTranslation();
    return (
        <div
            className={clsx(
                "tw-flex tw-w-full tw-flex-1 tw-gap-2 tw-px-2 tw-py-2",
                alternate ? "tw-bg-gray-100" : "tw-bg-none",
            )}
        >
            <p
                className={clsx(
                    "tw-flex-[2_1_50%] tw-font-title tw-text-lg ",
                    bold
                        ? "tw-font-semibold tw-text-black"
                        : "tw-font-medium tw-text-arsenic",
                )}
            >
                {description}
            </p>
            <p
                className={clsx(
                    "tw-flex-[0_1_10%] tw-text-right tw-font-title tw-text-lg ",
                    bold
                        ? "tw-font-semibold tw-text-black"
                        : "tw-font-medium tw-text-arsenic",
                )}
            >
                {qtt}
            </p>
            <p
                className={clsx(
                    "tw-flex-[0_1_10%] tw-text-right tw-font-title tw-text-lg ",
                    bold
                        ? "tw-font-semibold tw-text-black"
                        : "tw-font-medium tw-text-arsenic",
                )}
            >
                {`${unitPrice} ${bold ? "" : t("sar")}`}
            </p>
            <p
                className={clsx(
                    "tw-flex-[0_1_10%] tw-text-right tw-font-title tw-text-lg ",
                    bold
                        ? "tw-font-semibold tw-text-black"
                        : "tw-font-medium tw-text-arsenic",
                )}
            >
                {`${tax} ${bold ? "" : "%"}`}
            </p>
            <p
                className={clsx(
                    "tw-flex-[0_1_15%] tw-text-right tw-font-title tw-text-lg ",
                    bold
                        ? "tw-font-semibold tw-text-black"
                        : "tw-font-medium tw-text-arsenic",
                )}
            >
                {`${amount} ${bold ? "" : t("sar")}`}
            </p>
        </div>
    );
}

function InvoiceBody({ offer }: Readonly<{ offer: Offer }>) {
    return (
        <div className={"tw-flex tw-flex-col tw-gap-2 tw-pt-2"}>
            <InvoiceBodyRow
                bold
                description={"Description"}
                qtt={"Quantity"}
                unitPrice={"Unit Price"}
                tax={"Taxes"}
                amount={"Amount"}
            />

            {offer.products.map((product, index) => {
                return (
                    <InvoiceBodyRow
                        description={product.name}
                        qtt={product?.quantity}
                        unitPrice={product.product_price ?? 0}
                        tax={product.tax}
                        amount={product.product_price * product.quantity}
                        alternate={index % 2 === 0}
                    />
                );
            })}
        </div>
    );
}

function InvoiceFooter({ offer }: { offer: Offer }) {
    const { t } = useTranslation();
    const totalPrice = offer.products.reduce(
        (value, product) => value + product.product_price,
        0,
    );
    return (
        <div className="tw-flex tw-w-full tw-justify-between tw-py-8">
            <div className="tw-flex tw-flex-[2] tw-flex-col tw-justify-center tw-gap-3.5">
                <p className="tw-text-lg tw-text-grey-storm">
                    Payment terms: {offer?.delivery_date ?? new Date().toDateString()}
                </p>
                <p className="tw-text-lg tw-text-grey-storm">
                    Payment Method: {offer?.payment_type ?? "Nothing"}
                </p>
            </div>
            <div className="tw-flex tw-w-full tw-flex-1 tw-flex-col tw-gap-3">
                <div className="tw-flex tw-flex-col tw-gap-3 tw-border-y tw-px-2 tw-py-2">
                    <div className="tw-flex tw-w-full tw-justify-between">
                        <p className="tw-font-title tw-text-lg tw-font-semibold">
                            Untaxed Amount:
                        </p>
                        {offer ? (
                            <p className="tw-font-title tw-text-lg">{`${totalPrice} ${t("sar")}`}</p>
                        ) : (
                            <p className="tw-font-title tw-text-lg">{`0 S.A.R`}</p>
                        )}
                    </div>
                    <div className="tw-flex tw-w-full tw-justify-between">
                        <p className="tw-font-title tw-text-lg tw-font-medium tw-text-grey-storm">{`Tax: ${offer?.tax ?? 0}%`}</p>
                        {offer ? (
                            <p className="tw-font-title tw-text-lg">{`${totalPrice * (parseFloat(offer.tax ?? 0) / 100)} S.A.R`}</p>
                        ) : (
                            <p className="tw-font-title tw-text-lg">{`0 S.A.R`}</p>
                        )}
                    </div>
                </div>

                <div className="tw-flex tw-w-full tw-justify-between tw-px-2">
                    <p className="tw-font-title tw-text-lg tw-font-semibold">Total:</p>
                    {offer ? (
                        <p className="tw-font-title tw-text-lg">{`${totalPrice} S.A.R`}</p>
                    ) : (
                        <p className="tw-font-title tw-text-lg">{`0 S.A.R`}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function OfferInvoice({ quote }: Readonly<{ quote: Offer | null }>) {
    if (!quote) return null;
    return (
        <>
            <InvoiceBusinessInformation address={quote.quote_supplier?.address ?? null} />
            <InvoiceClientInformation client={quote.user} />
            <InvoiceMetaData offer={quote} />
            <InvoiceBody offer={quote} />
            <InvoiceFooter offer={quote} />
        </>
    );
}
