"use client";

import { Badge } from "@/components/library/react/base/badge";
import { Check, CircleDashed, CircleDotDashed, X } from "lucide-react";

export default function BadgeStatus() {
  return (
    <div className="flex w-full justify-center flex-wrap gap-2">
      <Badge variant="secondary" className="gap-2">
        <CircleDashed /> Todo
      </Badge>
      <Badge className="bg-muted text-muted-foreground gap-2">
        <CircleDotDashed /> In Progress
      </Badge>
      <Badge className="bg-primary/10 text-primary gap-2 dark:bg-primary/20">
        <Check strokeWidth={2.5} /> Done
      </Badge>
      <Badge className="bg-destructive/10 text-destructive gap-2 dark:bg-destructive/20">
        <X /> Cancelled
      </Badge>
    </div>
  );
}
