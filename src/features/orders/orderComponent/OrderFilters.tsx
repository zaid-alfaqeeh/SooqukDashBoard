import { useTranslations } from "next-intl";
import { OrderStatus } from "../types/order.types";

interface OrderFiltersProps {
  status: OrderStatus | undefined;
  customerName: string;
  orderNumber: string;
  onStatusChange: (status: OrderStatus | undefined) => void;
  onCustomerNameChange: (name: string) => void;
  onOrderNumberChange: (orderNumber: string) => void;
}

export default function OrderFilters({
  status,
  customerName,
  orderNumber,
  onStatusChange,
  onCustomerNameChange,
  onOrderNumberChange,
}: OrderFiltersProps) {
  const t = useTranslations("orders");

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={status || ""}
          onChange={(e) => {
            onStatusChange(
              e.target.value
                ? (Number(e.target.value) as OrderStatus)
                : undefined
            );
          }}
          className="px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-black focus:border-[#E6497F] outline-none"
        >
          <option value="">{t("filters.allStatus")}</option>
          <option value={OrderStatus.Pending}>{t("statuses.pending")}</option>
          <option value={OrderStatus.Confirmed}>
            {t("statuses.confirmed")}
          </option>
          <option value={OrderStatus.Processing}>
            {t("statuses.processing")}
          </option>
          <option value={OrderStatus.Shipped}>{t("statuses.shipped")}</option>
          <option value={OrderStatus.Delivered}>
            {t("statuses.delivered")}
          </option>
          <option value={OrderStatus.Cancelled}>
            {t("statuses.cancelled")}
          </option>
        </select>

        <input
          type="text"
          value={customerName}
          onChange={(e) => onCustomerNameChange(e.target.value)}
          placeholder={t("filters.searchCustomer")}
          className="px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-black placeholder:text-gray-500 focus:border-[#E6497F] outline-none"
        />

        <input
          type="text"
          value={orderNumber}
          onChange={(e) => onOrderNumberChange(e.target.value)}
          placeholder={t("filters.searchOrderNumber")}
          className="px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-black placeholder:text-gray-500 focus:border-[#E6497F] outline-none"
        />
      </div>
    </div>
  );
}
