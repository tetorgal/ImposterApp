import React, { forwardRef } from 'react';
import { View } from 'react-native';
import { Input, InputProps } from 'react-native-elements';
import { cssInterop } from 'nativewind';

cssInterop(Input, {
  className: 'containerStyle',
});

interface StyledInputProps extends Omit<
  InputProps,
  'containerStyle' | 'inputContainerStyle' | 'inputStyle'
> {
  className?: string;
  containerClassName?: string;
  activeClassName?: string;
  disabledClassName?: string;
}

const StyledInput = forwardRef<any, StyledInputProps>(function StyledInput(
  {
    className = '',
    containerClassName = '',
    activeClassName = 'border-slate-600 bg-slate-800',
    disabledClassName = 'border-slate-800 bg-slate-900/60',
    editable = true,
    placeholderTextColor = '#cbd5e1',
    ...props
  },
  ref
) {
  const resolvedContainerClassName = editable ? activeClassName : disabledClassName;

  return (
    <View className={containerClassName}>
      <Input
        ref={ref}
        className={`rounded-lg border border-slate-200 font-poppins text-lg ${resolvedContainerClassName} ${className}`}
        inputContainerStyle={{ borderBottomWidth: 0, paddingHorizontal: 0, paddingVertical: 0 }}
        inputStyle={{
          color: '#f1f5f9',
          fontSize: 16,
          paddingHorizontal: 12,
          paddingVertical: 8,
        }}
        placeholderTextColor={placeholderTextColor}
        editable={editable}
        {...props}
      />
    </View>
  );
});

export default StyledInput;
