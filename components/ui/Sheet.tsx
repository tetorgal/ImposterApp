import React, { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SheetProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  keyboardOffset?: number;
}

export default function Sheet({
  children,
  className = 'absolute left-0  bottom-0 right-0 rounded-t-3xl border-x border-t border-slate-500 bg-slate-800',
  contentClassName = 'px-5 py-6',
  keyboardOffset = 0,
}: SheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={keyboardOffset}
      className={className}
      style={{ paddingBottom: Math.max(insets.bottom, 24) }}>
      <View className={contentClassName}>{children}</View>
    </KeyboardAvoidingView>
  );
}
