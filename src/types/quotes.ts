import { ThreadUser } from "./thread";

interface QuoteAttachment {
    id: number;
    attachment: string;
}
export interface Quote {
    id: number;
    user: ThreadUser;

    attachments: QuoteAttachment[];

    created: string;
    created_since: string;

    product: string;
    product_name: string;
    quantity: number;
    unit: string;
    unit_display: string;

    due_date: string;
    due_date_display: string;
    due_time_diplay: string;

    requirements: string;
    supplier: string;
}

export interface Offer {
    id: number;
    user: ThreadUser;

    quote: string;
    quote_obj: Quote;

    created: string;
    created_since: string;

    status: string;
    status_display: string;

    notes: string;
    brand: string;
    quantity: number;
    product_price: number;
    total_price: number;
    tax: number;
    delivery_address: string;
    delivery_date: string;
    payment_type: string;

    invoice_id: string;
}
