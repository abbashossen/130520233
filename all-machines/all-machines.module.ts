import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AllMachinesPageRoutingModule } from "./all-machines-routing.module";

import { AllMachinesPage } from "./all-machines.page";
import { SharedModule } from "src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AllMachinesPageRoutingModule,
  ],
  declarations: [AllMachinesPage],
})
export class AllMachinesPageModule {}
