/*
 * This function displays search results from the GitHub "search repositories"
 * API method in the application DOM.  Each item in the search results is
 * displayed as an <li> element in the element <ul id="results-list">.
 */
function displaySearchResults(results) {
  const resultsList = document.getElementById("results-list");
  resultsList.innerHTML = "";
  for (let i = 0; i < results.items.length; i++) {
    const resultLink = document.createElement("a");
    resultLink.href = results.items[i].html_url;
    resultLink.textContent = results.items[i].full_name;
    const resultElem = document.createElement("li");
    resultElem.append(resultLink);
    resultsList.append(resultElem);
  }
}

export function setupSearchForm() {
  const form = document.getElementById("search-form");
  const queryInput = document.getElementById("query");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const query = queryInput.value;
    if (query) {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}`
      );
      const results = await response.json();
      displaySearchResults(results);
    }
  });
}

document.addEventListener("DOMContentLoaded", setupSearchForm);
