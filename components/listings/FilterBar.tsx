"use client";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

export default function FilterBar({ filters, setFilters }) {

  const toggleBusinessModel = (model: string) => {
    setFilters((prevFilters) => {
      const isActive = prevFilters.businessModel.includes(model);
      return {
        ...prevFilters,
        businessModel: isActive
          ? prevFilters.businessModel.filter((m) => m !== model) // Remove if active
          : [...prevFilters.businessModel, model], // Add if inactive
      };
    });
  };

  return (
    <Popover>
      <PopoverTrigger className="px-4 py-2 border rounded">Business Model</PopoverTrigger>
      <PopoverContent className="p-4 bg-white shadow-lg rounded-md w-48">
        {["online", "b2b", "retail"].map((model) => (
          <div key={model} className="flex items-center gap-2">
            <Checkbox
              checked={filters.businessModel.includes(model)} // ✅ Now correctly checks by default
              onCheckedChange={() => toggleBusinessModel(model)}
            />
            <span>{model}</span>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
