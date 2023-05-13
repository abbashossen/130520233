import { Component, NgZone, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import {
  ModalController,
  MenuController,
  Platform,
  AlertController,
  NavController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";

import { BehaviorSubject } from "rxjs";
import {
  IOptionsCaBaseAction,
  IOptionsInputCaBase,
  IOptionsCaBase,
  IOptionsSwipableCaComplexItemList,
  IOptionsListTemplate,
  IOptionsCaImage,
  IOptionsCaComplexItemList,
} from "src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/custom-components/commonInterfaces";
import { AlertService } from "src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/services/alert.service";
import { CommonService } from "src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/services/common.service";
import { HttpServiceService } from "src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/services/http-service.service";
import { LoggerService } from "src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/services/logger.service";
import { TemplateListPage } from "src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/templates/template-list/template-list.page";
import { urls } from "src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/constants";

@Component({
  selector: "app-all-machines",
  templateUrl: "./all-machines.page.html",
  styleUrls: ["./all-machines.page.scss"],
})
export class AllMachinesPage extends TemplateListPage implements OnInit {
  idupdate;
  empty = false;
  formGroup: FormGroup;
  formData = new FormData();
  selectedCompleteDate = null;
  adata;

  caButtonOptions: IOptionsCaBaseAction = {
    icon: "alarm-outline",
    placeholder: "filter",
  };

  optInput: IOptionsInputCaBase = {
    formData: this.formData,
    isrequired: true,
  };

  opt: IOptionsCaBase = {
    formData: this.formData,
  };

  isamount = "amount";
  
  labels = ["name","plate_number", "model","phone","rented","type","amount"];
  classAttributes = ["name","plate_number", "model","mobile_number","rented","type","rent_amount"];

  default = "";
  selectedtime = null;
  selectedDate = null;

  caItemOptList: IOptionsSwipableCaComplexItemList[] = [];

  listoption: IOptionsListTemplate = {
    withsearchInput: false,
    itemSize: 10,
    emptyListMsg: "USERRESERVATIONS.nodata",
  };

  caLeftImageOptions: IOptionsCaImage = {
    base64: "assets/left.png",
  };

  iconsOpt: IOptionsCaBaseAction = {
    icon: "toggle-outline",
  };

    iconsOpt2: IOptionsCaBaseAction = {
    iconSrc: "assets/icons 6-02.svg"
  };

  iconsOpt1: IOptionsCaBaseAction = {
    
    iconSrc: "assets/icons 6-01.svg",
  };

  caItemOpt: IOptionsCaComplexItemList = {
    labels: this.labels,
    classAttributes: this.classAttributes,
    title: "",
    iconsOptionsLeftList: [],
    iconsOptionsRightList: [this.iconsOpt,this.iconsOpt1,this.iconsOpt2],

    withIcon: true,
    isSwipable: true,
    
  };

  constructor(
    public router: Router,
    public modalController: ModalController,
    private commonservice: CommonService,
    alertService: AlertService,
    private httpservice: HttpServiceService,
    private formBuilder: FormBuilder,
    public menu: MenuController,
    private navCtrl: NavController,
    public platform: Platform,
    public ngZone: NgZone,
    public loggersrvice: LoggerService,
    private alertController: AlertController,
    private translate: TranslateService
  ) {
    super(alertService, platform, ngZone, menu, loggersrvice);

    this.formGroup = this.formBuilder.group({});
    this.optInput.formGroup = this.formGroup;
  }

  ngOnInit() {}

  ionViewDidEnter(): void {}

  ionViewWillEnter() {
    super.ionViewWillEnter();
  }

  get reservations() {
    return this._items.asObservable();
  }

  fetchAllMachines(call?) {
    this.resetList();
    this.listoption.isEmpty = true;
    this.listoption.isLoading = true;

    let param = {};

    this.commonservice
      .present()
      .then((resData) => {
        this.resetList();
      })
      .then((resData1) => {
        this.httpservice
          .sendrequest(urls.returnListOfMachines, param)
          .subscribe(
            /// call sendrequest method
            (data) => {
              this.listoption.isEmpty = true;
              this.listoption.isLoading = false;
              if (data["response"]) {
                this.resetList();
              } else {
                this.empty = false;
                this.listoption.isEmpty = false;
                this.listoption.isLoading = false;
                this.availableItems = [];
                this.availableItems = data["listOfMachines"];
                let i = 0;
                if (this.availableItems) {
                  this.availableItems.forEach((item, index) => {
                    this.labels[6]="amount"
                    
                    if (item["rent_amount"] != 0) {
                      item["rented"] = "rented";
                    } else {
                      item["rented"] = "not rented";
                    }
                    if (item["type"] == "percentage") {
                      this.labels[6] = "percentage";
                      this.caItemOpt.labels[6] = "percentage";
                      console.log(this.caItemOpt.labels[6]);
                      console.log(this.labels[6]);
                   }
                    
                    this.update(item);

                    this.items[i] = Object.assign({}, this.caItemOpt);
                    i++;
                    this.listoption.items = [...this.items];

                  });
                }
              }
            },
            (error) => {
              this.resetList();
              this.listoption.isEmpty = true;
              this.loggersrvice.logError("ErrorConnection", error);
              this.alertService.presentToastwithtranslate("connectionError");
              this.commonservice.dismiss();
              if (call) call();
            },
            () => {
              this.commonservice.dismiss();
              if (call) call();
            }
          );
      });
  }

  update(d) {
    let caImage: IOptionsCaImage = {
      default: this.default,
    };
    this.idupdate = "d" + d.reservation_list_id;
    if (d.driver_profile)
      caImage.base64 = "data:image/jpeg;base64," + d.driver_profile;
    else {
      caImage.base64 = "../assets/profile.png";
    }

    this.caItemOpt.caImageOptions = caImage;
    this.caItemOpt.leftLabel = d.status;
    this.caItemOpt.details = d;

    return this.caItemOpt;
  }

  getData() {
    this.fetchAllMachines();
  }

  switchMachine(event) {
    this.commonservice.present().then((es) => {
      this.httpservice
        .sendrequest(urls.switchingMachineStatus, {
          driver_id: event.item.driver_id,
        })
        .subscribe(
          (res) => {
            this.commonservice.dismiss();
            if (res["response"] == "done") {
              this.alertService.presentToastwithtranslate("switchingDone");
              this.fetchAllMachines();
            }
          },
          (error) => {
            this.loggersrvice.logError("ErrorConnection", error);
            this.alertService.presentToastwithtranslate("connectionError");
            this.commonservice.dismiss();
          }
        );
    });
  }

  killDriver(event) {
    this.commonservice.present().then((es) => {
      this.httpservice
        .sendrequest(urls.killMachine, { machine_id: event.item.machine_id })
        .subscribe(
          (res) => {
            this.commonservice.dismiss();
            if (res["response"]) {
              this.alertService.presentToastwithtranslate("machineRemoved");
              this.fetchAllMachines();
            }
          },
          (error) => {
            this.loggersrvice.logError("ErrorConnection", error);
            this.alertService.presentToastwithtranslate("connectionError");
            this.commonservice.dismiss();
          }
        );
    });
  }

  async confirmSwitching(machine) {
    if (machine.event.option == "toggle-outline") {
      console.log(machine.event.option);
      let alert = this.alertController.create({
        cssClass: "default-alert",
        header: this.translate.instant("confirm"),
        subHeader: this.translate.instant("toggleStatus"),
        buttons: [
          {
            text: this.translate.instant("yes"),
            handler: () => {
              this.switchMachine(machine);
            },
          },
          {
            text: this.translate.instant("no"),
            role: "cancel",
          },
        ],
      });
      (await alert).present();
    }
    console.log(machine.event.option);
     if (machine.event.option.includes("icons 6-02.svg")) {
      let alert = this.alertController.create({
        cssClass: "default-alert",
        header: this.translate.instant("confirm"),
        subHeader: this.translate.instant("killOwner"),
        buttons: [
          {
            text: this.translate.instant("yes"),
            handler: () => {
              this.killDriver(machine);
            },
          },
          {
            text: this.translate.instant("no"),
            role: "cancel",
          },
        ],
      });
      (await alert).present();
    }

    if (machine.event.option.includes("icons 6-01.svg")) {
      this.navCtrl.navigateRoot("add-machine", {
        queryParams: {
          sendedData: {
            machine: machine.item,
          },
        },
        
      });
      //console.log(owner.item);
    }
    console.log(machine.event.option);
  }
  }
  

