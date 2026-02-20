import Navbar from "@/components/admin/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen max-w-screen flex flex-col overflow-hidden">
            <Navbar />

            <main className="flex-1 overflow-auto bg-gradient-to-br from-blue-500 to-purple-500 flex justify-center items-center p-10">
                {children}
            </main>

            <Footer />
            <Toaster />
        </div>
    );
}
