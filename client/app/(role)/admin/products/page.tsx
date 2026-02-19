"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

type Product = {
    _id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

const AdminProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/products");
            setProducts(response.data);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    const addProduct = async() => {
        try {
            await axios.post(process.env.NEXT_PUBLIC_API_URL + "/products");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div className="min-h-full w-full bg-gray-100/50 py-12 px-6 rounded-md">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-10 text-center">
                    Admin Panel
                </h1>

                <div className="flex justify-end mb-5">
                    <Button
                        onClick={addProduct}
                        className="bg-green-500 hover:bg-green-600">
                        Add Product
                    </Button>
                </div>

                <div>
                    <Table>
                        <TableCaption>A list of available products.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">
                                    Product Name
                                </TableHead>

                                <TableHead>
                                    Description
                                </TableHead>

                                {/* <TableHead>
                                    Stock
                                </TableHead> */}

                                <TableHead className="text-center">
                                    Image
                                </TableHead>

                                <TableHead className="text-center">
                                    Price (Rs.)
                                </TableHead>

                                <TableHead className="text-center">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product._id}>
                                    <TableCell className="font-medium">
                                        {product.name}
                                    </TableCell>

                                    <TableCell>
                                        {product.description}
                                    </TableCell>

                                    {/* <TableCell>
                                        {product.stock}
                                    </TableCell> */}

                                    <TableCell className="flex justify-center">
                                        {product.image
                                            ? <FaCheckCircle />
                                            : <FaCircleXmark />}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        {product.price}
                                    </TableCell>

                                    <TableCell className="flex justify-center gap-5">
                                        <Button
                                            className="bg-blue-500 hover:bg-blue-600"
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            className="bg-red-500 hover:bg-red-600"
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;