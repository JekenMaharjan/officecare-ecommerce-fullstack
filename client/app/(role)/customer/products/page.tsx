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

    const getAllProducts = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/products");
            setProducts(response.data);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <div className="min-h-full w-full bg-gray-100/50 py-12 px-6 rounded-md">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-10 text-center">
                    Our Products
                </h1>

                {products && products.length > 0 ? (
                        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {products.map((product) => (
                                <Card
                                    key={product._id}
                                    className="flex flex-col gap-0 group overflow-hidden p-0 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="relative w-full h-52 overflow-hidden">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`}
                                            alt={product.name}
                                            fill
                                            unoptimized
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>

                                    <CardContent className="p-4 text-center">
                                        <CardTitle className="text-xl font-semibold mb-2">
                                            {product.name}
                                        </CardTitle>

                                        <CardDescription className="text-sm text-gray-600 line-clamp-2">
                                            {product.description}
                                        </CardDescription>

                                        <p className="mt-3 font-bold text-lg text-blue-600">
                                            Rs. {product.price}
                                        </p>

                                        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                                            Add to Cart
                                        </button>
                                    </CardContent>
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