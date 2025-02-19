import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "@/public/logo.png";
import { Product } from "@/types";
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
          <AvatarFallback>{product.supplier_id.username[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-sm sm:text-base md:text-lg">
            {product.supplier_id.shop_name}
          </p>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            {product.supplier_id.email}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierDetails;
