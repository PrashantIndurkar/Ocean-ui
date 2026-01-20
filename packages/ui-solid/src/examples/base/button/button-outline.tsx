import { Button } from "../../../components/base/button";

export default function ButtonOutline() {
  return (
    <div class="flex gap-4">
      <Button variant="outline" size="sm">Outline sm</Button>
      <Button variant="outline" size="md">Outline md</Button>
      <Button variant="outline" size="lg">Outline lg</Button>
      <Button variant="outline" size="xl">Outline xl</Button>
    </div>
  );
}
