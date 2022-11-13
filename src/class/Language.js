
import {
    pages_fr, textHome_fr,
    textMenu_fr, textFooter_fr, textPageError_fr
} from "../translations/text-lang-fr";
import {
    pages_en, textHome_en,
    textMenu_en, textFooter_en, textPageError_en
} from "../translations/text-lang-en";

const lang_code = {
    fr: "fr-fr",
    en: "en-en",
}


/**
 * Class management language text for site
 */
export default class LanguageApp {

    constructor() {
        this.lang = this.getLangSession() ? this.getLangSession() : "fr";
        this.text = this.getHome();
        this.langCode = lang_code.fr;
    }

    /**
     * lang_new:string No null -> else "fr" by default
     * Set new language
     */
    setLang(lang_new) {
        if (lang_new !== null) {
            this.lang = lang_new;
            //console.log("In Language set lang to " + lang_new)

            switch (lang_new) {
                case "fr":
                    this.langCode = lang_code.fr;
                    this.lang = "fr";
                    break;
                case "en":
                    this.langCode = lang_code.en;
                    this.lang = "en";
                    break;
                default:
                    this.langCode = lang_code.fr;
                    this.lang = "fr";
                    break;
            }
            this.saveLangSession(lang_new);
        }

    }

    saveLangSession(_lang) {
        sessionStorage.setItem("lang", _lang);
    }

    getLangSession() {
        return sessionStorage.getItem("lang");
    }


    getLang() {
        return this.lang;
    }

    getLangCode() {
        return this.langCode;
    }

    //Home
    getHome() {
        let langHome;

        switch (this.lang) {
            case "fr":
                langHome = { ...textHome_fr, ...pages_fr };
                break;
            case "en":
                langHome = { ...textHome_en, ...pages_en };
                break;
            default:
                langHome = { ...textHome_fr, ...pages_fr };
                break;
        }

        return langHome;
    }



    //Menu
    getMenu() {
        let langMenu;
        switch (this.lang) {
            case "fr":
                langMenu = { ...textMenu_fr, ...pages_fr };
                break;
            case "en":
                langMenu = { ...textMenu_en, ...pages_en };
                break;
            default:
                langMenu = { ...textMenu_fr, ...pages_fr };
                break;
        }

        return langMenu;
    }

    //Footer
    getFooter() {
        let langMenu;
        switch (this.lang) {
            case "fr":
                langMenu = { ...textFooter_fr, ...pages_fr };
                break;
            case "en":
                langMenu = { ...textFooter_en, ...pages_en };
                break;
            default:
                langMenu = { ...textFooter_fr, ...pages_fr };
                break;
        }

        return langMenu;
    }

    //Error
    getError() {
        let langError;
        switch (this.lang) {
            case "fr":
                langError = { ...textPageError_fr };
                break;
            case "en":
                langError = { ...textPageError_en };
                break;
            default:
                langError = { ...textPageError_fr };
                break;
        }

        return langError;
    }


    render() {
        return ("");
    }

}