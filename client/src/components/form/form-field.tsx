import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: "text" | "date" | "url" | "textarea";
  className?: string;
  tooltip?: string;
}

export const FormField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  className,
  tooltip,
}: FormFieldProps) => {
  const baseInputClass =
    "bg-[#1A202C] border-[#2D3748] text-white focus:border-[#6B46C1]";

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
      {type === "textarea" ? (
        <Textarea
          name={name}
          value={value}
          onChange={onChange}
          className={`${baseInputClass} min-h-[100px]`}
        />
      ) : (
        <Input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={baseInputClass}
        />
      )}
    </div>
  );
};
