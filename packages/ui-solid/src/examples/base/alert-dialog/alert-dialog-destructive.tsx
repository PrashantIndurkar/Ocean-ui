import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
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
import { OctagonAlert } from "lucide-solid";

export default function AlertDialogDestructive() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        asChild={(triggerProps) => (
          <Button {...triggerProps} variant="outline">
            Show Dialog
          </Button>
        )}
      />
      <AlertDialogContent>
        <AlertDialogHeader class="rounded-none">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-start">
            <OctagonAlert class="size-5 shrink-0 mt-1 text-destructive fill-destructive/10" />
            <div class="flex flex-col gap-1">
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </div>
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
