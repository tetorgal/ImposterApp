import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';
import { colors } from '../../lib/tailwind';

// Allow className to be passed to LinearGradient
cssInterop(LinearGradient, { className: 'style' });

interface StyledGradientProps extends Omit<LinearGradientProps, 'colors'> {
  colorNames: [string, string];
}

const StyledGradient = ({ colorNames, ...props }: StyledGradientProps) => {
  const [startColorName, startShade] = colorNames[0].split('-');
  const [endColorName, endShade] = colorNames[1].split('-');

  const resolvedStartColor: string =
    (colors as { [key: string]: any })[startColorName]?.[startShade] ||
    (colors as { [key: string]: any })[startColorName] ||
    '#000';
  const resolvedEndColor: string =
    (colors as { [key: string]: any })[endColorName]?.[endShade] ||
    (colors as { [key: string]: any })[endColorName] ||
    '#FFF';

  return <LinearGradient colors={[resolvedStartColor, resolvedEndColor]} {...props} />;
};

export default StyledGradient;
