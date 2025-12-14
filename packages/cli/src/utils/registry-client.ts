/**
 * Registry Client Utility
 *
 * HTTP client to fetch components from remote registry API
 */

export interface RegistryItem {
  $schema?: string;
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies: string[];
  files: Array<{
    content: string;
    path: string;
    type: string;
    exports?: string;
  }>;
  cssVars?: Record<string, any>;
  css?: Record<string, any>;
}

export interface RegistryIndex {
  $schema?: string;
  name: string;
  homepage?: string;
  items: Array<{
    name: string;
    type: string;
  }>;
}

export interface RegistryClientConfig {
  baseURL?: string;
  timeout?: number;
}

/**
 * Registry Client
 *
 * Fetches components from remote registry API
 */
export class RegistryClient {
  private baseURL: string;
  private timeout: number;

  constructor(config: RegistryClientConfig = {}) {
    this.baseURL =
      config.baseURL || "https://components.prashantindurkar.in/api/registry";
    this.timeout = config.timeout || 30000; // 30 seconds default
  }

  /**
   * Set the base URL for the registry API
   */
  setBaseURL(url: string): void {
    this.baseURL = url;
  }

  /**
   * Fetch a component from the registry
   *
   * @param framework - Framework name (e.g., "react", "solid")
   * @param component - Component slug (e.g., "accordion")
   * @returns Registry item with component data
   * @throws Error if component not found or network error
   */
  async fetchComponent(
    framework: string,
    component: string
  ): Promise<RegistryItem> {
    const url = `${this.baseURL}/${framework}/${component}.json`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            `Component "${component}" not found for framework "${framework}"`
          );
        }
        throw new Error(
          `Failed to fetch component: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data as RegistryItem;
    } catch (error) {
      if (error instanceof Error) {
        // Handle network errors
        if (error.name === "AbortError" || error.message.includes("fetch")) {
          throw new Error(
            `Unable to connect to registry. Please check your internet connection.\n` +
              `Registry URL: ${this.baseURL}`
          );
        }

        // Handle DNS/connection errors
        if (
          error.message.includes("ENOTFOUND") ||
          error.message.includes("ECONNREFUSED") ||
          error.message.includes("getaddrinfo")
        ) {
          throw new Error(
            `Unable to connect to registry. Please check your internet connection.\n` +
              `Registry URL: ${this.baseURL}`
          );
        }

        throw error;
      }
      throw new Error("Unknown error occurred while fetching component");
    }
  }

  /**
   * Fetch the registry index for a framework
   *
   * @param framework - Framework name (e.g., "react", "solid")
   * @returns Registry index with list of available components
   * @throws Error if index not found or network error
   */
  async fetchIndex(framework: string): Promise<RegistryIndex> {
    const url = `${this.baseURL}/${framework}/index.json`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            `Registry index not found for framework "${framework}"`
          );
        }
        throw new Error(
          `Failed to fetch registry index: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data as RegistryIndex;
    } catch (error) {
      if (error instanceof Error) {
        // Handle network errors
        if (error.name === "AbortError" || error.message.includes("fetch")) {
          throw new Error(
            `Unable to connect to registry. Please check your internet connection.\n` +
              `Registry URL: ${this.baseURL}`
          );
        }

        // Handle DNS/connection errors
        if (
          error.message.includes("ENOTFOUND") ||
          error.message.includes("ECONNREFUSED") ||
          error.message.includes("getaddrinfo")
        ) {
          throw new Error(
            `Unable to connect to registry. Please check your internet connection.\n` +
              `Registry URL: ${this.baseURL}`
          );
        }

        throw error;
      }
      throw new Error("Unknown error occurred while fetching registry index");
    }
  }
}

/**
 * Default registry client instance
 */
export const defaultRegistryClient = new RegistryClient();
