import { Button } from "@/components/ui/button";
import organicImage from "@/public/l9.jpg";
import Image from "next/image";

export function OrganicCollection() {
  return (
    <div className="py-12 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Left Content */}
        <div className="text-center md:text-left space-y-6 max-w-lg">
          <h2 className="text-3xl font-bold  leading-snug">
            Browse Our Organic Collection and Taste the Difference!
          </h2>
          <p className=" text-base leading-relaxed">
            Looking for healthy, chemical-free products? Gauraaj’s organic
            collection is curated to bring you the best nature has to offer.
            Whether it&apos;s for cooking, skincare, or your wellness, our handpicked
            products will make a difference in your daily life. Browse our
            collection and taste the true difference today!
          </p>
          <Button className="px-6 py-3 rounded-md shadow-lg">
            Shop Now
          </Button>
        </div>

        {/* Right Image */}
        <div className="">
          <Image
            src={organicImage}
            alt="Browse Our Organic Collection"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default OrganicCollection;
