import { AxiosApi } from "@/features/providers/AxiosProvider";
import { ENDPOINTS } from "@/config/api.config";
import type {
  GetUsersParams,
  GetUsersResponse,
  CreateUserRequest,
  UpdateUserRequest,
  User,
} from "../types/users.types";

export const usersApi = {
  /**
   * Get paginated list of users with filters
   */
  getAll: async (params: GetUsersParams = {}): Promise<GetUsersResponse> => {
    const {
      searchTerm = "",
      role = "",
      isActive,
      status,
      cityId,
      pageNumber = 1,
      pageSize = 10,
      sortBy = "",
      sortDescending = false,
    } = params;

    const response = await AxiosApi.get<GetUsersResponse>(
      ENDPOINTS.ADMIN.USERS_LIST,
      {
        params: {
          searchTerm,
          role,
          isActive,
          status,
          cityId,
          pageNumber,
          pageSize,
          sortBy,
          sortDescending,
        },
      }
    );
    return response.data;
  },

  /**
   * Get single user by ID
   */
  getById: async (id: string): Promise<User> => {
    const response = await AxiosApi.get<User>(`${ENDPOINTS.ADMIN.USER}/${id}`);
    return response.data;
  },

  /**
   * Create new user (Admin, Vendor, or ShippingCompany)
   * Uses multipart/form-data
   */
  create: async (
    data: CreateUserRequest & { logoFile?: File }
  ): Promise<void> => {
    const formData = new FormData();

    // Common fields
    formData.append("CityId", String(data.cityId));
    formData.append("Email", data.email);
    formData.append("FullName", data.fullName);
    formData.append("Password", data.password);
    formData.append("PhoneNumber", data.phoneNumber);
    formData.append("SelectedRole", data.selectedRole);

    // Conditional common fields
    if (data.selectedRole === "Admin") {
      formData.append("IsActive", String((data as any).isActive));
    }
    if (data.status !== undefined) {
      formData.append("Status", String(data.status));
    }
    if ((data as any).address) {
      formData.append("Address", (data as any).address);
    }
    if ((data as any).districtId !== undefined) {
      formData.append("DistrictId", String((data as any).districtId));
    }

    // Role-specific fields
    if (data.selectedRole === "Admin") {
      formData.append("Department", data.department || "");
      formData.append("JobTitle", data.jobTitle || "");
    } else if (data.selectedRole === "Vendor") {
      formData.append("ShopName", data.shopName || "");
      formData.append("ShopNameAr", data.shopNameAr || "");
      if (data.logo) {
        formData.append("Logo", data.logo);
      }
      if (data.logoFile) {
        formData.append("logoFile", data.logoFile);
      }
      if (data.description) {
        formData.append("Description", data.description);
      }
      if (data.returnPolicy) {
        formData.append("ReturnPolicy", data.returnPolicy);
      }
      if (data.returnPolicyAr) {
        formData.append("ReturnPolicyAr", data.returnPolicyAr);
      }
      if (data.shippingPolicy) {
        formData.append("ShippingPolicy", data.shippingPolicy);
      }
      if (data.shippingPolicyAr) {
        formData.append("ShippingPolicyAr", data.shippingPolicyAr);
      }
      if (data.vendorDistrictId !== undefined) {
        formData.append("VendorDistrictId", String(data.vendorDistrictId));
      }
      formData.append("VendorContactEmail", data.vendorContactEmail || "");
      formData.append("VendorContactPhone", data.vendorContactPhone || "");
      formData.append("VendorAddress", data.vendorAddress || "");
    } else if (data.selectedRole === "ShippingCompany") {
      formData.append("CompanyName", data.companyName || "");
      if (data.companyDescription) {
        formData.append("CompanyDescription", data.companyDescription);
      }
      formData.append("CompanyContactEmail", data.companyContactEmail || "");
      formData.append("CompanyPhoneNumber", data.companyPhoneNumber || "");
    }

    await AxiosApi.post(ENDPOINTS.ADMIN.CREATE_USER, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  /**
   * Update existing user
   * Only sends role-specific fields
   */
  update: async (data: UpdateUserRequest): Promise<void> => {
    // Build request payload with only relevant fields based on role
    const payload: any = {
      id: data.id,
      currentRole: data.currentRole,
      email: data.email,
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      isActive: data.isActive,
      status: data.status,
      cityId: data.cityId,
    };

    // Conditional common fields
    if (data.address !== undefined) {
      payload.address = data.address;
    }
    if (data.districtId !== undefined && data.districtId !== null) {
      payload.districtId = data.districtId;
    }

    // Role-specific fields
    if (data.currentRole === "Admin" || data.currentRole === "Super Admin") {
      if (data.department) payload.department = data.department;
      if (data.jobTitle) payload.jobTitle = data.jobTitle;
    } else if (data.currentRole === "Vendor") {
      if (data.vendorId) payload.vendorId = data.vendorId;
      if (data.shopName) payload.shopName = data.shopName;
      if (data.shopNameAr) payload.shopNameAr = data.shopNameAr;
      if (data.logo) payload.logo = data.logo;
      if (data.description) payload.description = data.description;
      if (data.returnPolicy) payload.returnPolicy = data.returnPolicy;
      if (data.returnPolicyAr) payload.returnPolicyAr = data.returnPolicyAr;
      if (data.shippingPolicy) payload.shippingPolicy = data.shippingPolicy;
      if (data.shippingPolicyAr)
        payload.shippingPolicyAr = data.shippingPolicyAr;
      if (data.vendorCityId) payload.vendorCityId = data.vendorCityId;
      if (data.vendorDistrictId)
        payload.vendorDistrictId = data.vendorDistrictId;
      if (data.vendorContactEmail)
        payload.vendorContactEmail = data.vendorContactEmail;
      if (data.vendorContactPhone)
        payload.vendorContactPhone = data.vendorContactPhone;
      if (data.vendorAddress) payload.vendorAddress = data.vendorAddress;
      if (data.vendorStatus !== undefined)
        payload.vendorStatus = data.vendorStatus;
    } else if (data.currentRole === "ShippingCompany") {
      if (data.shippingCompanyId)
        payload.shippingCompanyId = data.shippingCompanyId;
      if (data.companyName) payload.companyName = data.companyName;
      if (data.companyDescription)
        payload.companyDescription = data.companyDescription;
      if (data.companyContactEmail)
        payload.companyContactEmail = data.companyContactEmail;
      if (data.companyPhoneNumber)
        payload.companyPhoneNumber = data.companyPhoneNumber;
    }

    await AxiosApi.put(ENDPOINTS.ADMIN.UPDATE_USER, payload);
  },

  /**
   * Delete user
   */
  delete: async (id: string): Promise<void> => {
    await AxiosApi.delete(`${ENDPOINTS.ADMIN.USER}/${id}`);
  },
};
