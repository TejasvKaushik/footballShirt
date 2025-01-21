import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[]; // Array of strings
  club: string;
  supplier: string;
  sizes: string[];
  date: number;
  bestseller: boolean;
}

const LatestCollection: React.FC = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('LatestCollection must be used within a ShopContextProvider');
  }

  const { products } = context;

  const [latestProducts, setLatestProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const updatedProducts = products.map(product => ({
      ...product,
      image: Array.isArray(product.image) ? product.image : [product.image], // Ensure image is an array
    }));
    setLatestProducts(updatedProducts.slice(0, 10));
  }, [products]);

  return (
    <div className="my-12 bg-gradient-to-b from-blue-50 to-gray-100 py-10 px-6 sm:px-12">
      {/* Title Section */}
      <div className="text-center pb-8">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="w-4/5 md:w-3/5 mx-auto text-sm md:text-base text-gray-700 leading-relaxed">
          Discover the freshest football T-shirt styles, blending performance and fan pride. Shop now and stay ahead of the game!
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {latestProducts.map((item, index) => (
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
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-green-500 to-blue-600 text-white text-center text-sm font-bold py-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Add to Cart
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
