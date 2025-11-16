export default class LoadDataFromApi{
    /**@type {LoadDataFromApi} */
    static Instance = null
    constructor() {
        if (LoadDataFromApi.Instance === null) LoadDataFromApi.Instance = this;
        this.StoredData = null;
    };

    async getScoreDataFromApi() {
        try {
            let rawData = await fetch("http://159.195.27.147:3030/read", {
                method: "GET",
            });
            this.StoredData = await rawData.json();
            return this.StoredData;
        } catch (err) {
            console.log(new Error("Cant get Scores from server", err));
            return [];
        }
    }
}

new LoadDataFromApi();