/**
 * Wallet & Transaction Types
 */

/**
 * Transaction Type Enum
 */
export enum TransactionType {
  Earned = 1,
  Redeemed = 2,
  AdminCredit = 3,
  AdminDebit = 4,
  ReferralEarned = 5,
  OrderEarned = 6,
  CouponRedemption = 7,
}

/**
 * Wallet Interface
 */
export interface Wallet {
  id: number;
  userId: string;
  userName: string;
  email: string;
  balance: number;
  currencyCode: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Transaction Interface
 */
export interface Transaction {
  id: number;
  walletId: number;
  userId: string;
  userName: string;
  transactionType: TransactionType;
  amount: number;
  balanceAfter: number;
  description: string;
  descriptionAr: string;
  referralUsageId: number | null;
  createdAt: string;
}

/**
 * Wallet Summary Statistics
 */
export interface WalletSummary {
  totalWallets: number;
  totalBalance: number;
  averageBalance: number;
  activeWallets: number;
}

/**
 * Transaction Summary Statistics
 */
export interface TransactionSummary {
  totalTransactions: number;
  totalPointsAdded: number;
  totalPointsDeducted: number;
  totalAmount: number;
  creditCount: number;
  debitCount: number;
  netPoints: number;
}

/**
 * Pagination Interface
 */
export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

/**
 * Get Wallets Response
 */
export interface GetWalletsResponse {
  data: Wallet[];
  pagination: Pagination;
  summary: WalletSummary;
}

/**
 * Get Transactions Response
 */
export interface GetTransactionsResponse {
  data: Transaction[];
  pagination: Pagination;
  summary: TransactionSummary;
}

/**
 * Wallet Detail (with optional transactions)
 */
export interface WalletDetail extends Wallet {
  recentTransactions?: Transaction[];
}

/**
 * Get Wallet By ID Params
 */
export interface GetWalletByIdParams {
  includeTransactions?: boolean;
  transactionLimit?: number;
}

/**
 * Update Wallet Request
 */
export interface UpdateWalletRequest {
  isActive: boolean;
}

/**
 * Get Transactions Filters
 */
export interface GetTransactionsParams {
  page?: number;
  pageSize?: number;
  walletId?: number;
  userId?: string;
  transactionType?: TransactionType;
  fromDate?: string;
  toDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

/**
 * Get Wallets Filters
 */
export interface GetWalletsParams {
  page?: number;
  pageSize?: number;
  userId?: string;
  email?: string;
  isActive?: boolean;
}
