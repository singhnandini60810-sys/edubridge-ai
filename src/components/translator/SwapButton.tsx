import { ArrowRightLeft } from "lucide-react";

type SwapButtonProps = {
  onClick: () => void;
};

const SwapButton = ({ onClick }: SwapButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Swap selected languages"
      title="Swap languages"
      className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 transition duration-300 hover:rotate-180 hover:bg-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-100"
    >
      <ArrowRightLeft size={20} />
    </button>
  );
};

export default SwapButton;