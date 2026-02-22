"use client"

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar() {
    const [cartCount, setCartCount] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    const router = useRouter();

    useEffect(() => {
        // Call immediately on mount
        fetchCartCount();

        // Set interval to call every 5 seconds (5000ms)
        const interval = setInterval(() => {
            fetchCartCount();
        }, 5000);

        // Cleanup on unmount
        return () => clearInterval(interval);
    }, []); // empty dependency array so it runs once on mount

    const fetchCartCount = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/cart/count`,
                { withCredentials: true }
            );
            setCartCount(data.count);
        } catch (err) {
            setCartCount(0);
        }
    };

    return (
        <nav className="bg-gray-900 text-white">
            <div className="max-w-6xl mx-auto flex items-center justify-between p-2">
                {/* Logo */}
                <div className="flex items-center gap-5">
                    <Image
                        src="/OfficeCareLogo.png"
                        alt="OfficeCare Logo"
                        width={90}
                        height={90}
                        loading="eager"
                    />
                    <p className="text-2xl md:text-3xl font-bold text-blue-500">OFFICE CARE</p>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-6 items-center">
                    <Link className="font-semibold text-lg hover:text-blue-400" href="/customer/products">
                        Products
                    </Link>

                    <Link href="/customer/cart" className="relative inline-flex items-center justify-center">
                        <ShoppingCart className="w-6 h-6" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <Button
                        onClick={() => {
                            localStorage.removeItem("token");
                            router.push("/signin");
                        }}
                        className="bg-red-500 text-white hover:bg-red-600 border-none"
                    >
                        Logout
                    </Button>

                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-white focus:outline-none"
                    >
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-gray-800 px-5 py-4 space-y-4">
                    <Link
                        className="block font-semibold text-lg hover:text-blue-400"
                        href="/customer/products"
                        onClick={() => setMenuOpen(false)}
                    >
                        Products
                    </Link>

                    <Link
                        href="/customer/cart"
                        className="relative inline-flex items-center justify-center"
                        onClick={() => setMenuOpen(false)}
                    >
                        <ShoppingCart className="w-6 h-6 mr-2" />
                        Cart
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <Button
                        onClick={() => {
                            localStorage.removeItem("token");
                            router.push("/signin");
                            setMenuOpen(false);
                        }}
                        className="bg-red-500 text-white hover:bg-red-600 border-none w-full"
                    >
                        Logout
                    </Button>

                    <div className="flex items-center gap-3 mt-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span>User</span>
                    </div>
                </div>
            )}
        </nav>
    );
}