import type { UserRole } from "../auth/types/auth.types";

export interface MenuItem {
  id: string;
  labelKey: string; // Translation key
  icon: string; // Icon name or SVG path
  path: string;
  roles: UserRole[]; // Which roles can see this item
  badge?: string; // Optional badge text
  children?: MenuItem[]; // Sub-menu items
}

/**
 * Main navigation menu configuration
 */
export const menuConfig: MenuItem[] = [
  // Dashboard - All roles
  {
    id: "dashboard",
    labelKey: "menu.dashboard",
    icon: "dashboard",
    path: "/dashboard",
    roles: ["Admin"],
  },

  // Admin Only Sections
  {
    id: "users",
    labelKey: "menu.users",
    icon: "users",
    path: "/dashboard/users",
    roles: ["Admin"],
  },

  {
    id: "cities",
    labelKey: "locations.cities",
    icon: "map",
    path: "/dashboard/cities",
    roles: ["Admin"],
  },
  {
    id: "districts",
    labelKey: "locations.districts",
    icon: "map",
    path: "/dashboard/districts",
    roles: ["Admin"],
  },
  {
    id: "categories",
    labelKey: "menu.categories",
    icon: "category",
    path: "/dashboard/categories",
    roles: ["Admin"],
  },
  {
    id: "subCategories",
    labelKey: "menu.subCategories",
    icon: "category",
    path: "/dashboard/subCategory",
    roles: ["Admin"],
  },
  {
    id: "colors-sizes",
    labelKey: "menu.colorsSizes",
    icon: "palette",
    path: "/dashboard/colors-sizes",
    roles: ["Admin"],
  },
  {
    id: "subscriptions",
    labelKey: "menu.subscriptions",
    icon: "subscription",
    path: "/dashboard/subscriptions",
    roles: ["Admin"],
  },
  {
    id: "heroSliders",
    labelKey: "menu.heroSliders",
    icon: "image",
    path: "/dashboard/hero-sliders",
    roles: ["Admin"],
  },
  {
    id: "coupons",
    labelKey: "menu.coupons",
    icon: "ticket",
    path: "/dashboard/coupons",
    roles: ["Admin"],
  },
  {
    id: "tags",
    labelKey: "menu.tags",
    icon: "tag",
    path: "/dashboard/tags",
    roles: ["Admin"],
  },
  {
    id: "points",
    labelKey: "menu.points",
    icon: "gift",
    path: "/dashboard/points",
    roles: ["Admin"],
  },
  {
    id: "wallet",
    labelKey: "menu.wallet",
    icon: "wallet",
    path: "/dashboard/wallet",
    roles: ["Admin"],
  },
  {
    id: "reviews",
    labelKey: "menu.reviews",
    icon: "star",
    path: "/dashboard/reviews",
    roles: ["Admin"],
  },
  {
    id: "faq",
    labelKey: "menu.faq",
    icon: "question",
    path: "/dashboard/faq",
    roles: ["Admin"],
  },
  {
    id: "vendor-subscriptions",
    labelKey: "menu.vendorSubscriptions",
    icon: "subscription",
    path: "/dashboard/vendor-subscriptions",
    roles: ["Admin"],
  },

  // Vendor Only Sections
  {
    id: "my-subscription",
    labelKey: "menu.mySubscription",
    icon: "subscription",
    path: "/dashboard/my-subscription",
    roles: ["Vendor", "Admin"], // in production this should be only Vendor
  },
  {
    id: "vendor-statistics",
    labelKey: "menu.vendorStatistics",
    icon: "chart",
    path: "/dashboard/vendor-statistics",
    roles: ["Vendor", "Admin"], // in production this should be only Vendor
  },
  {
    id: "vendor-reviews",
    labelKey: "menu.vendorReviews",
    icon: "star",
    path: "/dashboard/vendor-reviews",
    roles: ["Vendor", "Admin"], // in production this should be only Vendor
  },
  {
    id: "product-reviews",
    labelKey: "menu.productReviews",
    icon: "star",
    path: "/dashboard/product-reviews",
    roles: ["Vendor", "Admin"], // in production this should be only Vendor
  },
  {
    id: "products",
    labelKey: "menu.products",
    icon: "package",
    path: "/dashboard/products",
    roles: ["Vendor", "Admin"],
  },
  {
    id: "vendor-orders",
    labelKey: "menu.vendorOrders",
    icon: "shopping-bag",
    path: "/dashboard/vendor-orders",
    roles: ["Vendor", "Admin"], // in production this should be only Vendor
  },

  // Shipping Company Only Sections
  {
    id: "shipping",
    labelKey: "menu.shipping",
    icon: "truck",
    path: "/dashboard/shipping",
    roles: ["Admin", "ShippingCompany"],
  },

  // Orders - Admin & Shipping
  {
    id: "orders",
    labelKey: "menu.orders",
    icon: "shopping-bag",
    path: "/dashboard/orders",
    roles: ["Admin"],
  },

  // Analytics - Admin & Vendor
  {
    id: "analytics",
    labelKey: "menu.analytics",
    icon: "chart",
    path: "/dashboard/analytics",
    roles: ["Admin", "Vendor"],
  },

  // Support - Admin only
  {
    id: "support",
    labelKey: "menu.support",
    icon: "support",
    path: "/dashboard/support",
    roles: ["Admin"],
  },
  {
    id: "error-logs",
    labelKey: "menu.errorLogs",
    icon: "document",
    path: "/dashboard/error-logs",
    roles: ["Admin"],
  },

  // Settings - All roles
  {
    id: "settings",
    labelKey: "menu.settings",
    icon: "settings",
    path: "/dashboard/settings",
    roles: ["Admin", "Vendor", "ShippingCompany"],
  },
];

/**
 * Filter menu items based on user role
 */
export const getMenuForRole = (userRole: UserRole): MenuItem[] => {
  return menuConfig.filter((item) => item.roles.includes(userRole));
};

/**
 * Get icon component based on icon name
 */
export const getIconPath = (iconName: string): string => {
  const icons: Record<string, string> = {
    dashboard:
      "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    users:
      "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    store:
      "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
    truck:
      "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0",
    category:
      "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z",
    package: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    "shopping-bag": "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
    map: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
    chart:
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    document:
      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    settings:
      "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    support:
      "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
    subscription:
      "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    palette:
      "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
    image:
      "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
    ticket:
      "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z",
    tag: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z",
    gift: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7",
    wallet:
      "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    star: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  };

  return icons[iconName] || icons.dashboard;
};
