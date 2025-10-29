import { forwardRef } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface FormCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  registration?: Partial<UseFormRegisterReturn>;
}

export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ label, error, registration, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="flex items-center gap-2">
          <input
            ref={ref}
            type="checkbox"
            {...registration}
            {...props}
            className={`w-5 h-5 text-[#E6497F] rounded focus:ring-[#E6497F] border-gray-300 ${className}`}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${props.id}-error` : undefined}
          />
          <label htmlFor={props.id} className="text-sm font-bold text-black">
            {label}
          </label>
        </div>
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

FormCheckbox.displayName = "FormCheckbox";
