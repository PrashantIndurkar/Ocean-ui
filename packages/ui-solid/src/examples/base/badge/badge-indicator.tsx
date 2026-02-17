import { Badge } from "../../../components/base/badge";
import { Button } from "../../../components/base/button";
import { AtSign, Bell, Mail, MessageCircle } from "lucide-solid";

export default function BadgeIndicator() {
  return (
    <div class="flex w-full justify-center flex-wrap gap-6">
      <Button size="md" variant="outline" class="relative">
        <Bell />
        <Badge
          variant="destructive"
          class="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 h-5 min-w-5 p-0 px-0.5 rounded-full empty:h-2.5 empty:min-w-2.5"
        />
      </Button>
      <Button size="md" variant="outline" class="relative">
        <Bell />
        <Badge
          variant="destructive"
          class="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 h-5 min-w-5 p-0 px-0.5 rounded-full empty:h-2.5 empty:min-w-2.5"
        >
          5
        </Badge>
      </Button>
      <Button size="md" variant="outline" class="relative">
        <Mail />
        <Badge
          variant="destructive"
          class="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 h-5 min-w-5 p-0 px-0.5 rounded-full empty:h-2.5 empty:min-w-2.5"
        >
          99+
        </Badge>
      </Button>
      <Button size="md" variant="outline" class="relative">
        <MessageCircle />
        <Badge
          variant="destructive"
          class="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 h-5 min-w-5 p-0 px-0.5 rounded-full empty:h-2.5 empty:min-w-2.5"
        >
          <AtSign class="size-3" />
        </Badge>
      </Button>
    </div>
  );
}
