import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { DocumentService } from "./tktFrntAdminCommon/src/app/tktFrntCommon/src/app/services/document.service";

@Injectable({
  providedIn: "root",
})
export class TranslateConfigService {
  constructor(
    private translate: TranslateService,
    private documentService: DocumentService
  ) {}

  getDefaultLanguage() {
    //ser defualt language =english
    let language = this.translate.getBrowserLang(); //get browser language
    this.translate.setDefaultLang(language); //set language
    return language;
  }

  setLanguage(setLang) {
    //method to set specegic language

    localStorage.setItem("language", setLang);
    this.setLanguagedyn();
  }

  setLanguagedyn() {
    let setLang = localStorage.getItem("language"); //get lang from localstorage
    if (setLang) {
      //if found
      this.translate.use(setLang); //use it
    } else {
      setLang = "en";
      this.translate.use(setLang); //else put englisg as defualt
    }

    if (setLang === "ar") {
      this.documentService.setReadingDirection("rtl"); //if arabic set diraction rtl
    } //else
    else {
      this.documentService.setReadingDirection("ltr"); //set ltr
    }
  }
}
