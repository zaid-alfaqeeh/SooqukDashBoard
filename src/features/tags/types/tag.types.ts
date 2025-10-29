/**
 * Tag Types
 */

/**
 * Tag Interface
 */
export interface Tag {
  id: number;
  name: string;
  nameAr: string;
  slug: string;
  createdAt: string;
}

/**
 * Create Tag Request
 */
export interface CreateTagRequest {
  name: string;
  nameAr: string;
  slug: string;
}

/**
 * Update Tag Request
 */
export interface UpdateTagRequest {
  id: number;
  name: string;
  nameAr: string;
  slug: string;
}
