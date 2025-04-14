export function setupCounter() {
  const counter = document.getElementById("counter");
  let count = 0;

  counter.addEventListener("click", () => {
    count++;
    counter.textContent = count;
  });
}

document.addEventListener("DOMContentLoaded", setupCounter);
