import { ICONS } from './icon-config.js';

export function icon(name, className = 'ui-icon') {
  const span = document.createElement('span');
  span.className = className.includes('ui-icon') ? className : `ui-icon ${className}`;
  span.setAttribute('aria-hidden', 'true');
  const asset = ICONS[name] || ICONS.circle;
  if (asset.type === 'png' || asset.type === 'image') {
    const img = document.createElement('img');
    img.src = asset.src;
    img.alt = '';
    img.decoding = 'async';
    img.draggable = false;
    img.className = 'ui-icon-image';
    span.append(img);
  } else {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.8');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('focusable', 'false');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', asset.src);
    svg.append(use);
    span.append(svg);
  }
  return span;
}

export function iconLabel(name, label, className = 'icon-label') {
  const wrap = document.createElement('span');
  wrap.className = className;
  wrap.append(icon(name), document.createTextNode(String(label ?? '')));
  return wrap;
}
