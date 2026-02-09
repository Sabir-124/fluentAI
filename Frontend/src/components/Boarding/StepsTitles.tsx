import type { LucideIcon } from "lucide-react";

interface TitleProps {
  Icon: LucideIcon;
  title: string;
  subTitle: string;
  from: string;
  to: string;
}

const StepsTitles = ({ Icon, title, subTitle, from, to }: TitleProps) => {
  return (
    <div className="text-center mb-12">
      <div
        className={`inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-[${from}] to-[${to}] rounded-2xl mb-6`}
      >
        <Icon className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
        {title}
      </h2>
      <p className="text-xl text-[#E8ECEF] opacity-70">{subTitle}</p>
    </div>
  );
};

export default StepsTitles;
