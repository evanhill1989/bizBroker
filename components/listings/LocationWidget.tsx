import { MapPin } from "lucide-react";

export default function LocationWidget(location: string) {
  return (
    <>
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <MapPin size={16} />
        <p className="underline">{location}</p>
      </div>
    </>
  );
}
