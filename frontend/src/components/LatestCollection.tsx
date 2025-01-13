import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

interface ProductType {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string[]; // Array of strings
    category: string;
    subCategory: string;
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
            image: Array.isArray(product.image) ? product.image : [product.image] // Ensure image is an array
        }));
        setLatestProducts(updatedProducts.slice(0, 10));
    }, [products]);

    return (
        <div className="my-10">
            <div className="text-center py-8 text-3xl">
                <Title text1="LATEST" text2="COLLECTIONS" />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    latestProducts.map((items, index) => (
                        <ProductItem key={index} id={items.id} image={items.image} name={items.name} price={items.price} />
                    ))
                }
            </div>
        </div>
    );
};

export default LatestCollection;
