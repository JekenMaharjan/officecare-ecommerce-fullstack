"use client"

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function Navbar() {
    const router = useRouter();

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
                    href="/admin/products"
                >
                    Products
                </Link>

                <Link
                    className="font-semibold text-lg"
                    href="/admin/products"
                >
                    Cart
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
