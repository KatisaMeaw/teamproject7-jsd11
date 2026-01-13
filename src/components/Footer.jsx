export default function Footer() {
    return (
<footer className="bg-gray-50 py-10 md:py-10 flex  justify-center pl-10 md:pl-0">
    <div className="">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-x-45">

            <div className="col-span-2 md:col-span-1 ">
                <h3 className="text-teal-600 text-xl font-bold mb-4 tracking-wider">RELIEF</h3>
                <address className="text-gray-500 text-sm not-italic leading-relaxed">
                    400 University Drive Suite 200 Coral<br />
                    Gables,<br />
                    BKK 10300 THA
                </address>
                

            </div>

            <div className="">
                <h4 className="text-gray-500 text-sm font-normal uppercase mb-4 tracking-wider">Links</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:text-gray-700 text-teal-600 text-sm">Home</a></li>
                    <li><a href="#" className="hover:text-gray-700 text-teal-600 text-sm">Shop</a></li>
                    <li><a href="#" className="hover:text-gray-700 text-teal-600 text-sm">About</a></li>
                    <li><a href="#" className="hover:text-gray-700 text-teal-600 text-sm">Contact</a></li>
                </ul>
            </div>

            <div className="">
                <h4 className="text-gray-500 text-sm font-normal uppercase mb-4 tracking-wider">Help</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:text-gray-700 text-teal-600 text-sm">Payment Options</a></li>
                    <li><a href="#" className="hover:text-gray-700 text-teal-600 text-sm">Returns</a></li>
                    <li><a href="#" className="hover:text-gray-700 text-teal-600 text-sm">Privacy Policies</a></li>
                </ul>
            </div>

            <div>
                <h4 className="text-gray-500 text-sm font-normal uppercase mb-4 tracking-wider">Newsletter</h4>
                <form className="flex border-b border-gray-400">
                    <input type="email" placeholder="Enter Your Email Address" className="grow bg-transparent border-none focus:outline-none placeholder-gray-400 text-sm py-2" aria-label="Enter your email address" />
                    <button type="submit" className="text-teal-600 font-semibold text-sm py-2 px-2 uppercase tracking-wider hover:text-teal-800 transition duration-150">SUBSCRIBE</button>
                </form>
            </div>

        </div>

        <div className="mt-12 pt-8 border-t ">
            <p className="text-xs text-[#447F98]">
                ©2025 Relief All rights reserved
            </p>
        </div>
    </div>
  </footer>
    );
}