import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Quick Links Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* About Us Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">About Us</h3>
          <p className="text-gray-400">
            We are an online store committed to delivering quality products to
            our customers. From fashion to electronics, we provide a wide range
            of items at great prices.
          </p>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Contact Information Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
          <ul className="space-y-2">
            <li className="text-gray-400">
              <strong>Email:</strong> contact@store.com
            </li>
            <li className="text-gray-400">
              <strong>Phone:</strong> +1 234 567 890
            </li>
            <li className="text-gray-400">
              <strong>Address:</strong> 123 E-Commerce St, New York, NY 10001
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} E-Commerce Store. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
