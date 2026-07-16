/**
 * DateInput — Masked date input for the Digio ecosystem.
 *
 * Format: DD-MM-YYYY with fixed hyphens. The user can only type digits;
 * hyphens auto-appear at positions 2 and 5, and cursor movement skips
 * over them (backspace/arrow keys included).
 *
 * Value is always in DD-MM-YYYY format (or partial while typing).
 * Styling comes entirely from the consumer via className.
 *
 * @example
 * <DateInput
 *   value={date}
 *   onChange={setDate}
 *   className="input-field"
 *   aria-label="Receipt date"
 * />
 */

import { useRef, useCallback, type ChangeEvent, type KeyboardEvent } from "react";

export interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  "aria-label"?: string;
}

export function DateInput({ value, onChange, placeholder = "DD-MM-YYYY", className, ...props }: DateInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const formatValue = useCallback((raw: string): string => {
    // Strip everything except digits
    const digits = raw.replace(/\D/g, "").slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4)}`;
  }, []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatValue(e.target.value);
    onChange(formatted);

    // Position cursor after the auto-inserted hyphen
    requestAnimationFrame(() => {
      const el = inputRef.current;
      if (!el) return;
      const digits = formatted.replace(/\D/g, "").length;
      // After 2 digits, cursor should be at pos 3 (after "DD-")
      // After 4 digits, cursor should be at pos 6 (after "DD-MM-")
      if (digits === 2 && formatted.length === 3) el.setSelectionRange(3, 3);
      else if (digits === 4 && formatted.length === 6) el.setSelectionRange(6, 6);
    });
  }, [formatValue, onChange]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    const el = inputRef.current;
    if (!el) return;
    const pos = el.selectionStart ?? 0;

    // Backspace at position right after a hyphen: skip the hyphen
    if (e.key === "Backspace" && (pos === 3 || pos === 6)) {
      e.preventDefault();
      const digits = value.replace(/\D/g, "");
      const trimmed = digits.slice(0, pos === 3 ? 1 : 3);
      const formatted = formatValue(trimmed);
      onChange(formatted);
      requestAnimationFrame(() => {
        el.setSelectionRange(pos - 1, pos - 1);
      });
    }

    // Arrow right at hyphen: skip past it
    if (e.key === "ArrowRight" && (pos === 2 || pos === 5)) {
      e.preventDefault();
      el.setSelectionRange(pos + 1, pos + 1);
    }

    // Arrow left at position after hyphen: skip back past it
    if (e.key === "ArrowLeft" && (pos === 3 || pos === 6)) {
      e.preventDefault();
      el.setSelectionRange(pos - 1, pos - 1);
    }
  }, [value, formatValue, onChange]);

  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      className={className}
      maxLength={10}
      {...props}
    />
  );
}
