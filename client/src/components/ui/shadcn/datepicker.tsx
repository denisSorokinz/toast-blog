"use client";

import { FC, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/shadcn/button";
import { Calendar } from "@/components/ui/shadcn/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { noFlipClassName } from "../FlipBox";

type Props = {
  value: Date;
  onChange: (nextDate: Date) => void;
};
const DatePicker: FC<Props> = ({ value, onChange }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            noFlipClassName,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-auto p-0", noFlipClassName)}>
        <Calendar
          mode="single"
          selected={value}
          onSelect={(nextDate) => nextDate && onChange(nextDate)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

DatePicker.displayName = "DatePicker";
export default DatePicker;
