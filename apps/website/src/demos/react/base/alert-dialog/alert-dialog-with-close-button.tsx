"use client";

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
} from "@/components/library/react/base/alert-dialog";
import {
  Button,
  buttonVariants,
} from "@/components/library/react/base/button";
import { cn } from "@/lib/utils";
import { OctagonAlert, XIcon } from "lucide-react";

export default function AlertDialogWithCloseButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="pt-2">
        <AlertDialogHeader className="rounded-none">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3 border-b py-3">
              <div className="flex items-center gap-3">
                <OctagonAlert className="size-5 shrink-0 text-destructive fill-destructive/10" />
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              </div>
              <AlertDialogCloseTrigger
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "size-8 p-0 [&_svg]:size-3.5"
                )}
                aria-label="Close dialog"
              >
                <XIcon />
              </AlertDialogCloseTrigger>
            </div>
            <AlertDialogDescription className="py-3">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-2">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
