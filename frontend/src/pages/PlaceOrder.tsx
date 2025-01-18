import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder: React.FC = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("ShopContext must be used within a ShopProvider");
  }
  const [method, setMethod] = useState<'cod' | 'stripe' | 'razorpay'>('cod');

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = context;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order: any) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response: any) => {
        try {
          const { data } = await axios.post(`${backendUrl}/api/order/verifyRazorpay`, response, {
            headers: { token }
          });
          if (data.success) {
            navigate('/orders');
            setCartItems({});
          }
        } catch (error) {
          console.error(error);
          toast.error((error as Error).message || 'Payment verification failed');
        }
      }
    };
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product: any) => product._id === items)) as any;
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      switch (method) {
        case 'cod': {
          const response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;
        }
        case 'stripe': {
          const response = await axios.post(`${backendUrl}/api/order/stripe`, orderData, { headers: { token } });
          if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
          } else {
            toast.error(response.data.message);
          }
          break;
        }
        case 'razorpay': {
          const response = await axios.post(`${backendUrl}/api/order/razorpay`, orderData, { headers: { token } });
          if (response.data.success) {
            initPay(response.data.order);
          }
          break;
        }
        default:
          break;
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Failed to place the order');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-200 bg-gradient-to-t from-white via-gray-50 to-gray-100 p-8">
      {/* Left Side */}
      <div className="flex flex-col gap-6 w-full sm:max-w-[480px] p-6 rounded-lg shadow-lg bg-white">
        <div className="text-xl sm:text-2xl font-semibold text-gray-800">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex gap-4">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-2 px-4 w-full focus:ring-2 focus:ring-orange-500"
            type="text"
            placeholder="First name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded py-2 px-4 w-full focus:ring-2 focus:ring-orange-500"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded py-2 px-4 w-full focus:ring-2 focus:ring-orange-500"
          type="email"
          placeholder="Email address"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded py-2 px-4 w-full focus:ring-2 focus:ring-orange-500"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-4">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded py-2 px-4 w-full focus:ring-2 focus:ring-orange-500"
            type="text"
            placeholder="City"
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded py-2 px-4 w-full focus:ring-2 focus:ring-orange-500"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-4">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 rounded py-2 px-4 w-full focus:ring-2 focus:ring-orange-500"
            type="number"
            placeholder="Zipcode"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded py-2 px-4 w-full focus:ring-2 focus:ring-orange-500"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded py-2 px-4 w-full focus:ring-2 focus:ring-orange-500"
          type="number"
          placeholder="Phone"
        />
      </div>

      {/* Right Side */}
      <div className="flex flex-col gap-8 mt-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="min-w-80">
          <CartTotal />
        </div>

        <div>
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex gap-4 flex-col lg:flex-row">
            <div onClick={() => setMethod('stripe')} className="flex items-center gap-4 border p-4 rounded-lg cursor-pointer hover:bg-gray-100">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className="h-6 mx-4" src={assets.stripe_logo} alt="Stripe" />
            </div>
            <div onClick={() => setMethod('razorpay')} className="flex items-center gap-4 border p-4 rounded-lg cursor-pointer hover:bg-gray-100">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className="h-6 mx-4" src={assets.razorpay_logo} alt="Razorpay" />
            </div>
            <div onClick={() => setMethod('cod')} className="flex items-center gap-4 border p-4 rounded-lg cursor-pointer hover:bg-gray-100">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-black text-white px-16 py-3 text-sm rounded-lg hover:bg-gray-700 transition-all duration-300">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
