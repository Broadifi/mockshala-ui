export const formattingWord = (test: string) => {
    return test
      .toLowerCase()
      .split("_")
      .map((word, i) =>
        i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word,
      )
      .join(" ");
  };