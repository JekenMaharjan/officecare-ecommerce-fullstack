import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between p-6 bg-gray-900 text-white">
            <Link
                className="text-3xl font-bold text-blue-400"
                href="/customer/products"
            >
                OFFICE CARE
            </Link>

            <div className="flex gap-10 items-center">
                <Link
                    className="font-semibold text-lg"
                    href="/customer/products"
                >
                    Products
                </Link>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png"/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </nav>
    );
};
