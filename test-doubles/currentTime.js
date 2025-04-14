export function currentTime() {
  const timeSpan = document.getElementById("time-span");
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  let timeString = "";
  if (hours === 0 && minutes === 0) {
    timeString = "midnight";
  } else if (hours === 12 && minutes === 0) {
    timeString = "noon";
  } else if (hours === 0) {
    timeString = `12:${minutes} AM`;
  } else if (hours === 12) {
    timeString = `12:${minutes} PM`;
  } else if (hours > 12) {
    timeString = `${hours % 12}:${minutes} PM`;
  } else {
    timeString = `${hours}:${minutes} AM`;
  }

  timeSpan.textContent = timeString;
}
document.addEventListener("DOMContentLoaded", currentTime);
