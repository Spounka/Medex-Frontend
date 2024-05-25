import { ThreadUser } from "./thread";
import { Company } from "@domain/user.ts";

interface QuoteAttachment {
    id: number;
    attachment: string;
}

export interface QuoteProduct {
    id: number;
    unit_display: string;
    name: string;
    quantity: number;
    unit: string;
    notes: string;
    quote: number;
}

export interface Quote {
    id: number;
    user: ThreadUser;

    attachments: QuoteAttachment[];

    created: string;
    created_since: string;

    products: QuoteProduct[];

    due_date: string;
    due_date_display: string;
    due_time_display: string;
    offers: Offer[];

    requirements: string;
    supplier: string;
}

export interface Offer {
    id: number;
    user: ThreadUser;

    created: string;
    created_since: string;

    status: string;
    status_display: string;

    notes: string;
    delivery_address: number;
    delivery_date: string;
    payment_type: string;
    quote: number;
    quote_supplier: Company | null;
    quote_created: string;
    quote_due_date: string;

    invoice_id: string;
}

export interface OfferProduct {
    id: number;
    name: string;
    notes: string;
    offer: number;
    product_price: number;
    quantity: number;
    tax: string;
    unit: string;
    unit_display: string;
}
