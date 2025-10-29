/**
 * Colors & Sizes Types
 */

export interface Color {
  id: number;
  hex: string;
  name: string;
  nameAr: string;
}

export interface Size {
  id: number;
  name: string;
  nameAr: string;
}

export interface GetColorsParams {
  search?: string;
}

export interface GetSizesParams {
  search?: string;
}

export interface CreateColorRequest {
  HexCode: string;
  name: string;
  nameAr: string;
}

export interface UpdateColorRequest {
  id: number;
  HexCode: string;
  name: string;
  nameAr: string;
}

export interface CreateSizeRequest {
  name: string;
  nameAr: string;
}

export interface UpdateSizeRequest {
  Id: number;
  name: string;
  nameAr: string;
}
