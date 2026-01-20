import { Button } from "../../../components/base/button";

export default function ButtonTertiary() {
  return (
    <div class="flex gap-4">
      <Button variant="tertiary" size="sm">Tertiary sm</Button>
      <Button variant="tertiary" size="md">Tertiary md</Button>
      <Button variant="tertiary" size="lg">Tertiary lg</Button>
      <Button variant="tertiary" size="xl">Tertiary xl</Button>
    </div>
  );
}
