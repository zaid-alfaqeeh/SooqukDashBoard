/**
 * Hero Slider Types
 */

/**
 * Hero Slider Item
 */
export interface HeroSlider {
  id: number;
  title: string;
  image: string;
  link: string;
  isActive: boolean;
  sortOrder: number;
}

/**
 * Create Hero Slider Request
 */
export interface CreateHeroSliderRequest {
  Title: string;
  ImageFile?: File;
  IsActive: boolean;
  SortOrder: number;
}

/**
 * Update Hero Slider Request
 */
export interface UpdateHeroSliderRequest {
  id: number;
  Title: string;
  ImageFile?: File;
  IsActive: boolean;
  SortOrder: number;
}
