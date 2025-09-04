// components/ui/inputs/SelectInput.jsx
import { useId } from "react";
import { useController, useFormContext } from "react-hook-form";

export default function SelectInput({ name, label, options, placeholder }) {
  const inputId = useId();
  const { control } = useFormContext();

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className="form-control w-full mb-4">
      {label && (
        <label className="label" htmlFor={inputId}>
          <span className="label-text font-semibold">{label}</span>
        </label>
      )}

      <select
        id={inputId}
        {...field}
        className={`select select-bordered w-full bg-white text-gray-900 ${
          error ? "select-error" : ""
        }`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error.message}</span>
        </label>
      )}
    </div>
  );
}
