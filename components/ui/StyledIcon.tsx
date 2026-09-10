import React from 'react';
import { LucideIcon, LucideProps } from 'lucide-react-native';
import { colors } from '../../lib/tailwind';

interface StyledIconProps extends Omit<LucideProps, 'color'> {
  Icon: LucideIcon;
  colorName: string;
}

const COLOR_FALLBACKS: Record<string, string> = {
  'green-400': '#4ade80',
  'red-400': '#f87171',
  'slate-100': '#f1f5f9',
  'slate-300': '#cbd5e1',
  'slate-400': '#94a3b8',
  'slate-600': '#475569',
  'slate-700': '#334155',
  'slate-800': '#1e293b',
  gray: '#e5e7eb',
};

const isCssColor = (value: string) => {
  const normalized = value.trim().toLowerCase();
  return (
    normalized.startsWith('#') ||
    normalized.startsWith('rgb(') ||
    normalized.startsWith('rgba(') ||
    normalized.startsWith('hsl(') ||
    normalized.startsWith('hsla(')
  );
};

const isOklchColor = (value: string) => {
  const normalized = value.trim().toLowerCase();
  return normalized.startsWith('oklch(') || normalized.startsWith('oklab(');
};

const StyledIcon = ({ Icon, colorName, ...props }: StyledIconProps) => {
  if (!Icon) {
    console.warn('⚠️ StyledIcon: Recibió un Icon undefined. Revisa las props que enviaste:', props);
    return null;
  }

  const normalizedColor = colorName.trim();

  if (isCssColor(normalizedColor)) {
    return <Icon color={normalizedColor} {...props} />;
  }

  const [name, shade] = normalizedColor.split('-');
  const candidate: string | undefined =
    (colors as { [key: string]: any })[name]?.[shade] || (colors as { [key: string]: any })[name];

  const directFallback = COLOR_FALLBACKS[normalizedColor];
  const resolvedColor =
    directFallback ?? (candidate && !isOklchColor(candidate) ? candidate : undefined) ?? '#000';

  return <Icon color={resolvedColor} {...props} />;
};

export default StyledIcon;
