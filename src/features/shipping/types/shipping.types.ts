/**
 * Shipping Feature Types
 */

export enum OrderStatus {
  Pending = 1,
  Confirmed = 2,
  Processing = 3,
  Shipped = 4,
  Delivered = 5,
  Cancelled = 6,
  Refunded = 7,
}

export enum PaymentStatus {
  Pending = 1,
  Paid = 2,
  Failed = 3,
  Refunded = 4,
}

export enum PaymentMethod {
  CashOnDelivery = 1,
  CreditCard = 2,
  DebitCard = 3,
  PayPal = 4,
  BankTransfer = 5,
}

/**
 * Shipping Order List Item
 */
export interface ShippingOrderListItem {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  city: string;
  district: string;
  shippingAddress: string;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
  updatedAt: string;
  isLate: boolean;
  itemsCount: number;
}

/**
 * Customer Info
 */
export interface CustomerInfo {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}

/**
 * Location Info
 */
export interface LocationInfo {
  city: string;
  district: string;
  address: string;
}

/**
 * Order Details Info
 */
export interface OrderDetailsInfo {
  totalAmount: number;
  currencyCode: string;
}

/**
 * Order Item
 */
export interface OrderItem {
  orderItemId: number;
  productId: number;
  productName: string;
  productNameAr: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  productVariantId: number | null;
  colorName: string | null;
  colorNameAr: string | null;
  colorCode: string | null;
  sizeName: string | null;
  sizeNameAr: string | null;
  sizeValue: string | null;
}

/**
 * Shipping Order Detail
 */
export interface ShippingOrderDetail {
  id: number;
  orderNumber: string;
  customer: CustomerInfo;
  location: LocationInfo;
  orderDetails: OrderDetailsInfo;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  isLate: boolean;
  hoursElapsed: number;
}

/**
 * Pagination
 */
export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

/**
 * Get Shipping Orders Request Params
 */
export interface GetShippingOrdersParams {
  CityId?: number;
  DistrictId?: number;
  Status?: OrderStatus;
  Search?: string;
  FromDate?: string;
  ToDate?: string;
  LateHours?: number;
  Page?: number;
  PageSize?: number;
}

/**
 * Get Shipping Orders Response
 */
export interface GetShippingOrdersResponse {
  data: ShippingOrderListItem[];
  pagination: Pagination;
}

/**
 * Update Order Status Request
 */
export interface UpdateShippingOrderStatusRequest {
  status: 4 | 5 | 6; // Only Shipped, Delivered, Cancelled
}

/**
 * Shipping Statistics
 */
export interface ShippingStatistics {
  totalOrders: number;
  pendingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  lateOrders: number;
  totalRevenue: number;
}
