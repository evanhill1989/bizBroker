import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";
import { FormInput } from "./FormInput";

interface Field {
  label: string;
  name: string;
  placeholder: string;
  type: string;
  error: string;
}

interface ListingUpdateFormProps {
  fields: Field[];
  listingId: string;
  action: any;
  form: any;
  handleBackNav: () => void;
}

export default function ListingCreationForm({
  fields,
  listingId,
  action,
  form,
  handleBackNav,
}: ListingUpdateFormProps) {
  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
      className="flex flex-col gap-4"
    >
      <input type="hidden" name="listingId" value={listingId} />

      <CardContent className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <FormInput key={index} {...field} />
        ))}
      </CardContent>

      <CardFooter className="w-full flex justify-between">
        <Button type="button" variant="ghost" onClick={handleBackNav}>
          Back
        </Button>
        <SubmitButton text="Next" />
      </CardFooter>
    </form>
  );
}
