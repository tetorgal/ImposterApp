import defaultColors from 'tailwindcss/colors';

const customColors = {
  'neon-orange': '#FFA500',
  // Si en el futuro agregas más colores estáticos en tu CSS, agrégalos aquí también
  // 'mi-color': '#123456',
};

export const colors = {
  ...defaultColors,
  ...customColors,
};
