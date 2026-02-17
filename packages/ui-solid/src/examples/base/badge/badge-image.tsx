import { Badge } from "../../../components/base/badge";

export default function BadgeImage() {
  return (
    <div class="flex w-full justify-center flex-wrap gap-2">
      <Badge class="rounded-full ps-[3px]" variant="outline">
        <img
          src="https://github.com/shadcn.png"
          class="h-5 w-5 rounded-full"
          alt="shadcn"
          height={20}
          width={20}
        />
        shadcn
      </Badge>
      <Badge class="rounded-full pe-[3px]" variant="outline">
        shadcn
        <img
          src="https://github.com/shadcn.png"
          class="h-5 w-5 rounded-full"
          alt="shadcn"
          height={20}
          width={20}
        />
      </Badge>
    </div>
  );
}
