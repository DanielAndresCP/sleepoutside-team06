import { renderListWithTemplate } from "./utils.mjs";

function renderSingleAlert(alertObj) {
  return `<p style="background-color:${alertObj.background}; color:${alertObj.color};">${alertObj.message}</p>`;
}

export default class Alert {
  constructor() {
    this.alertsFilepath = "../json/alerts.json";
  }

  async init() {
    const alerts = await this.fetchAlerts();

    if (alerts.length === 0) {
      return;
    }

    // Since renderListWithTemplate needs a real HTML element,
    // we must use these lines to create one instead of using template strings
    const alertsContainer = document.createElement("section");
    alertsContainer.classList.add("alert-list");

    renderListWithTemplate(renderSingleAlert, alertsContainer, alerts);

    // We add the created element to the main element on the document
    document.querySelector("main").prepend(alertsContainer);
  }

  async fetchAlerts() {
    const response = await fetch(this.alertsFilepath);

    // We get the text of the response instead of the json
    // because the json method gives an error
    // if the file is completely empty (not just empty array)
    const text = await response.text()

    // If the file is empty, we assume no alerts are defined,
    // and return an empty array
    if (!text) {
      return []
    }

    return JSON.parse(text);
  }
}
