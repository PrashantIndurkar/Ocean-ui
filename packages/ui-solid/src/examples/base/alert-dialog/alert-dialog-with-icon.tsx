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
import { Button } from "../../../components/base/button";
import { OctagonAlert } from "lucide-solid";

export default function AlertDialogWithIcon() {
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
        <AlertDialogHeader>
          <div class="flex flex-col gap-3 sm:flex-row sm:items-start">
            <OctagonAlert class="size-5 shrink-0 mt-1" />
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
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
