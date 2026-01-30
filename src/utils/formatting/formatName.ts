 export const formatName = (name?: string): string => {
    if (!name) return ""; // handle undefined / null / empty
    return String(name) // coerce non-strings safely
      .trim() // remove leading/trailing spaces
      .split(/\s+/) // split on one or more whitespace chars
      .filter(Boolean) // remove any empty tokens
      .map(
        (token) => token.charAt(0).toUpperCase() + token.slice(1).toLowerCase(),
      )
      .join(" ");
  };
