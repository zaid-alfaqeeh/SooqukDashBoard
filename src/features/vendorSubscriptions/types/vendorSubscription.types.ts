// Vendor Subscription Types

export interface VendorSubscription {
  id: number;
  vendorId: number;
  vendorName: string;
  subscriptionPlanId: number;
  planName: string;
  planNameAr: string;
  price: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface CreateVendorSubscriptionRequest {
  vendorId: number;
  subscriptionPlanId: number;
  planName: string;
  planNameAr: string;
  price: number;
  startDate: string;
  endDate: string;
}

export interface UpdateVendorSubscriptionRequest {
  vendorId: number;
  subscriptionPlanId: number;
  planName: string;
  planNameAr: string;
  price: number;
  startDate: string;
  endDate: string;
}
