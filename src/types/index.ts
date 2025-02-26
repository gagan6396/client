// types.ts

// Supplier Interface
export interface Supplier {
  _id: string;
  username: string;
  email: string;
  shop_name: string;
  shop_address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

// Category Interface
export interface Category {
  _id: string;
  name: string;
  description: string;
  slug: string;
}

// Subcategory Interface
export interface Subcategory {
  _id: string;
  name: string;
  description: string;
  slug: string;
}

// Review Interface
export interface Review {
  user: string;
  rating: number;
  comment: string;
}

// Product Interface
export interface Product {
  _id: string;
  supplier_id: Supplier;
  category_id: Category;
  video?: string;
  subcategory_id: Subcategory;
  reviews: Review[];
  name: string;
  description: string;
  price: { $numberDecimal: string };
  stock: number;
  weight: number;
  images: string[];
  rating: number;
  brand: string;
  sku: string;
  skuParameters: Record<string, any>;
  createdAt: string;
  inWishlist: boolean;
  inCart: boolean;
}

// Props for ProductImageCarousel Component
export interface ProductImageCarouselProps {
  product: Product;
}

// Props for ProductDetails Component
export interface ProductDetailsProps {
  product: Product;
  addToCart: () => void;
  buyNow: () => void;
  addToWishList: () => void;
  deleteProductFromWishlist: () => void;
}

// Props for SupplierDetails Component
export interface SupplierDetailsProps {
  product: Product;
}

// Props for ProductDescriptionAndDetails Component
export interface ProductDescriptionAndDetailsProps {
  product: Product;
}

// Props for ReviewsSection Component
export interface ReviewsSectionProps {
  reviews: Review[];
  addReview: (review: Review) => void;
}
