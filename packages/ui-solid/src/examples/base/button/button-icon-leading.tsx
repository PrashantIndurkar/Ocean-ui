import { Button } from "../../../components/base/button";
import { Circle } from "lucide-solid";

export default function ButtonIconLeading() {
  return (
    <div class="flex flex-col gap-8">
      {/* Primary with Icon Leading */}
      <div class="flex flex-col gap-4">
        <h3 class="text-sm font-semibold text-foreground">Primary</h3>
        <div class="flex gap-4">
          <Button size="sm">
            <Circle class="size-5" />
            Button sm
          </Button>
          <Button size="md">
            <Circle class="size-5" />
            Button md
          </Button>
          <Button size="lg">
            <Circle class="size-5" />
            Button lg
          </Button>
          <Button size="xl">
            <Circle class="size-5" />
            Button xl
          </Button>
        </div>
      </div>

      {/* Outline with Icon Leading */}
      <div class="flex flex-col gap-4">
        <h3 class="text-sm font-semibold text-foreground">Outline</h3>
        <div class="flex gap-4">
          <Button variant="outline" size="sm">
            <Circle class="size-5" />
            Button sm
          </Button>
          <Button variant="outline" size="md">
            <Circle class="size-5" />
            Button md
          </Button>
          <Button variant="outline" size="lg">
            <Circle class="size-5" />
            Button lg
          </Button>
          <Button variant="outline" size="xl">
            <Circle class="size-5" />
            Button xl
          </Button>
        </div>
      </div>

      {/* Ghost with Icon Leading */}
      <div class="flex flex-col gap-4">
        <h3 class="text-sm font-semibold text-foreground">Ghost</h3>
        <div class="flex gap-4">
          <Button variant="ghost" size="sm">
            <Circle class="size-5" />
            Button sm
          </Button>
          <Button variant="ghost" size="md">
            <Circle class="size-5" />
            Button md
          </Button>
          <Button variant="ghost" size="lg">
            <Circle class="size-5" />
            Button lg
          </Button>
          <Button variant="ghost" size="xl">
            <Circle class="size-5" />
            Button xl
          </Button>
        </div>
      </div>
    </div>
  );
}
