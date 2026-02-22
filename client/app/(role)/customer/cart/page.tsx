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
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/items`, { withCredentials: true });
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
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/count`, { withCredentials: true });
            setCartCount(data.count);
        } catch {
            setCartCount(0);
        }
    };

    // Remove ALL quantity of a product from cart
    const handleRemoveFromCart = async (productId: string, quantity: number) => {
        try {
            setRemovingId(productId);
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
                data: { productId, quantity },
                withCredentials: true
            });

            // Update UI
            setCartItems(prev => prev.filter(item => item._id !== productId));
            setCartCount(prev => prev - quantity);

            toast.success("Removed from cart!");
        } catch {
            toast.error("Failed to remove from cart!");
        } finally {
            setRemovingId(null);
        }
    };

    // Remove just 1 quantity of a product
    const handleRemoveOne = async (productId: string) => {
        try {
            setRemovingId(productId);

            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/remove`, {
                data: { productId },
                withCredentials: true
            });

            // Update UI
            setCartItems(prev =>
                prev
                    .map(item =>
                        item._id === productId
                            ? { ...item, quantityInCart: item.quantityInCart - 1 }
                            : item
                    )
                    .filter(item => item.quantityInCart > 0)
            );

            setCartCount(prev => prev - 1);
            toast.success("Removed 1 item from cart!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to remove 1 item!");
        } finally {
            setRemovingId(null);
        }
    };

    

    return (
        <div className="min-h-full w-6xl bg-gray-100/50 p-6 rounded-md mx-auto">
            <h1 className="text-4xl font-bold text-center mb-6">Your Cart</h1>

            {cartItems.length === 0 ? (
                <p className="text-center text-gray-700">Your cart is empty!</p>
            ) : (
                <div className="flex flex-col gap-5">
                    {cartItems.map(item => (
                        <Card key={item._id} className="p-5">
                            <CardContent className="flex justify-between items-center">
                                <div className="relative w-40 h-40">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${item.image}`}
                                        alt={item.name}
                                        height={170}
                                        width={170}
                                        unoptimized
                                        className="object-contain w-auto h-auto"
                                    />
                                </div>

                                <div className="flex flex-col gap-2 w-sm">
                                    <CardTitle className="text-xl font-semibold">{item.name}</CardTitle>
                                    <CardDescription className="text-sm text-gray-600 line-clamp-2">{item.description}</CardDescription>
                                </div>

                                <p className="font-semibold text-center text-blue-600 w-25">Rs. {item.price}</p>

                                <div className="w-30 mt-7 text-center">
                                    <p className="font-semibold">Quantity: {item.quantityInCart}</p>
                                    <p className="text-sm mt-2"><strong>Total:</strong> Rs. {item.quantityInCart * item.price}</p>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between gap-5">
                                        <Button onClick={() => handleAddOne(item._id)} className="w-15 text-xl bg-green-500 hover:bg-green-600">
                                            +
                                        </Button>
                                        <Button onClick={() => handleRemoveOne(item._id)} className="w-15 text-xl bg-red-500 hover:bg-red-600">
                                            -
                                        </Button>
                                    </div>

                                    <Button className="bg-yellow-500 hover:bg-yellow-600">
                                        Checkout
                                    </Button>

                                    <Button
                                        onClick={() => handleRemoveFromCart(item._id, item.quantityInCart)}
                                        disabled={removingId === item._id}
                                        className="bg-red-500 hover:bg-red-600"
                                    >
                                        {removingId === item._id ? "Removing..." : "Remove from Cart"}
                                    </Button>
                                </div>
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