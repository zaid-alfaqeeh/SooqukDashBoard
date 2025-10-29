/**
 * Order Types
 */

// Order Status Enum
export enum OrderStatus {
  Pending = 1,
  Confirmed = 2,
  Processing = 3,
  Shipped = 4,
  Delivered = 5,
  Cancelled = 6,
  Refunded = 7,
}

// Payment Status
export enum PaymentStatus {
  Pending = 1,
  Paid = 2,
  Failed = 3,
  Refunded = 4,
}

// Payment Method
export enum PaymentMethod {
  CashOnDelivery = 1,
  CreditCard = 2,
  DebitCard = 3,
  PayPal = 4,
  BankTransfer = 5,
}

export interface OrderListItem {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  vendorName: string;
  totalAmount: number;
  currencyCode: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
  discountDisplay: string;
  itemsCount: number;
}

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}

export interface Vendor {
  vendorId: number;
  shopName: string;
  shopNameAr: string | null;
  logo: string | null;
  shippingPolicy: string | null;
  shippingPolicyAr: string | null;
  status: number;
  vendorCity: string | null;
  vendorCityAr: string | null;
  email: string;
  phone: string;
}

export interface Address {
  shippingAddress: string;
  city: string;
  district: string;
}

export interface OrderItem {
  orderItemId: number;
  productId: number;
  productVariantId: number;
  productName: string;
  productNameAr: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  // Color variant
  colorName: string | null;
  colorNameAr: string | null;
  colorCode: string | null;
  // Size variant
  sizeName: string | null;
  sizeNameAr: string | null;
  sizeValue: string | null;
}

export interface OrderDetail {
  id: number;
  orderNumber: string;
  customer: Customer;
  vendor: Vendor;
  address: Address;
  subTotal: number;
  taxAmount: number;
  shippingFee: number;
  discountAmount: number;
  totalAmount: number;
  currencyCode: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  discountDisplay: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface OrderStatistics {
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  pendingPayments: number;
  completedPayments: number;
}

export interface Pagination {
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface GetOrdersParams {
  Status?: OrderStatus;
  CustomerName?: string;
  OrderNumber?: string;
  VendorId?: number;
  FromDate?: string;
  ToDate?: string;
  PageNumber?: number;
  PageSize?: number;
  SortDescending?: boolean;
}

export interface GetOrdersResponse {
  success: boolean;
  data: OrderListItem[];
  pagination: Pagination;
}

export interface GetOrderDetailResponse {
  success: boolean;
  data: OrderDetail;
}

export interface GetStatisticsResponse {
  success: boolean;
  data: OrderStatistics;
}

export interface CancelOrderRequest {
  reason: string;
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
  notes?: string;
}

export interface UpdatePaymentStatusRequest {
  paymentStatus: PaymentStatus;
  notes?: string;
}
