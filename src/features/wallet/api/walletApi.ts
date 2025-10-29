import { AxiosApi } from "@/features/providers/AxiosProvider";
import { ENDPOINTS } from "@/config/api.config";
import type {
  GetWalletsResponse,
  GetTransactionsResponse,
  UpdateWalletRequest,
  GetTransactionsParams,
  GetWalletsParams,
  WalletDetail,
  GetWalletByIdParams,
} from "../types/wallet.types";

/**
 * Wallet API
 */
export const walletApi = {
  /**
   * Get all wallets (Admin only)
   */
  getWallets: async (
    params?: GetWalletsParams
  ): Promise<GetWalletsResponse> => {
    const response = await AxiosApi.get<GetWalletsResponse>(
      ENDPOINTS.WALLET.GET_WALLETS,
      { params }
    );
    return response.data;
  },

  /**
   * Get wallet by ID with optional transactions (Admin only)
   */
  getWalletById: async (
    walletId: number,
    params?: GetWalletByIdParams
  ): Promise<WalletDetail> => {
    const response = await AxiosApi.get<WalletDetail>(
      `${ENDPOINTS.WALLET.GET_WALLET_BY_ID}/${walletId}`,
      { params }
    );
    return response.data;
  },

  /**
   * Update wallet status (Admin only)
   */
  updateWallet: async (
    walletId: number,
    data: UpdateWalletRequest
  ): Promise<void> => {
    await AxiosApi.put(`${ENDPOINTS.WALLET.UPDATE_WALLET}/${walletId}`, data);
  },

  /**
   * Delete wallet (Admin only)
   */
  deleteWallet: async (
    walletId: number,
    hardDelete: boolean = false
  ): Promise<void> => {
    await AxiosApi.delete(
      `${ENDPOINTS.WALLET.DELETE_WALLET}/${walletId}?hardDelete=${hardDelete}`
    );
  },

  /**
   * Get transactions (Admin only)
   */
  getTransactions: async (
    params?: GetTransactionsParams
  ): Promise<GetTransactionsResponse> => {
    const response = await AxiosApi.get<GetTransactionsResponse>(
      ENDPOINTS.WALLET.GET_TRANSACTIONS,
      { params }
    );
    return response.data;
  },
};
