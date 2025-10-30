// Admin Statistics Types

export interface UserAnalytics {
  totalUsers: number;
  customers: number;
  vendors: number;
  admins: number;
  shippingCompanies: number;
  newUsersThisMonth: number;
  userGrowthRate: number;
}

export interface OrderStatusDistribution {
  status: number;
  count: number;
  percentage: number;
}

export interface OrderAnalytics {
  totalOrders: number;
  ordersThisMonth: number;
  totalRevenue: number;
  revenueThisMonth: number;
  averageOrderValue: number;
  orderGrowthRate: number;
  revenueGrowthRate: number;
  orderStatusDistribution: OrderStatusDistribution[];
}

export interface ProductAnalytics {
  totalProducts: number;
  activeProducts: number;
  outOfStockProducts: number;
  outOfStockRate: number;
}

export interface ReviewAnalytics {
  totalReviews: number;
  pendingReviews: number;
  approvedReviews: number;
  averageRating: number;
  approvalRate: number;
}

export interface BusinessAnalytics {
  activeSubscriptions: number;
  expiredSubscriptions: number;
  subscriptionRevenue: number;
  shippingOrders: number;
  lateOrders: number;
  onTimeDeliveryRate: number;
}

export interface MonthlyTrend {
  year: number;
  month: number;
  orderCount: number;
  revenue: number;
  newCustomers: number;
}

export interface TopVendor {
  vendorId: number;
  vendorName: string;
  orderCount: number;
  totalRevenue: number;
  averageRating: number;
}

export interface ComprehensiveStatistics {
  generatedAt: string;
  period: string;
  userAnalytics: UserAnalytics;
  orderAnalytics: OrderAnalytics;
  productAnalytics: ProductAnalytics;
  reviewAnalytics: ReviewAnalytics;
  businessAnalytics: BusinessAnalytics;
  monthlyTrends: MonthlyTrend[];
  topVendors: TopVendor[];
}

export interface UserStatistics {
  Total: number;
  Active: number;
  Inactive: number;
  Suspended: number;
  Banned: number;
  "Super Admin": number;
  Admin: number;
  Vendor: number;
  Customer: number;
  ShippingCompany: number;
}

export interface UrgentItems {
  outOfStockProducts: number;
  expiredSubscriptions: number;
  lateOrders: number;
  pendingApprovals: number;
  activeSubscriptions: number;
}

export interface DashboardOverview {
  urgentItems: UrgentItems;
  lastUpdated: string;
}
