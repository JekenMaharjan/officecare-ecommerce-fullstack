"use client"

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
            <div className="flex flex-col gap-8 bg-black/30 backdrop-blur-xl p-12 rounded-2xl shadow-2xl justify-center items-center">

                {/* Logo with hover scale effect */}
                <div className="transform transition-transform duration-500 hover:scale-110">
                    <Image
                        src="/OfficeCareLogo.png"
                        alt="OfficeCare Logo"
                        width={170}
                        height={200}
                        loading="eager"
                    />
                </div>

                {/* Heading with gradient text */}
                <div className="flex flex-col gap-2 items-center font-extrabold text-4xl text-blue-500">
                    <p>WELCOME</p>
                    <p>TO</p>
                    <p>OFFICE CARE</p>
                </div>

                {/* Buttons with hover animation */}
                <div className="flex gap-6 mt-8">
                    <button
                        onClick={routeToSignin}
                        className="bg-green-500 hover:bg-green-600 transform hover:scale-105 transition-all duration-300 text-white"
                    >
                        Sign In
                    </button>

                    <button
                        onClick={routeToRegister}
                        className="bg-blue-500 hover:bg-blue-600 transform hover:scale-105 transition-all duration-300 text-white"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default page;
