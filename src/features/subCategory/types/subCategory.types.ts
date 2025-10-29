/**
 * SubCategory Types
 */

export interface SubCategory {
  subCategoryId: number;
  subCategoryName: string;
  nameAr: string;
  subCategoryType: string;
  subCategoryImage: string;
  categoryId?: number;
  isActive?: boolean;
}

export interface GetSubCategoriesParams {
  categoryId: number;
  search?: string;
  page?: number;
  limit?: number;
}

export interface GetSubCategoriesResponse {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  subCategories: SubCategory[];
}

export interface CreateSubCategoryRequest {
  name: string;
  nameAr: string;
  categoryId: number;
  imageUrl: string;
  isActive: boolean;
}

export interface UpdateSubCategoryRequest {
  name: string;
  nameAr: string;
  categoryId: number;
  imageUrl: string;
  isActive: boolean;
}
