/**
 * Subscription Plans Management Types
 */

export interface SubscriptionPlan {
  id: number;
  name: string;
  namear: string;
  price: number;
  durationInMonths: number;
  description: string;
  descriptionAr: string;
  vendorSubscriptions?: any[];
}

export interface CreateSubscriptionPlanRequest {
  name: string;
  nameAr: string;
  price: number;
  durationInMonths: number;
  description: string;
  descriptionAr: string;
}

export interface UpdateSubscriptionPlanRequest {
  id: number;
  name: string;
  nameAr: string;
  price: number;
  durationInMonths: number;
  description: string;
  descriptionAr: string;
}

export interface GetSubscriptionPlansResponse {
  plans: SubscriptionPlan[];
}
