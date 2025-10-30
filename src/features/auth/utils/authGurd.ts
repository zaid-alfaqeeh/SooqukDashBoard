"use client";

import React, { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectUser } from "../authSlice/authSlice";
import type { UserRole } from "../types/auth.types";

/**
 * Auth guard hook to protect routes
 * @param allowedRoles - Array of roles allowed to access the route
 * @param redirectTo - Path to redirect if not authorized (default: "/login")
 */
export const useAuthGuard = (
  allowedRoles?: UserRole[],
  redirectTo: string = "/login"
) => {
  const router = useRouter();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // Check if user has required role
    if (allowedRoles && allowedRoles.length > 0 && user) {
      const hasRequiredRole = user.roles.some((role) =>
        allowedRoles.includes(role)
      );

      if (!hasRequiredRole) {
        // Redirect to unauthorized page or home
        router.push("/unauthorized");
      }
    }
  }, [isAuthenticated, user, allowedRoles, router, redirectTo]);

  return { isAuthenticated, user, isLoading: false };
};

/**
 * Check if user has specific role
 */
export const useHasRole = (role: UserRole): boolean => {
  const user = useSelector(selectUser);
  return user?.roles.includes(role) || false;
};

/**
 * Check if user has any of the specified roles
 */
export const useHasAnyRole = (roles: UserRole[]): boolean => {
  const user = useSelector(selectUser);
  if (!user) return false;
  return user.roles.some((userRole) => roles.includes(userRole));
};

/**
 * HOC to protect a component with auth guard
 */
export function withAuthGuard<P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
  allowedRoles?: UserRole[]
): React.ComponentType<P> {
  const AuthGuardedComponent = (props: P) => {
    const { isAuthenticated } = useAuthGuard(allowedRoles);

    if (!isAuthenticated) {
      return null;
    }

    return React.createElement(Component, props);
  };

  return AuthGuardedComponent;
}

/**
 * Role-based component rendering
 */
interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
}

export const RoleGuard = ({
  children,
  allowedRoles,
  fallback = null,
}: RoleGuardProps) => {
  const hasRole = useHasAnyRole(allowedRoles);

  if (!hasRole) {
    return fallback;
  }

  return children;
};

/**
 * Constants for role-based access
 */
export const ROLES = {
  ADMIN: "Admin" as UserRole,
  VENDOR: "Vendor" as UserRole,
  SHIPPING_COMPANY: "ShippingCompany" as UserRole,
};

/**
 * Role groups for common access patterns
 */
export const ROLE_GROUPS = {
  ALL: [ROLES.ADMIN, ROLES.VENDOR, ROLES.SHIPPING_COMPANY],
  ADMIN_ONLY: [ROLES.ADMIN],
  VENDOR_ONLY: [ROLES.VENDOR],
  SHIPPING_ONLY: [ROLES.SHIPPING_COMPANY],
  ADMIN_AND_VENDOR: [ROLES.ADMIN, ROLES.VENDOR],
};
