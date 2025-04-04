export function rot13(input) {
  if (input === undefined || typeof input !== "string") {
    throw new Error("Expected string parameter");
  }

  if (input === "") {
    return "";
  }

  let result = "";
  for (let char of input) {
    const charCode = charCodeFor(char);
    result += transformChar(charCode);
  }
  return result;
}

function transformChar(charCode) {
  if (isBetween(charCode, "a", "m") || isBetween(charCode, "A", "M")) {
    return String.fromCodePoint(charCode + 13);
  } else if (isBetween(charCode, "n", "z") || isBetween(charCode, "N", "Z")) {
    return String.fromCodePoint(charCode - 13);
  } else {
    return String.fromCodePoint(charCode);
  }
}

function isBetween(charCode, firstLetter, lastLetter) {
  const firstCharCode = charCodeFor(firstLetter);
  const lastCharCode = charCodeFor(lastLetter);

  return charCode >= firstCharCode && charCode <= lastCharCode;
}

function charCodeFor(letter) {
  return letter.codePointAt(0);
}
