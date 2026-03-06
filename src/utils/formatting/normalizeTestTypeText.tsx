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


// normalizeText("MEMORY_BASED_MOCK")
// normalizeText("memoryBasedMock")
// normalizeText("memory_based_mock")
// normalizeText("Memory Based Mock")

// Input	            Output
// MEMORY_BASED_MOCK	Memory Based Mock
// memory_based_mock	Memory Based Mock
// memoryBasedMock	    Memory Based Mock
// Memory Based Mock	Memory Based Mock
// memory-based-mock	Memory Based Mock