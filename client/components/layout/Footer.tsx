export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-10 px-5">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                {/* Company Info */}
                <div>
                    <h3 className="font-bold text-lg mb-3">OfficeCare</h3>
                    <p className="text-gray-400 text-sm">
                        Your one-stop shop for office supplies and equipment. Quality products at the best prices.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-bold text-lg mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li><a href="#" className="hover:text-white">Home</a></li>
                        <li><a href="#" className="hover:text-white">Shop</a></li>
                        <li><a href="#" className="hover:text-white">About Us</a></li>
                        <li><a href="#" className="hover:text-white">Contact</a></li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div>
                    <h3 className="font-bold text-lg mb-3">Customer Service</h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li><a href="#" className="hover:text-white">FAQ</a></li>
                        <li><a href="#" className="hover:text-white">Returns</a></li>
                        <li><a href="#" className="hover:text-white">Shipping Info</a></li>
                        <li><a href="#" className="hover:text-white">Support</a></li>
                    </ul>
                </div>

                {/* Newsletter & Social */}
                <div>
                    <h3 className="font-bold text-lg mb-3">Newsletter</h3>
                    <p className="text-gray-400 text-sm mb-3">Subscribe for the latest updates & offers.</p>
                    <form className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="p-2 rounded text-gray-900 flex-1"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
                        >
                            Subscribe
                        </button>
                    </form>

                    <div className="flex gap-3 mt-5 flex-wrap">
                        <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                        <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                        <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                        <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
                    </div>
                </div>

            </div>

            <div className="border-t border-gray-700 mt-8 pt-5 text-gray-400 text-sm text-center">
                &copy; {new Date().getFullYear()} OfficeCare. All rights reserved.
            </div>
        </footer>
    );
}