import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

interface Item {
  _id: string;
  name: string;
  image: string[];
  price: number;
  quantity: number;
  size: string;
  status: string;
  paymentMethod: string;
  date: string;
}

const Orders: React.FC = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("ShopContext must be used within a ShopProvider");
  }

  const { backendUrl, token, currency } = context;
  const [orderData, setOrderData] = useState<Item[]>([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const allOrdersItem = response.data.orders.flatMap((order: any) =>
          order.items.map((item: any) => ({
            ...item,
            status: order.status,
            paymentMethod: order.paymentMethod,
            date: order.date,
          }))
        );
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      loadOrderData();
    }
  }, [token]);

  return (
    <div className="border-t pt-16 px-4 sm:px-8 max-w-screen-lg mx-auto">
      <div className="text-2xl mb-8">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="p-6 border rounded-md shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            {/* Product Image and Details */}
            <div className="flex items-start gap-6">
              <img
                className="w-20 h-20 object-cover rounded-md"
                src={item.image[0]}
                alt={item.name}
              />
              <div>
                <p className="font-semibold text-lg">{item.name}</p>
                <p className="text-gray-500 mt-1 text-sm">
                  Quantity: {item.quantity} | Size: {item.size}
                </p>
                <p className="text-gray-700 mt-2">
                  Price:{" "}
                  <span className="font-medium">
                    {currency}
                    {item.price}
                  </span>
                </p>
                <p className="text-gray-500 mt-2 text-sm">
                  Date: {new Date(item.date).toDateString()}
                </p>
                <p className="text-gray-500 mt-2 text-sm">
                  Payment: {item.paymentMethod}
                </p>
              </div>
            </div>

            {/* Status and Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-gray-700 text-sm">{item.status}</span>
              </div>
              <button
                onClick={() => alert("Tracking feature coming soon!")}
                className="px-4 py-2 border rounded-md text-sm font-medium bg-gray-100 hover:bg-gray-200"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
