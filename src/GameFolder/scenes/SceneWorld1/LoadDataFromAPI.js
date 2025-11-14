export default class LoadDataFromApi{
    /**@type {LoadDataFromApi} */
    static Instance = null
    constructor() {
        if (LoadDataFromApi.Instance === null) LoadDataFromApi.Instance = this;
        this.StoredData = null;
    };

    async getScoreDataFromApi() {
        try {
            this.StoredData = await fetch("");
            return this.StoredData;
        } catch (err) {
            console.log(new Error("Cant get Scores from server", err));
        }
    }
}

new LoadDataFromApi();