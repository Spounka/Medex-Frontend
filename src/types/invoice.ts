import { Product } from "@domain/product.ts";
import { ThreadUser } from "@domain/thread.ts";

export interface Invoice {
    id: number;
    created: string;
    created_since: string;
    delivery_address: number;
    delivery_date: string;
    invoice_id: string;
    notes: string;
    payment_type: string;
    products: Product[];
    quote: number;
    quote_created: string;
    quote_due_date: string;
    quote_supplier: ThreadUser;
    status: "P" | "A" | "D";
    status_display: "Pending" | "Approved" | "Denied";
    user: ThreadUser;
}
