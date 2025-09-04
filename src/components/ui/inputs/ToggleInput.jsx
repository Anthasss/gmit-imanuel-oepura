import { useController, useFormContext } from "react-hook-form";

export default function ToggleInput({ name, label }) {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({ name, control });

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label
        style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}
      >
        {label}
      </label>
      <label style={styles.switch}>
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          style={styles.input}
        />
        <span
          style={{
            ...styles.slider,
            backgroundColor: value ? "#4caf50" : "#ccc",
          }}
        >
          <span
            style={{
              ...styles.circle,
              transform: value ? "translateX(22px)" : "translateX(0)",
            }}
          />
        </span>
      </label>
    </div>
  );
}

const styles = {
  switch: {
    position: "relative",
    display: "inline-block",
    width: "50px",
    height: "28px",
  },
  input: {
    opacity: 0,
    width: 0,
    height: 0,
    position: "absolute",
  },
  slider: {
    position: "absolute",
    cursor: "pointer",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition: "0.4s",
    borderRadius: "34px",
  },
  circle: {
    position: "absolute",
    content: '""',
    height: "20px",
    width: "20px",
    left: "4px",
    bottom: "4px",
    backgroundColor: "white",
    transition: "0.4s",
    borderRadius: "50%",
  },
};
