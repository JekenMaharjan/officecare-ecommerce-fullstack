"use client"

import Link from "next/link";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function Navbar() {
    const [cartCount, setCartCount] = useState(0);

    const router = useRouter();

    useEffect(() => {
        fetchCartCount();
    }, []);

    const fetchCartCount = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/cart/count`,
                { withCredentials: true }
            );
            setCartCount(data.count);
        } catch (err) {
            // toast.error("Failed fetching cart count !!");
            setCartCount(0);
        }
    };


    return (
        <nav className="flex items-center justify-between p-2 bg-gray-900 text-white">
            <div className="flex gap-5 items-center ml-5">
                <Image
                    src="/OfficeCareLogo.png"
                    alt="OfficeCare Logo"
                    width={90}
                    height={90}
                    loading="eager"
                />
                <p className="text-4xl font-bold text-blue-400">OFFICE CARE</p>
            </div>

            <div className="flex gap-10 items-center">
                <Link
                    className="font-semibold text-lg"
                    href="/customer/products"
                >
                    Products
                </Link>

                <Link
                    href="/customer/cart"
                    className="relative inline-flex items-center justify-center"
                >
                    <ShoppingCart className="w-6 h-6" />

                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                            {cartCount}
                        </span>
                    )}
                </Link>

                {/* Logout button */}
                <Button
                    onClick={() => {
                        localStorage.removeItem("token"); // remove JWT from localStorage
                        router.push("/signin"); // redirect to login page
                    }}
                    className="bg-red-500 text-white hover:bg-red-600 border-none"
                >
                    Logout
                </Button>

                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png"/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </nav>
    );
};
