import { Button } from "../../../components/base/button";
import { Circle } from "lucide-solid";

export default function ButtonIconOnly() {
  return (
    <div class="flex flex-col gap-8">
      {/* Primary Icon Only */}
      <div class="flex flex-col gap-4">
        <h3 class="text-sm font-semibold text-foreground">Primary</h3>
        <div class="flex gap-4">
          <Button size="sm" aria-label="Button sm">
            <Circle class="size-5" />
          </Button>
          <Button size="md" aria-label="Button md">
            <Circle class="size-5" />
          </Button>
          <Button size="lg" aria-label="Button lg">
            <Circle class="size-5" />
          </Button>
          <Button size="xl" aria-label="Button xl">
            <Circle class="size-5" />
          </Button>
        </div>
      </div>

      {/* Outline Icon Only */}
      <div class="flex flex-col gap-4">
        <h3 class="text-sm font-semibold text-foreground">Outline</h3>
        <div class="flex gap-4">
          <Button variant="outline" size="sm" aria-label="Button sm">
            <Circle class="size-5" />
          </Button>
          <Button variant="outline" size="md" aria-label="Button md">
            <Circle class="size-5" />
          </Button>
          <Button variant="outline" size="lg" aria-label="Button lg">
            <Circle class="size-5" />
          </Button>
          <Button variant="outline" size="xl" aria-label="Button xl">
            <Circle class="size-5" />
          </Button>
        </div>
      </div>

      {/* Ghost Icon Only */}
      <div class="flex flex-col gap-4">
        <h3 class="text-sm font-semibold text-foreground">Ghost</h3>
        <div class="flex gap-4">
          <Button variant="ghost" size="sm" aria-label="Button sm">
            <Circle class="size-5" />
          </Button>
          <Button variant="ghost" size="md" aria-label="Button md">
            <Circle class="size-5" />
          </Button>
          <Button variant="ghost" size="lg" aria-label="Button lg">
            <Circle class="size-5" />
          </Button>
          <Button variant="ghost" size="xl" aria-label="Button xl">
            <Circle class="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
