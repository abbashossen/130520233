import { Time } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonDatetime, MenuController, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { IOptionsCaBaseAction, IOptionsCaImage, IOptionsCaItemListImage, IOptionsDate, IOptionsDynamicDropDown, IOptionsFormTemplate, IOptionsfullCalendar, IOptionsInputCaBase } from 'src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/custom-components/commonInterfaces';
import { AlertService } from 'src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/services/alert.service';
import { CommonService } from 'src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/services/common.service';
import { HttpServiceService } from 'src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/services/http-service.service';
import { LoggerService } from 'src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/services/logger.service';
import { percent, returnTotalDistanceMachine, urls, validators } from 'src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/constants';
import { isNumber } from 'util';

@Component({
  selector: 'app-machine-details',
  templateUrl: './machine-details.page.html',
  styleUrls: ['./machine-details.page.scss'],
})
export class MachineDetailsPage implements OnInit {
  //@ViewChild("datePicker") IonDatetimerefe: IonDatetime;
  formGroupRegister: FormGroup;
  formData = new FormData();
  
  label = "";

  totalCost = "";
  
  result: number;
  
  isOptimal: boolean;

  machine_id: number;

  returnMachineRents: number;

  returnDriverWages: number;

  optInput: IOptionsInputCaBase = {
    formData: this.formData,
    isrequired: true,
    placeholder: "Date"
  };
  
  optionForm: IOptionsFormTemplate = {
    withsearchInput: true,
    displayMomentFormat: "DD/MM/YYYY",
    displayDateFormat: "D MMM YY ",
    disableDate: false,
    dataInput: this.optInput,
  }
  dropDownOptionMachine: IOptionsDynamicDropDown = {
    controlName: "machine_id",
    serviceName: urls.returnListOfMachines,
    formData: this.formData,
    label: "Choose Machine",
    isRequired: true,
    options: [],
    listLabel: "listOfMachines",
    keyLabel: "machine_id",
    valueLabel: [
      "machine_id",
      "plate_number",
      "name",
      "model",
    ],
  };
  
   dropDownOptionDriver: IOptionsDynamicDropDown = {
    controlName: "driver_id",
    serviceName: urls.returnAllDrivers,
    formData: this.formData,
    label: "Choose Driver",
    isRequired: true,
    options: [],
    listLabel: "listAllDrivers",
    keyLabel: "driver_id",
    valueLabel: [
      "driver_name",
      "driver_id"
    ],
  };
  
   optStartKm: IOptionsInputCaBase = {
    formData: this.formData,
    type: "number",
    isrequired: true,
    controlName: "starting_kilometrage",
    placeholder: "Start KM",
   };
  
  optEndKm: IOptionsInputCaBase = {
    formData: this.formData,
    type: "number",
    isrequired: false,
    controlName: "ending_kilometrage",
    placeholder: "End KM",
   };
   
  
  optFuel: IOptionsInputCaBase = {
    formData: this.formData,
    type: "number",
    isrequired: false,
    controlName: "amount",
    placeholder: "Fuel",
  };
  
    optIncome: IOptionsInputCaBase = {
    formData: this.formData,
    type: "number",
    isrequired: false,
    controlName: "income",
    placeholder: "Daily Income",
  };
  
   optDesc: IOptionsInputCaBase = {
    formData: this.formData,
    isrequired: false,
    controlName: "description",
    placeholder: "Description",
  };
   
  caSubmitOptions: IOptionsCaBaseAction = {
    placeholder: "submit",
    serviceURL: urls.insertWorkingDay,
     formData: this.formData,
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
  
  
  IOptionsdate: IOptionsDate =
    {
    displayFormat: "DD MMM YY",
    };
  
  caInputOptionsDate: IOptionsInputCaBase = {
    formData: this.formData,
    placeholder: "date",
    type: "text",
    readOnly: true,
    controlName: "date",
    isrequired: true,
  };

    
  
   profile = "../assets/profile.png";

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
  
  listImageOptionsFuel: IOptionsCaItemListImage = {
    formDate: this.formData,
    title: "fuel",
    isrequired: false,
    attributename: "pic_of_facture",
    withIcon: false,
    labels: ["uploadImage"],
    classAttributes: ["time"],
    caImageOptions: this.caImageOptionsProfile
    };
    
    listImageOptionsStartKm: IOptionsCaItemListImage = {
    formDate: this.formData,
    title: "Start Km",
    attributename: "starting_kilometrage_image",
    withIcon: false,
    labels: ["uploadImage"],
    classAttributes: ["time"],
    isrequired: false,
    caImageOptions: this.caImageOptionsProfile
    };
  
   listImageOptionsEndKm: IOptionsCaItemListImage = {
    formDate: this.formData,
    title: "End Km",
    isrequired: false,
    attributename: "ending_kilometrage_image",
    withIcon: false,
    labels: ["uploadImage"],
    classAttributes: ["time"],
    caImageOptions: this.caImageOptionsProfile
    
   };
  
   inpStartHour: IOptionsInputCaBase = {
    formData: this.formData,
    isrequired: true,
    placeholder: "Start Time",
    controlName: "starting_time",
    type: "time",
   };
  
    inpEndHour: IOptionsInputCaBase = {
    formData: this.formData,
    isrequired: false,
    placeholder: "End Time",
    controlName: "ending_time",
    type: "time",
    value:"18:00:00"
    };
  
 

  
  display: string;

  totalRevenue: number;
  isupdate = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    public activatedRoute: ActivatedRoute,
    private menu: MenuController,
    private commonservice: CommonService,
    private httpservice: HttpServiceService,
    private alertService: AlertService,
    public loggersrvice: LoggerService,
  ) { 
    this.formGroupRegister = this.formBuilder.group({});
    this.dropDownOptionMachine.formGroup = this.formGroupRegister;
    this.dropDownOptionDriver.formGroup = this.formGroupRegister;
    this.optStartKm.formGroup = this.formGroupRegister;
    this.optEndKm.formGroup = this.formGroupRegister;
    this.optIncome.formGroup = this.formGroupRegister;
    this.optFuel.formGroup = this.formGroupRegister;
    this.inpStartHour.formGroup = this.formGroupRegister;
    this.caInputOptionsDate.formGroup = this.formGroupRegister;
    this.inpEndHour.formGroup = this.formGroupRegister;
    this.listImageOptionsFuel.formGroup = this.formGroupRegister;
    this.listImageOptionsStartKm.formGroup = this.formGroupRegister;
    this.listImageOptionsEndKm.formGroup = this.formGroupRegister;
    this.optDesc.formGroup = this.formGroupRegister;
    this.caSubmitOptions.formGroup = this.formGroupRegister;
    
  }

  ngOnInit() {
    //this.formGroupRegister.addControl('new', new FormControl('', [Validators.required, this.startKMValidator]));
   //console.log(this.dropDownOptionMachine.valueLabel + "aaaaaaaaaaaaaaaaaaa");
    this.formGroupRegister.reset();
    this.activatedRoute.queryParams.subscribe((res) => {
      if (res["sendedData"]) {
        //console.log(res["sendedData"]);
        this.formData.append("create_update", "1");
        this.formData.append(
          "machine_id",
          res["sendedData"]["machine"]["machine_id"]
        );
        this.isupdate = true;
        //console.log(res["sendedData"]["owner"]["owner_id"]);
        // this.optEndKm.isrequired = true;
        // this.optFuel.isrequired = true;
        // this.optIncome.isrequired = true;
        // this.listImageOptionsEndKm.isrequired = true;
        // this.listImageOptionsFuel.isrequired = true;
        // this.inpEndHour.isrequired = true;
        
        this.machine_id = res["sendedData"]["machine"]["machine_id"];
       
        this.formData.append("driver_working_day_id", res["sendedData"]["machine"]["driver_working_day_id"]);
        this.dropDownOptionMachine.firstOption = res["sendedData"]["machine"]["machine_id"];
        this.dropDownOptionDriver.firstOption = res["sendedData"]["machine"]["driver_id"];
        this.inpStartHour.value = res["sendedData"]["machine"]["starting_time"];
        this.optStartKm.value = res["sendedData"]["machine"]["starting_kilometrage"];
        this.optEndKm.value = res["sendedData"]["machine"]["ending_kilometrage"];
        this.optIncome.value = res["sendedData"]["machine"]["income"];
        this.optFuel.value = res["sendedData"]["machine"]["amount"];
        //this.optDesc = res["sendedData"]["machine"]["description"];
        this.caInputOptionsDate.value = res["sendedData"]["machine"]["date"];
        this.profile = "data:image/jpeg;base64," + res["sendedData"]["machine"]["starting_kilometrage_image"];
        //console.log("data:image/jpeg;base64," + res["sendedData"]["machine"]["image_start"])
        this.listImageOptionsStartKm.caImageOptions = {
          base64: "data:image/jpeg;base64," + res["sendedData"]["machine"]["starting_kilometrage_image"]
        } //this.optEndKm.value = res["sendedData"]["machine"]["end_KM"];
        //this.optIncome.value = res["sendedData"]["machine"]["daily_income"];
        //this.optFuel.value = res["sendedData"]["machine"]["fuel"];
        //this.listImageOptionsStartKm.value = res["sendedData"]["machine"]["image"];
        //this.inpStartHour.isDisabled = true;
      } else {
        this.formData.append("create_update", "0");
      }
    });
    
  }
  
    ionViewWillEnter() {
    this.menu.close();
    }
  
   postCall(param)
  {
    
     if (param["response"]) {
      
       this.navCtrl.navigateRoot("all-machine-details");
       
    }
    
  }
  preCall(param)
  {
    var start = this.tosecond(this.inpStartHour.formData.get(this.inpStartHour.controlName));
    var end = this.tosecond(this.inpStartHour.formData.get(this.inpEndHour.controlName));
    var startkm = Number(this.optStartKm.value);
    var endkm = Number(this.optEndKm.value);
  
     if (startkm >= endkm) {
      this.optStartKm.formGroup.controls[this.optStartKm.controlName].setErrors(this.startKMValidator);
    } else {
      this.optStartKm.formGroup.controls[this.optStartKm.controlName].setErrors(null);
     }

    
     if (start >= end) {
      this.inpStartHour.formGroup.controls[this.inpStartHour.controlName].setErrors(this.startHourValidator);
     } else {
       this.inpStartHour.formGroup.controls[this.inpStartHour.controlName].setErrors(null);
     }
       
  }
  
  tosecond(time1) {
    
    var a = time1.split(':');
    var b = (+a[0] * 60 * 60) + (+a[1] * 60) + (+a[2]);
    
    return b;
    
  }
 
  startKMValidator(control: FormControl) {
    if (this.optStartKm.value > this.optEndKm.value) {
      return {startKMValidator: true}
    }
    return null;
  }
  
  startHourValidator(control: FormControl) {
    if (this.inpStartHour.value > this.inpEndHour.value) {
      return {startHourValidator: true}
    }
    return null;
  }
  check1(event?) {
    let datet = event.split("T")[0];
    this.optInput.formData.set("date", datet);
    //this.fetchUserReservations(undefined, event);
  }

   reserveoOnTime(event) {
   //this.caInputOptionsDate.value = moment(event).format(this.optionForm?.displayMomentFormat);
    
    
   }
  
  
    
 
}
