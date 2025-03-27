import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type RadioFormInputProps = {
  label: string;
  name: string;
  placeholder?: string;
  inputType?: string;
  options?: string[];
  error?: string;
};

export function RadioFormInput({
  label,
  name,
  placeholder = "",
  inputType = "text",
  options = [],
  error,
}: RadioFormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={name}>{label}</Label>
      <Input type={inputType} name={name} id={name} placeholder={placeholder} />
      {error && (
        <p className="text-xs text-red-500 mt-1">
          {options}
          {error}
        </p>
      )}
    </div>
  );
}
