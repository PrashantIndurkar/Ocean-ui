import { Button } from "../../../components/base/button";

export default function ButtonDestructive() {
  return (
    <div class="flex flex-col gap-8">
      {/* Primary Destructive */}
      <div class="flex flex-col gap-4">
        <h3 class="text-sm font-semibold text-foreground">Primary</h3>
        <div class="flex gap-4">
          <Button variant="destructive" size="sm">
            Button sm
          </Button>
          <Button variant="destructive" size="md">
            Button md
          </Button>
          <Button variant="destructive" size="lg">
            Button lg
          </Button>
          <Button variant="destructive" size="xl">
            Button xl
          </Button>
        </div>
      </div>

      {/* Outline Destructive */}
      <div class="flex flex-col gap-4">
        <h3 class="text-sm font-semibold text-foreground">Outline</h3>
        <div class="flex gap-4">
          <Button
            variant="outline"
            size="sm"
            class="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            Button sm
          </Button>
          <Button
            variant="outline"
            size="md"
            class="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            Button md
          </Button>
          <Button
            variant="outline"
            size="lg"
            class="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            Button lg
          </Button>
          <Button
            variant="outline"
            size="xl"
            class="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            Button xl
          </Button>
        </div>
      </div>

      {/* Tertiary Destructive */}
      <div class="flex flex-col gap-4">
        <h3 class="text-sm font-semibold text-foreground">Tertiary</h3>
        <div class="flex gap-4">
          <Button
            variant="tertiary"
            size="sm"
            class="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            Button sm
          </Button>
          <Button
            variant="tertiary"
            size="md"
            class="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            Button md
          </Button>
          <Button
            variant="tertiary"
            size="lg"
            class="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            Button lg
          </Button>
          <Button
            variant="tertiary"
            size="xl"
            class="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            Button xl
          </Button>
        </div>
      </div>
    </div>
  );
}
