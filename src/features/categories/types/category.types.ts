/**
 * Category Types
 */

export interface CategoryImage {
  id: number;
  categoryId: number;
  imageUrl: string;
  altText: string | null;
  imageType: number;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

export interface Category {
  categoryId: number;
  categoryName: string;
  categoryNameAr: string;
  categoryType: string;
  categoryImages: CategoryImage[];
  productCount: number;
}

export interface CategoryDetail {
  id: number;
  name: string;
  vendorId: number;
  nameAr: string;
  description: string;
  descriptionAr: string;
  type: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetCategoriesParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface GetCategoriesResponse {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  categories: Category[];
}

export interface CreateCategoryRequest {
  Name: string;
  NameAr: string;
  Description: string;
  DescriptionAr: string;
  Type: string;
  IsActive: boolean;
  ImageFiles?: File[];
}

export interface UpdateCategoryRequest {
  id: number;
  Name: string;
  NameAr: string;
  Description: string;
  DescriptionAr: string;
  Type: string;
  IsActive: boolean;
  NewImageFiles?: File[];
  ImagesToDelete?: number[];
}
