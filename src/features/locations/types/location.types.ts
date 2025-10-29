// City types
export interface City {
  id: number;
  name: string;
  nameAr: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCityRequest {
  name: string;
  nameAr: string;
  isActive: boolean;
}

export interface UpdateCityRequest extends CreateCityRequest {
  id: number;
}

// District types
export interface District {
  id: number;
  name: string;
  nameAr: string;
  cityId: number;
  postalCode: string | null;
  deliveryFee: number | null;
  isActive: boolean;
  sortOrder?: number;
}

export interface CreateDistrictRequest {
  cityId: number;
  name: string;
  nameAr: string;
  postalCode?: string;
  deliveryFee?: number;
  isActive: boolean;
  sortOrder?: number;
}

export interface UpdateDistrictRequest extends CreateDistrictRequest {
  id: number;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}
