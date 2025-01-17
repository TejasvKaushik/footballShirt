import { createContext, ReactNode, useEffect, useState } from "react";
import { products as initialProducts } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define the type for the context value
interface ShopContextType {
  products: typeof initialProducts;
  currency: string;
  delivery_fee: number;
  search: string;
  showSearch: boolean;
  setSearch: (value: string) => void;
  setShowSearch: (value: boolean) => void;
  cartItems: Record<string, Record<string, number>>;
  setCartItems: (cartItems: Record<string, Record<string, number>>) => void; // Add this
  addToCart: (itemId: string, size: string) => void;
  updateQuantity: (itemId: string, size: string, quantity: number) => void;
  getCartCount: () => number;
  getCartAmount: () => number;
  navigate: (path: string) => void;
  backendUrl: string;
  setToken: (token: string) => void;
  token: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  date: number;
  bestseller: boolean;
}

// Provide a default value or undefined for initial context
export const ShopContext = createContext<ShopContextType | undefined>(
  undefined
);

// Define props type for the provider
interface ShopContextProviderProps {
  children: ReactNode;
}

const ShopContextProvider = ({ children }: ShopContextProviderProps) => {
  const currency = "$";
  const delivery_fee = 50;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState<
    Record<string, Record<string, number>>
  >({});
  const [products, setProducts] = useState<Product[]>(initialProducts); // Use proper type for products
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const addToCart = async (itemId: string, size: string) => {
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

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error((error as Error).message);
      }
    }
  };

  const updateQuantity = async (
    itemId: string,
    size: string,
    quantity: number
  ) => {
    const cartData = JSON.parse(JSON.stringify(cartItems));
    if (cartData[itemId] && cartData[itemId][size] !== undefined) {
      cartData[itemId][size] = quantity;
      setCartItems(cartData);
    }

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error((error as Error).message);
      }
    }
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce(
      (count, sizes) =>
        count + Object.values(sizes).reduce((sum, qty) => sum + qty, 0),
      0
    );
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items);

      // Ensure itemInfo exists before accessing its properties
      if (itemInfo) {
        for (const size in cartItems[items]) {
          const quantity = cartItems[items][size];
          if (quantity > 0) {
            totalAmount += itemInfo.price * quantity;
          }
        }
      } else {
        console.warn(`Product with ID ${items} not found.`);
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };

  const getUserCart = async (token: any) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await getProductsData();
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!token && storedToken) {
      setToken(storedToken);
      getUserCart(storedToken);
    } else if (token) {
      getUserCart(token);
    }
  }, [token]);

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
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
