import { AxiosApi } from "@/features/providers/AxiosProvider";
import { ENDPOINTS } from "@/config/api.config";
import type {
  GetUsersParams,
  GetUsersResponse,
  CreateUserRequest,
  UpdateUserRequest,
  User,
} from "../types/users.types";

export const usersApi = {
  /**
   * Get paginated list of users with filters
   */
  getAll: async (params: GetUsersParams = {}): Promise<GetUsersResponse> => {
    const {
      searchTerm = "",
      role = "",
      isActive,
      status,
      cityId,
      pageNumber = 1,
      pageSize = 10,
      sortBy = "",
      sortDescending = false,
    } = params;

    const response = await AxiosApi.get<GetUsersResponse>(
      ENDPOINTS.ADMIN.USERS_LIST,
      {
        params: {
          searchTerm,
          role,
          isActive,
          status,
          cityId,
          pageNumber,
          pageSize,
          sortBy,
          sortDescending,
        },
      }
    );
    return response.data;
  },

  /**
   * Get single user by ID
   */
  getById: async (id: string): Promise<User> => {
    const response = await AxiosApi.get<User>(`${ENDPOINTS.ADMIN.USER}/${id}`);
    return response.data;
  },

  /**
   * Create new user (Admin, Vendor, or ShippingCompany)
   */
  create: async (data: CreateUserRequest): Promise<void> => {
    await AxiosApi.post(ENDPOINTS.ADMIN.CREATE_USER, data);
  },

  /**
   * Update existing user
   */
  update: async (data: UpdateUserRequest): Promise<void> => {
    await AxiosApi.put(ENDPOINTS.ADMIN.UPDATE_USER, data);
  },

  /**
   * Delete user
   */
  delete: async (id: string): Promise<void> => {
    await AxiosApi.delete(`${ENDPOINTS.ADMIN.USER}/${id}`);
  },
};
