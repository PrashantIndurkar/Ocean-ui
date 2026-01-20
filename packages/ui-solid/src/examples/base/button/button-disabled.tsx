import { Button } from "../../../components/base/button";

export default function ButtonDisabled() {
  return (
    <div class="flex flex-col gap-8">
      {/* Secondary Disabled */}
      <div class="flex flex-col gap-4">
        <h3 class="text-sm font-semibold text-foreground">Secondary</h3>
        <div class="flex gap-4">
          <Button variant="secondary" size="sm" disabled>
            Button sm
          </Button>
          <Button variant="secondary" size="md" disabled>
            Button md
          </Button>
          <Button variant="secondary" size="lg" disabled>
            Button lg
          </Button>
          <Button variant="secondary" size="xl" disabled>
            Button xl
          </Button>
        </div>
      </div>

      {/* Outline Disabled */}
      <div class="flex flex-col gap-4">
        <h3 class="text-sm font-semibold text-foreground">Outline</h3>
        <div class="flex gap-4">
          <Button variant="outline" size="sm" disabled>
            Button sm
          </Button>
          <Button variant="outline" size="md" disabled>
            Button md
          </Button>
          <Button variant="outline" size="lg" disabled>
            Button lg
          </Button>
          <Button variant="outline" size="xl" disabled>
            Button xl
          </Button>
        </div>
      </div>

      {/* Ghost Disabled */}
      <div class="flex flex-col gap-4">
        <h3 class="text-sm font-semibold text-foreground">Ghost</h3>
        <div class="flex gap-4">
          <Button variant="ghost" size="sm" disabled>
            Button sm
          </Button>
          <Button variant="ghost" size="md" disabled>
            Button md
          </Button>
          <Button variant="ghost" size="lg" disabled>
            Button lg
          </Button>
          <Button variant="ghost" size="xl" disabled>
            Button xl
          </Button>
        </div>
      </div>
    </div>
  );
}
