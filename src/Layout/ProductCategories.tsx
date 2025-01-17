import arsa from "@/public/arsa.jpg";
import buransh from "@/public/buransh-tea.jpg";
import chamomile from "@/public/chamomile-tea.jpg";
import ghee from "@/public/ghee.jpg";
import ghee1 from "@/public/ghee1.png";
import gujiye from "@/public/gujiye.jpg";
import honey from "@/public/honey.jpg";
import honey1 from "@/public/honey1.png";
import mixSweets from "@/public/mix-sweets.jpg";
import moongdaalLadoo from "@/public/moongdaal-ladoo.jpg";
// import nettleTea from "@/public/nettle-tea.jpg";
import herbs from "@/public/herbs.png";
import millet from "@/public/millet.png";
import normalAtta from "@/public/normal-atta.jpg";
import rotana from "@/public/rotana.jpg";
import spices from "@/public/spices.png";
import Image from "next/image";
import Link from "next/link";

const ProductCategories = () => {
  return (
    <section className=" px-5 py-14">
      {/* Top Offers Section */}
      <div className="container mx-auto">
        <h1 className=" text-4xl text-center font-bold py-5">
          TOP OFFERS OF THIS WEEK
        </h1>
        <div className=" grid grid-cols-5 gap-5">
          {[
            { image: honey, title: "HONEY" },
            { image: moongdaalLadoo, title: "MOONGDAAL LADOO" },
            { image: rotana, title: "ROTANA" },
            { image: gujiye, title: "GUJIYA" },
            { image: chamomile, title: "CHAMOMILE TEA" },
            { image: mixSweets, title: "MIX SWEETS" },
            {
              image: normalAtta,
              title: "NORMAL ATTA",
            },
            {
              image: buransh,
              title: "BURANSH TEA",
            },
            {
              image: arsa,
              title: "ARSA",
            },
            {
              image: ghee,
              title: "GHEE",
            },
          ].map((item: any, index) => (
            <div key={index} className=" pb-5 hover:scale-105">
              <Image
                src={item.image}
                alt={`Offer ${index + 1}`}
                className="object-cover rounded-md w-full h-full"
              />
              <div className="text-center text-xl">{item.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Product Categories Section */}
      <div className="container mx-auto my-12">
        <h2 className="text-center text-4xl font-bold text-gray-800 py-5">
          BEST PRODUCT CATEGORIES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 pt-5">
          {[
            {
              name: "Organic Grains",
              desc: "Whole, unprocessed grains sourced from sustainable farms.",
              img: millet,
            },
            {
              name: "Spices",
              desc: "Fresh, aromatic spices to elevate your cooking.",
              img: spices,
            },
            {
              name: "Herbs",
              desc: "Handpicked herbs for medicinal and culinary use.",
              img: herbs,
            },
            {
              name: "Oils and Ghees",
              desc: "Nourishing oils for cooking and skincare.",
              img: ghee1,
            },
            {
              name: "Honey",
              desc: "Raw, organic honey packed with natural goodness and health benefits.",
              img: honey1,
            },
          ].map((category, index) => (
            <div
              key={index}
              className="bg-white  border-gray-200 rounded-full shadow-lg flex flex-col items-center text-center py-8 px-4 space-y-4 hover:shadow-xl transition duration-300 w-30 h-100 object-cover border-2 border-brown-500 justify-between hover:scale-105"
            >
              <Image
                src={category.img}
                alt={category.name}
                width={100}
                height={100}
                className="w-40 h-40 object-cover rounded-full"
              />
              <h3 className="text-lg font-semibold text-gray-800 font-bold">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600">{category.desc}</p>
              <Link href="/" className="font-medium hover:underline">
                View More
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Video and Description Section */}
      <div className="container mx-auto py-14">
        <div className="flex flex-col md:flex-row items-center gap-5">
          {/* Video Section */}
          <div className="flex-1">
            <iframe
              className="w-full aspect-video rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/CxFQEdI3XvU"
              title="Organic Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Text Section */}
          <div className="flex-1">
            <h2 className="font-bold text-4xl py-4">
              Discover the Essence of Nature!
            </h2>
            <p className="text-gray-600 mt-4 text-xl">
              At Gauraaj, we're dedicated to bringing you pure, organic products
              straight from the heart of nature. Experience the goodness of
              sustainable living and join us in creating a healthier, greener
              planet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
