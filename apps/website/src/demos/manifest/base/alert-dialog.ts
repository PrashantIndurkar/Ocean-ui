import type { ComponentManifest } from "@/lib/registry/registry";

const manifest: ComponentManifest = {
  examples: [
    { name: "alert-dialog-demo", title: "Basic" },
    { name: "alert-dialog-with-icon", title: "With Icon" },
    { name: "alert-dialog-destructive", title: "Destructive" },
    { name: "alert-dialog-header", title: "With Header" },
    { name: "alert-dialog-with-close-button", title: "With Close Button" },
  ],
};

export default manifest;
