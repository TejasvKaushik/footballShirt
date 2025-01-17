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
        <div className="my-10">
            <div className="text-center text-3xl py-8">
                <Title text1="BEST" text2="SELLERS" />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {bestSellers.map((item, index) => (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))}
            </div>
        </div>
    );
};

export default BestSeller;
