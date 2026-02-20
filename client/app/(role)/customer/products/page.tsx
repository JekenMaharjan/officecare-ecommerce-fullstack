"use client"

import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Product = {
    _id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

const CustomerProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/products");
            setProducts(data);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div className="min-h-full w-full bg-gray-100/50 p-6 rounded-md">
            <div className="px-5 pb-5 w-full">
                <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
                    Our Products
                </h1>

                {products && products.length > 0 ? (
                        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                            {products.map((product) => (
                                <Card
                                    key={product._id}
                                    className="flex flex-col gap-0 group overflow-hidden justify-between p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                                >
                                    <CardContent className="text-center p-0">
                                        <div className="relative flex justify-center w-full h-52 overflow-hidden border-2 border-blue-400 rounded-md p-5">
                                            {product?.image && (
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`}
                                                    alt={product.name}
                                                    height={170}
                                                    width={170}
                                                    unoptimized
                                                    loading="eager"
                                                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                                                />
                                            )}
                                        </div>

                                        <CardTitle className="text-xl font-semibold line-clamp-1 mt-2">
                                            {product.name}
                                        </CardTitle>

                                        <CardDescription className="text-sm text-gray-600 line-clamp-2">
                                            {product.description}
                                        </CardDescription>

                                        <p className="mt-1 font-bold text-lg text-blue-600">
                                            Rs. {product.price}
                                        </p>
                                    </CardContent>

                                    <CardFooter>
                                        <button className="mt-1 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                                            Add to Cart
                                        </button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                    <p className="text-sm text-center mt-10">No Products...</p>
                )}
            </div>
        </div>
    );
};

export default CustomerProducts;