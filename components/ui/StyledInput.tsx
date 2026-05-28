import React, { forwardRef } from 'react';
import { View, TextInput } from 'react-native';
import { Input, InputProps } from 'heroui-native';

interface StyledInputProps extends InputProps {
  containerClassName?: string;
  activeClassName?: string;
  disabledClassName?: string;
}

const StyledInput = forwardRef<TextInput, StyledInputProps>(function StyledInput(
  {
    className = '',
    containerClassName = '',
    activeClassName = 'border-slate-600 bg-slate-800',
    disabledClassName = 'border-slate-800 bg-slate-900/60',
    editable = true,
    ...props
  },
  ref
) {
  const resolvedContainerClassName = editable ? activeClassName : disabledClassName;

  return (
    <View className={containerClassName}>
      <Input
        ref={ref}
        editable={editable}
        placeholderColorClassName="text-slate-300"
        className={`font-poppins rounded-lg border border-slate-200 px-3 py-2 text-base text-slate-100 ${resolvedContainerClassName} ${className}`}
        {...props}
      />
    </View>
  );
});

export default StyledInput;
