import { Product } from "./product.ts";

export default interface CartContextType {
    cartItems: Product[];
    addToCart: (product: Product, newQty: number) => void;
    removeFromCart: (product: Product, newQty: number) => void;
    setCartItems: (newCartItems: Product[]) => void;
}
