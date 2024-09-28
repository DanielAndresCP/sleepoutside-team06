export default class Alert {
    constructor() {
        this.alertsFilepath = "../json/alerts.json";
    }

    

    async init() {
        const alerts = await this.fetchAlerts()

        if (alerts.lenght === 0) {
            return
        }


    }

    async fetchAlerts() {
        const response = await fetch(this.alertsFilepath);
        return await response.json();
    }
}
