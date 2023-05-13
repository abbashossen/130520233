import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { common } from 'src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/common/commonFunctions';
import { IOptionCaSelectDropdownComponent, IOptionsCaBase, IOptionsCaBaseAction, IOptionsDynamicDropDown, IOptionsInputCaBase } from 'src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/custom-components/commonInterfaces';
import { urls, validators } from 'src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/constants';
import { TranslateConfigService } from 'src/app/translate-config.service';

@Component({
  selector: 'app-add-owner',
  templateUrl: './add-owner.page.html',
  styleUrls: ['./add-owner.page.scss'],
})
export class AddOwnerPage implements OnInit {

  formGroupRegister: FormGroup;
  formData = new FormData();
  owner_id: number;


    optName: IOptionsInputCaBase = {
    formData: this.formData,
    pattern: validators.englishNameValidator,
    isrequired: true,
    controlName: "name",
    placeholder: "Name",
  };

   optArbName: IOptionsInputCaBase = {
    formData: this.formData,
     isrequired: true,
    controlName:"arabic_name"
    
   };
  
   
  
   caSubmitOptions: IOptionsCaBaseAction = {
    placeholder: "submit",
    serviceURL: urls.addOwner,
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
  
    
  
    optmobile: IOptionsInputCaBase = {
    formData: this.formData,
    serviceURL: urls.sendMobileUrlClient,
    controlName: "mobile_number",
    class: "black",
    };
  
  

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    public activatedRoute: ActivatedRoute,
    private menu: MenuController
  ) {
    
    this.formGroupRegister = this.formBuilder.group({});
    this.optName.formGroup = this.formGroupRegister;
    this.optArbName.formGroup = this.formGroupRegister;
    this.optmobile.formGroup = this.formGroupRegister;
    this.caSubmitOptions.formGroup = this.formGroupRegister;
  
    
    }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((res) => {
      if (res["sendedData"]) {
        console.log(res["sendedData"]);
        this.formData.append("create_update", "1");
        this.formData.append(
          "owner_id",
          res["sendedData"]["owner"]["owner_id"]
        );
        console.log(res["sendedData"]["owner"]["owner_id"]);
        this.formData.append("owner_id", res["sendedData"]["owner"]["owner_id"]);
        this.optArbName.value = res["sendedData"]["owner"]["arabic_name"];
        this.optName.value = res["sendedData"]["owner"]["name"];
        
        this.optmobile.value = res["sendedData"]["owner"][
          "mobile_number"
        ].replace("+961", "");

       
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
      this.navCtrl.navigateRoot("all-owners");
    }

  }

  preCall(tempParam) {}
}
