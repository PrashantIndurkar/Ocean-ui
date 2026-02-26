import { Dialog } from "@ark-ui/solid/dialog";
import type { ComponentProps, ParentComponent } from "solid-js";
import { splitProps } from "solid-js";

import { cn } from "../../lib/utils";
import { buttonVariants } from "./button";

export interface AlertDialogProps extends ComponentProps<typeof Dialog.Root> {}

export const AlertDialog: ParentComponent<AlertDialogProps> = (props) => {
  return (
    <Dialog.Root
      data-slot="alert-dialog"
      role="alertdialog"
      closeOnInteractOutside={false}
      {...props}
    />
  );
};

export interface AlertDialogTriggerProps
  extends ComponentProps<typeof Dialog.Trigger> {}

export const AlertDialogTrigger: ParentComponent<AlertDialogTriggerProps> = (
  props
) => {
  return (
    <Dialog.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
};

export interface AlertDialogBackdropProps
  extends ComponentProps<typeof Dialog.Backdrop> {}

export const AlertDialogBackdrop: ParentComponent<AlertDialogBackdropProps> = (
  props
) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <Dialog.Backdrop
      data-slot="alert-dialog-overlay"
      class={cn(
        "fixed inset-0 z-50 bg-black/50",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-200",
        local.class
      )}
      {...rest}
    />
  );
};

export interface AlertDialogContentProps
  extends ComponentProps<typeof Dialog.Content> {}

export const AlertDialogContent: ParentComponent<AlertDialogContentProps> = (
  props
) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <>
      <AlertDialogBackdrop />
      <Dialog.Positioner
        data-slot="alert-dialog-positioner"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <Dialog.Content
          data-slot="alert-dialog-content"
          class={cn(
            "bg-background grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-lg border p-6 shadow-lg sm:max-w-lg",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:duration-200",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-200",
            local.class
          )}
          {...rest}
        >
          {local.children}
        </Dialog.Content>
      </Dialog.Positioner>
    </>
  );
};

export interface AlertDialogHeaderProps extends ComponentProps<"div"> {}

export const AlertDialogHeader: ParentComponent<AlertDialogHeaderProps> = (
  props
) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="alert-dialog-header"
      class={cn(
        "flex flex-col gap-2 text-center sm:text-left",
        local.class
      )}
      {...rest}
    />
  );
};

export interface AlertDialogFooterProps extends ComponentProps<"div"> {}

export const AlertDialogFooter: ParentComponent<AlertDialogFooterProps> = (
  props
) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="alert-dialog-footer"
      class={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        local.class
      )}
      {...rest}
    />
  );
};

export interface AlertDialogTitleProps
  extends ComponentProps<typeof Dialog.Title> {}

export const AlertDialogTitle: ParentComponent<AlertDialogTitleProps> = (
  props
) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <Dialog.Title
      data-slot="alert-dialog-title"
      class={cn("text-lg font-semibold", local.class)}
      {...rest}
    />
  );
};

export interface AlertDialogDescriptionProps
  extends ComponentProps<typeof Dialog.Description> {}

export const AlertDialogDescription: ParentComponent<
  AlertDialogDescriptionProps
> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <Dialog.Description
      data-slot="alert-dialog-description"
      class={cn("text-muted-foreground text-sm", local.class)}
      {...rest}
    />
  );
};

export interface AlertDialogActionProps
  extends ComponentProps<typeof Dialog.CloseTrigger> {}

export const AlertDialogAction: ParentComponent<AlertDialogActionProps> = (
  props
) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <Dialog.CloseTrigger
      class={cn(buttonVariants(), local.class)}
      {...rest}
    />
  );
};

export interface AlertDialogCancelProps
  extends ComponentProps<typeof Dialog.CloseTrigger> {}

export const AlertDialogCancel: ParentComponent<AlertDialogCancelProps> = (
  props
) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <Dialog.CloseTrigger
      class={cn(buttonVariants({ variant: "outline" }), local.class)}
      {...rest}
    />
  );
}

/**
 * Unstyled close trigger for custom close buttons (e.g. X icon in header).
 * Style with buttonVariants({ variant: "outline", size: "icon" }) as needed.
 */
export interface AlertDialogCloseTriggerProps
  extends ComponentProps<typeof Dialog.CloseTrigger> {}

export const AlertDialogCloseTrigger: ParentComponent<
  AlertDialogCloseTriggerProps
> = (props) => {
  return (
    <Dialog.CloseTrigger
      data-slot="alert-dialog-close-trigger"
      {...props}
    />
  );
};
