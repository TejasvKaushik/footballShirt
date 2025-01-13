import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';

interface RelatedProductsProps {
  category: string;
  subCategory: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  image: string[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ category, subCategory }) => {
  const [related, setRelated] = useState<Product[]>([]);
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('ShopContext must be used within a ShopProvider');
  }

  const { products } = context;

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = [...products];
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item) => (
          <ProductItem key={item.id} id={item.id} image={item.image} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
