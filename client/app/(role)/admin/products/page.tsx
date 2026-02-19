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
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup } from "@/components/ui/field";

type Product = {
    _id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

const AdminProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState<File | null>(null);


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

    const addProduct = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);

            if (image) {
                formData.append("image", image);
            }

            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, formData);

            toast.success("Product created successfully!");

            getAllProducts();

            setName("");
            setDescription("");
            setPrice("");
            setImage(null);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };


    return (
        <div className="min-h-full w-full bg-gray-100/50 py-12 px-6 rounded-md">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-10 text-center">
                    Admin Panel
                </h1>

                <div className="flex justify-end mb-5">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                className="bg-green-500 border-none text-white hover:text-white hover:bg-green-600" variant="outline">
                                Add Product
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-sm">
                            <form onSubmit={addProduct}>
                                <DialogHeader>
                                    <DialogTitle>Add Product</DialogTitle>

                                    <DialogDescription>
                                        Add product here. Click save when you&apos;re done.
                                    </DialogDescription>
                                </DialogHeader>

                                <FieldGroup className="flex flex-col gap-4 mt-5">
                                    <Field>
                                        <Label htmlFor="productName">Product Name</Label>
                                        <Input 
                                            type="text" 
                                            id="productName" 
                                            name="productName" 
                                            placeholder="Enter product name" 
                                            onChange={(e) => setName(e.target.value)} 
                                        />
                                    </Field>

                                    <Field>
                                        <Label htmlFor="productDescription">Description</Label>
                                        <Input 
                                            type="text" 
                                            id="productDescription" 
                                            name="productDescription" 
                                            placeholder="Enter product description" 
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Field>

                                    <Field>
                                        <Label htmlFor="productPrice">Price</Label>
                                        <Input 
                                            type="number" 
                                            id="productPrice" 
                                            name="productPrice" 
                                            placeholder="Enter product price" 
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </Field>

                                    <Field>
                                        <Label htmlFor="productImage">Image</Label>
                                        <Input 
                                            type="file" 
                                            id="productImage" 
                                            name="productImage" 
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (e.target.files) {
                                                    setImage(e.target.files[0]);
                                                }
                                            }}
                                        />
                                    </Field>
                                </FieldGroup>

                                <DialogFooter className="flex gap-5 mt-3">
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>

                                    <Button type="submit" className="bg-green-500 hover:bg-green-600 border-none">Save</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
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