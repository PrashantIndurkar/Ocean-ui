import { Button } from "../../../components/base/button";
import { Circle } from "lucide-solid";

export default function ButtonIconTrailing() {
  return (
    <div class="flex flex-col gap-8">
      {/* Primary with Icon Trailing */}
      <div class="flex flex-col gap-4">
        <h3 class="text-sm font-semibold text-foreground">Primary</h3>
        <div class="flex gap-4">
          <Button size="sm">
            Button sm
            <Circle class="size-5" />
          </Button>
          <Button size="md">
            Button md
            <Circle class="size-5" />
          </Button>
          <Button size="lg">
            Button lg
            <Circle class="size-5" />
          </Button>
          <Button size="xl">
            Button xl
            <Circle class="size-5" />
          </Button>
        </div>
      </div>

      {/* Outline with Icon Trailing */}
      <div class="flex flex-col gap-4">
        <h3 class="text-sm font-semibold text-foreground">Outline</h3>
        <div class="flex gap-4">
          <Button variant="outline" size="sm">
            Button sm
            <Circle class="size-5" />
          </Button>
          <Button variant="outline" size="md">
            Button md
            <Circle class="size-5" />
          </Button>
          <Button variant="outline" size="lg">
            Button lg
            <Circle class="size-5" />
          </Button>
          <Button variant="outline" size="xl">
            Button xl
            <Circle class="size-5" />
          </Button>
        </div>
      </div>

      {/* Ghost with Icon Trailing */}
      <div class="flex flex-col gap-4">
        <h3 class="text-sm font-semibold text-foreground">Ghost</h3>
        <div class="flex gap-4">
          <Button variant="ghost" size="sm">
            Button sm
            <Circle class="size-5" />
          </Button>
          <Button variant="ghost" size="md">
            Button md
            <Circle class="size-5" />
          </Button>
          <Button variant="ghost" size="lg">
            Button lg
            <Circle class="size-5" />
          </Button>
          <Button variant="ghost" size="xl">
            Button xl
            <Circle class="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
