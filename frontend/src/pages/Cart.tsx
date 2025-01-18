import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

interface CartItem {
  _id: string;
  size: string;
  quantity: number;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string[];
}

const Cart: React.FC = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('ShopContext must be used within a ShopProvider');
  }

  const { products, currency, navigate, cartItems, updateQuantity } = context;

  const [cartData, setCartData] = useState<CartItem[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData: CartItem[] = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }

      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="bg-gradient-to-b from-white via-gray-100 to-gray-200 pt-14 px-4 sm:px-6 lg:px-8">
      <div className="text-center text-2xl mb-6">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div>
        {cartData.length === 0 ? (
          <p className="text-center text-xl font-medium text-gray-500">Cart is empty</p>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find((product: Product) => product._id === item._id);

            if (!productData) return null;

            return (
              <div
                key={index}
                className="py-6 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-6"
              >
                <div className="flex items-start gap-6">
                  <img className="w-16 sm:w-20 rounded-lg shadow-md" src={productData.image[0]} alt={productData.name} />
                  <div>
                    <p className="text-sm sm:text-lg font-medium">{productData.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p className="text-lg">{currency}{productData.price}</p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                    </div>
                  </div>
                </div>
                <input
                  onChange={(e) =>
                    e.target.value === '' || e.target.value === '0'
                      ? null
                      : updateQuantity(item._id, item.size, Number(e.target.value))
                  }
                  className="border max-w-10 sm:max-w-20 px-2 py-1 text-center"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="w-4 sm:w-5 cursor-pointer text-gray-500 hover:text-black"
                  src={assets.bin_icon}
                  alt="Remove item"
                />
              </div>
            );
          })
        )}
      </div>

      {cartData.length > 0 && (
        <div className="flex justify-end my-12 px-4 sm:px-0">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end">
              <button
                onClick={() => navigate('/place-order')}
                className="bg-black text-white text-sm my-8 px-8 py-3 rounded-lg shadow-lg transition-all duration-300 hover:bg-gray-800"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
