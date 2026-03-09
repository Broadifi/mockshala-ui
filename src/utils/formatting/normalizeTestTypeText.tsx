/**
 * Normalizes test type text into readable format.
 *
 * Examples:
 * normalizeTestTypeText("MEMORY_BASED_MOCK") → "Memory Based Mock"
 * normalizeTestTypeText("memoryBasedMock") → "Memory Based Mock"
 * normalizeTestTypeText("memory_based_mock") → "Memory Based Mock"
 * normalizeTestTypeText("Memory Based Mock") → "Memory Based Mock"
 * normalizeTestTypeText("memory-based-mock") → "Memory Based Mock"
 *
 * Input → Output
 * MEMORY_BASED_MOCK  → Memory Based Mock
 * memory_based_mock  → Memory Based Mock
 * memoryBasedMock    → Memory Based Mock
 * Memory Based Mock  → Memory Based Mock
 * memory-based-mock  → Memory Based Mock
 */

export function normalizeTestTypeText(text?: string) {
  if (!text) return "";

  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

