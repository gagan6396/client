"use client";
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
    <div className="mt-10 md:mt-16">
      <Tabs defaultValue="description" className="w-full">
        {/* Tabs Navigation */}
        <TabsList className="grid w-full grid-cols-2 rounded-lg bg-gray-100 p-1 shadow-sm">
          <TabsTrigger
            value="description"
            className="text-base md:text-lg font-medium text-gray-700 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-md transition-all duration-200"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="details"
            className="text-base md:text-lg font-medium text-gray-700 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-md transition-all duration-200"
          >
            Details
          </TabsTrigger>
        </TabsList>

        {/* Description Tab */}
        <TabsContent value="description" className="mt-6">
          <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
              <CardTitle className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
                Product Description
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <div
                className="prose prose-sm md:prose-base max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details" className="mt-6">
          <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
              <CardTitle className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
                Product Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <dl className="space-y-4 md:space-y-5 text-sm md:text-base text-gray-700">
                {/* Category */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 hover:bg-gray-50 transition-colors duration-200 rounded-md px-2">
                  <dt className="font-semibold text-gray-800">Category</dt>
                  <dd className="text-gray-600">
                    {typeof product.category_id === "string"
                      ? product.category_id
                      : product.category_id?.name || "N/A"}
                  </dd>
                </div>

                {/* Subcategory */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 hover:bg-gray-50 transition-colors duration-200 rounded-md px-2">
                  <dt className="font-semibold text-gray-800">Subcategory</dt>
                  <dd className="text-gray-600">
                    {typeof product.subcategory_id === "string"
                      ? product.subcategory_id
                      : product.subcategory_id?.name || "N/A"}
                  </dd>
                </div>

                {/* Brand */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 hover:bg-gray-50 transition-colors duration-200 rounded-md px-2">
                  <dt className="font-semibold text-gray-800">Brand</dt>
                  <dd className="text-gray-600">{product.brand || "N/A"}</dd>
                </div>

                {/* SKU (Base Product) */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 hover:bg-gray-50 transition-colors duration-200 rounded-md px-2">
                  <dt className="font-semibold text-gray-800">SKU</dt>
                  <dd className="text-gray-600">{product.sku || "N/A"}</dd>
                </div>

                {/* Stock (Base Product) */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 hover:bg-gray-50 transition-colors duration-200 rounded-md px-2">
                  <dt className="font-semibold text-gray-800">Stock</dt>
                  <dd className="text-gray-600">{product.stock ?? "N/A"}</dd>
                </div>

                {/* Weight (Base Product) */}
                {product.weight && (
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 hover:bg-gray-50 transition-colors duration-200 rounded-md px-2">
                    <dt className="font-semibold text-gray-800">Weight</dt>
                    <dd className="text-gray-600">{`${product.weight} kg`}</dd>
                  </div>
                )}

                {/* Dimensions (Base Product) */}
                {/* {product.dimensions && (
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 hover:bg-gray-50 transition-colors duration-200 rounded-md px-2">
                    <dt className="font-semibold text-gray-800">Dimensions</dt>
                    <dd className="text-gray-600">{`${product.dimensions.height} x ${product.dimensions.length} x ${product.dimensions.width} cm`}</dd>
                  </div>
                )} */}

                {/* Variants (if available) */}
                {product.variants && product.variants.length > 0 && (
                  <div className="border-b border-gray-100 pb-3">
                    <dt className="font-semibold text-gray-800 mb-2">Variants</dt>
                    <dd className="text-gray-600">
                      <ul className="space-y-2">
                        {product.variants.map((variant) => (
                          <li
                            key={variant._id}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 p-2 rounded-md"
                          >
                            <span>
                              {variant.name} - ₹{variant.price.$numberDecimal} (
                              {variant.stock} in stock)
                              {variant.weight ? `, ${variant.weight} kg` : ""}
                            </span>
                            {variant.dimensions && (
                              <span className="text-sm text-gray-500">
                                Dimensions: {variant.dimensions.height} x{" "}
                                {variant.dimensions.length} x{" "}
                                {variant.dimensions.width} cm
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}

                {/* Created At */}
                <div className="flex items-center justify-between pb-3 hover:bg-gray-50 transition-colors duration-200 rounded-md px-2">
                  <dt className="font-semibold text-gray-800">Created At</dt>
                  <dd className="text-gray-600">
                    {new Date(product.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDescriptionAndDetails;