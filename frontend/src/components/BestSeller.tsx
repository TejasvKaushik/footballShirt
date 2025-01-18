import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

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

const BestSeller: React.FC = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('BestSeller must be used within a ShopContextProvider');
  }

  const { products } = context as unknown as { products: Product[] };
  const [bestSellers, setBestSellers] = useState<Product[]>([]);

  useEffect(() => {
    if (products) {
      const bestProduct = products.filter((item) => item.bestseller);
      setBestSellers(bestProduct.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-12 bg-gradient-to-b from-blue-50 to-gray-100 py-10 px-6 sm:px-12">
      {/* Title Section */}
      <div className="text-center pb-8">
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-4/5 md:w-3/5 mx-auto text-sm md:text-base text-gray-700 leading-relaxed">
          These football T-shirts are the crowd favorites! Check out the best-selling styles now.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {bestSellers.map((item, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 overflow-hidden"
          >
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
            {/* Yellow-themed Shop Now Button */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-center text-sm font-bold py-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Shop Now
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
