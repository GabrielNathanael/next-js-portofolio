// lib/ai/api-keys.ts

/**
 * API Key Manager with Fallback System
 * Supports up to 3 Google AI API keys with automatic fallback
 */

// Load keys from environment
const API_KEYS = [
  process.env.GOOGLE_AI_API_KEY_1,
  process.env.GOOGLE_AI_API_KEY_2,
  process.env.GOOGLE_AI_API_KEY_3,
].filter((key): key is string => !!key); // Remove undefined keys

// Track failed keys to avoid retrying immediately
const failedKeys = new Set<string>();

// Reset failed keys after 5 minutes
const RESET_FAILED_KEYS_INTERVAL = 5 * 60 * 1000; // 5 minutes

// Periodically reset failed keys
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    failedKeys.clear();
  }, RESET_FAILED_KEYS_INTERVAL);
}

/**
 * Get next available API key
 * Skips keys that recently failed
 */
export function getNextApiKey(): string | null {
  // Find first key that hasn't failed recently
  const availableKey = API_KEYS.find((key) => !failedKeys.has(key));

  if (!availableKey) {
    // All keys failed, try resetting and use first key
    failedKeys.clear();
    return API_KEYS[0] || null;
  }

  return availableKey;
}

/**
 * Mark a key as failed (quota exceeded, rate limit, etc)
 */
export function markKeyAsFailed(key: string): void {
  failedKeys.add(key);
  console.warn(`API key marked as failed: ${key.slice(0, 10)}...`);
}

/**
 * Get all available keys count
 */
export function getAvailableKeysCount(): number {
  return API_KEYS.length;
}

/**
 * Check if any keys are available
 */
export function hasAvailableKeys(): boolean {
  return API_KEYS.length > 0;
}

/**
 * Get fallback keys (all except the current one)
 */
export function getFallbackKeys(currentKey: string): string[] {
  return API_KEYS.filter((key) => key !== currentKey && !failedKeys.has(key));
}

/**
 * Try operation with fallback keys
 * Automatically retries with next available key on failure
 */
export async function withFallback<T>(
  operation: (apiKey: string) => Promise<T>
): Promise<T> {
  let lastError: Error | null = null;

  // Try with each available key
  for (const key of API_KEYS) {
    if (failedKeys.has(key)) {
      continue; // Skip failed keys
    }

    try {
      const result = await operation(key);
      return result; // Success!
    } catch (error) {
      lastError = error as Error;

      // Check if it's a quota/rate limit error
      if (
        error instanceof Error &&
        (error.message.includes("quota") ||
          error.message.includes("rate limit") ||
          error.message.includes("429"))
      ) {
        markKeyAsFailed(key);
        console.log(`Key ${key.slice(0, 10)}... failed, trying next key...`);
        continue; // Try next key
      }

      // If it's not a quota error, throw immediately
      throw error;
    }
  }

  // All keys failed
  throw new Error(
    `All API keys exhausted. Last error: ${
      lastError?.message || "Unknown error"
    }`
  );
}
