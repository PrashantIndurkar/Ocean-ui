import { Badge } from "../../../components/base/badge";
import { Check, CircleDashed, CircleDotDashed, X } from "lucide-solid";

export default function BadgeStatus() {
  return (
    <div class="flex w-full justify-center flex-wrap gap-2">
      <Badge variant="secondary" class="gap-2">
        <CircleDashed /> Todo
      </Badge>
      <Badge class="bg-muted text-muted-foreground gap-2">
        <CircleDotDashed /> In Progress
      </Badge>
      <Badge class="bg-primary/10 text-primary gap-2 dark:bg-primary/20">
        <Check strokeWidth={2.5} /> Done
      </Badge>
      <Badge class="bg-destructive/10 text-destructive gap-2 dark:bg-destructive/20">
        <X /> Cancelled
      </Badge>
    </div>
  );
}
