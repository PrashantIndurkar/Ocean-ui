import { Button } from "../../../components/base/button";

export default function ButtonShapes() {
  return (
    <div class="flex flex-wrap gap-4">
      <Button class="rounded-none">Rectangular</Button>
      <Button>Square</Button>
      <Button class="rounded-full">Rounded</Button>
    </div>
  );
}
