import { ThreadUser } from "@domain/thread.ts";
import { ShippingAddress } from "@domain/user.ts";

export interface OpportunityCreate {
    id: number;
    user: ThreadUser;

    title: string;
    target_suppliers: ThreadUser[];
    tags: string[];

    delivery_address: ShippingAddress;
    payment_method: "DIR" | "DIV";

    opportunity_value: "VS" | "S" | "M" | "B" | "E";

    delivery_date: string;
    payment_days: string;
}

export interface OpportunityDisplay {
    id: number;
    user: ThreadUser;
    payment_method_display: string;
    status_display: string;
    value_display: string;

    suppliers: ThreadUser[] | null;
    created_since: string;
    delivery_date_display: string;
    delivery_time_display: string;
    title: string;
    payment_days: string;
    views: number;
    delivery_address: ShippingAddress;
    delivery_date: string,
    created: string,
    updated: string,
}
