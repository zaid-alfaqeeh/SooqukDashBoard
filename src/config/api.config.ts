/**
 * API Configuration
 *
 * To change the API URL, set NEXT_PUBLIC_API_URL in your .env.local file:
 * NEXT_PUBLIC_API_URL=https://your-api-url.com
 */

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://souqak.runasp.net",
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 1,
} as const;

export const QUERY_CONFIG = {
  STALE_TIME: 5 * 60 * 1000, // 5 minutes
  CACHE_TIME: 10 * 60 * 1000, // 10 minutes
  RETRY: 1,
  REFETCH_ON_WINDOW_FOCUS: false,
} as const;

export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/Account/login",
    LOGOUT: "/Account/logout",
    REFRESH_TOKEN: "/Account/refresh-token",
    FORGOT_PASSWORD: "/Account/forgot-password-otp",
    RESET_PASSWORD: "/Account/reset-password-with-otp",
  },
  ADMIN: {
    CITIES: "/api/Admin/cities",
    DISTRICTS: "/api/Admin/districts",
    USERS_LIST: "/api/Admin/users/list",
    USER: "/api/Admin/user",
    CREATE_USER: "/api/Admin/CreateUser",
    UPDATE_USER: "/api/Admin/UpdateUser",
    STATISTICS: "/api/Admin/statistics",
    COMPREHENSIVE_STATISTICS: "/api/Admin/statistics/comprehensive",
    DASHBOARD_OVERVIEW: "/api/Admin/dashboard/overview",
  },
  CATEGORIES: {
    GET_ALL: "/api/CategoryApi/getAllCategory",
    BASE: "/api/CategoryApi",
  },

  ORDERS: {
    BASE: "/api/Orders",
    STATISTICS: "/api/Orders/statistics",
    ADMIN_ORDER: "/api/Orders/Admin/Order",
  },
  VENDOR: {
    ORDERS: "/api/vendor",
    STATISTICS: "/api/vendor",
    REVIEWS: "/api/ReviewsManagement/vendors",
    PRODUCT_REVIEWS: "/api/ReviewsManagement/vendor/my-products",
  },
  SUBCATEGORIES: {
    GET_BY_CATEGORY: "/api/CategoryApi/getSubCategories",
    CREATE: "/api/Admin/CreateSubCategory",
    UPDATE: "/api/Admin/UpdateSubCategory",
    DELETE: "/api/Admin/DeleteSubCategory",
  },
  SUPPORT: {
    TICKETS: "/api/Support/tickets",
    STATISTICS: "/api/Support/statistics",
  },
  COLORS_SIZES: {
    GET_COLORS: "/api/ColorsSizes/getColors",
    ADD_COLOR: "/api/ColorsSizes/addColor",
    UPDATE_COLOR: "/api/ColorsSizes/updateColor",
    DELETE_COLOR: "/api/ColorsSizes/deleteColor",
    GET_SIZES: "/api/ColorsSizes/getSizes",
    ADD_SIZE: "/api/ColorsSizes/addSize",
    UPDATE_SIZE: "/api/ColorsSizes/updateSize",
    DELETE_SIZE: "/api/ColorsSizes/deleteSize",
  },
  SUBSCRIPTIONS: {
    PLANS: "/api/Admin/subscription-plans",
  },
  SHIPPING: {
    ORDERS: "/api/shipping/orders",
    STATISTICS: "/api/shipping/statistics",
  },
  HERO_SLIDERS: {
    BASE: "/api/Admin/hero-sliders",
  },
  COUPONS: {
    GET_ALL: "/api/Admin/",
    CREATE: "/api/Admin/Coupon",
    UPDATE: "/api/Admin/Update",
    DELETE: "/api/Admin/DeleteCoupon",
  },
  TAGS: {
    GET_ALL: "/api/Admin/GetAllTags",
    CREATE: "/api/Admin/CreateTag",
    UPDATE: "/api/Admin/UpdateTag",
    DELETE: "/api/Admin/DeleteTag",
  },
  POINTS: {
    GET_ALL_TERMS: "/api/Admin/GetAllPointTerms",
    CREATE_TERM: "/api/Admin/CreatePointTermsCondition",
    UPDATE_TERM: "/api/Admin/UpdatePointTermsCondition",
    DELETE_TERM: "/api/Admin/DeletePointTerm",
    GET_REDEMPTION_CONFIG: "/api/Admin/GetPointsRedemptionConfig",
    UPDATE_REDEMPTION_CONFIG: "/api/Admin/UpdatePointsRedemptionConfig",
  },
  WALLET: {
    GET_WALLETS: "/api/Admin/wallets",
    GET_WALLET_BY_ID: "/api/Admin/wallets",
    UPDATE_WALLET: "/api/Admin/wallets",
    DELETE_WALLET: "/api/Admin/wallets",
    GET_TRANSACTIONS: "/api/Admin/transactions",
  },
  REVIEWS: {
    PRODUCTS: "/api/ReviewsManagement/admin/products",
    VENDORS: "/api/ReviewsManagement/admin/vendors",
    ORDERS: "/api/ReviewsManagement/admin/orders",
    UPDATE_PRODUCT_STATUS: "/api/ReviewsManagement/admin/products",
    UPDATE_VENDOR_STATUS: "/api/ReviewsManagement/admin/vendors",
    DELETE_PRODUCT: "/api/ReviewsManagement/admin/products",
    DELETE_VENDOR: "/api/ReviewsManagement/admin/vendors",
  },
  FAQ: {
    GET_ALL: "/api/Admin/getAllFAQs",
    ADD: "/api/Admin/addFAQ",
    UPDATE: "/api/Admin/updateFAQ",
    DELETE: "/api/Admin/deleteFAQ",
  },
  VENDOR_SUBSCRIPTIONS: {
    GET_ALL: "/api/Admin/GetAllVendorSubscriptions",
    CREATE: "/api/Admin/CreateVendorSubscription",
    UPDATE: "/api/Admin/UpdateVendorSubscription",
    DELETE: "/api/Admin/DeleteVendorSubscription",
  },
} as const;
