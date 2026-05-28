import React from 'react';
import { LucideIcon, LucideProps } from 'lucide-react-native';
import { colors } from '../../lib/tailwind';

interface StyledIconProps extends Omit<LucideProps, 'color'> {
  Icon: LucideIcon;
  colorName: string;
}

const StyledIcon = ({ Icon, colorName, ...props }: StyledIconProps) => {
  if (!Icon) {
    console.warn('⚠️ StyledIcon: Recibió un Icon undefined. Revisa las props que enviaste:', props);
    return null;
  }

  const [name, shade] = colorName.split('-');

  const resolvedColor: string =
    (colors as { [key: string]: any })[name]?.[shade] ||
    (colors as { [key: string]: any })[name] ||
    '#000';

  // 🚨 DEBUG: Añade esta línea y revisa tu consola de Metro (Expo)
  // Deberías ver algo como: "StyledIcon colorName: slate-400 | Hex: #94a3b8"
  console.log(`StyledIcon colorName: ${colorName} | Hex: ${resolvedColor}`);

  return <Icon color={resolvedColor} {...props} />;
};

export default StyledIcon;
