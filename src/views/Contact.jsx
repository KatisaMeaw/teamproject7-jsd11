import Footer from "../components/Footer";
import SubFooter from "../components/SubFooter";
import SubNavbar from "../components/SubNavbar";
import { MapPin, Phone, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <>
    <SubNavbar />
    <div className="max-w-7xl mx-auto px-4 py-16 font-sans">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold mb-4">Get In Touch With Us</h1>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
          For More Information About Our Product & Services. Please Feel Free To Drop Us 
          An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">

        {/* Left Side: Contact Info */}
        <div className="space-y-10 pl-4 md:pl-12">
          {/* Address */}
          <div className="flex gap-4">
            <MapPin className="w-6 h-6 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-1">Address</h3>
              <p className="text-gray-600 leading-snug">
                999/9 Rama I Rd, Pathum<br />
                Wan, Bangkok 10330<br />
                Thailand
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex gap-4">
            <Phone className="w-6 h-6 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-1">Phone</h3>
              <p className="text-gray-600">Mobile: +(66) 123-4567</p>
              <p className="text-gray-600">Hotline: +(66) 234-5678</p>
            </div>
          </div>

          {/* Working Time */}
          <div className="flex gap-4">
            <Clock className="w-6 h-6 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-1">Working Time</h3>
              <p className="text-gray-600">
                Monday-Friday: 9:00 - 22:00
              </p>
              <p className="text-gray-600">
                Saturday-Sunday: 9:00 - 21:00
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Your name</label>
            <input
              type="text"
              placeholder="Abc"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email address</label>
            <input
              type="email"
              placeholder="Abc@def.com"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Subject</label>
            <input
              type="text"
              placeholder="This is an optional"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Message</label>
            <textarea
              rows="4"
              placeholder="Hi! I'd like to ask about" 
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <button className="w-40 py-3 bg-[#4F8A9C] text-white rounded-md hover:bg-[#3d6b7a] transition-colors">
            Submit
          </button>
        </div>

      </div>
    </div>
    <SubFooter />
    <Footer />
    </>
  );
};

export default Contact;