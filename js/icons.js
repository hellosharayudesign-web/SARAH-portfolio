/* Icon system — ported 1:1 from the React ICON_PATHS / Icon / IconBadge / GradientRingBadge
   components. Stroke-based outline set, no fills, no emoji. */

const ICON_PATHS = {
  layers: '<path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" />',
  shield: '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />',
  fileCheck: '<path d="M7 3h7l4 4v14H7z" /><path d="M9.5 13.5l2 2 4-4.5" />',
  user: '<circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />',
  building: '<rect x="5" y="3" width="14" height="18" rx="1" /><path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01" />',
  clock: '<circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" />',
  award: '<circle cx="12" cy="9" r="5.5" /><path d="M8.5 13.5L7 21l5-2.5L17 21l-1.5-7.5" />',
  search: '<circle cx="10.5" cy="10.5" r="6.5" /><path d="M20 20l-4.8-4.8" />',
  map: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" /><path d="M9 4v14M15 6v14" />',
  layout: '<rect x="3.5" y="4" width="17" height="16" rx="1.5" /><path d="M3.5 9.5h17M9 9.5V20" />',
  checkCircle: '<circle cx="12" cy="12" r="8.5" /><path d="M8.5 12.2l2.3 2.3 4.5-5" />',
  penTool: '<path d="M4 20l4-1 10-10-3-3L5 16l-1 4zM14 6l3 3" />',
  code: '<path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5" />',
  target: '<circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />',
  quote: '<path d="M8.5 9c-2 0-3.5 1.6-3.5 4s1.5 4 3.5 4 3.5-1.6 3.5-4c0-3-1.5-5.5-4-7M17 9c-2 0-3.5 1.6-3.5 4s1.5 4 3.5 4 3.5-1.6 3.5-4c0-3-1.5-5.5-4-7" />',
  arrowRight: '<path d="M4 12h15M13 6l6 6-6 6" />',
  puzzle: '<path d="M9 4h4a1.5 1.5 0 010 3 1.5 1.5 0 000 3h4v4a1.5 1.5 0 01-3 0 1.5 1.5 0 00-3 0v4H7v-4a1.5 1.5 0 00-3 0 1.5 1.5 0 010-3h4V4z" />',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" />',
  linkExternal: '<rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 15l6-6M9.5 9h5.5v5.5" />',
};

const GRADIENT = "linear-gradient(90deg, #F5B3D0 0%, #D5BBE0 30%, #B3CAE8 55%, #B7E5E0 80%, #F1E8C8 100%)";
const GRADIENT_SOFT = "linear-gradient(120deg, #FBE4EF 0%, #F1E7F5 35%, #E6EEF8 65%, #E7F5F3 100%)";
const GRADIENT_DIAGONAL = "linear-gradient(135deg, #F5B3D0 0%, #D5BBE0 30%, #B3CAE8 55%, #B7E5E0 80%, #F1E8C8 100%)";

function icon(name, size, styleExtra) {
  const path = ICON_PATHS[name];
  if (!path) return "";
  size = size || 20;
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="${styleExtra || ""}">${path}</svg>`;
}

function iconBadge(name, opts) {
  opts = opts || {};
  const size = opts.size || 20;
  const badgeSize = opts.badgeSize || 44;
  const gradient = !!opts.gradient;
  const shape = opts.shape || "circle";
  const background = gradient ? GRADIENT_DIAGONAL : (opts.background || "rgba(139,127,212,0.12)");
  const color = gradient ? "#FFFFFF" : (opts.color || "#8B7FD4");
  return `<div style="width:${badgeSize}px;height:${badgeSize}px;border-radius:${shape === "square" ? "12px" : "9999px"};display:flex;align-items:center;justify-content:center;flex-shrink:0;background:${background};color:${color};">${icon(name, size)}</div>`;
}

function gradientRingBadge(name, opts) {
  opts = opts || {};
  const ringSize = opts.ringSize || 80;
  const badgeSize = opts.badgeSize || 42;
  const iconSize = opts.iconSize || 19;
  const color = opts.color || "#8B7FD4";
  const pastel = opts.pastel || "#EDE9F7";
  const step = opts.step;
  return `
  <div style="position:relative;width:${ringSize}px;margin:0 auto;">
    <div style="width:${ringSize}px;height:${ringSize}px;border-radius:9999px;background:${pastel};display:flex;align-items:center;justify-content:center;">
      <div style="width:${ringSize - 8}px;height:${ringSize - 8}px;border-radius:9999px;background:#FAF7F2;display:flex;align-items:center;justify-content:center;">
        ${iconBadge(name, { size: iconSize, badgeSize: badgeSize, shape: "square", background: pastel, color: color })}
      </div>
    </div>
    ${step != null ? `<span style="position:absolute;top:-4px;right:-4px;width:24px;height:24px;border-radius:9999px;background:${pastel};color:${color};font-size:11px;font-family:'Roboto',sans-serif;font-weight:600;display:flex;align-items:center;justify-content:center;border:2px solid #FAF7F2;">${step}</span>` : ""}
  </div>`;
}
