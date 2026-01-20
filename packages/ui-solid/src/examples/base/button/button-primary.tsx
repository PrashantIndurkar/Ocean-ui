import { Button } from "../../../components/base/button";

export default function ButtonPrimary() {
  return (
    <div class="flex gap-4">
      <Button size="sm">Primary sm</Button>
      <Button size="md">Primary md</Button>
      <Button size="lg">Primary lg</Button>
      <Button size="xl">Primary xl</Button>
    </div>
  );
}
