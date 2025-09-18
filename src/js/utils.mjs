// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// API added part W03
export function getParam(name) {
  const params = new URLSearchParams(location.search);
  return params.get(name);
}


// --- existing exports like getLocalStorage, setLocalStorage, blablabla stay as they are ---

/**
 * Reuse templates across pages.
 * @param {Function} templateFn - (item) => string
 * @param {Element} parentElement - DOM node to insert into
 * @param {Array} list - items to render
 * @param {InsertPosition} position 
 * @param {Boolean} clear - true = clears parent first ---- default = false
 */
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (!parentElement) return;
  if (clear) parentElement.innerHTML = "";
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}
