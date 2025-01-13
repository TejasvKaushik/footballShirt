import { createContext, ReactNode, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Define the type for the context value
interface ShopContextType {
    products: typeof products;
    currency: string;
    delivery_fee: number;
    search: string;
    showSearch: boolean;
    setSearch: (value: string) => void;
    setShowSearch: (value: boolean) => void;
    cartItems: Record<string, Record<string, number>>;
    addToCart: (itemId: string, size: string) => void;
    updateQuantity: (itemId: string, size: string, quantity: number) => void;
    getCartCount: () => number;
    getCartAmount: () => number;
    navigate: (path: string) => void
}

// Provide a default value or undefined for initial context
export const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Define props type for the provider
interface ShopContextProviderProps {
    children: ReactNode;
}

const ShopContextProvider = ({ children }: ShopContextProviderProps) => {
    const currency = "$";
    const delivery_fee = 50;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState<Record<string, Record<string, number>>>({});
    const navigate = useNavigate();

    const addToCart = (itemId: string, size: string) => {
        if (!size) {
            toast.error("Select product size");
            return;
        }

        const cartData = JSON.parse(JSON.stringify(cartItems)); // Deep clone

        if (cartData[itemId]) {
            cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        } else {
            cartData[itemId] = { [size]: 1 };
        }

        setCartItems(cartData);
    };

    const updateQuantity = (itemId: string, size: string, quantity: number) => {
        const cartData = JSON.parse(JSON.stringify(cartItems));
        if (cartData[itemId] && cartData[itemId][size] !== undefined) {
            cartData[itemId][size] = quantity;
            setCartItems(cartData);
        }
    };

    const getCartCount = () => {
        return Object.values(cartItems).reduce(
            (count, sizes) => count + Object.values(sizes).reduce((sum, qty) => sum + qty, 0),
            0
        );
    };

    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [itemId, sizes]) => {
            const itemInfo = products.find((product) => product.id === itemId);
            if (itemInfo) {
                total += Object.entries(sizes).reduce(
                    (sum, [_, qty]) => sum + qty * itemInfo.price,
                    0
                );
            }
            return total;
        }, 0);
    };

    const value: ShopContextType = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        updateQuantity,
        getCartCount,
        getCartAmount,
        navigate
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
