"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();

    const routeToRegister = () => {
        router.push('/register')
    }

    const routeToSignin = () => {
        router.push('/signin')
    }

    return (
        <div className="flex flex-col h-screen w-screen bg-gradient-to-br from-blue-500 to-purple-500 justify-center items-center">
            <div className="flex flex-col gap-10 bg-black/30 backdrop-blur-md p-12 rounded-2xl shadow-2xl justify-center items-center">
                {/* Logo */}
                <Image
                    src="/OfficeCareLogo.png"
                    alt="OfficeCare Logo"
                    width={180}
                    height={180}
                    loading="eager"
                />

                {/* Heading */}
                <p className="flex flex-col gap-2 items-center font-bold font-sans text-4xl text-blue-400">
                    WELCOME TO OFFICE CARE
                </p>

                {/* Buttons */}
                <div className="flex gap-6">
                    <Button
                        onClick={routeToSignin}
                        className="bg-green-500 hover:bg-green-600 text-white"
                    >
                        Sign In
                    </Button>

                    <Button
                        onClick={routeToRegister}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                        Register
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default page;
