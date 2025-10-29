import { forwardRef } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  registration?: Partial<UseFormRegisterReturn>;
  isRequired?: boolean;
  options: Array<{ value: string | number; label: string }>;
  placeholder?: string;
  isLoading?: boolean;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      label,
      error,
      registration,
      isRequired,
      options,
      placeholder,
      isLoading,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        <label className="block text-sm font-bold text-black mb-2">
          {label} {isRequired && "*"}
        </label>
        <select
          ref={ref}
          {...registration}
          {...props}
          className={`w-full px-4 py-3 border-2 rounded-lg font-semibold text-black outline-none transition-colors ${
            error
              ? "border-red-500 focus:border-red-600"
              : "border-gray-300 focus:border-[#E6497F]"
          } ${
            props.disabled ? "opacity-50 cursor-not-allowed" : ""
          } ${className}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${props.id}-error` : undefined}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {isLoading ? (
            <option disabled>Loading...</option>
          ) : (
            options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          )}
        </select>
        {error && (
          <p
            id={`${props.id}-error`}
            className="mt-1 text-sm text-red-600 font-medium"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";
