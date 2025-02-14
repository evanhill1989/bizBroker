import { MapPin } from "lucide-react";

export default function LocationWidget() {
  return (
    <>
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <MapPin size={16} />
        <p className="underline">#LOCATION</p>
      </div>
    </>
  );
}
