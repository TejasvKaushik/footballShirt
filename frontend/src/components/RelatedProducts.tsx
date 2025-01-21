import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';

interface RelatedProductsProps {
  club: string;
  supplier: string;
}

interface Product {
  _id: string;
  name: string;
  club: string;
  supplier: string;
  price: number;
  image: string[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ club, supplier }) => {
  const [related, setRelated] = useState<Product[]>([]);
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('ShopContext must be used within a ShopProvider');
  }

  const { products } = context;

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = [...products];
      productsCopy = productsCopy.filter((item) => club === item.club);
      productsCopy = productsCopy.filter((item) => supplier === item.supplier);
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, club, supplier]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
          <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
