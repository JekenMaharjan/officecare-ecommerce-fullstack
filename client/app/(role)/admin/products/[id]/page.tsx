"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Label } from "@/components/ui/label";

type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
};

const UpdateProductPage = () => {
    const router = useRouter();

    // This reads the dynamic part of your URL
    const params = useParams();
    const id = params.id as string; // Take the id value from the URL and treat it as a string

    const [product, setProduct] = useState<Product | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState<File | null>(null);
    
    useEffect(() => {
        if (!id) return;
        getProduct();
    }, [id]);

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);

            setProduct(data);
            setName(data.name);
            setDescription(data.description);
            setPrice(String(data.price));
            setStock(String(data.price));

        } catch (error) {
            toast.error("Product not found !");
        }
    };

    const updateProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("stock", stock);

            if (image) formData.append("image", image);

            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, formData);

            toast.success("Product updated successfully !!");
            router.push("/admin/products");
        } catch (error: any) {
            toast.error("Failed to update product !");
        }
    };

    if (!product) return <p className="text-center mt-10">Loading product...</p>;

    return (
        <div className="max-h-full w-5xl md:w-3xl bg-gray-100/50 py-12 px-20 md:px-10 rounded-md">
            <div className="flex gap-8">
                {/* Product Details Card */}
                <Card className="flex w-md">
                    <CardHeader>
                        <CardTitle className="text-xl">Product Details</CardTitle>
                        <CardDescription>Check product details here!</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="flex justify-center relative w-full h-65 border-2 border-blue-400 rounded-md p-1">
                            {product?.image && (
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`}
                                    alt={product.name}
                                    height={200}
                                    width={200}
                                    unoptimized
                                    loading="eager"
                                    className="object-cover rounded-md"
                                />
                            )}
                        </div>
                        
                        <p className="line-clamp-1"><strong>Name:</strong> {product?.name}</p>
                        <p className="line-clamp-2"><strong>Description:</strong> {product?.description}</p>
                        <p className="line-clamp-1"><strong>Price:</strong> Rs. {product?.price}</p>
                        <p className="line-clamp-1"><strong>Stock:</strong> {product?.stock}</p>
                    </CardContent>
                </Card>

                {/* Update Product Card */}
                <Card className="flex w-md">
                    <CardHeader>
                        <CardTitle className="text-xl">Update Product</CardTitle>
                        <CardDescription>Update product here!</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={updateProduct} className="flex flex-col gap-4 mt-3">
                            <Label htmlFor="productName">Product Name</Label>
                            <Input
                                value={product.name}
                                id="productName" 
                                name="productName" 
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Product Name"
                                required
                            />

                            <Label htmlFor="productDescription">Product Description</Label>
                            <Input
                                value={product.description}
                                id="productDescription" 
                                name="productDescription" 
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                                required
                            />

                            <Label htmlFor="productPrice">Product Price</Label>
                            <Input
                                type="number"
                                value={product.price}
                                id="productPrice" 
                                name="productPrice" 
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Price"
                                required
                            />

                            <Label htmlFor="productStock">Product Stock</Label>
                            <Input
                                type="number"
                                value={product.stock}
                                id="productStock" 
                                name="productStock" 
                                onChange={(e) => setStock(e.target.value)}
                                placeholder="Stock"
                                required
                            />

                            <Label htmlFor="productImage">Product Image</Label>
                            <Input
                                type="file"
                                id="productImage" 
                                name="productImage" 
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files?.[0] || null)}
                            />
                            {image && (
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="New Preview"
                                    className="w-full h-64 object-cover rounded-md mt-2"
                                />
                            )}
                            <Button type="submit" className="bg-green-500 hover:bg-green-600 mt-7">
                                Update
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default UpdateProductPage;
