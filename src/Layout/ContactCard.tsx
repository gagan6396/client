import ContactUsImg from "@/public/contact-us.png";
import Image from "next/image";

export function ContactCard() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-green-50 rounded-lg shadow-lg">
      {/* Left Section: Image */}
      <div className="w-full md:w-1/2">
        <div className="relative overflow-hidden rounded-lg">
        <Image
          src={ContactUsImg}
          alt="Gauraj Valleyfood Pvt. Ltd."
          className="w-full h-auto object-cover"
        />
          {/* Overlay Text */}
          <div className="absolute inset-0 flex flex-col justify-start items-start p-6">
            <span className="text-white text-xl md:text-2xl font-bold bg-black/50 px-4 py-2 rounded-lg mb-2">
              CONTACT US
            </span>
          </div>
        </div>
      </div>

      {/* Right Section: Content */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <p className="text-lg md:text-xl font-medium text-gray-700">
          "Have questions or need support? Contact us today and let&quot;s grow
          something amazing together!"
        </p>
        <button className="mt-6 px-6 py-3 text-white bg-green-900 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-700">
          Contact Now
        </button>
      </div>
    </div>
  );
}
