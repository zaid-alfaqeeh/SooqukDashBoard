/**
 * Review Status Enum (matches API values)
 */
export enum ReviewStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
}

/**
 * Review Status String Values (for display)
 */
export const ReviewStatusString = {
  [ReviewStatus.Pending]: "Pending",
  [ReviewStatus.Approved]: "Approved",
  [ReviewStatus.Rejected]: "Rejected",
} as const;

/**
 * Base Review Interface
 */
interface BaseReview {
  id: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  imageUrl: string | null;
  status: ReviewStatus | string; // API returns string "Pending", "Approved", "Rejected"
  createdAt: string;
}

/**
 * Product Review
 */
export interface ProductReview extends BaseReview {
  productId: number;
  productName: string;
  title: string;
  updatedAt: string;
}

/**
 * Vendor Review
 */
export interface VendorReview extends BaseReview {
  vendorId: number;
  vendorName: string;
}

/**
 * Order Review
 */
export interface OrderReview extends BaseReview {
  orderId: number;
  customerId: string;
  customerName: string;
}

/**
 * Pagination Info
 */
export interface PaginationInfo {
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

/**
 * Product Reviews Response (Direct structure)
 */
export interface ProductReviewsResponse extends PaginationInfo {
  items: ProductReview[];
}

/**
 * Vendor/Order Reviews Response (Wrapped structure)
 */
export interface WrappedReviewsResponse<T> {
  status: string;
  data: {
    items: T[];
  } & PaginationInfo;
}

/**
 * Get Reviews Params
 */
export interface GetReviewsParams {
  pageNumber?: number;
  pageSize?: number;
  status?: ReviewStatus;
}

/**
 * Update Review Status Request
 */
export interface UpdateReviewStatusRequest {
  status: ReviewStatus;
}
