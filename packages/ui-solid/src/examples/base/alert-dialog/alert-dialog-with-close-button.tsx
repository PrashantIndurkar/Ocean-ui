import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogCloseTrigger,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/base/alert-dialog";
import {
  Button,
  buttonVariants,
} from "../../../components/base/button";
import { cn } from "../../../lib/utils";
import { OctagonAlert, XIcon } from "lucide-solid";

export default function AlertDialogWithCloseButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        asChild={(triggerProps) => (
          <Button {...triggerProps} variant="outline">
            Show Dialog
          </Button>
        )}
      />
      <AlertDialogContent class="pt-2">
        <AlertDialogHeader class="rounded-none">
          <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between gap-3 border-b py-3">
              <div class="flex items-center gap-3">
                <OctagonAlert class="size-5 shrink-0 text-destructive fill-destructive/10" />
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              </div>
              <AlertDialogCloseTrigger
                class={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "size-8 p-0 [&_svg]:size-3.5"
                )}
                aria-label="Close dialog"
              >
                <XIcon />
              </AlertDialogCloseTrigger>
            </div>
            <AlertDialogDescription class="py-3">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter class="mt-2">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            class={buttonVariants({ variant: "destructive" })}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
