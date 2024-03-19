export interface Brand {
    id: number;
    name: string;
    image: string;
    slug: string;
}

export interface Category {
    id: number;
    parent_name: string;
    parent_slug: string;
    children_count: number;
    name: string;
    image: string;
    slug: string;
    is_featured: boolean;
    lft: number;
    rght: number;
    tree_id: number;
    level: number;
    parent: number;
}

export interface Product {
    sku: string;
    category: Category;
    brand: Brand;
    name: string;
    description: string;
    slug: string;
    price: string;
    qty: number;
    sale_price: string;
    price_range_min: string;
    price_range_max: string;
    stock_quantity: number;
    is_available: boolean;
    is_returnable: boolean;
    return_deadline: number;
    thumbnail: string;
    image1: string | null;
    image2: string | null;
    image3: string | null;
    image4: string | null;
    created: string;
    updated: string;
    supplier: string;
}
