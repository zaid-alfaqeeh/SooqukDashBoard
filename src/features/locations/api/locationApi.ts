import { AxiosApi } from "@/features/providers/AxiosProvider";
import { ENDPOINTS } from "@/config/api.config";
import type {
  City,
  District,
  CreateDistrictRequest,
  UpdateDistrictRequest,
} from "../types/location.types";

/**
 * Cities API
 */
export const citiesApi = {
  /**
   * Get all cities
   */
  getAll: async (): Promise<City[]> => {
    const response = await AxiosApi.get<City[]>(ENDPOINTS.ADMIN.CITIES);
    return response.data;
  },

  /**
   * Get city by ID
   */
  getById: async (id: number): Promise<City> => {
    const response = await AxiosApi.get<City>(
      `${ENDPOINTS.ADMIN.CITIES}/${id}`
    );
    return response.data;
  },
};

/**
 * Districts API
 */
export const districtsApi = {
  /**
   * Get all districts
   */
  getAll: async (): Promise<District[]> => {
    const response = await AxiosApi.get<District[]>(ENDPOINTS.ADMIN.DISTRICTS);
    return response.data;
  },

  /**
   * Get districts by city ID
   */
  getByCityId: async (cityId: number): Promise<District[]> => {
    const response = await AxiosApi.get<District[]>(
      `${ENDPOINTS.ADMIN.DISTRICTS}/by-city/${cityId}`
    );
    return response.data;
  },

  /**
   * Get district by ID
   */
  getById: async (id: number): Promise<District> => {
    const response = await AxiosApi.get<District>(
      `${ENDPOINTS.ADMIN.DISTRICTS}/${id}`
    );
    return response.data;
  },

  /**
   * Create new district (Admin only)
   */
  create: async (data: CreateDistrictRequest): Promise<District> => {
    const response = await AxiosApi.post<District>(
      ENDPOINTS.ADMIN.DISTRICTS,
      data
    );
    return response.data;
  },

  /**
   * Update district (Admin only)
   */
  update: async (data: UpdateDistrictRequest): Promise<District> => {
    const response = await AxiosApi.put<District>(
      `${ENDPOINTS.ADMIN.DISTRICTS}/${data.id}`,
      data
    );
    return response.data;
  },

  /**
   * Delete district (Admin only)
   */
  delete: async (id: number): Promise<void> => {
    await AxiosApi.delete(`${ENDPOINTS.ADMIN.DISTRICTS}/${id}`);
  },
};
