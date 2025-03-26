import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function UpdateFormField({
  fieldName,
  inputType,
  label,
  defaultValue,
}: {
  fieldName: string;
  inputType: string;
  label: string;
  defaultValue?: string;
}) {
  return (
    <>
      <Label htmlFor={fieldName}>{label}</Label>

      {inputType === "text" && (
        <Input
          type="text"
          name={fieldName}
          id={fieldName}
          placeholder=""
          defaultValue={defaultValue}
        />
      )}
      {inputType === "textarea" && (
        <Input
          type="textarea"
          name={fieldName}
          id={fieldName}
          placeholder=""
          defaultValue={defaultValue}
        />
      )}
      {inputType === "number" && (
        <Input
          type="number"
          name={fieldName}
          id={fieldName}
          placeholder=""
          defaultValue={defaultValue}
        />
      )}
    </>
  );
}
