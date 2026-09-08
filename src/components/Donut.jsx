/**
 * Simple two/three segment donut chart drawn in SVG (no chart library needed).
 * segments: [{ label, value, color }]
 */
export default function Donut({ segments, size = 230, stroke = 44, centerLabel, centerValue }) {
  const total = segments.reduce((s, x) => s + Math.max(0, x.value), 0) || 1;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcs = segments.reduce((list, s) => {
    const dash = (Math.max(0, s.value) / total) * circumference;
    const prev = list[list.length - 1];
    const offset = prev ? prev.offset + prev.dash : 0;
    return [...list, { ...s, dash, offset }];
  }, []);

  return (
    <div className="chart-panel">
      <div className="chart-legend" aria-hidden="true">
        {segments.map((s) => (
          <span key={s.label}>
            <i style={{ background: s.color }} /> {s.label}
          </span>
        ))}
      </div>
      <div className="donut-wrap" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label={segments.map((s) => `${s.label}: ${Math.round((s.value / total) * 100)}%`).join(', ')}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#f0f0f3"
            strokeWidth={stroke}
          />
          {arcs.map((s) => (
            <circle
              key={s.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={`${s.dash} ${circumference - s.dash}`}
              strokeDashoffset={-s.offset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              style={{ transition: 'stroke-dasharray 0.3s ease, stroke-dashoffset 0.3s ease' }}
            />
          ))}
        </svg>
        {(centerLabel || centerValue) && (
          <div className="donut-center">
            {centerLabel && <small>{centerLabel}</small>}
            {centerValue && <strong>{centerValue}</strong>}
          </div>
        )}
      </div>
    </div>
  );
}
