/**
 * My Subscription Types
 */

export interface CurrentSubscription {
  vendorId: number;
  shopName: string;
  shopNameAr: string;
  logo: string | null;
  subscriptionId: number;
  planName: string;
  planNameAr: string;
  price: number;
  durationInMonths: number;
  planDescription: string;
  planDescriptionAr: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  daysRemaining: number;
  isExpiringSoon: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface SubscriptionHistoryItem {
  subscriptionId: number;
  planName: string;
  planNameAr: string;
  price: number;
  durationInMonths: number;
  planDescription: string;
  planDescriptionAr: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  status: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface SubscriptionHistoryResponse {
  vendorId: number;
  shopName: string;
  shopNameAr: string;
  totalSubscriptions: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  subscriptions: SubscriptionHistoryItem[];
}

export interface GetSubscriptionHistoryParams {
  pageNumber?: number;
  pageSize?: number;
}
