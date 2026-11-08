"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "../icon";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

/**
 * shadcn/ui Combobox pattern (Popover + Command) that also works inside a plain <form>:
 * the chosen value is submitted through a hidden input named `name`.
 */
export function Combobox({
  id,
  name,
  options,
  value,
  onChange,
  placeholder = "Choose an option",
  searchPlaceholder = "Search…",
  emptyText = "No match found.",
  searchable = true,
  invalid,
  describedBy,
  required,
}: {
  id: string;
  name: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  searchable?: boolean;
  invalid?: boolean;
  describedBy?: string;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          // Radix adds aria-controls (pointing at the open popover) to this trigger.
          role="combobox" // eslint-disable-line jsx-a11y/role-has-required-aria-props
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          aria-required={required || undefined}
          className={cn("field flex items-center justify-between gap-3 text-left", !value && "text-muted")}
        >
          <span className="truncate">{value || placeholder}</span>
          <Icon name="chevron" className={cn("size-4 shrink-0 text-muted transition-transform", open && "rotate-180")} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <Command>
          {searchable ? <CommandInput placeholder={searchPlaceholder} /> : null}
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt}
                  value={opt}
                  onSelect={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                >
                  <span className="flex-1">{opt}</span>
                  <Icon name="check" className={cn("size-4 text-mint", value === opt ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      <input type="hidden" name={name} value={value} />
    </Popover>
  );
}
