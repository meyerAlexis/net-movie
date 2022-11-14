
export default class ParamLocal {

    paramLang = "langSite";
    paramMovieCoverGrey = "movieCoverGrey";
    paramCatMovie = "paramCatMovie";

    ParamLocal() {
    }

    /**
     * Param language of site
     */
    setParamLang(langCode) {
        try {
            sessionStorage.setItem(this.paramLang, langCode);
        } catch (error) {

        }
    }

    async getParamLang() {
        try {
            return await sessionStorage.getItem(this.paramLang);
        } catch (error) {
            return "fr";
        }
    }

    /**
     * Param if movie cover grey On or Off
     */
    setParamMovieCoverGrey(isGrey) {
        try {
            sessionStorage.setItem(this.paramMovieCoverGrey, isGrey);
        } catch (error) {

        }
    }

    async getParamMovieCoverGrey() {
        try {
            return await sessionStorage.getItem(this.paramMovieCoverGrey);
        } catch (error) {
            return false;
        }
    }


     /**
     * Param for list categorie
     */  
      setParamCatMovie(listCatMovie) {
        try {
            sessionStorage.setItem(this.paramCatMovie, listCatMovie);
        } catch (error) {

        }
    }

    async getParamCatMovie() {
        try {
            return await sessionStorage.getItem(this.paramCatMovie);
        } catch (error) {
            return {
                originals: "1",
                trending: "1",
                toprated: "1",
                action: "1",
                comedy: "1",
                horror: "1",
                romance: "1",
                documentary: "1"
            };
        }
    }    
}