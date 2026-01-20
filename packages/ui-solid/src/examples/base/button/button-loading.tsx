import { Button } from "../../../components/base/button";
import { Loader } from "lucide-solid";

export default function ButtonLoading() {
  return (
    <div class="flex flex-wrap gap-4">
      <Button size="sm">
        <Loader class="animate-spin" />
      </Button>
      <Button>
        <Loader class="animate-spin" />
        Please wait
      </Button>
    </div>
  );
}
