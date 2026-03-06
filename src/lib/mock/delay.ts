// ============================================================
// MCPHire — Mock utilities
// ============================================================

/**
 * Returns a promise that resolves after a delay.
 * If ms is not provided, uses random delay between 200-500ms.
 */
export function delay(ms?: number): Promise<void> {
  const actualMs = ms ?? Math.floor(Math.random() * 300) + 200;
  return new Promise((resolve) => setTimeout(resolve, actualMs));
}
