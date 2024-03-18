export interface ShippingAddress {
    id: number;
    country: string;
    state: string;
    city: string;
    postal_code: string;
    address_1: string;
    address_2?: string;
}

export interface User {
    id: string;
    email: string;
    password: string;
    full_name: string;
    phone: string;
    shipping_address: ShippingAddress;
    profile_picture: string | Blob | null; // Define type for profile_picture
}

// Temporary User type during refactoring process
// TODO: Refactor the types and remove / rename this class
export interface TempUser {
    id: string;
    email: string;
    full_name: string;
    phone: string;
    shipping_address: any; // Define type for shipping_address
    profile_picture: any; // Define type for profile_picture
    password: string;
    setEmail: (value: string) => void;
    setFullName: (value: string) => void;
    setPhone: (value: string) => void;
    setPostalCode: (value: string) => void;
    setAddress1: (value: string) => void;
    setAddress2: (value: string) => void;
    pictureRef: any; // Define type for pictureRef
    setPassword: (value: string) => void;
    setConfirmPassword: (value: string) => void;
}
