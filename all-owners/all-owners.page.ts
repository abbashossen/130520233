import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, ModalController, NavController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';


import { IOptionsCaBaseAction, IOptionsCaComplexItemList, IOptionsCaImage, IOptionsInputCaBase, IOptionsListTemplate, IOptionsSwipableCaComplexItemList } from 'src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/custom-components/commonInterfaces';
import { AlertService } from 'src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/services/alert.service';
import { CommonService } from 'src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/services/common.service';
import { HttpServiceService } from 'src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/services/http-service.service';
import { LoggerService } from 'src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/services/logger.service';
import { TemplateListPage } from 'src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/templates/template-list/template-list.page';
import { urls } from 'src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/constants';

@Component({
  selector: 'app-all-owners',
  templateUrl: './all-owners.page.html',
  styleUrls: ['./all-owners.page.scss'],
})
export class AllOwnersPage extends TemplateListPage implements OnInit {

  formGroup: FormGroup;
  formData = new FormData();

   listoption: IOptionsListTemplate = {
    withsearchInput: true,
    itemSize: 10,
    emptyListMsg: "USERRESERVATIONS.nodata",
    displayMomentFormat: "DD/MM/YYYY",
    displayDateFormat: "D MMM YY ",
   };
  
   labels = [
     "name",
     "phone",
     "Number_of_machines"
 
  ];
  classAttributes = [
    "name",
    "mobile_number",
    "Number_of_machines"
    
  ];


  
   optInput: IOptionsInputCaBase = {
    formData: this.formData,
    isrequired: true,
   };
  
   caLeftImageOptions: IOptionsCaImage = {
    base64: "assets/left.png",
  };

  iconsOpt: IOptionsCaBaseAction = {
    iconSrc: "assets/icons 6-02.svg"
  };

  iconsOpt1: IOptionsCaBaseAction = {
    iconSrc: "assets/icons 6-01.svg"
  };
  
  iconsOpt2: IOptionsCaBaseAction = {
    iconSrc: "assets/icons 6-03.svg"
  };
 
  caItemOpt: IOptionsCaComplexItemList = {
    labels: this.labels,
    classAttributes: this.classAttributes,
    title: "",
    iconsOptionsLeftList: [],
    iconsOptionsRightList: [this.iconsOpt, this.iconsOpt1,this.iconsOpt2],

    withIcon: true,
    isSwipable: true,
    
  };

   
//caItemOptList: IOptionsSwipableCaComplexItemList[] = [];

  constructor(public router: Router,
    //public modalController: ModalController,
    private commonservice: CommonService,
    alertService: AlertService,
    private httpservice: HttpServiceService,
    private formBuilder: FormBuilder,
    public menu: MenuController,
    public platform: Platform,
    public ngZone: NgZone,
    public loggersrvice: LoggerService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private translate: TranslateService
    
  ) {
    super(alertService, platform, ngZone, menu, loggersrvice);
    this.formGroup = this.formBuilder.group({});
    this.optInput.formGroup = this.formGroup;
  }

  ngOnInit() {
    this.fetchAllDrivers();
  }


   ionViewWillEnter() {
    super.ionViewWillEnter();
   }
  
   fetchAllDrivers(call?) {
    this.resetList();
    this.listoption.isEmpty = true;
    this.listoption.isLoading = true;

    let param;

    this.commonservice
      .present()
      .then((resData) => {
        this.resetList();

        param = {
          // date: date,
          // time: time, //param to send
        };
      })
      .then((resData1) => {
        this.httpservice.sendrequest(urls.returnAllOwners, param).subscribe(
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
              this.availableItems = data["list"];
              let i = 0;
              if (this.availableItems) {
                this.availableItems.forEach((item, index) => {
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
    this.caItemOpt.leftLabel = d.reservation_list_status;
    this.caItemOpt.details = d;

    return this.caItemOpt;
  }

  killDriver(event) {
    this.commonservice.present().then((es) => {
      this.httpservice
        .sendrequest(urls.killOwner, { owner_id: event.item.owner_id })
        .subscribe(
          (res) => {
            this.commonservice.dismiss();
            if (res["response"] == "done") {
              this.alertService.presentToastwithtranslate("ownerRemoved");
              this.fetchAllDrivers(
                
              );
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

  async confirmKill(owner) {
    if (owner.event.option.includes("icons 6-02.svg")) {
      let alert = this.alertController.create({
        cssClass: "default-alert",
        header: this.translate.instant("confirm"),
        subHeader: this.translate.instant("killOwner"),
        buttons: [
          {
            text: this.translate.instant("yes"),
            handler: () => {
              this.killDriver(owner);
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

    if (owner.event.option.includes("icons 6-01.svg")) {
      this.navCtrl.navigateRoot("add-owner", {
        queryParams: {
          sendedData: {
            owner: owner.item,
          },
        },
        
      });
      //console.log(owner.item);
    }

    if (owner.event.option.includes("icons 6-03.svg")) {
      this.navCtrl.navigateRoot("list-machines-owner", {
        queryParams: {
          sendedData: {
            machines: owner.item,
          },
        },
        
      });
      //console.log(owner.item);
    }
  }
}
