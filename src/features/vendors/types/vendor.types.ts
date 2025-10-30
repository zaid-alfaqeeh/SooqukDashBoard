/**
 * Vendor Statistics Types
 */

export interface OrdersOverview {
  totalOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  processingOrders: number;
  cancelledOrders: number;
  deliveredOrders: number;
  completionRate: number;
}

export interface RevenueOverview {
  totalRevenue: number;
  currentMonthRevenue: number;
  previousMonthRevenue: number;
  revenueGrowthRate: number;
}

export interface ProductsOverview {
  totalProducts: number;
  activeProducts: number;
  outOfStockProducts: number;
  outOfStockRate: number;
}

export interface RatingDistribution {
  rating: number;
  count: number;
}

export interface ReviewsOverview {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: RatingDistribution[];
}

export interface CustomerInsights {
  totalCustomers: number;
  repeatCustomers: number;
  repeatCustomerRate: number;
}

export interface DailyOrderTrend {
  date: string;
  orderCount: number;
  revenue: number;
}

export interface TopSellingProduct {
  productId: number;
  productName: string;
  totalSold: number;
  totalRevenue: number;
}

export interface VendorStatistics {
  vendorId: number;
  period: string;
  generatedAt: string;
  ordersOverview: OrdersOverview;
  revenueOverview: RevenueOverview;
  productsOverview: ProductsOverview;
  reviewsOverview: ReviewsOverview;
  customerInsights: CustomerInsights;
  dailyOrderTrends: DailyOrderTrend[];
  topSellingProducts: TopSellingProduct[];
}

export interface GetVendorStatisticsResponse {
  success?: boolean;
  data?: VendorStatistics;
}

// Vendor Reviews Types
export interface VendorReviewItem {
  id: number;
  vendorId: number;
  vendorName: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  status: string; // "Approved", "Pending", "Rejected"
  createdAt: string;
}

export interface GetVendorReviewsParams {
  pageNumber?: number;
  pageSize?: number;
}

export interface GetVendorReviewsResponse {
  items: VendorReviewItem[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface VendorReviewStatistics {
  averageRating: number;
  totalReviews: number;
  fiveStarCount: number;
  fourStarCount: number;
  threeStarCount: number;
  twoStarCount: number;
  oneStarCount: number;
}

// Vendor Product Reviews Types
export interface VendorProductReviewItem {
  id: number;
  productId: number;
  productName: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  imageUrl: string | null;
  status: string; // "Approved", "Pending", "Rejected"
  createdAt: string;
  updatedAt: string;
}

export interface GetVendorProductReviewsParams {
  pageNumber?: number;
  pageSize?: number;
}

export interface GetVendorProductReviewsResponse {
  status: string;
  data: {
    items: VendorProductReviewItem[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export interface RecentReview {
  productName: string;
  rating: number;
  comment: string;
  userName: string;
  date: string;
}

export interface VendorProductReviewStatistics {
  status: string;
  data: {
    vendorId: number;
    totalReviews: number;
    averageRating: number;
    totalProducts: number;
    ratingDistribution: {
      fiveStar: number;
      fourStar: number;
      threeStar: number;
      twoStar: number;
      oneStar: number;
    };
    recentReviews: RecentReview[];
  };
}
