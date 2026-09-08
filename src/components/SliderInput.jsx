import { useState } from 'react';
import { clamp } from '../utils/format';

/**
 * Slider input: label + editable value box + range slider.
 * Pass `disabled` to show a fixed value without a slider.
 */
export default function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  hint,
  disabled = false,
}) {
  const [text, setText] = useState(String(value));
  const [invalid, setInvalid] = useState(false);
  const [prevValue, setPrevValue] = useState(value);

  // Keep the text box in sync when the value changes from outside (slider / reset).
  if (value !== prevValue) {
    setPrevValue(value);
    if (parseFloat(text) !== value) {
      setText(String(value));
      setInvalid(false);
    }
  }

  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;

  function handleText(e) {
    const raw = e.target.value;
    setText(raw);
    const num = parseFloat(raw);
    if (!Number.isFinite(num) || num < min || num > max) {
      setInvalid(true);
      if (Number.isFinite(num)) onChange(clamp(num, min, max));
      return;
    }
    setInvalid(false);
    onChange(num);
  }

  function handleBlur() {
    const num = parseFloat(text);
    const safe = clamp(Number.isFinite(num) ? num : min, min, max);
    setText(String(safe));
    setInvalid(false);
    onChange(safe);
  }

  const id = 'in-' + label.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <div className={'slider-row' + (disabled ? ' fixed' : '')}>
      <div className="slider-head">
        <label className="slider-label" htmlFor={id}>
          {label}
        </label>
        <div className={'slider-value' + (invalid ? ' invalid' : '') + (disabled ? ' disabled' : '')}>
          {prefix && <span className="prefix">{prefix}</span>}
          <input
            id={id}
            type="number"
            inputMode="decimal"
            value={disabled ? value : text}
            min={min}
            max={max}
            step={step}
            onChange={handleText}
            onBlur={handleBlur}
            aria-label={label}
            disabled={disabled}
            readOnly={disabled}
          />
          {suffix && <span className="suffix">{suffix}</span>}
        </div>
      </div>
      {!disabled && (
        <input
          type="range"
          className="slider"
          min={min}
          max={max}
          step={step}
          value={value}
          style={{ '--pct': `${clamp(pct, 0, 100)}%` }}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          aria-label={label + ' slider'}
        />
      )}
      {invalid && (
        <div className="slider-hint error">
          Enter a value between {min} and {max}
        </div>
      )}
      {hint && !invalid && <div className="slider-hint">{hint}</div>}
    </div>
  );
}
