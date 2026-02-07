import { Globe } from "lucide-react";

const Context = () => {
  return (
    <div className="space-y-4">
      <div className="bg-[#2D3748] rounded-xl p-4">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <Globe size={18} className="text-[#00D9C0]" />
          Cultural Tip
        </h3>
        <p className="text-sm text-[#E8ECEF]/70 leading-relaxed">
          In Spanish restaurants, it's common to say "la cuenta, por favor" when
          asking for the check, rather than making a writing gesture.
        </p>
      </div>
    </div>
  );
};

export default Context;
