import { forwardRef } from "react";
import { formatUtils } from "@/lib/formatUtils";

const DatePicker = forwardRef(function DatePicker(
  {
    value,
    onChange,
    placeholder = "Pilih tanggal",
    className = "",
    error,
    label,
    required,
    ...props
  },
  ref
) {
  const handleChange = (e) => {
    onChange && onChange(e.target.value);
  };

  const formatDisplayDate = (dateValue) => {
    if (!dateValue) return "";
    
    try {
      const date = new Date(dateValue);
      return formatUtils.formatDate(date, "DD/MM/YYYY");
    } catch (error) {
      return dateValue;
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={ref}
          type="date"
          value={value || ""}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            error ? "border-red-500 focus:ring-red-500" : ""
          } ${className}`}
          {...props}
        />
        
        {value && (
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
            {formatDisplayDate(value)}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
});

export default DatePicker;