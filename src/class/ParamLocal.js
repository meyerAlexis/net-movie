
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
            return null;
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
            return null;
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
            return null;
        }
    }    
}