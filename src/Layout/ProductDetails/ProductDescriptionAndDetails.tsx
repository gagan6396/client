import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/types";

interface ProductDescriptionAndDetailsProps {
  product: Product;
}

const ProductDescriptionAndDetails = ({
  product,
}: ProductDescriptionAndDetailsProps) => {
  return (
    <div className="mt-8 sm:mt-12">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="description" className="text-sm sm:text-base">
            Description
          </TabsTrigger>
          <TabsTrigger value="details" className="text-sm sm:text-base">
            Details
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl font-semibold">
                Product Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm sm:prose-base max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="details" className="mt-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl font-semibold">
                Product Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="text-sm sm:text-base text-gray-700">
                <p>
                  <strong>Category:</strong> {product.category_id.name}
                </p>
                <p>
                  <strong>Subcategory:</strong> {product.subcategory_id.name}
                </p>
                <p>
                  <strong>Brand:</strong> {product.brand}
                </p>
                <p>
                  <strong>SKU:</strong> {product.sku}
                </p>
                <p>
                  <strong>Stock:</strong> {product.stock}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDescriptionAndDetails;
