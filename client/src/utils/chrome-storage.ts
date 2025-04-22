/**
 * @description A type-safe utility wrapper for Chrome extension storage API that provides promise-based access
 * to localStorage operations. This abstraction simplifies Chrome extension storage management with proper
 * TypeScript support and async/await compatibility.
 *
 * Key Features:
 * - Promise-based API for asynchronous operations
 * - Type-safe get/set operations with generics
 * - Error-tolerant design (returns null for missing keys)
 * - Simplified Chrome storage API surface
 *
 * Methods:
 * - **get**: Retrieves stored value by key
 * - **set**: Stores value with specified key
 * - **remove**: Deletes value by key
 *
 * @template T Type parameter for stored data structure
 *
 * @example
 * // Store user settings
 * await chromeStorage.set('userPreferences', { darkMode: true, fontSize: 16 });
 *
 * // Retrieve stored data
 * const prefs = await chromeStorage.get<{ darkMode: boolean }>('userPreferences');
 *
 * // Remove data
 * await chromeStorage.remove('obsoleteKey');
 */
export const chromeStorage = {
  get: <T>(key: string): Promise<T | null> =>
    new Promise((resolve) => {
      chrome.storage.local.get([key], (result) => {
        resolve(result[key] ?? null);
      });
    }),
  set: <T>(key: string, value: T): Promise<void> =>
    new Promise((resolve) => {
      chrome.storage.local.set({ [key]: value }, () => resolve());
    }),
  remove: (key: string): Promise<void> =>
    new Promise((resolve) => {
      chrome.storage.local.remove([key], () => resolve());
    }),
};
