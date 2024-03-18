import { Group } from "@domain/groups.ts";
import { ShippingAddress } from "@domain/user.ts";

interface ThreadUser {
    id: string;
    full_name: string;
    is_buyer: boolean;
    is_supplier: boolean;
    phone: string;
    profile: {
        id: number;
        profile_picture: string;
        user: string;
    };
    billing_address: ShippingAddress;
    shipping_address: ShippingAddress;
    email: string;
    groups: Group[];
}

export interface Thread {
    id: number;

    first: ThreadUser;
    second: ThreadUser;
    last_message: any;
    room_group_name: string;

    created: string;
    updated: string;
}
