import { Avatar, AvatarProps } from 'react-native-elements';
import { cssInterop } from 'nativewind';
import { View } from 'react-native';
import StyledGradient from './StyledGradient';

cssInterop(Avatar, {
  className: 'containerStyle',
  titleClassName: 'titleStyle',
});

type InteropAvatarProps = AvatarProps & {
  className?: string;
  titleClassName?: string;
};

const InteropAvatar = Avatar as unknown as React.ComponentType<InteropAvatarProps>;

type AvatarVariant = 'red' | 'yellow' | 'blue' | 'green';

const avatarVariantStyles: Record<
  AvatarVariant,
  { gradient: [string, string]; titleClassName: string }
> = {
  red: {
    gradient: ['red-400', 'red-600'],
    titleClassName: 'font-poppins text-white font-bold',
  },
  yellow: {
    gradient: ['amber-300', 'yellow-500'],
    titleClassName: 'font-poppins text-white font-bold',
  },
  blue: {
    gradient: ['sky-400', 'blue-600'],
    titleClassName: 'font-poppins text-white font-bold',
  },
  green: {
    gradient: ['emerald-400', 'green-600'],
    titleClassName: 'font-poppins text-white font-bold',
  },
};

interface StyledAvatarProps extends Omit<AvatarProps, 'containerStyle' | 'titleStyle'> {
  className?: string;
  titleClassName?: string;
  variant?: AvatarVariant;
}

const StyledAvatar = ({
  className = '',
  titleClassName,
  variant = 'red',
  ...props
}: StyledAvatarProps) => {
  const variantStyles = avatarVariantStyles[variant];
  const resolvedTitleClassName = [variantStyles.titleClassName, titleClassName]
    .filter(Boolean)
    .join(' ');

  return (
    <StyledGradient colorNames={variantStyles.gradient} className="rounded-full p-1">
      <View className="overflow-hidden rounded-full">
        <InteropAvatar
          className={`bg-transparent ${className}`}
          titleClassName={resolvedTitleClassName}
          {...props}
        />
      </View>
    </StyledGradient>
  );
};

export default StyledAvatar;
