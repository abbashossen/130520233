import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MenuController, NavController } from "@ionic/angular";
import { common } from "src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/common/commonFunctions";
import {
  IOptionsCaBase,
  IOptionsInputCaBase,
  IOptionsCaBaseAction,
  IOptionToggle,
  IOptionsDynamicDropDown,
} from "src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/custom-components/commonInterfaces";
import { urls } from "src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/constants";
import { TranslateConfigService } from "src/app/translate-config.service";

@Component({
  selector: "app-add-machine",
  templateUrl: "./add-machine.page.html",
  styleUrls: ["./add-machine.page.scss"],
})
export class AddMachinePage implements OnInit {
  formGroup: FormGroup;
  formData = new FormData();
  opt: IOptionsCaBase = {
    formData: this.formData,
    serviceURL: urls.registerUrl,
    redirection: "nearest-one",
  };

  optInputPlateNumber: IOptionsInputCaBase = {
    formData: this.formData,
    isrequired: true,
    controlName: "plate_number",
    placeholder: "Plate Number",
    label: "plate"
  };

  caSubmitOptions: IOptionsCaBaseAction = {
    placeholder: "submit",
    serviceURL: urls.addMachine,

    type: "submit",
    postCallFunction: {
      func(data) {
        return new Promise<any>((resolve, reject) => {
          resolve(this.executionClass.postCall(data));
        });
      },
      executionClass: this,
      params: [this],
     },
    
    preCallFunction: {
      func(data) {
        return new Promise<any>((resolve, reject) => {
          resolve(this.executionClass.preCall(data));
        });
      },
      executionClass: this,
      params: [this],
    },
    
  };

  optInputModel: IOptionsInputCaBase = {
    formData: this.formData,
    isrequired: true,
    controlName: "model",
    placeholder: "model",
  };

  optInputAmount: IOptionsInputCaBase = {
    formData: this.formData,
    isrequired: true,
    controlName: "amount",
    placeholder: "amount",
  };

  optInputMachineStatus: IOptionsInputCaBase = {
    formData: this.formData,
    isrequired: true,
    controlName: "machine_status",
    placeholder: "Machine status",
  };

  toggleOption: IOptionToggle = {
    leftLabel: "rented",
    rightLabel: "",
    checked: false,
  };

  isRented = false;

  dropDownOption: IOptionsDynamicDropDown = {
    controlName: "owner_id",
    serviceName: urls.returnAllOwners,
    formData: this.formData,
    label: "chooseOwner",
    isRequired: true,
    options: [],
    listLabel: "list",
    keyLabel: "owner_id",
    valueLabel: ["name","mobile_number"],
  };

  dropDownOptionType: IOptionsDynamicDropDown = {
    controlName: "type",
    serviceName: urls.returnType,
    formData: this.formData,
    label: "chooseType",
    isRequired: true,
    options: [],
    listLabel: "list",
    keyLabel: "property_value",
    valueLabel: ["property_value"],
  };

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private translateConfigService: TranslateConfigService,
    private com: common,
    private menu: MenuController,
    private activatedRoute: ActivatedRoute
  ) {
    this.formGroup = this.formBuilder.group({});
    this.opt.formGroup = this.formGroup;
    this.optInputModel.formGroup = this.formGroup;
    this.optInputPlateNumber.formGroup = this.formGroup;
    this.caSubmitOptions.formGroup = this.formGroup;
    this.caSubmitOptions.formData = this.opt.formData;
    this.optInputAmount.formGroup = this.formGroup;
    this.dropDownOption.formGroup = this.formGroup;
    this.dropDownOptionType.formGroup = this.formGroup;
    
  }

  ngOnInit() {
   this.activatedRoute.queryParams.subscribe((res) => {
      if (res["sendedData"]) {
        //console.log(res["sendedData"]);
        this.formData.append("create_update", "1");
        this.formData.append(
          "machine_id",
          res["sendedData"]["machine"]["machine_id"]
        );
        
        this.optInputModel.value = res["sendedData"]["machine"]["model"];
        this.optInputPlateNumber.value = res["sendedData"]["machine"]["plate_number"];
         if (res["sendedData"]["machine"]["rent_amount"] != 0) {
          this.toggleOption.checked = true;
          this.isRented = true;
          
        }
        this.optInputAmount.value = res["sendedData"]["machine"]["rent_amount"];
        this.dropDownOptionType.firstOption = res["sendedData"]["machine"]["type"];
        this.dropDownOption.firstOption = res["sendedData"]["machine"]["owner_id"];
       
      } else {
        this.formData.append("create_update", "0");
      }
    });
  }
  
 
  
  ionViewWillEnter() {
    this.menu.close();
  }

 
  postCall(tempParam) {
    console.log(tempParam["response"]+"ghghghghgjgh");
    if (tempParam["response"]) {
      console.log(tempParam["response"]+"ghghghghgjgh");
      this.navCtrl.navigateRoot("all-machines");
    }
    
  }

  preCall(tempParam) {}

  reverseRented(event) {
    if (event) {
      this.isRented = true;
    } else {
      this.isRented = false;
    }
  }

  changeAmount(event) {
    
    if ( event == "percentage") { 
      this.optInputAmount.placeholder = "percentage";
    } else {
      this.optInputAmount.placeholder = "amount";
    }
    
  }
}
