import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListMachinesOwnerPageRoutingModule } from './list-machines-owner-routing.module';

import { ListMachinesOwnerPage } from './list-machines-owner.page';
import { SharedModule } from "src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListMachinesOwnerPageRoutingModule,
    SharedModule
  ],
  declarations: [ListMachinesOwnerPage]
})
export class ListMachinesOwnerPageModule {}
