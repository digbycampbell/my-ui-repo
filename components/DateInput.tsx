/**
 * DateInput — Masked date input for the Digio ecosystem.
 *
 * Format: DD-MM-YYYY with fixed hyphens. The user can only type digits;
 * hyphens auto-appear at positions 2 and 5. Backspace at a hyphen boundary
 * deletes the preceding digit while preserving the rest of the value.
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
    const el = e.target;
    const originalSelectionStart = el.selectionStart ?? 0;
    const rawValue = el.value;

    // Count the digits before the cursor so we can restore an equivalent
    // position in the reformatted (hyphenated) value.
    const digitsBeforeCursor = rawValue.slice(0, originalSelectionStart).replace(/\D/g, "").length;
    const formatted = formatValue(rawValue);
    onChange(formatted);

    requestAnimationFrame(() => {
      const input = inputRef.current;
      if (!input) return;

      let newPos = 0;
      let digitCount = 0;
      while (newPos < formatted.length && digitCount < digitsBeforeCursor) {
        if (/\d/.test(formatted[newPos])) digitCount++;
        newPos++;
      }
      // Land after an auto-inserted hyphen rather than before it.
      if (newPos < formatted.length && formatted[newPos] === "-") newPos++;

      input.setSelectionRange(newPos, newPos);
    });
  }, [formatValue, onChange]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    const el = inputRef.current;
    if (!el) return;
    const pos = el.selectionStart ?? 0;

    // Backspace right after a hyphen: delete the single digit before the hyphen,
    // preserving everything after the cursor. Skip when text is selected so
    // normal selection-delete still works.
    if (e.key === "Backspace" && el.selectionStart === el.selectionEnd && (pos === 3 || pos === 6)) {
      e.preventDefault();
      const digits = value.replace(/\D/g, "");
      const deleteIdx = pos === 3 ? 1 : 3;
      const remainingDigits = digits.slice(0, deleteIdx) + digits.slice(deleteIdx + 1);
      const formatted = formatValue(remainingDigits);
      onChange(formatted);
      requestAnimationFrame(() => {
        const newPos = pos - 2;
        el.setSelectionRange(newPos, newPos);
      });
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
