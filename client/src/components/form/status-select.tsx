import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface StatusSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: Record<string, string>;
  label: string;
  className?: string;
  tooltip?: string;
}

export const StatusSelect = ({
  value,
  onValueChange,
  options,
  label,
  className,
  tooltip,
}: StatusSelectProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <Label className="text-[#E9D8FD]">{label}</Label>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-[#A0AEC0] hover:text-[#E9D8FD] transition-colors cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent className="bg-[#2D3748] text-[#E9D8FD] border-[#44337A]">
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="bg-[#1A202C] border-[#2D3748] text-white w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-[#1A202C] border-[#2D3748] text-white w-full">
          {Object.entries(options).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
