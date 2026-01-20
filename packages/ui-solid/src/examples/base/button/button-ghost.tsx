import { Button } from "../../../components/base/button";

export default function ButtonGhost() {
  return (
    <div class="flex gap-4">
      <Button variant="ghost" size="sm">Ghost sm</Button>
      <Button variant="ghost" size="md">Ghost md</Button>
      <Button variant="ghost" size="lg">Ghost lg</Button>
      <Button variant="ghost" size="xl">Ghost xl</Button>
    </div>
  );
}
