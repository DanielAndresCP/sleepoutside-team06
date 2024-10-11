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

export function renderListWithTemplate(
  templateFn,
  parentElemnt,
  list,
  position = "afterBegin",
  clear = false,
) {
  const listElments = list.map(templateFn);
  if (clear) {
    parentElemnt.innerHTML = "";
  }
  parentElemnt.insertAdjacentHTML(position, listElments.join(""));
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const value = urlParams.get(param);
  return value;
}

export function renderWithTemplate(template, parentElement, data, callback) {
  if (parentElement) {
    parentElement.insertAdjacentHTML("afterbegin", template);
    if (callback) {
      callback(data);
    }
  }
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("body > header");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("body > footer");
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}

export function getMoneyString(amount, locale = "en-US", currency = "USD") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}


export function alertMessage(message, scroll = true) {
  const container = document.createElement("div")
  container.classList.add("alert-list")

  const messageElement = document.createElement("p")
  messageElement.textContent = message

  const closeAlertElement = document.createElement("span")
  closeAlertElement.textContent = "x"

  closeAlertElement.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN") {
      document.querySelector("main").removeChild(e.target.closest(".alert-list"))
    }
  })


  container.appendChild(messageElement)
  container.appendChild(closeAlertElement)

  document.querySelector("main").insertAdjacentElement("afterbegin", container)
  if (scroll) {
    container.scrollIntoView({ behavior: "smooth" })
  }
}