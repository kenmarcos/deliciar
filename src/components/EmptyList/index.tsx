import { RiErrorWarningLine } from "react-icons/ri";

interface EmptyListProps {
  title: string;
  subtitle?: string;
}

export const EmptyList = ({ title, subtitle }: EmptyListProps) => {
  return (
    <div className="flex flex-col items-center text-gray-500 space-y-4 py-10">
      <RiErrorWarningLine size={80} />
      <h3 className="text-lg font-black text-center">{title}</h3>
      {!!subtitle && <h4 className="text-center">{subtitle}</h4>}
    </div>
  );
};
