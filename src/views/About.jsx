
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import SubFooter from "../components/SubFooter";
import SubNavbar from "../components/SubNavbar";

export default function About() {
  return (


      <div className="w-full bg-white overflow-hidden">
        <SubNavbar />

        {/* Title */}
        <div className=" mt-20 p-10 md:p-20"> 
          <h1 className="text-2xl md:text-4xl font-semibold text-[#447F98] text-shadow-sm text-center mb-6">
            Transforming Workspaces for Better Health and Productivity
          </h1>

          {/* Intro Text */}
          <p className="text-gray-600  text-center text-lg text-shadow-sm leading-relaxed max-w-6xl mx-auto">
            At Office Syndrome Solutions, we understand the challenges of modern work life. Long hours at desks, poor posture, and inadequate equipment contribute to chronic pain and reduced productivity. Our mission is to provide innovative ergonomic solutions that promote wellness, comfort, and efficiency in every workspace. From ergonomic chairs and adjustable desks to supportive accessories, we're committed to helping you work better and feel better.
          </p>
          </div>

      

        {/* Main Content */}
        <div className="p-6 md:p-12">
          

          {/* Feature 1 */}
          <div className="w-full md:w-[70%] mx-auto flex flex-col md:flex-row items-center gap-6 mb-20">
            <div className="shrink-0 w-100 h-100 rounded-full overflow-hidden shadow-lg">
              <img 
                src="/img-prod/side-view-businesswoman-desk-with-notepad.jpg" 
                alt="Medical consultation" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-left md:ml-8">
              <h3 className="text-2xl font-semibold text-[#447F98] text-shadow-sm mb-2">
                Premium Ergonomic Seating Solutions
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg text-shadow-sm">
                Experience ultimate comfort with our scientifically-designed ergonomic chairs. Featuring adjustable lumbar support, breathable mesh materials, and customizable settings, our chairs promote proper posture and reduce back pain during long working hours.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="w-full md:w-[70%] mx-auto flex flex-col md:flex-row items-center gap-6 mb-20">
            <div className="shrink-0 w-100 h-100 rounded-full overflow-hidden shadow-lg">
              <img 
                src="/img-prod/working-from-home-ergonomic-workstation.jpg" 
                alt="Workspace consultation" 
                className="w-full h-full object-cover object-top scale-100"
              />
            </div>
            <div className="flex-1 text-center md:text-left md:ml-8">
              <h3 className="text-2xl font-semibold text-[#447F98] text-shadow-sm mb-2">
                Height-Adjustable Standing Desks
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg text-shadow-sm">
                Transform your workspace with our electric standing desks. Seamlessly switch between sitting and standing positions throughout the day to improve circulation, boost energy levels, and reduce the health risks associated with prolonged sitting.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="w-full md:w-[70%] mx-auto flex flex-col md:flex-row items-center gap-6 mb-10">
            <div className="shrink-0 w-100 h-100 rounded-full overflow-hidden shadow-lg">
              <img 
                src="/img-prod/high-angle-woman-laptop-using-mouse.jpg" 
                alt="Yoga and wellness" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-left md:ml-8">
              <h3 className="text-2xl font-semibold text-[#447F98] text-shadow-sm mb-2 ">
                Ergonomic Accessories & Tools
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg text-shadow-sm">
                Complete your ergonomic setup with our range of supportive accessories including ergonomic mice, keyboard wrist rests, monitor arms, and footrests. Each product is designed to reduce strain and enhance your overall workspace comfort.
              </p>
            </div>
          </div>

          
        </div>
       {/* Hero Image with Overlay */}
        <div className="relative w-full h-96 overflow-hidden md:mb-20">
          <img 
            src="/img-prod/empty-architectural-workplace.jpg" 
            alt="Professional workspace" 
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#447F98]/40 flex flex-col items-center justify-center px-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-white text-shadow-lg text-center mb-4">
              Experience the Difference in Workplace Wellness
            </h2>
            <p className="text-white/95 text-center leading-relaxed mb-6 max-w-2xl text-shadow-lg">
              Join thousands of professionals who have transformed their work experience with our ergonomic solutions. Whether you're experiencing discomfort or looking to prevent future issues, we're here to help you create the perfect workspace.
            </p>
            <Link to="/contact">
            <button className="bg-white text-[#447F98] hover:bg-[#447F98] hover:text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
              Contact Us Today
            </button>
            </Link>
          </div>
        </div>
        <SubFooter />
        <Footer />
      </div>

   )
 };