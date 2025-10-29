import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { walletApi } from "../api/walletApi";
import type {
  UpdateWalletRequest,
  GetTransactionsParams,
  GetWalletsParams,
  GetWalletByIdParams,
} from "../types/wallet.types";

/**
 * Query Keys
 */
const WALLET_KEYS = {
  all: ["wallet"] as const,
  wallets: (params?: GetWalletsParams) =>
    [...WALLET_KEYS.all, "wallets", params] as const,
  wallet: (id: number, params?: GetWalletByIdParams) =>
    [...WALLET_KEYS.all, "wallet", id, params] as const,
  transactions: (params?: GetTransactionsParams) =>
    [...WALLET_KEYS.all, "transactions", params] as const,
};

/**
 * Get wallets with filters
 */
export function useWallets(params?: GetWalletsParams) {
  return useQuery({
    queryKey: WALLET_KEYS.wallets(params),
    queryFn: () => walletApi.getWallets(params),
  });
}

/**
 * Get wallet by ID with optional transactions
 */
export function useWallet(walletId: number, params?: GetWalletByIdParams) {
  return useQuery({
    queryKey: WALLET_KEYS.wallet(walletId, params),
    queryFn: () => walletApi.getWalletById(walletId, params),
    enabled: !!walletId,
  });
}

/**
 * Update wallet status
 */
export function useUpdateWallet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      walletId,
      data,
    }: {
      walletId: number;
      data: UpdateWalletRequest;
    }) => walletApi.updateWallet(walletId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WALLET_KEYS.all });
    },
  });
}

/**
 * Delete wallet
 */
export function useDeleteWallet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      walletId,
      hardDelete,
    }: {
      walletId: number;
      hardDelete?: boolean;
    }) => walletApi.deleteWallet(walletId, hardDelete),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WALLET_KEYS.all });
    },
  });
}

/**
 * Get transactions with filters
 */
export function useTransactions(params?: GetTransactionsParams) {
  return useQuery({
    queryKey: WALLET_KEYS.transactions(params),
    queryFn: () => walletApi.getTransactions(params),
  });
}
