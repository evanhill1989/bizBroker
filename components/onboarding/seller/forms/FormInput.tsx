import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  error?: string;
}

export function FormInput({
  label,
  name,
  placeholder = "",
  type = "text",
  error,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={name}>{label}</Label>
      <Input type={type} name={name} id={name} placeholder={placeholder} />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
