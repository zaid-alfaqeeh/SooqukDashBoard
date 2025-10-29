import { z } from "zod";
import type { UserRole } from "../types/users.types";

// Complete form schema with all possible fields
const editUserFormSchema = z.object({
  // Common fields
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long"),
  email: z.string().email("Invalid email format"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number is too long")
    .regex(/^[0-9+\s()-]+$/, "Invalid phone number format"),
  isActive: z.boolean(),
  status: z.number().min(0).max(3),
  cityId: z.number().min(1, "Please select a city"),
  districtId: z.number().optional(),
  address: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  // Admin fields
  department: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  jobTitle: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  // Vendor fields
  shopName: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  shopNameAr: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  logo: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  description: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  returnPolicy: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  vendorShippingPolicy: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  vendorShippingPolicyAr: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  vendorDistrictId: z.number().optional(),
  vendorContactEmail: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  vendorContactPhone: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  vendorAddress: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  vendorStatus: z.number().optional(),
  // Shipping Company fields
  companyName: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  companyDescription: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  companyContactEmail: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  companyPhoneNumber: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
});

// Role-specific refinements
export function getValidationSchema(role: UserRole) {
  return editUserFormSchema.superRefine((data, ctx) => {
    // Admin/Super Admin validations
    if (role === "Admin" || role === "Super Admin") {
      if (!data.districtId || data.districtId === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select a district",
          path: ["districtId"],
        });
      }
      if (!data.address || data.address.length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Address must be at least 5 characters",
          path: ["address"],
        });
      }
      if (!data.department || data.department.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Department is required",
          path: ["department"],
        });
      }
      if (!data.jobTitle || data.jobTitle.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Job title is required",
          path: ["jobTitle"],
        });
      }
    }

    // Vendor validations
    if (role === "Vendor") {
      if (!data.districtId || data.districtId === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select a district",
          path: ["districtId"],
        });
      }
      if (!data.address || data.address.length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Address must be at least 5 characters",
          path: ["address"],
        });
      }
      if (!data.shopName || data.shopName.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Shop name is required",
          path: ["shopName"],
        });
      }
      if (!data.shopNameAr || data.shopNameAr.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Arabic shop name is required",
          path: ["shopNameAr"],
        });
      }
      if (data.logo && data.logo.length > 0) {
        try {
          new URL(data.logo);
        } catch {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid URL format",
            path: ["logo"],
          });
        }
      }
      if (!data.vendorDistrictId || data.vendorDistrictId === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select vendor district",
          path: ["vendorDistrictId"],
        });
      }
      if (
        !data.vendorContactEmail ||
        !z.string().email().safeParse(data.vendorContactEmail).success
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid email format",
          path: ["vendorContactEmail"],
        });
      }
      if (!data.vendorContactPhone || data.vendorContactPhone.length < 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Phone number must be at least 10 digits",
          path: ["vendorContactPhone"],
        });
      }
      if (
        data.vendorContactPhone &&
        !/^[0-9+\s()-]+$/.test(data.vendorContactPhone)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid phone number format",
          path: ["vendorContactPhone"],
        });
      }
      if (!data.vendorAddress || data.vendorAddress.length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Vendor address is required",
          path: ["vendorAddress"],
        });
      }
    }

    // Shipping Company validations
    if (role === "ShippingCompany") {
      if (!data.companyName || data.companyName.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Company name is required",
          path: ["companyName"],
        });
      }
      if (
        !data.companyContactEmail ||
        !z.string().email().safeParse(data.companyContactEmail).success
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid email format",
          path: ["companyContactEmail"],
        });
      }
      if (!data.companyPhoneNumber || data.companyPhoneNumber.length < 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Phone number must be at least 10 digits",
          path: ["companyPhoneNumber"],
        });
      }
      if (
        data.companyPhoneNumber &&
        !/^[0-9+\s()-]+$/.test(data.companyPhoneNumber)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid phone number format",
          path: ["companyPhoneNumber"],
        });
      }
    }
  });
}

// Export type
export type EditUserFormData = z.infer<typeof editUserFormSchema>;
