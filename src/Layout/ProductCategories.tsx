import Link from "next/link";
import Image from "next/image";


const ProductCategories = () => {
  return (
    <section className="bg-gray-100 py-12">
      {/* Top Offers Section */}
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Top Offers of This Week</h2>
        <div className="flex space-x-4 overflow-x-auto">
          {["/offer1.jpg", "/offer2.jpg", "/offer3.jpg", "/offer4.jpg", "/offer5.jpg"].map((src, index) => (
            <div key={index} className="rounded-full w-20 h-20 overflow-hidden border border-gray-300">
              <img src={src} alt={`Offer ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Best Product Categories Section */}
      <div className="container mx-auto px-6 mt-12">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">BEST PRODUCT CATEGORIES</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { name: "Organic Grains", desc: "Whole, unprocessed grains sourced from sustainable farms.", img: "/millet.png" },
            { name: "Spices", desc: "Fresh, aromatic spices to elevate your cooking.", img: "/spices.png" },
            { name: "Herbs", desc: "Handpicked herbs for medicinal and culinary use.", img: "/herbs.png" },
            { name: "Oils and Ghees", desc: "Nourishing oils for cooking and skincare.", img: "/ghee.png" },
            { name: "Honey", desc: "Raw, organic honey packed with natural goodness and health benefits.", img: "/honey.png" },
          ].map((category, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-full shadow-lg flex flex-col items-center text-center py-8 px-4 space-y-4 hover:shadow-xl transition duration-300 w-30 h-100 object-cover border-2 border-brown-500"
            >
              <Image src={category.img} alt={category.name} width={40} height={40} className="w-20 h-20 object-cover rounded-full border-2 border-green-500" />
              <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.desc}</p>
              <Link href="/" className="text-green-600 font-medium hover:underline">
                View More
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Video and Description Section */}
      <div className="container mx-auto px-6 mt-12">
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
          {/* Video Section */}
          <div className="flex-1">
            <iframe
              className="w-full h-64 md:h-80 rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/CxFQEdI3XvU"
              title="Organic Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Text Section */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-green-800">Discover the Essence of Nature!</h2>
            <p className="text-gray-600 mt-4">
              At Gauraaj, we're dedicated to bringing you pure, organic products straight from the heart of nature.
              Experience the goodness of sustainable living and join us in creating a healthier, greener planet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
