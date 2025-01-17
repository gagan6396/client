import logo from "@/public/logo.png";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
const Footer = () => {
  return (
    <div className="white w-full h-auto pt-10">
      {/* Footer */}
      <div className="container mx-auto">
        <div className="grid md:grid-cols-6 gap-6  grid-cols-2">
          <div className="col-span-2 flex items-center flex-col">
            <div className="font-bold py-1">
              <Image src={logo} alt="Logo" width={200} />
            </div>
            <p className=" text-sm py-1">🌿 Gauraaj - Pure. Natural. Sustainable.</p>
            <div className=" flex gap-2 py-1">
              <AiFillFacebook size={24} />
              <AiFillInstagram size={24} />
              <AiFillLinkedin size={24} />
              <AiFillTwitterCircle size={24} />
            </div>
          </div>
          <div>
            <h3 className=" uppercase font-bold">Pages</h3>
            <ul>
              <li className=" text-sm py-1">Home</li>
              <li className=" text-sm py-1">Products</li>
              <li className=" text-sm py-1">About Us</li>
              <li className=" text-sm py-1">Contact Us</li>
            </ul>
          </div>
          <div>
            <h3 className=" uppercase font-bold">Social</h3>
            <ul>
              <li className=" text-sm py-1">Instagram</li>
              <li className=" text-sm py-1">Twitter</li>
              <li className=" text-sm py-1">Facebook</li>
            </ul>
          </div>
          <div>
            <h3 className=" uppercase font-bold">Top Selling Products</h3>
            <ul>
              <li className=" text-sm py-1">Ghee & Oils</li>
              <li className=" text-sm py-1">Hand Grounded Products</li>
              <li className=" text-sm py-1">Herbal Tea</li>
              <li className=" text-sm py-1">Organic Honey</li>
            </ul>
          </div>
          <div>
            <h3 className=" uppercase font-bold">Legal</h3>
            <ul>
              <Link href={"/Terms&Conditions"}>
                <li className=" text-sm py-1">Terms & Conditions</li>
              </Link>
              <Link href={"/PrivacyPolicy"}>
                <li className=" text-sm py-1">Privacy Policy</li>
              </Link>
              <Link href={"/CancellationRefundPolicy"}>
                <li className=" text-sm py-1">Cancellation & Refund Policy</li>
              </Link>
              <Link href={"/ShippingDeliveryPolicy"}>
                <li className=" text-sm py-1">Shipping & Delivery Policy</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <hr />
      </div>
      <div className="container mx-auto p-4">
        <div className=" flex justify-center items-center flex-col md:flex-row gap-3">
          <p className=" text-sm">
            Copyright © {moment().year()} Gauraaj Valleyfood Private Limited.
            All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
