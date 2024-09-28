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

    if (alerts.lenght === 0) {
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
    return await response.json();
  }
}
