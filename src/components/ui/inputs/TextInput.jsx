// components/ui/inputs/TextInput.jsx
import { useId } from "react";
import { useController, useFormContext } from "react-hook-form";

export default function TextInput({ name, label, placeholder }) {
  const inputId = useId();
  const { control, formState } = useFormContext();

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label
        htmlFor={inputId}
        style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}
      >
        {label}
      </label>
      <input
        id={inputId}
        {...field}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "0.5rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      {error && (
        <p style={{ color: "red", marginTop: "0.5rem" }}>{error.message}</p>
      )}
    </div>
  );
}
