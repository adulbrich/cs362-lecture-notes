import { rot13 } from "./rot13.js";

console.log("a".codePointAt(0)); // 97
console.log(String.fromCodePoint(110)); // "n"

console.log(String.fromCodePoint("a".codePointAt(0) - 1)); // "`"
console.log(String.fromCodePoint("z".codePointAt(0) + 1)); // "{"
console.log(String.fromCodePoint("A".codePointAt(0) - 1)); // "@"
console.log(String.fromCodePoint("Z".codePointAt(0) + 1)); // "["

console.log(rot13("Hello, World!")); // "Uryyb, Jbeyq!"
