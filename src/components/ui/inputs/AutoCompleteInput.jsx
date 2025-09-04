// components/ui/inputs/AutoCompleteInput.jsx
import { useId } from "react";
import { useController, useFormContext } from "react-hook-form";

export default function AutoCompleteInput({
  name,
  label,
  options,
  placeholder,
}) {
  const inputId = useId();
  const dataListId = `${inputId}-datalist`;
  const { control } = useFormContext();

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className="form-control w-full mb-4">
      {label && (
        <label htmlFor={inputId} className="label">
          <span className="label-text font-semibold">{label}</span>
        </label>
      )}

      <input
        id={inputId}
        list={dataListId}
        {...field}
        placeholder={placeholder}
        className={`input input-bordered w-full ${error ? "input-error" : ""}`}
      />

      <datalist id={dataListId}>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </datalist>

      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error.message}</span>
        </label>
      )}
    </div>
  );
}
