import ContactUsImg from "@/public/l2.jpg";
import Image from "next/image";

export function ContactCard() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-lg">
      {/* Left Section: Image */}
      <div className="w-full md:w-1/2">
        <div className="relative overflow-hidden rounded-lg">
          <Image
            src={ContactUsImg}
            alt="Gauraj Valleyfood Pvt. Ltd."
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Right Section: Content */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <p className="text-lg md:text-xl font-medium text-gray-700">
          &quot;Have questions or need support? Contact us today and let&quot;s
          grow something amazing together!&quot;
        </p>
        <button className="mt-6 px-6 py-3 text-white bg-green-900 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-700">
          Contact Now
        </button>
      </div>
    </div>
  );
}
