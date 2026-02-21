"use client"

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

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
                    <Link className="font-semibold text-lg hover:text-blue-400" href="/admin/products">
                        Products
                    </Link>
                    <Link className="font-semibold text-lg hover:text-blue-400" href="/admin/cart">
                        Cart
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
                        href="/admin/products"
                        onClick={() => setMenuOpen(false)}
                    >
                        Products
                    </Link>

                    <Link
                        className="block font-semibold text-lg hover:text-blue-400"
                        href="/admin/cart"
                        onClick={() => setMenuOpen(false)}
                    >
                        Cart
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
                        <span>Admin</span>
                    </div>
                </div>
            )}
        </nav>
    );
}