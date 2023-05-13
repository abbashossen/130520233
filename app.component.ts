import { Component } from "@angular/core";
import {
  AlertController,
  MenuController,
  NavController,
  Platform,
} from "@ionic/angular";

import { StatusBar } from "@ionic-native/status-bar/ngx";
import { TranslateService } from "@ngx-translate/core";

import { Environment } from "@ionic-native/google-maps";

import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

import { LocalNotifications } from "@awesome-cordova-plugins/local-notifications/ngx";

import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import * as $ from "jquery";

import { Router } from "@angular/router";
import {
  IOptionsCaComplexItemList,
  IOptionsCaImage,
  IOptionsFabButtonList,
} from "./tktFrntAdminCommon/src/app/tktFrntCommon/src/app/custom-components/commonInterfaces";

import { AlertService } from "./tktFrntAdminCommon/src/app/tktFrntCommon/src/app/services/alert.service";
import { AppdefaultlanguageService } from "./tktFrntAdminCommon/src/app/tktFrntCommon/src/app/services/appdefaultlanguage.service";
import { HttpServiceService } from "./tktFrntAdminCommon/src/app/tktFrntCommon/src/app/services/http-service.service";
import { KeysgeneratorService } from "./tktFrntAdminCommon/src/app/tktFrntCommon/src/app/services/keysgenerator.service";
import { TranslateConfigService } from "./translate-config.service";
import {
  AdminlogoutSideMenuIndex,
  cameraHeight,
  cameraQuality,
  camerawidth,
  errorCode,
  urls,
} from "./tktFrntAdminCommon/src/app/tktFrntCommon/src/constants";
import { LoggerService } from "./tktFrntAdminCommon/src/app/tktFrntCommon/src/app/services/logger.service";
import { common } from "./tktFrntAdminCommon/src/app/tktFrntCommon/src/app/common/commonFunctions";
const cryptico = require("cryptico");

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  fab = true;
  public selectedIndex = 0;
  profile = "../assets/profile.png";
  default = "";

  fabList: IOptionsFabButtonList = {
    sideList: "bottom",
    mainIcon: "person-add-outline",
    listIcons: [{ name: "calendar-clear-outline", value: "nearest-one" }],
  };

  caImageOptionsProfile: IOptionsCaImage = {
    base64: this.profile,
    default: "",
    preCallFunction: {
      func(data) {
        return new Promise<any>((resolve, reject) => {
          resolve(this.executionClass.selectImage());
        });
      },
      executionClass: this,
      params: [this],
    },
    postCallFunction: {
      func(data) {
        return new Promise<any>((resolve, reject) => {
          resolve(this.executionClass.postCall(data));
        });
      },
      executionClass: this,
      params: [this],
    },
  };

  titles = [
    "properties",
    "create driver",
    "Add machine",
    "Add MachineDriver",
    "Today reservations",
    "List of Drivers",
    "Maintenance List",
    "Add Company",
    "calculate Cost",
    "Machines List",
    "Drivers Availability",
    "Drivers Location",
    "Owners",
    "All Owners",
    "Machine Details",
    "List Machine Detail",
    "logout",
  ];
  images = [
    "assets/home.svg",
    "assets/changeP.svg",
    "assets/changeP.svg",
    "assets/changeP.svg",
    "assets/changeP.svg",
    "assets/changeP.svg",
    "assets/changeP.svg",
    "assets/changeP.svg",
    "assets/changeP.svg",
    "assets/changeP.svg",
    "assets/changeP.svg",
    "assets/changeP.svg",
    "assets/changeP.svg",
    "assets/changeP.svg",
    "assets/changeP.svg",
    "assets/changeP.svg",
    "assets/newLogout.svg",
  ];
  values = [
    "landing",
    "add-driver",
    "add-machine",
    "add-machine-driver",
    "todays-reservation",
    "all-drivers",
    "maintenance-list",
    "add-company",
    "trip-cost",
    "all-machines",
    "all-drivers-availability",
    "drivers-locations",
    "add-owner",
    "all-owners",
    "machine-details",
    "all-machine-details",
    "login",
  ];

  caImageOptionsmenu: IOptionsCaImage = {
    base64: "../assets/profile.png",
    default: this.default,
    preCallFunction: {
      func(data) {
        return new Promise<any>((resolve, reject) => {
          resolve(this.executionClass.presentAlert(this.driver));
        });
      },
      executionClass: this,
      params: [this],
    },
    postCallFunction: {
      func(data) {
        return new Promise<any>((resolve, reject) => {
          resolve(this.executionClass.presentAlert(this.driver));
        });
      },
      executionClass: this,
      params: [this],
    },
  };

  caItemOpt: IOptionsCaComplexItemList = {
    title: "",
    caImageOptions: this.caImageOptionsmenu,
    withIcon: false,
    isSwipable: false,
  };

  caItemOptprofile: IOptionsCaComplexItemList = {
    classAttributes: ["last_login"],
    labels: ["LastLogin"],
    details: {},
    title: "",
    caImageOptions: this.caImageOptionsProfile,
    withIcon: false,
  };

  constructor(
    private localNotifications: LocalNotifications,
    private fcm: FCM,
    public menu: MenuController,
    private appdefaultlanguageService: AppdefaultlanguageService,
    private loggerService: LoggerService,
    public platform: Platform,
    private comm: common,
    private statusBar: StatusBar,
    private Keysgenerator: KeysgeneratorService,
    private camera: Camera,
    private alertCtrl: AlertController,
    private httpservice: HttpServiceService,
    private alertService: AlertService,
    private navCtrl: NavController,

    private translateConfigService: TranslateConfigService,
    private translate: TranslateService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (document.URL.startsWith("http")) {
        Environment.setEnv({
          API_KEY_FOR_BROWSER_RELEASE:
            "AIzaSyBaTVlHDndpSgbdDnRsCy2xFJt2tB41NB0", //key for browser relase
          API_KEY_FOR_BROWSER_DEBUG: "AIzaSyBaTVlHDndpSgbdDnRsCy2xFJt2tB41NB0", //key for browser test
        });
      }

      this.statusBar.styleDefault();
      this.appdefaultlanguageService.setDefaultAppLoadLanguage();
      this.translateConfigService.setLanguagedyn(); // set language first dynamically
      let key = "";
      this.Keysgenerator.generatekeys()
        .then(
          // create key
          (resData) => {
            key = resData;
            localStorage.setItem("mykey", resData); ///save the key in local storage
          }
        )
        .then(async (res) => {
          await this.comm.loadCustomConfigFile();
        })
        .then(async (res) => {
          await this.handShake(key); /// send public key to server // Handshake
        })
        .then((res) => {
          navigator["splashscreen"].hide();
        })

        .catch((error) => {
          this.loggerService.logError("ErrorGenerateKey", error);
        });

      {
      }

      this.getUserInfo();
    });
  }

  ngOnInit() {
    this.closeMenu();
    this.fcm.onNotification().subscribe((data) => {
      if (data.wasTapped) {
      } else {
        this.localNotifications.schedule({
          id: 1,
          title: data.title,
          text: data.body,
          sound: "file://assets/music.mp3",
          data: data,
          led: { color: "#FF00FF", on: 500, off: 500 },
          vibrate: true,
        });
      }
    });
  }

  navigateTo(i) {
    if (i == AdminlogoutSideMenuIndex) {
      this.logout();
    } else {
      this.navCtrl.navigateForward(this.values[i]);
      this.menu.close();
    }
  }

  logout() {
    //method to logout
    this.httpservice.sendrequest(urls.AdminlogoutUrl, {}).subscribe(
      (data) => {
        if (data["response"] === "logout successfuly") {
          //if logout true
          this.caImageOptionsProfile.base64 = "";
          this.caItemOptprofile = {
            classAttributes: ["last_login"],
            labels: ["Last Login"],
            details: {},
            title: "",
            caImageOptions: this.caImageOptionsProfile,
            withIcon: false,
          };
          localStorage.removeItem("username"); //remove username from storage
          localStorage.removeItem("id");
          localStorage.removeItem("username");
          localStorage.removeItem("last_login_client");
          this.menu.close();
          this.navCtrl.navigateRoot("/login"); // navigate to login page
        }
      },
      (error) => {
        this.alertService.presentToast("Not logout"); // if error alert error
      },
      () => {}
    );
  }

  private handShake(key) {
    this.httpservice.sendrequest(urls.handshakeUrl, {}).subscribe(
      ///call sendrequest to send key to server
      (data) => {
        if (data["backEndPublicKeyString"]) {
          localStorage.setItem("backEndkey", data["backEndPublicKeyString"]);
        }
        if (data["encryptedKey"]) {
          localStorage.setItem("encryptedKey", atob(data["encryptedKey"]));
          localStorage.setItem("encryptedKey1", data["encryptedKey"]);
        }
        if (data["initVector"]) {
          localStorage.setItem("initVector", atob(data["initVector"]));
          localStorage.setItem("initVector1", data["initVector"]);
        }

        if (data["responseError"]) {
          this.alertService.presentToast(data["responseError"]);
        } else this.authenticate();
      },
      (error) => {
        this.alertService.presentToastwithtranslate("connectionError");
      },
      () => {}
    );
  }

  private authenticate() {
    this.httpservice.sendrequest(urls.authenticationAdminUrl, {}).subscribe(
      (data) => {
        if (data["responseError"]) {
          this.alertService.presentToast(data["responseError"]);
        } else {
          if (data["errorCode"] == errorCode.errorCodeLogin) {
            this.navCtrl.navigateRoot("/login");
          }
          if (data["errorCode"] == errorCode.errorCodeAuthenticate) {
            this.navCtrl.navigateRoot("/login");
          }
          if (data["token"]) {
            localStorage.setItem("token", data["token"]);
          }
          if (data["response"] == "success") {
            //if true go to home page
            this.navCtrl.navigateRoot("/landing");
            this.comm.startTimerForAdmin();
          }
        }
      },
      (error) => {
        this.alertService.presentToastwithtranslate("connectionError");
        this.loggerService.logError("ErrorConnection", error);
      },
      () => {}
    );
  }

  changeProfile(type) {
    const options: CameraOptions = {
      quality: cameraQuality,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: type,
      targetWidth: camerawidth,
      targetHeight: cameraHeight,
      saveToPhotoAlbum: true,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        let base64Image = "data:image/jpeg;base64," + imageData;
        this.profile = base64Image;
        let param = { profile: imageData }; //param to send

        this.httpservice.sendrequest(urls.changeProfileUrl, param).subscribe(
          ///call sendrequest to send key to server
          (data) => {
            this.alertService.presentToastwithtranslate("ChangeProfiledone"); //alert meaasge
            this.caItemOptprofile.caImageOptions.base64 =
              "data:image/jpeg;base64," + imageData;
            localStorage.setItem("profile", imageData);
          },
          (error) => {
            this.alertService.presentToast("Change failed");
            ///print eeror messgae
          },
          () => {}
        );
      },
      (err) => {}
    );
  }

  private getUserInfo() {
    if (localStorage.getItem("profile") !== "undefined") {
      this.profile =
        "data:image/jpeg;base64," + localStorage.getItem("profile");
    } else {
      if (localStorage.getItem("gender") == "0")
        this.profile = "../assets/profile.png";
      else if (localStorage.getItem("gender") == "1")
        this.profile = "../assets/femaleprofile.png";
    }

    this.caImageOptionsProfile.base64 = this.profile;

    this.caItemOptprofile.title = localStorage.getItem("username");
    this.caItemOptprofile.details = {
      last_login: localStorage.getItem("last_login_client"),
    };
  }

  async selectImage() {
    const actionSheet = await this.alertCtrl.create({
      cssClass: "default-alert",
      header: this.translate.instant("imageSource"),
      subHeader: this.translate.instant("selectSource"),
      buttons: [
        {
          text: this.translate.instant("gallery"),
          handler: () => {
            this.changeProfile(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: this.translate.instant("camera"),
          handler: () => {
            this.changeProfile(this.camera.PictureSourceType.CAMERA);
          },
        },
      ],
    });
    await actionSheet.present();
  }

  update(image, i) {
    this.caImageOptionsmenu.base64 = image;
    this.caItemOpt.title = this.titles[i];
  }

  openEnd(event) {
    this.menu.close();
  }

  opendone() {
    this.getUserInfo();
  }
  func() {
    this.navCtrl.navigateRoot("nearest-one");
  }

  fabfunction(event) {
    this.navCtrl.navigateRoot(event);
    let currentUrl = this.router.url;

    if (currentUrl == "/nearest-one")
      this.router
        .navigateByUrl("/loading", { skipLocationChange: false })
        .then(() => {
          this.router.navigate([currentUrl]);
        });
  }

  closeMenu() {
    let jQueryInstance = this;
    $(document).click(function (event) {
      var mymenu = $(".mymenu");

      if (!$(event.target).closest(mymenu).length) {
        jQueryInstance.menu.close();
      }
    });
  }
}
