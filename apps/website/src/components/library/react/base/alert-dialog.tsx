"use client";

import { Dialog } from "@ark-ui/react/dialog";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/library/react/base/button";

function AlertDialogRoot(
  props: ComponentProps<typeof Dialog.Root>
) {
  return (
    <Dialog.Root
      data-slot="alert-dialog"
      role="alertdialog"
      closeOnInteractOutside={false}
      {...props}
    />
  );
}

function AlertDialogTrigger(
  props: ComponentProps<typeof Dialog.Trigger>
) {
  return (
    <Dialog.Trigger
      data-slot="alert-dialog-trigger"
      asChild
      {...props}
    />
  );
}

function AlertDialogBackdrop({
  className,
  ...props
}: ComponentProps<typeof Dialog.Backdrop>) {
  return (
    <Dialog.Backdrop
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-200",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogContent({
  className,
  children,
  ...props
}: ComponentProps<typeof Dialog.Content>) {
  return (
    <>
      <AlertDialogBackdrop />
      <Dialog.Positioner
        data-slot="alert-dialog-positioner"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <Dialog.Content
          data-slot="alert-dialog-content"
          className={cn(
            "bg-background grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-lg border p-6 shadow-lg sm:max-w-lg",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:duration-200",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-200",
            className
          )}
          {...props}
        >
          {children}
        </Dialog.Content>
      </Dialog.Positioner>
    </>
  );
}

function AlertDialogHeader({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "flex flex-col gap-2 text-center sm:text-left",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogFooter({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: ComponentProps<typeof Dialog.Title>) {
  return (
    <Dialog.Title
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: ComponentProps<typeof Dialog.Description>) {
  return (
    <Dialog.Description
      data-slot="alert-dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function AlertDialogAction({
  className,
  ...props
}: ComponentProps<typeof Dialog.CloseTrigger>) {
  return (
    <Dialog.CloseTrigger
      className={cn(buttonVariants(), className)}
      {...props}
    />
  );
}

function AlertDialogCancel({
  className,
  ...props
}: ComponentProps<typeof Dialog.CloseTrigger>) {
  return (
    <Dialog.CloseTrigger
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  );
}

/**
 * Unstyled close trigger for custom close buttons (e.g. X icon in header).
 * Style with buttonVariants({ variant: "outline", size: "icon" }) as needed.
 */
function AlertDialogCloseTrigger({
  className,
  ...props
}: ComponentProps<typeof Dialog.CloseTrigger>) {
  return (
    <Dialog.CloseTrigger
      data-slot="alert-dialog-close-trigger"
      className={className}
      {...props}
    />
  );
}

export {
  AlertDialogRoot as AlertDialog,
  AlertDialogTrigger,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogCloseTrigger,
};
