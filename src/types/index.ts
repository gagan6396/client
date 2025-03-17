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

export interface Variant {
  _id: string;
  name: string;
  price: {
    $numberDecimal: string;
  };
  stock: number;
  weight: number;
  sku: string;
  images: string[];
  dimensions: {
    height: number;
    length: number;
    width: number;
  };
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
