import { Icon, IconProps } from 'react-native-elements';
import { colors } from '../../lib/tailwind';

interface StyledIconProps extends Omit<IconProps, 'color'> {
  colorName: string;
}

const StyledIcon = ({ colorName, ...props }: StyledIconProps) => {
  const [name, shade] = colorName.split('-');
  const resolvedColor: string =
    (colors as { [key: string]: any })[name]?.[shade] ||
    (colors as { [key: string]: any })[name] ||
    '#000';

  return <Icon color={resolvedColor} {...props} />;
};

export default StyledIcon;
