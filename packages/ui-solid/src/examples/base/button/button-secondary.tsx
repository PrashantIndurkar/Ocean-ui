import { Button } from "../../../components/base/button";

export default function ButtonSecondary() {
  return (
    <div class="flex gap-4">
      <Button variant="secondary" size="sm">
        Secondary sm
      </Button>
      <Button variant="secondary" size="md">
        Secondary md
      </Button>
      <Button variant="secondary" size="lg">
        Secondary lg
      </Button>
      <Button variant="secondary" size="xl">
        Secondary xl
      </Button>
    </div>
  );
}
