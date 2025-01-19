import organicImage from "@/public/About/organic-collection.png";
import Image from "next/image";

export function OrganicCollection() {
  return (
    <div className="bg-yellow-500 py-12 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Left Content */}
        <div className="text-center md:text-left space-y-6 max-w-lg">
          <h2 className="text-3xl font-bold text-white leading-snug">
            Browse Our Organic Collection and Taste the Difference!
          </h2>
          <p className="text-white text-base leading-relaxed">
            Looking for healthy, chemical-free products? Gauraaj’s organic
            collection is curated to bring you the best nature has to offer.
            Whether it&apos;s for cooking, skincare, or your wellness, our handpicked
            products will make a difference in your daily life. Browse our
            collection and taste the true difference today!
          </p>
          <button className="px-6 py-3 bg-black text-white rounded-md shadow-lg hover:bg-gray-800">
            Shop Now
          </button>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2">
          <Image
            src={organicImage}
            alt="Browse Our Organic Collection"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default OrganicCollection;
