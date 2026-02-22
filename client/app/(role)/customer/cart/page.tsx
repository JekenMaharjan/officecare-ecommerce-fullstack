"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Card, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    quantityInCart: number;
};

const CustomerCart = () => {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [cartCount, setCartCount] = useState(0);
    const [removingId, setRemovingId] = useState<string | null>(null);

    useEffect(() => {
        fetchCartItems();
        fetchCartCount();
    }, []);

    const fetchCartItems = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/cart/items`,
                { withCredentials: true }
            );

            // Ensure items is always an array
            const itemsArray = data?.items || [];

            const items = itemsArray.map((item: any) => ({
                _id: item.product._id,
                name: item.product.name,
                description: item.product.description,
                price: item.product.price,
                stock: item.product.stock,
                image: item.product.image,
                quantityInCart: item.quantity
            }));

            setCartItems(items);
        } catch (error) {
            toast.error("Failed to fetch cart items!");
            setCartItems([]);
        }
    };

    const fetchCartCount = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/count`, {
                withCredentials: true
            });
            setCartCount(data.count);
        } catch {
            setCartCount(0);
        }
    };

    const handleRemoveFromCart = async (productId: string, quantity: number) => {
        try {
            setRemovingId(productId);

            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/cart/remove`,
                { productId, quantity },
                { withCredentials: true }
            );

            // Update cart items locally
            setCartItems(prev => prev.filter(item => item._id !== productId));

            // Decrease cart count
            setCartCount(prev => prev - quantity);

            toast.success("Removed from cart!");
        } catch {
            toast.error("Failed to remove from cart!");
        } finally {
            setRemovingId(null);
        }
    };

    return (
        <div className="min-h-full w-6xl bg-gray-100/50 p-6 rounded-md">
            <h1 className="text-4xl font-bold text-center mb-6">Your Cart</h1>

            {cartItems.length === 0 ? (
                <p className="text-center text-gray-700">Your cart is empty!</p>
            ) : (
                <div className="flex flex-col gap-5">
                    {cartItems?.map((item) => (
                        <Card key={item._id} className="p-5 m-0">
                            <CardContent className="flex justify-between items-center group max-w-full">
                                <div className="relative w-40 h-40">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${item.image}`}
                                        alt={item.name}
                                        height={170}
                                        width={170}
                                        unoptimized
                                        loading="eager"
                                        className="object-contain w-auto h-auto transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 w-sm">
                                    <CardTitle className="text-xl font-semibold">{item.name}</CardTitle>
                                    <CardDescription className="text-sm text-gray-600 line-clamp-2">
                                        {item.description}
                                    </CardDescription>
                                </div>
                                <p className="font-semibold text-center text-blue-600 w-25">Rs. {item.price}</p>
                                <div className="w-30 mt-10 text-center">
                                    <p className="font-semibold">Quantity: {item.quantityInCart}</p>
                                    <p className="text-sm mt-5"><strong className="font-medium">Total:</strong> {(item.quantityInCart) * (item.price)}</p>
                                </div>
                                <Button
                                    onClick={() => handleRemoveFromCart(item._id, item.quantityInCart)}
                                    disabled={removingId === item._id}
                                    className="bg-red-500 hover:bg-red-600"
                                >
                                    {removingId === item._id ? "Removing..." : "Remove from Cart"}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            <p className="mt-6 text-right font-semibold text-gray-800 text-md mr-2">
                Total Items: {cartCount}
            </p>
        </div>
    );
};

export default CustomerCart;