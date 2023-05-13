import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, Platform, NavController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from 'src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/services/logger.service';
import { IOptionsListTemplate, IOptionsInputCaBase, IOptionsCaImage, IOptionsCaBaseAction, IOptionsCaComplexItemList } from 'src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/custom-components/commonInterfaces';
import { AlertService } from 'src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/services/alert.service';
import { CommonService } from 'src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/services/common.service';
import { HttpServiceService } from 'src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/services/http-service.service';
import { TemplateListPage } from 'src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/templates/template-list/template-list.page';
import { urls } from 'src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/constants';

@Component({
  selector: 'app-list-machines-owner',
  templateUrl: './list-machines-owner.page.html',
  styleUrls: ['./list-machines-owner.page.scss'],
})
export class ListMachinesOwnerPage extends TemplateListPage implements OnInit {

  formGroup: FormGroup;
  formData = new FormData();

   listoption: IOptionsListTemplate = {
    withsearchInput: true,
    itemSize: 10,
    emptyListMsg: "USERRESERVATIONS.nodata",
    displayMomentFormat: "DD/MM/YYYY",
    displayDateFormat: "D MMM YY ",
   };
  
   labels = ["name","plate_number", "model","phone","type","amount"];
   classAttributes = ["name","plate_number", "model","mobile_number","type","amount"];


  
   optInput: IOptionsInputCaBase = {
    formData: this.formData,
    isrequired: true,
   };
  
   caLeftImageOptions: IOptionsCaImage = {
    base64: "assets/left.png",
  };

  iconsOpt: IOptionsCaBaseAction = {
    icon: "close-circle-outline",
  };

  iconsOpt1: IOptionsCaBaseAction = {
    icon: "duplicate-outline",
  };
  
  iconsOpt2: IOptionsCaBaseAction = {
    icon: "machine-list-outline",
  };
 
  caItemOpt: IOptionsCaComplexItemList = {
    labels: this.labels,
    classAttributes: this.classAttributes,
    title: "",
    iconsOptionsLeftList: [],
    iconsOptionsRightList: [this.iconsOpt, this.iconsOpt1,this.iconsOpt2],

    withIcon: true,
    isSwipable: false,
    
  };
  owner_id: number;
   
//caItemOptList: IOptionsSwipableCaComplexItemList[] = [];

  constructor(public router: Router,
    //public modalController: ModalController,
    private commonservice: CommonService,
    alertService: AlertService,
    private httpservice: HttpServiceService,
    private formBuilder: FormBuilder,
    public menu: MenuController,
    public platform: Platform,
    public activatedRoute: ActivatedRoute,
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
    
    this.activatedRoute.queryParams.subscribe((res) => {
      if (res["sendedData"]) {
        //console.log(res["sendedData"]);
        this.formData.append("create_update", "1");
        
        this.owner_id = res["sendedData"]["machines"]["owner_id"];
        this.fetchAllDrivers();
      } else {
        this.formData.append("create_update", "0");
      }
    });
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
          owner_id: this.owner_id
        };
      })
      .then((resData1) => {
        this.httpservice.sendrequest(urls.machinesOfOwner, param).subscribe(
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


  

}
