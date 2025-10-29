import { forwardRef } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  registration?: Partial<UseFormRegisterReturn>;
  isRequired?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    { label, error, registration, isRequired, className = "", ...props },
    ref
  ) => {
    return (
      <div className="w-full">
        <label className="block text-sm font-bold text-black mb-2">
          {label} {isRequired && "*"}
        </label>
        <input
          ref={ref}
          {...registration}
          {...props}
          className={`w-full px-4 py-3 border-2 rounded-lg text-black outline-none transition-colors ${
            error
              ? "border-red-500 focus:border-red-600"
              : "border-gray-300 focus:border-[#E6497F]"
          } ${
            props.disabled ? "opacity-50 cursor-not-allowed" : ""
          } ${className}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${props.id}-error` : undefined}
        />
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

FormInput.displayName = "FormInput";
