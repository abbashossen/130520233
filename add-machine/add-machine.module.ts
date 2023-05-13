import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AddMachinePageRoutingModule } from "./add-machine-routing.module";

import { AddMachinePage } from "./add-machine.page";
import { SharedModule } from "src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMachinePageRoutingModule,
    SharedModule,
  ],
  declarations: [AddMachinePage],
})
export class AddMachinePageModule {}
