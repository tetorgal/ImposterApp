import React, { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SheetProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  keyboardOffset?: number;
  includeSafeAreaPadding?: boolean;
}

export default function Sheet({
  children,
  className = 'absolute left-0  bottom-0 right-0 rounded-t-3xl border-x border-t border-slate-500 bg-slate-800',
  contentClassName = 'min-h-[120px] px-5 py-6',
  keyboardOffset = 0,
  includeSafeAreaPadding = true,
}: SheetProps) {
  const insets = useSafeAreaInsets();
  const paddingBottom = includeSafeAreaPadding ? Math.max(insets.bottom, 24) : 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={keyboardOffset}
      className={className}
      style={{ paddingBottom }}>
      <View className={contentClassName}>{children}</View>
    </KeyboardAvoidingView>
  );
}
