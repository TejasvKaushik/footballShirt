import { createContext, ReactNode, useState } from "react";
import { products } from "../assets/assets";

// Define the type for the context value
interface ShopContextType {
    products: typeof products;
    currency: string;
    delivery_fee: number;
    search: string;
    showSearch: boolean;
    setSearch: (value: string) => void;
    setShowSearch: (value: boolean) => void;
}

// Provide a default value or undefined for initial context
export const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Define props type for the provider
interface ShopContextProviderProps {
    children: ReactNode;
}

const ShopContextProvider = ({ children }: ShopContextProviderProps) => {
    const currency = '$';
    const delivery_fee = 50;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const value = {
        products,
        currency,
        delivery_fee,
        search, setSearch,
        showSearch, setShowSearch
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
