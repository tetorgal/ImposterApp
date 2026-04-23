import { Text } from 'react-native';

interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return <Text className="font-poppins text-xl text-slate-200">{title}</Text>;
}
