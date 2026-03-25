"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  selectIsAuthenticated,
  selectCurrentUser,
  selectUserRole,
  setCredentials,
  logout as logoutAction,
  setLoading,
  setError,
} from "@/redux/features/auth/authSlice";
import { hasPermission, getPermissions } from "@/types/rbac";
import type { User, Permission } from "@/types";

// Hook for checking authentication status
export function useAuth() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);
  const role = useAppSelector(selectUserRole);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const login = useCallback(
    (userData: User, token: string) => {
      dispatch(setCredentials({ user: userData, token }));
      router.push("/dashboard");
    },
    [dispatch, router],
  );

  const logout = useCallback(() => {
    dispatch(logoutAction());
    router.push("/auth/signin");
  }, [dispatch, router]);

  return {
    isAuthenticated,
    user,
    role,
    login,
    logout,
  };
}

// Hook for checking permissions
export function usePermission(permission: Permission): boolean {
  const role = useAppSelector(selectUserRole);

  if (!role) return false;

  return hasPermission(role, permission);
}

// Hook for getting all permissions
export function usePermissions(): Permission[] {
  const role = useAppSelector(selectUserRole);

  if (!role) return [];

  return getPermissions(role);
}

// Hook for protected route
export function useProtectedRoute(redirectTo: string = "/auth/signin") {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, router, redirectTo]);

  return isAuthenticated;
}

// Hook for role-based route access
export function useRoleAccess(
  allowedRoles: ("admin" | "manager" | "branch_manager")[],
  redirectTo: string = "/dashboard",
) {
  const role = useAppSelector(selectUserRole);
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/signin");
      return;
    }

    if (role && !allowedRoles.includes(role)) {
      router.push(redirectTo);
    }
  }, [role, isAuthenticated, router, allowedRoles, redirectTo]);

  return {
    hasAccess: role ? allowedRoles.includes(role) : false,
    role,
  };
}

// Mock login for demo purposes
export function useDemoLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const loginAsAdmin = useCallback(() => {
    dispatch(setLoading(true));
    // Simulate API call
    setTimeout(() => {
      dispatch(
        setCredentials({
          user: {
            id: "1",
            email: "admin@salvationlounge.com",
            name: "Admin User",
            role: "admin",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          token: "demo-token-admin",
        }),
      );
      dispatch(setLoading(false));
      router.push("/dashboard");
    }, 500);
  }, [dispatch, router]);

  const loginAsManager = useCallback(() => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(
        setCredentials({
          user: {
            id: "2",
            email: "manager@salvationlounge.com",
            name: "Manager User",
            role: "manager",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          token: "demo-token-manager",
        }),
      );
      dispatch(setLoading(false));
      router.push("/dashboard");
    }, 500);
  }, [dispatch, router]);

  const loginAsBranchManager = useCallback(() => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(
        setCredentials({
          user: {
            id: "3",
            email: "branch@salvationlounge.com",
            name: "Branch Manager",
            role: "branch_manager",
            locationId: "loc-1",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          token: "demo-token-branch",
        }),
      );
      dispatch(setLoading(false));
      router.push("/dashboard");
    }, 500);
  }, [dispatch, router]);

  return {
    loginAsAdmin,
    loginAsManager,
    loginAsBranchManager,
  };
}
