// FAQ Types

export interface FAQ {
  id: number;
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  type: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetFAQsResponse {
  message: string;
  data: FAQ[];
}

export interface CreateFAQRequest {
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
}

export interface UpdateFAQRequest {
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
}
