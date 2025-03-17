import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "@/public/logo.png";

// Updated Product interface based on new data structure
interface Product {
  _id: string;
  supplier_id: {
    shop_address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    _id: string;
    email: string;
    phone: string;
    shop_name: string;
  };
  category_id: {
    _id: string;
    name: string;
    description: string;
    slug: string;
  };
  subcategory_id: {
    _id: string;
    name: string;
    description: string;
    slug: string;
  };
  reviews: any[];
  name: string;
  description: string;
  variants: {
    dimensions: {
      height: number;
      length: number;
      width: number;
    };
    discount: {
      type?: string;
      value?: number;
      active: boolean;
      startDate?: string;
      endDate?: string;
    };
    name: string;
    price: { $numberDecimal: string };
    stock: number;
    weight: number;
    sku: string;
    images: string[];
    _id: string;
  }[];
  images: {
    url: string;
    sequence: number;
    _id: string;
  }[];
  video: string | null;
  rating: number;
  brand: string;
  isBestSeller: boolean;
  createdAt: string;
  inWishlist: boolean;
  inCart: boolean;
}

interface SupplierDetailsProps {
  product: Product;
}

const SupplierDetails = ({ product }: SupplierDetailsProps) => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl md:text-2xl">
          Sold by
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center space-x-3 sm:space-x-4 md:space-x-6">
        <Avatar>
          <AvatarImage
            src={
              logo
                ? typeof logo === "string"
                  ? logo
                  : logo.src
                : "https://placehold.co/50"
            }
            alt="Supplier Avatar"
            className="object-contain"
          />
          <AvatarFallback>
            {product.supplier_id.shop_name?.[0] ?? "S"}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-sm sm:text-base md:text-lg">
            {product.supplier_id.shop_name ?? "Unknown Supplier"}
          </p>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            {product.supplier_id.email ?? "N/A"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierDetails;